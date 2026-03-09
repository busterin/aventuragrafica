const scene = document.getElementById("scene");
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

function setGuardianFacing(targetX) {
  const guardianRect = guardian.getBoundingClientRect();
  const currentCenterX = guardianRect.left + guardianRect.width / 2;
  guardian.style.transform = targetX >= currentCenterX ? "scaleX(1)" : "scaleX(-1)";
}

function getWalkLineTop(sceneRect, guardianRect) {
  const gastonRect = gaston.getBoundingClientRect();
  const walkLineFeetY = gastonRect.bottom;
  return Math.min(
    sceneRect.height - guardianRect.height,
    Math.max(0, walkLineFeetY - sceneRect.top - guardianRect.height)
  );
}

function moveGuardianTo(targetX) {
  const sceneRect = scene.getBoundingClientRect();
  const guardianRect = guardian.getBoundingClientRect();
  const gastonRect = gaston.getBoundingClientRect();
  const gastonCenterX = gastonRect.left + gastonRect.width / 2;

  setGuardianFacing(targetX);

  let clampedX = Math.min(
    sceneRect.width - guardianRect.width,
    Math.max(0, targetX - sceneRect.left - guardianRect.width * 0.5)
  );
  const clampedY = getWalkLineTop(sceneRect, guardianRect);

  const candidateLeft = clampedX + sceneRect.left;
  const candidateRight = candidateLeft + guardianRect.width;
  const blockedLeft = gastonRect.left - GASTON_GAP;
  const blockedRight = gastonRect.right + GASTON_GAP;
  const overlapsGastonHorizontally = candidateRight > blockedLeft && candidateLeft < blockedRight;

  if (overlapsGastonHorizontally) {
    const sideX = targetX < gastonCenterX
      ? gastonRect.left - guardianRect.width / 2 - GASTON_GAP
      : gastonRect.right + guardianRect.width / 2 + GASTON_GAP;
    clampedX = Math.min(
      sceneRect.width - guardianRect.width,
      Math.max(0, sideX - sceneRect.left - guardianRect.width * 0.5)
    );
  }

  guardian.style.left = `${clampedX}px`;
  guardian.style.top = `${clampedY}px`;
  guardian.style.bottom = "auto";
}

function moveGuardianInFrontOf(el) {
  const targetRect = el.getBoundingClientRect();
  const guardianRect = guardian.getBoundingClientRect();
  const guardianCenter = guardianRect.left + guardianRect.width / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;

  const x = guardianCenter < targetCenter
    ? targetRect.left - guardianRect.width / 2 - GASTON_GAP
    : targetRect.right + guardianRect.width / 2 + GASTON_GAP;
  moveGuardianTo(x);
}

function showSpeechAt(el, text) {
  speechAnchor = el;
  const targetRect = el.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  speech.textContent = text;
  speech.style.left = `${targetRect.left - sceneRect.left - 8}px`;
  speech.style.top = `${targetRect.top - sceneRect.top - 80}px`;
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
});

scene.addEventListener("dragover", (event) => {
  if (!hasAnillo) return;
  event.preventDefault();
});

scene.addEventListener("drop", (event) => {
  if (!hasAnillo) return;
  event.preventDefault();

  const { clientX, clientY } = event;
  moveGuardianTo(clientX);

  if (!isValidDrop(clientX, clientY)) {
    buzz();
  }
});

speech.addEventListener("click", () => {
  speech.style.display = "none";
  speechAnchor = null;
});

window.addEventListener("resize", () => {
  const guardianRect = guardian.getBoundingClientRect();
  moveGuardianTo(guardianRect.left + guardianRect.width / 2);
  if (speechAnchor && speech.style.display !== "none") {
    showSpeechAt(speechAnchor, speech.textContent);
  }
});

window.addEventListener("load", () => {
  const guardianRect = guardian.getBoundingClientRect();
  moveGuardianTo(guardianRect.left + guardianRect.width / 2);
});
