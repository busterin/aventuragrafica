const scene = document.getElementById("scene");
const risko = document.getElementById("risko");
const gaston = document.getElementById("gaston");
const bateWorld = document.getElementById("bate-world");
const bateItem = document.getElementById("bate-item");
const speech = document.getElementById("speech");
const inventory = document.getElementById("inventory");
const inventorySlots = [...document.querySelectorAll(".inventory-slot")];

const VALID_DROP_ZONES = [
  { x1: 0.45, y1: 0.33, x2: 0.58, y2: 0.58 }
];

let hasBate = false;

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
addFallbackOnError("bate-world", "bate.png no encontrado");
addFallbackOnError("bate-item", "bate.png no encontrado");

function moveRiskoTo(targetX, targetY) {
  const sceneRect = scene.getBoundingClientRect();
  const riskoRect = risko.getBoundingClientRect();
  const gastonRect = gaston.getBoundingClientRect();
  const currentCenterX = riskoRect.left + riskoRect.width / 2;
  const gap = 12;

  // Place risko's feet at the target point to keep interactions grounded.
  let clampedX = Math.min(
    sceneRect.width - riskoRect.width,
    Math.max(0, targetX - sceneRect.left - riskoRect.width * 0.5)
  );
  let clampedY = Math.min(
    sceneRect.height - riskoRect.height,
    Math.max(0, targetY - sceneRect.top - riskoRect.height)
  );

  const candidate = {
    left: clampedX + sceneRect.left,
    right: clampedX + sceneRect.left + riskoRect.width,
    top: clampedY + sceneRect.top,
    bottom: clampedY + sceneRect.top + riskoRect.height
  };

  const overlapsGaston = !(
    candidate.right <= gastonRect.left ||
    candidate.left >= gastonRect.right ||
    candidate.bottom <= gastonRect.top ||
    candidate.top >= gastonRect.bottom
  );

  if (overlapsGaston) {
    const goLeft = currentCenterX < gastonRect.left + gastonRect.width / 2;
    const sideX = goLeft
      ? gastonRect.left - riskoRect.width / 2 - gap
      : gastonRect.right + riskoRect.width / 2 + gap;
    const feetY = gastonRect.bottom;

    clampedX = Math.min(
      sceneRect.width - riskoRect.width,
      Math.max(0, sideX - sceneRect.left - riskoRect.width * 0.5)
    );
    clampedY = Math.min(
      sceneRect.height - riskoRect.height,
      Math.max(0, feetY - sceneRect.top - riskoRect.height)
    );
  }

  risko.style.left = `${clampedX}px`;
  risko.style.top = `${clampedY}px`;
  risko.style.bottom = "auto";
}

function moveRiskoInFrontOf(el) {
  const targetRect = el.getBoundingClientRect();
  const riskoRect = risko.getBoundingClientRect();
  const gap = 12;
  const riskoCenter = riskoRect.left + riskoRect.width / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;

  const x = riskoCenter < targetCenter
    ? targetRect.left - riskoRect.width / 2 - gap
    : targetRect.right + riskoRect.width / 2 + gap;
  const y = targetRect.bottom;
  moveRiskoTo(x, y);
}

function centerOf(el) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function showSpeechAt(el, text) {
  const targetRect = el.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  speech.textContent = text;
  speech.style.left = `${targetRect.left - sceneRect.left - 8}px`;
  speech.style.top = `${targetRect.top - sceneRect.top - 80}px`;
  speech.style.display = "block";

  window.clearTimeout(showSpeechAt._timer);
  showSpeechAt._timer = window.setTimeout(() => {
    speech.style.display = "none";
  }, 2200);
}

function pickupBate() {
  hasBate = true;
  bateWorld.style.display = "none";
  const firstEmptySlot = inventorySlots.find((slot) => !slot.querySelector(".inventory-item"));
  if (firstEmptySlot) firstEmptySlot.appendChild(bateItem);
  bateItem.style.display = "block";
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
  moveRiskoInFrontOf(gaston);
  showSpeechAt(gaston, "PRUEBA");
});

bateWorld.addEventListener("click", () => {
  moveRiskoInFrontOf(bateWorld);
  window.setTimeout(() => {
    pickupBate();
  }, 900);
});

bateItem.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", "bate");
  event.dataTransfer.effectAllowed = "move";
});

scene.addEventListener("dragover", (event) => {
  if (!hasBate) return;
  event.preventDefault();
});

scene.addEventListener("drop", (event) => {
  if (!hasBate) return;
  event.preventDefault();

  const { clientX, clientY } = event;
  moveRiskoTo(clientX, clientY);

  if (!isValidDrop(clientX, clientY)) {
    buzz();
  }
});
