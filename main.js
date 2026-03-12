const scene = document.getElementById("scene");
const sceneViewport = document.getElementById("scene-viewport");
const background = document.getElementById("background");
const guardian = document.getElementById("guardian");
const gaston = document.getElementById("gaston");
const tele = document.getElementById("tele");
const ardillaGuardiana = document.getElementById("ardillaguardiana");
const bici = document.getElementById("bici");
const anilloWorld = document.getElementById("anillo-world");
const anilloItem = document.getElementById("anillo-item");
const nextArrow = document.getElementById("next-arrow");
const prevArrow = document.getElementById("prev-arrow");
const speech = document.getElementById("speech");
const speechText = document.getElementById("speech-text");
const speechOptions = document.getElementById("speech-options");
const speechNextBtn = document.getElementById("speech-next-btn");
const inventory = document.getElementById("inventory");
const inventorySlots = [...document.querySelectorAll(".inventory-slot")];
const itemModal = document.getElementById("item-modal");
const itemModalContent = document.getElementById("item-modal-content");
const itemModalClose = document.getElementById("item-modal-close");
const GASTON_GAP = 12;
const GUARDIAN_IDLE_SRC = "images/guardian.png";
const GUARDIAN_WALK_FRAMES = [
  "images/guardian2.png",
  "images/guardian3.png",
  "images/guardian4.png"
];
const GUARDIAN_WALK_FRAME_MS = 120;
const DEFAULT_SPEECH_NEXT_LABEL = "Continuar";
const TRAVEL_SPEECH_NEXT_LABEL = "Viajar";
const GASTON_DIALOGUE = [
  "¡Hola, guardiana! Muchas gracias por acudir. Hoy es la Competición Financiera, un juego muy famoso en la ciudad de Aurópolis.",
  "El objetivo es recorrer esta zona delimitada de la ciudad en busca de facturas, tickets... que nos irán guiando hasta encontrar una sala oculta, la sala de la caja fuerte.",
  "Debemos ser los primeros en lograr entrar para hacernos con la victoria. ¡Un reto digno de los Guardianes del Tesoro!"
];
const ARDILLA_GUARDIANA_DIALOGUE = {
  prompt: "¿Necesitas información?",
  options: [
    {
      label: "¿Que es una factura?",
      response: "Es el comprobante oficial de que se ha realizado una compra o una venta. Su función principal es servir como prueba legal del intercambio y asegurar que se paguen los impuestos correspondientes."
    },
    {
      label: "¿Que es un ticket?",
      response: "A diferencia de la factura, el ticket es más sencillo: no suele incluir tus datos personales, solo lo que compraste y el precio. Sirve como justificante de pago para cambios o devoluciones rápidas, pero no tiene el mismo peso legal o fiscal que una factura completa."
    }
  ]
};
const BICI_DIALOGUE_TO_FONDO3 = ["¿Quieres viajar al parque?"];
const BICI_DIALOGUE_TO_FONDO2 = ["¿Quieres viajar al distrito comercial?"];
const TELE_DIALOGUE = [
  "Es una terminal de juego de la Competición Financiera. Muestra la silueta de un reloj y pide introducir un número para continuar."
];
const FONDO2_HOTSPOT_DIALOGUE = [
  "La calle está abarrotada, debería asegurarme de que he recopilado todas las pistas antes de irme."
];
const INITIAL_GUARDIAN_LEFT =
  getComputedStyle(document.documentElement).getPropertyValue("--guardian-left").trim() || "0px";
const INITIAL_GUARDIAN_BOTTOM =
  getComputedStyle(document.documentElement).getPropertyValue("--character-bottom").trim() || "0px";
const BICI_LEFT_FONDO2 =
  getComputedStyle(document.documentElement).getPropertyValue("--bici-left-fondo2").trim() || "65%";
const BICI_LEFT_FONDO3 =
  getComputedStyle(document.documentElement).getPropertyValue("--bici-left-fondo3").trim() || "52%";

const VALID_DROP_ZONES = [
  { x1: 0.45, y1: 0.33, x2: 0.58, y2: 0.58 }
];
const FONDO2_HOTSPOT_ZONE = { x1: 0.34, y1: 0.30, x2: 0.66, y2: 0.72 };

let hasAnillo = false;
let speechAnchor = null;
let dragProxy = null;
let pendingSpeechForGaston = false;
let pendingSpeechForArdillaGuardiana = false;
let pendingSpeechForBici = false;
let pendingSpeechForTele = false;
let activeDialogue = null;
let activeDialogueIndex = 0;
let anilloPickupPending = false;
let anilloPickupTimeoutId = null;
let guardianWalkIntervalId = null;
let guardianWalkFrameIndex = 0;
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

addFallbackOnError("background", "fondo no encontrado");
addFallbackOnError("anillo-world", "anillo.png no encontrado");
addFallbackOnError("anillo-item", "anillo.png no encontrado");
addFallbackOnError("ardillaguardiana", "ardillaguardiana.png no encontrado");
addFallbackOnError("bici", "bici.png no encontrado");
addFallbackOnError("tele", "tele.png no encontrado");

function preloadGuardianWalkFrames() {
  for (const src of GUARDIAN_WALK_FRAMES) {
    const img = new Image();
    img.src = src;
  }
}

function setGuardianFrame(src) {
  if (!guardian || guardian.getAttribute("src") === src) return;
  guardian.setAttribute("src", src);
}

function startGuardianWalkAnimation() {
  if (!guardian || guardianWalkIntervalId !== null) return;
  guardianWalkFrameIndex = 0;
  setGuardianFrame(GUARDIAN_WALK_FRAMES[guardianWalkFrameIndex]);
  guardianWalkFrameIndex = (guardianWalkFrameIndex + 1) % GUARDIAN_WALK_FRAMES.length;
  guardianWalkIntervalId = window.setInterval(() => {
    setGuardianFrame(GUARDIAN_WALK_FRAMES[guardianWalkFrameIndex]);
    guardianWalkFrameIndex = (guardianWalkFrameIndex + 1) % GUARDIAN_WALK_FRAMES.length;
  }, GUARDIAN_WALK_FRAME_MS);
}

function stopGuardianWalkAnimation() {
  if (guardianWalkIntervalId !== null) {
    window.clearInterval(guardianWalkIntervalId);
    guardianWalkIntervalId = null;
  }
  guardianWalkFrameIndex = 0;
  setGuardianFrame(GUARDIAN_IDLE_SRC);
}

function snapGuardianToInitialPosition() {
  if (!guardian) return;
  const previousTransition = guardian.style.transition;
  guardian.style.transition = "none";
  guardian.style.left = INITIAL_GUARDIAN_LEFT;
  guardian.style.top = "auto";
  guardian.style.bottom = INITIAL_GUARDIAN_BOTTOM;
  void guardian.offsetWidth;
  guardian.style.transition = previousTransition;
}

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

function faceGuardianToward(el) {
  if (!el) return;
  const guardianRect = getWorldRect(guardian);
  const targetRect = getWorldRect(el);
  const guardianCenter = guardianRect.left + guardianRect.width / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;
  guardian.style.transform = targetCenter >= guardianCenter ? "scaleX(1)" : "scaleX(-1)";
}

function faceArdillaTowardGuardian() {
  if (!ardillaGuardiana || !guardian) return;
  const guardianRect = getWorldRect(guardian);
  const ardillaRect = getWorldRect(ardillaGuardiana);
  const guardianCenter = guardianRect.left + guardianRect.width / 2;
  const ardillaCenter = ardillaRect.left + ardillaRect.width / 2;
  const scale = guardianCenter < ardillaCenter ? -1 : 1;
  ardillaGuardiana.style.transform = `translateX(-330%) scaleX(${scale})`;
}

function moveGuardianTo(targetWorldX, avoidGaston = true) {
  const guardianWidth = guardian.offsetWidth;
  const gastonRect = getWorldRect(gaston);
  const gastonCenterX = gastonRect.left + gastonRect.width / 2;
  const currentLeft = guardian.offsetLeft;

  let clampedX = Math.min(
    BASE_WIDTH - guardianWidth,
    Math.max(0, targetWorldX - guardianWidth * 0.5)
  );

  if (avoidGaston) {
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
  }

  const finalCenterX = clampedX + guardianWidth / 2;
  setGuardianFacing(finalCenterX);
  if (Math.abs(clampedX - currentLeft) > 1) {
    startGuardianWalkAnimation();
  } else {
    stopGuardianWalkAnimation();
  }

  guardian.style.left = `${clampedX}px`;
  guardian.style.top = "auto";
  guardian.style.bottom = INITIAL_GUARDIAN_BOTTOM;
}

function moveGuardianInFrontOf(el, avoidGaston = true) {
  const targetRect = getWorldRect(el);
  const guardianWidth = guardian.offsetWidth;
  const guardianCenter = guardian.offsetLeft + guardianWidth / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;

  const x = guardianCenter < targetCenter
    ? targetRect.left - guardianWidth / 2 - GASTON_GAP
    : targetRect.right + guardianWidth / 2 + GASTON_GAP;
  moveGuardianTo(x, avoidGaston);
}

function isGuardianBeside(el) {
  const guardianRect = getWorldRect(guardian);
  const targetRect = getWorldRect(el);
  const leftDistance = Math.abs(targetRect.left - guardianRect.right);
  const rightDistance = Math.abs(guardianRect.left - targetRect.right);
  const closeEnough = leftDistance <= GASTON_GAP + 8 || rightDistance <= GASTON_GAP + 8;
  const verticalOverlap = guardianRect.bottom > targetRect.top && guardianRect.top < targetRect.bottom;
  return closeEnough && verticalOverlap;
}

function positionSpeechAt(el) {
  const targetRect = getWorldRect(el);
  const extraTopOffset = el && el.id === "ardillaguardiana"
    ? 140
    : el && el.id === "gaston"
      ? 80
      : 0;
  speech.style.left = `${targetRect.left + 50}px`;
  speech.style.top = `${targetRect.top - 150 - extraTopOffset}px`;
}

function closeSpeech() {
  speech.style.display = "none";
  speechAnchor = null;
  activeDialogue = null;
  activeDialogueIndex = 0;
  if (speechOptions) {
    speechOptions.innerHTML = "";
    speechOptions.style.display = "none";
  }
  if (speechNextBtn) {
    speechNextBtn.style.display = "block";
    speechNextBtn.textContent = DEFAULT_SPEECH_NEXT_LABEL;
  }
}

function renderActiveDialogue() {
  if (!activeDialogue) return;
  speechAnchor = activeDialogue.anchor;
  if (activeDialogue.type === "choice") {
    speechText.textContent = activeDialogue.prompt;
    if (speechOptions) {
      speechOptions.innerHTML = "";
      speechOptions.style.display = "block";
      for (const option of activeDialogue.options) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "speech-option-btn";
        btn.textContent = option.label;
        btn.addEventListener("click", () => {
          startDialogue(activeDialogue.anchor, [option.response]);
        });
        speechOptions.appendChild(btn);
      }
    }
    if (speechNextBtn) {
      speechNextBtn.style.display = "none";
    }
  } else {
    speechText.textContent = activeDialogue.lines[activeDialogueIndex] || "";
    if (speechOptions) {
      speechOptions.innerHTML = "";
      speechOptions.style.display = "none";
    }
    if (speechNextBtn) {
      speechNextBtn.style.display = "block";
      speechNextBtn.textContent = activeDialogue.type === "travel"
        ? TRAVEL_SPEECH_NEXT_LABEL
        : DEFAULT_SPEECH_NEXT_LABEL;
    }
  }
  positionSpeechAt(activeDialogue.anchor);
  speech.style.display = "block";
}

function startDialogue(anchor, lines) {
  activeDialogue = { type: "linear", anchor, lines };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startTravelDialogue(anchor, lines, onConfirm) {
  activeDialogue = { type: "travel", anchor, lines, onConfirm };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startChoiceDialogue(anchor, prompt, options) {
  activeDialogue = { type: "choice", anchor, prompt, options };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function advanceActiveDialogue() {
  if (speech.style.display === "none" || !activeDialogue) return;
  if (activeDialogue.type === "travel") {
    if (typeof activeDialogue.onConfirm === "function") {
      activeDialogue.onConfirm();
    } else {
      closeSpeech();
    }
    return;
  }
  if (activeDialogue.type !== "linear") return;
  if (activeDialogueIndex >= activeDialogue.lines.length - 1) {
    closeSpeech();
    return;
  }
  activeDialogueIndex += 1;
  renderActiveDialogue();
}

function isInFondo2() {
  return background && background.getAttribute("src") === "images/fondo2.png";
}

function isInFondo3() {
  return background && background.getAttribute("src") === "images/fondo3.png";
}

function startBiciTravelDialogue() {
  if (isInFondo3()) {
    startTravelDialogue(guardian, BICI_DIALOGUE_TO_FONDO2, goToFondo2);
  } else {
    startTravelDialogue(guardian, BICI_DIALOGUE_TO_FONDO3, goToFondo3);
  }
}

function setBiciLeft(leftValue) {
  if (!bici) return;
  bici.style.left = leftValue;
}

function cancelPendingAnilloPickup() {
  if (anilloPickupTimeoutId !== null) {
    window.clearTimeout(anilloPickupTimeoutId);
    anilloPickupTimeoutId = null;
  }
  anilloPickupPending = false;
  if (!hasAnillo) {
    anilloWorld.style.pointerEvents = "auto";
  }
}

function pickupAnillo() {
  if (hasAnillo) return;

  anilloPickupPending = false;
  anilloPickupTimeoutId = null;
  hasAnillo = true;
  anilloWorld.style.display = "none";
  anilloWorld.style.pointerEvents = "none";

  const firstSlot = inventorySlots[0];
  if (firstSlot) {
    firstSlot.appendChild(anilloItem);
  }
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

function isClickInsideFondo2Hotspot(clientX, clientY) {
  const rect = scene.getBoundingClientRect();
  const nx = (clientX - rect.left) / rect.width;
  const ny = (clientY - rect.top) / rect.height;
  const z = FONDO2_HOTSPOT_ZONE;
  return nx >= z.x1 && nx <= z.x2 && ny >= z.y1 && ny <= z.y2;
}

function openItemModal() {
  itemModal.classList.add("open");
  itemModal.setAttribute("aria-hidden", "false");
}

function closeItemModal() {
  itemModal.classList.remove("open");
  itemModal.setAttribute("aria-hidden", "true");
}

function goToFondo2() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  pendingSpeechForGaston = false;
  pendingSpeechForArdillaGuardiana = false;
  pendingSpeechForBici = false;
  pendingSpeechForTele = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo2.png";
  background.alt = "Fondo 2";

  gaston.style.display = "none";
  if (tele) {
    tele.style.display = "none";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "none";
  }
  if (bici) {
    bici.style.display = "block";
    setBiciLeft(BICI_LEFT_FONDO2);
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "none";
  nextArrow.style.display = "none";
  prevArrow.style.display = "block";
}

function goToFondo3() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  pendingSpeechForGaston = false;
  pendingSpeechForArdillaGuardiana = false;
  pendingSpeechForBici = false;
  pendingSpeechForTele = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo3.png";
  background.alt = "Fondo 3";

  gaston.style.display = "none";
  if (tele) {
    tele.style.display = "none";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "none";
  }
  if (bici) {
    bici.style.display = "block";
    setBiciLeft(BICI_LEFT_FONDO3);
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "none";
  nextArrow.style.display = "none";
  prevArrow.style.display = "none";
}

function goToFondo1() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  pendingSpeechForGaston = false;
  pendingSpeechForArdillaGuardiana = false;
  pendingSpeechForBici = false;
  pendingSpeechForTele = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo1.png";
  background.alt = "Fondo 1";

  gaston.style.display = "block";
  if (tele) {
    tele.style.display = "block";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "block";
  }
  if (bici) {
    bici.style.display = "none";
    setBiciLeft(BICI_LEFT_FONDO2);
  }
  anilloWorld.style.display = hasAnillo ? "none" : "block";
  anilloWorld.style.pointerEvents = hasAnillo ? "none" : "auto";
  inventory.style.display = "block";
  nextArrow.style.display = "block";
  prevArrow.style.display = "none";
}

if (gaston) {
  gaston.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForGaston = true;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    moveGuardianInFrontOf(gaston);
    if (isGuardianBeside(gaston)) {
      faceGuardianToward(gaston);
      startDialogue(gaston, GASTON_DIALOGUE);
      pendingSpeechForGaston = false;
    }
  });
}

if (ardillaGuardiana) {
  ardillaGuardiana.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForArdillaGuardiana = true;
    pendingSpeechForGaston = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    moveGuardianInFrontOf(ardillaGuardiana, false);
    if (isGuardianBeside(ardillaGuardiana)) {
      faceGuardianToward(ardillaGuardiana);
      faceArdillaTowardGuardian();
      startChoiceDialogue(
        ardillaGuardiana,
        ARDILLA_GUARDIANA_DIALOGUE.prompt,
        ARDILLA_GUARDIANA_DIALOGUE.options
      );
      pendingSpeechForArdillaGuardiana = false;
    }
  });
}

if (bici) {
  bici.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForBici = true;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForTele = false;
    moveGuardianInFrontOf(bici, false);
    if (isGuardianBeside(bici)) {
      faceGuardianToward(bici);
      startBiciTravelDialogue();
      pendingSpeechForBici = false;
    }
  });
}

if (tele) {
  tele.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForTele = true;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    moveGuardianInFrontOf(tele, false);
    if (isGuardianBeside(tele)) {
      faceGuardianToward(tele);
      startDialogue(guardian, TELE_DIALOGUE);
      pendingSpeechForTele = false;
    }
  });
}

if (nextArrow) {
  nextArrow.addEventListener("click", () => {
    goToFondo2();
  });
}

if (prevArrow) {
  prevArrow.addEventListener("click", () => {
    goToFondo1();
  });
}

if (anilloWorld) {
  anilloWorld.addEventListener("click", () => {
    if (hasAnillo || anilloPickupPending) return;

    anilloPickupPending = true;
    anilloWorld.style.pointerEvents = "none";
    moveGuardianInFrontOf(anilloWorld);
    anilloPickupTimeoutId = window.setTimeout(() => {
      pickupAnillo();
    }, 900);
  });
}

if (anilloItem) {
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

  anilloItem.addEventListener("click", () => {
    if (!hasAnillo) return;
    openItemModal();
  });
}

if (scene) {
  scene.addEventListener("click", (event) => {
    if (speech && speech.contains(event.target)) return;
    const isFondo2 = isInFondo2();
    if (!isFondo2) return;
    if (!isClickInsideFondo2Hotspot(event.clientX, event.clientY)) return;
    closeSpeech();
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForTele = false;
    startDialogue(guardian, FONDO2_HOTSPOT_DIALOGUE);
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
}

if (speechNextBtn) {
  speechNextBtn.addEventListener("click", () => {
    advanceActiveDialogue();
  });
}

if (guardian) {
  guardian.addEventListener("transitionend", (event) => {
    if (event.propertyName !== "left") return;
    stopGuardianWalkAnimation();
    if (pendingSpeechForGaston && isGuardianBeside(gaston)) {
      faceGuardianToward(gaston);
      startDialogue(gaston, GASTON_DIALOGUE);
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
    } else if (
      pendingSpeechForArdillaGuardiana
      && ardillaGuardiana
      && isGuardianBeside(ardillaGuardiana)
    ) {
      faceGuardianToward(ardillaGuardiana);
      faceArdillaTowardGuardian();
      startChoiceDialogue(
        ardillaGuardiana,
        ARDILLA_GUARDIANA_DIALOGUE.prompt,
        ARDILLA_GUARDIANA_DIALOGUE.options
      );
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForGaston = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
    } else if (
      pendingSpeechForBici
      && bici
      && isGuardianBeside(bici)
    ) {
      faceGuardianToward(bici);
      startBiciTravelDialogue();
      pendingSpeechForBici = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForTele = false;
    } else if (
      pendingSpeechForTele
      && tele
      && isGuardianBeside(tele)
    ) {
      faceGuardianToward(tele);
      startDialogue(guardian, TELE_DIALOGUE);
      pendingSpeechForTele = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
    }
  });
}

if (guardian) {
  guardian.addEventListener("transitioncancel", (event) => {
    if (event.propertyName !== "left") return;
    stopGuardianWalkAnimation();
  });
}

if (itemModalClose) {
  itemModalClose.addEventListener("click", () => {
    closeItemModal();
  });
}

if (itemModal) {
  itemModal.addEventListener("click", (event) => {
    if (event.target === itemModal) {
      closeItemModal();
    }
  });
}

if (itemModalContent) {
  itemModalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeItemModal();
  }
});

window.addEventListener("pointerdown", (event) => {
  if (speech.style.display === "none") return;
  if (speech.contains(event.target)) return;
  closeSpeech();
});

window.addEventListener("resize", () => {
  layoutScene();
  if (speechAnchor && speech.style.display !== "none") {
    positionSpeechAt(speechAnchor);
  }
});
if (scene && sceneViewport) {
  preloadGuardianWalkFrames();
  stopGuardianWalkAnimation();
  layoutScene();
}
