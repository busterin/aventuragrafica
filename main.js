const scene = document.getElementById("scene");
const sceneViewport = document.getElementById("scene-viewport");
const guardian = document.getElementById("guardian");
const gaston = document.getElementById("gaston");
const anilloWorld = document.getElementById("anillo-world");
const anilloItem = document.getElementById("anillo-item");
const speech = document.getElementById("speech");
const inventory = document.getElementById("inventory");
const inventorySlots = [...document.querySelectorAll(".inventory-slot")];
const GASTON_GAP = 12;

const VALID_DROP_ZONES = [
  { x1: 0.45, y1: 0.33, x2: 0.58, y2: 0.58 }
];

let hasAnillo = false;
let speechAnchor = null;
let dragProxy = null;
const BASE_WIDTH = 1328;
const BASE_HEIGHT = 800;

function addFallbackOnError(id, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("error", () => {
    el.classList.add("fallback");
    if (el.tagName === "IMG") {
      el.alt = label;
      el.removeAttribute("src");
      el.textContent = label;
    }
  });
}

addFallbackOnError("background", "fondo1.png no encontrado");
addFallbackOnError("anillo-world", "anillo.png no encontrado");
addFallbackOnError("anillo-item", "anillo.png no encontrado");

function createDragProxy(sourceEl, clientX, clientY) {
  removeDragProxy();
  dragProxy = sourceEl.cloneNode(true);
  dragProxy.removeAttribute("id");
  dragProxy.style.position = "fixed";
  dragProxy.style.left = `${clientX}px`;
  dragProxy.style.top = `${clientY}px`;
  dragProxy.style.width = "44px";
  dragProxy.style.height = "44px";
  dragProxy.style.objectFit = "contain";
  dragProxy.style.transform = "translate(-50%, -50%)";
  dragProxy.style.pointerEvents = "none";
  dragProxy.style.zIndex = "9999";
  dragProxy.style.opacity = "0.95";
  document.body.appendChild(dragProxy);
}

function moveDragProxy(clientX, clientY) {
  if (!dragProxy) return;
  dragProxy.style.left = `${clientX}px`;
  dragProxy.style.top = `${clientY}px`;
}

function removeDragProxy() {
  if (!dragProxy) return;
  dragProxy.remove();
  dragProxy = null;
}

function getSceneScale() {
  const rect = scene.getBoundingClientRect();
  return rect.width / BASE_WIDTH;
}

function clientToWorld(clientX, clientY) {
  const rect = scene.getBoundingClientRect();
  const scale = getSceneScale();
  return {
    x: (clientX - rect.left) / scale,
    y: (clientY - rect.top) / scale
  };
}

function getWorldRect(el) {
  const rect = el.getBoundingClientRect();
  const topLeft = clientToWorld(rect.left, rect.top);
  const bottomRight = clientToWorld(rect.right, rect.bottom);
  return {
    left: topLeft.x,
    top: topLeft.y,
    right: bottomRight.x,
    bottom: bottomRight.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y
  };
}

function layoutScene() {
  const vw = sceneViewport.clientWidth;
  const vh = sceneViewport.clientHeight;
  const scale = Math.max(vw / BASE_WIDTH, vh / BASE_HEIGHT);
  const offsetX = (vw - BASE_WIDTH * scale) / 2;
  const offsetY = (vh - BASE_HEIGHT * scale) / 2;
  scene.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

function setGuardianFacing(targetX) {
  const currentCenterX = guardian.offsetLeft + guardian.offsetWidth / 2;
  const delta = targetX - currentCenterX;
  if (Math.abs(delta) < 2) return;
  guardian.style.transform = delta > 0 ? "scaleX(1)" : "scaleX(-1)";
}

function moveGuardianTo(targetWorldX) {
  const guardianWidth = guardian.offsetWidth;
  const gastonRect = getWorldRect(gaston);
  const gastonCenterX = gastonRect.left + gastonRect.width / 2;

  let clampedX = Math.min(
    BASE_WIDTH - guardianWidth,
    Math.max(0, targetWorldX - guardianWidth * 0.5)
  );

  const candidateLeft = clampedX;
  const candidateRight = candidateLeft + guardianWidth;
  const blockedLeft = gastonRect.left - GASTON_GAP;
  const blockedRight = gastonRect.right + GASTON_GAP;
  const overlapsGastonHorizontally = candidateRight > blockedLeft && candidateLeft < blockedRight;

  if (overlapsGastonHorizontally) {
    const sideX = targetWorldX < gastonCenterX
      ? gastonRect.left - guardianWidth / 2 - GASTON_GAP
      : gastonRect.right + guardianWidth / 2 + GASTON_GAP;
    clampedX = Math.min(
      BASE_WIDTH - guardianWidth,
      Math.max(0, sideX - guardianWidth * 0.5)
    );
  }

  const finalCenterX = clampedX + guardianWidth / 2;
  setGuardianFacing(finalCenterX);

  guardian.style.left = `${clampedX}px`;
  guardian.style.top = "auto";
  guardian.style.bottom = "0";
}

function moveGuardianInFrontOf(el) {
  const targetRect = getWorldRect(el);
  const guardianWidth = guardian.offsetWidth;
  const guardianCenter = guardian.offsetLeft + guardianWidth / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;

  const x = guardianCenter < targetCenter
    ? targetRect.left - guardianWidth / 2 - GASTON_GAP
    : targetRect.right + guardianWidth / 2 + GASTON_GAP;
  moveGuardianTo(x);
}

function showSpeechAt(el, text) {
  speechAnchor = el;
  const targetRect = getWorldRect(el);

  speech.textContent = text;
  speech.style.left = `${targetRect.left - 8}px`;
  speech.style.top = `${targetRect.top - 80}px`;
  speech.style.display = "block";
}

function pickupAnillo() {
  hasAnillo = true;
  anilloWorld.style.display = "none";
  const firstEmptySlot = inventorySlots.find((slot) => !slot.querySelector(".inventory-item"));
  if (firstEmptySlot) firstEmptySlot.appendChild(anilloItem);
  anilloItem.style.display = "block";
}

function buzz() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = 130;
  gain.gain.value = 0.06;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.18);

  inventory.classList.remove("buzz");
  void inventory.offsetWidth;
  inventory.classList.add("buzz");

  window.setTimeout(() => {
    inventory.classList.remove("buzz");
    ctx.close();
  }, 260);
}

function isValidDrop(clientX, clientY) {
  const rect = scene.getBoundingClientRect();
  const nx = (clientX - rect.left) / rect.width;
  const ny = (clientY - rect.top) / rect.height;

  return VALID_DROP_ZONES.some(
    (z) => nx >= z.x1 && nx <= z.x2 && ny >= z.y1 && ny <= z.y2
  );
}

gaston.addEventListener("click", () => {
  moveGuardianInFrontOf(gaston);
  showSpeechAt(gaston, "PRUEBA");
});

anilloWorld.addEventListener("click", () => {
  moveGuardianInFrontOf(anilloWorld);
  window.setTimeout(() => {
    pickupAnillo();
  }, 900);
});

anilloItem.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", "anillo");
  event.dataTransfer.effectAllowed = "move";
  const transparent = new Image();
  transparent.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  event.dataTransfer.setDragImage(transparent, 0, 0);
  createDragProxy(anilloItem, event.clientX, event.clientY);
});

anilloItem.addEventListener("dragend", () => {
  removeDragProxy();
});

scene.addEventListener("dragover", (event) => {
  if (!hasAnillo) return;
  event.preventDefault();
  moveDragProxy(event.clientX, event.clientY);
});

scene.addEventListener("drop", (event) => {
  if (!hasAnillo) return;
  event.preventDefault();
  removeDragProxy();

  const { clientX, clientY } = event;
  const validDrop = isValidDrop(clientX, clientY);
  if (!validDrop) {
    buzz();
    return;
  }

  const worldPos = clientToWorld(clientX, clientY);
  moveGuardianTo(worldPos.x);
});

speech.addEventListener("click", () => {
  speech.style.display = "none";
  speechAnchor = null;
});

window.addEventListener("resize", () => {
  layoutScene();
  if (speechAnchor && speech.style.display !== "none") {
    showSpeechAt(speechAnchor, speech.textContent);
  }
});
layoutScene();
