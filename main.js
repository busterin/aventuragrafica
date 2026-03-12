const scene = document.getElementById("scene");
const sceneViewport = document.getElementById("scene-viewport");
const background = document.getElementById("background");
const guardian = document.getElementById("guardian");
const gaston = document.getElementById("gaston");
const tele = document.getElementById("tele");
const ardillaGuardiana = document.getElementById("ardillaguardiana");
const bici = document.getElementById("bici");
const vendedora = document.getElementById("vendedora");
const brebaje = document.getElementById("brebaje");
const fondo2HotspotLeft = document.getElementById("fondo2-hotspot-left");
const fondo3HotspotLeft = document.getElementById("fondo3-hotspot-left");
const fondo3Hotspot = document.getElementById("fondo3-hotspot");
const fondo4HotspotLeftBottom = document.getElementById("fondo4-hotspot-left-bottom");
const fondo5HotspotLeft = document.getElementById("fondo5-hotspot-left");
const fondo5HotspotCenter = document.getElementById("fondo5-hotspot-center");
const anilloWorld = document.getElementById("anillo-world");
const anilloItem = document.getElementById("anillo-item");
const facturaItem = document.getElementById("factura-item");
const llaveItem = document.getElementById("llave-item");
const brebajeItem = document.getElementById("brebaje-item");
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
const itemModalImage = document.getElementById("item-modal-image");
const itemModalText = document.getElementById("item-modal-text");
const GASTON_GAP = 12;
const GUARDIAN_IDLE_SRC = "images/guardian.png";
const GUARDIAN_WALK_FRAMES = [
  "images/guardian2.png",
  "images/guardian3.png",
  "images/guardian4.png"
];
const GUARDIAN_WALK_FRAME_MS = 120;
const GUARDIAN_MOVE_DURATION_LONG_MS = 1400;
const GUARDIAN_MOVE_DURATION_SHORT_MS = 950;
const GUARDIAN_SHORT_MOVE_DISTANCE_PX = 220;
const DEFAULT_SPEECH_NEXT_LABEL = "Continuar";
const TRAVEL_SPEECH_NEXT_LABEL = "Viajar";
const ENTER_SPEECH_NEXT_LABEL = "Entrar";
const TERMINAL_SPEECH_NEXT_LABEL = "Introducir número";
const GASTON_DIALOGUE = [
  "¡Hola, guardiana! Muchas gracias por acudir. Hoy es la Competición Financiera, un juego muy famoso en la ciudad de Aurópolis.",
  "El objetivo es recorrer esta zona delimitada de la ciudad donde encontrarás distintos objetos como una factura o una llave, que os irán guiando hasta encontrar una sala oculta, la sala del tesoro.",
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
  "Es una terminal de juego de la Competición Financiera.\nMuestra la silueta de un reloj y pide introducir un número para continuar."
];
const TELE_CORRECT_CODE = "1031";
const TELE_SUCCESS_DIALOGUE = ["Se ha abierto un compartimento donde se ocultaba una llave"];
const TELE_FAIL_DIALOGUE = ["No ha pasado nada."];
const TELE_INPUT_BUBBLE_OFFSET = 75;
const TELE_RESULT_BUBBLE_OFFSET = -60;
const FONDO2_HOTSPOT_DIALOGUE = [
  "La calle está abarrotada, debería asegurarme de que he recopilado todas las pistas antes de irme."
];
const VENDEDORA_DIALOGUE = [
  "¡Hola!",
  "Puede que tenga una de esas facturas que buscas. Podría dartela a cambio de algo de valor."
];
const VENDEDORA_PAYMENT_DIALOGUE = [
  "¡Me encanta! Esto servirá como pago por la factura. Ya estás más cerca de completar la Competición."
];
const FONDO3_HOTSPOT_DIALOGUE = [
  "El reloj parece estar parado a proposito. La hora que marca son las diez horas y treinta y un minutos."
];
const FONDO4_HOTSPOT_DIALOGUE = [
  "Parece que está cerrada con llave. ¿Será esta la Sala del Tesoro?"
];
const FONDO4_UNLOCK_DIALOGUE = ["La puerta se ha abierto."];
const FONDO5_HOTSPOT_DIALOGUE = [
  "En la estantería hay todo tipo de frascos, pociones y cachivaches pero hay un hueco vacío muy sospechoso..."
];
const FONDO5_BREBAJE_DIALOGUE = ["*Clik*"];
const FONDO5_CENTER_HOTSPOT_DIALOGUE = [
  "El cofre se ha abierto un poco pero aún no del todo. Sin embargo se ha iluminado una placa que dice \"La luz nos muestra lo que antes se ocultaba\""
];
const ANILLO_MODAL = {
  imageSrc: "images/anillo.png",
  imageAlt: "Anillo ampliado",
  textHtml: "Un anillo de origen desconocido.<br>Parece ser de gran valor."
};
const FACTURA_MODAL = {
  imageSrc: "images/factura.png",
  imageAlt: "Factura ampliada",
  textHtml: "Una de las facturas necesarias para completar la Competición Financiera.<br>Es un recibo de la luz."
};
const FACTURA_MODAL_FONDO5 = {
  imageSrc: "images/factura.png",
  imageAlt: "Factura ampliada",
  textHtml: "Con la luz de la sala del tesoro, podemos leer algo oculto en la factura: ¿?"
};
const LLAVE_MODAL = {
  imageSrc: "images/llave.png",
  imageAlt: "Llave ampliada",
  textHtml: "¿Qué abrira esta llave?"
};
const BREBAJE_MODAL = {
  imageSrc: "images/brebaje.png",
  imageAlt: "Brebaje ampliado",
  textHtml: "Un brebaje natural creado con flores silvestres."
};
const ANILLO_OBTAINED_MODAL = {
  imageSrc: "images/anillo.png",
  imageAlt: "Anillo obtenido",
  textHtml: "¡Has obtenido un anillo!"
};
const FACTURA_OBTAINED_MODAL = {
  imageSrc: "images/factura.png",
  imageAlt: "Factura obtenida",
  textHtml: "¡Has obtenido una factura!"
};
const LLAVE_OBTAINED_MODAL = {
  imageSrc: "images/llave.png",
  imageAlt: "Llave obtenida",
  textHtml: "¡Has obtenido una llave!"
};
const BREBAJE_OBTAINED_MODAL = {
  imageSrc: "images/brebaje.png",
  imageAlt: "Brebaje obtenido",
  textHtml: "¡Has obtenido un brebaje!"
};
const INITIAL_GUARDIAN_LEFT =
  getComputedStyle(document.documentElement).getPropertyValue("--guardian-left").trim() || "0px";
const INITIAL_GUARDIAN_BOTTOM =
  getComputedStyle(document.documentElement).getPropertyValue("--character-bottom").trim() || "0px";
const BICI_LEFT_FONDO2 =
  getComputedStyle(document.documentElement).getPropertyValue("--bici-left-fondo2").trim() || "65%";
const BICI_LEFT_FONDO3 =
  getComputedStyle(document.documentElement).getPropertyValue("--bici-left-fondo3").trim() || "52%";
const FONDO4_GUARDIAN_LEFT =
  getComputedStyle(document.documentElement).getPropertyValue("--guardian-left-fondo4").trim() || "78%";
const FONDO4_GUARDIAN_LEFT_FROM_FONDO5 =
  getComputedStyle(document.documentElement).getPropertyValue("--guardian-left-fondo4-from-fondo5").trim() || "29%";
const FONDO5_GUARDIAN_LEFT =
  getComputedStyle(document.documentElement).getPropertyValue("--guardian-left-fondo5").trim() || "74%";

const VALID_DROP_ZONES = [
  { x1: 0.45, y1: 0.33, x2: 0.58, y2: 0.58 }
];
const FONDO2_HOTSPOT_ZONE = { x1: 0.34, y1: 0.30, x2: 0.66, y2: 0.72 };

let hasAnillo = false;
let hasFactura = false;
let hasLlave = false;
let hasBrebaje = false;
let hasCompletedVendedoraTrade = false;
let hasUnlockedFondo4Door = false;
let hasActivatedFondo5CenterHotspot = false;
let pendingVendedoraDismissAfterDialogue = false;
let speechAnchor = null;
let dragProxy = null;
let pendingSpeechForGaston = false;
let pendingSpeechForArdillaGuardiana = false;
let pendingSpeechForBici = false;
let pendingSpeechForTele = false;
let pendingSpeechForFondo4Hotspot = false;
let pendingSpeechForFondo5Hotspot = false;
let pendingSpeechForFondo5CenterHotspot = false;
let activeDialogue = null;
let activeDialogueIndex = 0;
let anilloPickupPending = false;
let anilloPickupTimeoutId = null;
let draggedInventoryItem = null;
let guardianWalkIntervalId = null;
let guardianWalkFrameIndex = 0;
let draggedSourceElement = null;
const TRANSPARENT_DRAG_IMAGE = new Image();
TRANSPARENT_DRAG_IMAGE.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const BASE_WIDTH = 1328;
const BASE_HEIGHT = 800;
const INVENTORY_DRAGGABLE_IDS = new Set([
  "anillo-item",
  "factura-item",
  "llave-item",
  "brebaje-item"
]);
const SCENE_BACKGROUND_CLASSES = [
  "in-fondo1",
  "in-fondo2",
  "in-fondo3",
  "in-fondo4",
  "in-fondo5"
];

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

function setSceneBackgroundClass(className) {
  if (!scene) return;
  scene.classList.remove(...SCENE_BACKGROUND_CLASSES);
  if (className) {
    scene.classList.add(className);
  }
}

function updateFondo5CenterHotspotState() {
  if (!fondo5HotspotCenter) return;
  const activeInFondo5 = isInFondo5();
  fondo5HotspotCenter.style.display = activeInFondo5 ? "block" : "none";
  fondo5HotspotCenter.style.pointerEvents = activeInFondo5 && hasActivatedFondo5CenterHotspot ? "auto" : "none";
}

addFallbackOnError("background", "fondo no encontrado");
addFallbackOnError("anillo-world", "anillo.png no encontrado");
addFallbackOnError("anillo-item", "anillo.png no encontrado");
addFallbackOnError("factura-item", "factura.png no encontrado");
addFallbackOnError("llave-item", "llave.png no encontrado");
addFallbackOnError("brebaje-item", "brebaje.png no encontrado");
addFallbackOnError("ardillaguardiana", "ardillaguardiana.png no encontrado");
addFallbackOnError("bici", "bici.png no encontrado");
addFallbackOnError("tele", "tele.png no encontrado");
addFallbackOnError("vendedora", "vendedora.png no encontrado");
addFallbackOnError("brebaje", "brebaje.png no encontrado");

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
  snapGuardianToPosition(INITIAL_GUARDIAN_LEFT, INITIAL_GUARDIAN_BOTTOM);
}

function snapGuardianToPosition(left, bottom = INITIAL_GUARDIAN_BOTTOM) {
  if (!guardian) return;
  const previousTransition = guardian.style.transition;
  guardian.style.transition = "none";
  guardian.style.left = left;
  guardian.style.top = "auto";
  guardian.style.bottom = bottom;
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
  dragProxy.style.width = "72px";
  dragProxy.style.height = "72px";
  dragProxy.style.objectFit = "contain";
  dragProxy.style.transform = "translate(-50%, -50%)";
  dragProxy.style.pointerEvents = "none";
  dragProxy.style.zIndex = "9999";
  dragProxy.style.opacity = "0.65";
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

function isItemOwned(itemType) {
  if (itemType === "anillo") return hasAnillo;
  if (itemType === "factura") return hasFactura;
  if (itemType === "llave") return hasLlave;
  if (itemType === "brebaje") return hasBrebaje;
  return false;
}

function setupInventoryItemDrag(itemEl, itemType) {
  if (!itemEl) return;
  itemEl.addEventListener("dragstart", (event) => {
    if (!isItemOwned(itemType)) {
      event.preventDefault();
      return;
    }
    draggedSourceElement = itemEl;
    draggedInventoryItem = itemType;
    event.dataTransfer.setData("text/plain", itemType);
    event.dataTransfer.effectAllowed = "move";
    try {
      event.dataTransfer.setDragImage(TRANSPARENT_DRAG_IMAGE, 0, 0);
    } catch (error) {
      // Fallback: if browser blocks custom drag image, keep native behavior.
    }
    itemEl.style.opacity = "0.25";
    createDragProxy(itemEl, event.clientX, event.clientY);
  });

  itemEl.addEventListener("dragend", () => {
    draggedInventoryItem = null;
    if (draggedSourceElement) {
      draggedSourceElement.style.opacity = "";
      draggedSourceElement = null;
    }
    removeDragProxy();
  });
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
  const deltaLeft = clampedX - currentLeft;
  const moveDistance = Math.abs(deltaLeft);
  const moveDurationMs = moveDistance <= GUARDIAN_SHORT_MOVE_DISTANCE_PX
    ? GUARDIAN_MOVE_DURATION_SHORT_MS
    : GUARDIAN_MOVE_DURATION_LONG_MS;
  guardian.style.transition = `left ${moveDurationMs}ms linear, transform 0.12s linear`;
  if (Math.abs(deltaLeft) > 0.5) {
    guardian.style.transform = deltaLeft > 0 ? "scaleX(1)" : "scaleX(-1)";
  } else {
    setGuardianFacing(finalCenterX);
  }
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
  const dialogueExtraTop = activeDialogue && Number.isFinite(activeDialogue.speechExtraTop)
    ? activeDialogue.speechExtraTop
    : 0;
  const extraTopOffset = el && el.id === "ardillaguardiana"
    ? 140
    : el && el.id === "gaston"
      ? 80
      : 0;
  speech.style.left = `${targetRect.left + 50}px`;
  speech.style.top = `${targetRect.top - 150 - extraTopOffset - dialogueExtraTop}px`;
}

function positionSpeechCenter() {
  const centerX = BASE_WIDTH / 2;
  const centerY = BASE_HEIGHT / 2;
  speech.style.left = `${centerX - 150}px`;
  speech.style.top = `${centerY - 110}px`;
}

function closeSpeech() {
  speech.style.display = "none";
  speech.classList.remove("speech-centered");
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
  speechAnchor = activeDialogue.anchor || null;
  if (activeDialogue.type === "choice") {
    speech.classList.remove("speech-centered");
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
  } else if (activeDialogue.type === "terminal") {
    speech.classList.remove("speech-centered");
    speechText.textContent = activeDialogue.lines[activeDialogueIndex] || "";
    if (speechOptions) {
      speechOptions.innerHTML = "";
      speechOptions.style.display = "block";
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "numeric";
      input.autocomplete = "off";
      input.placeholder = "Introduce un número";
      input.className = "speech-terminal-input";
      input.id = "speech-terminal-input";
      speechOptions.appendChild(input);
      window.setTimeout(() => {
        input.focus();
      }, 0);
    }
    if (speechNextBtn) {
      speechNextBtn.style.display = "block";
      speechNextBtn.textContent = TERMINAL_SPEECH_NEXT_LABEL;
    }
  } else if (activeDialogue.type === "centered") {
    speech.classList.add("speech-centered");
    speechText.textContent = activeDialogue.lines[activeDialogueIndex] || "";
    if (speechOptions) {
      speechOptions.innerHTML = "";
      speechOptions.style.display = "none";
    }
    if (speechNextBtn) {
      speechNextBtn.style.display = "none";
    }
  } else {
    speech.classList.remove("speech-centered");
    speechText.textContent = activeDialogue.lines[activeDialogueIndex] || "";
    if (speechOptions) {
      speechOptions.innerHTML = "";
      speechOptions.style.display = "none";
    }
    if (speechNextBtn) {
      speechNextBtn.style.display = "block";
      if (activeDialogue.type === "travel") {
        speechNextBtn.textContent = activeDialogue.nextLabel || TRAVEL_SPEECH_NEXT_LABEL;
      } else {
        speechNextBtn.textContent = DEFAULT_SPEECH_NEXT_LABEL;
      }
    }
  }
  if (activeDialogue.type === "centered") {
    positionSpeechCenter();
  } else {
    positionSpeechAt(activeDialogue.anchor);
  }
  speech.style.display = "block";
}

function startDialogue(anchor, lines, speechExtraTop = 0) {
  activeDialogue = { type: "linear", anchor, lines, speechExtraTop };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startTerminalDialogue(anchor, lines, expectedCode, speechExtraTop = 0) {
  activeDialogue = { type: "terminal", anchor, lines, expectedCode, speechExtraTop };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startTravelDialogue(anchor, lines, onConfirm, nextLabel = TRAVEL_SPEECH_NEXT_LABEL) {
  activeDialogue = { type: "travel", anchor, lines, onConfirm, nextLabel };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startChoiceDialogue(anchor, prompt, options) {
  activeDialogue = { type: "choice", anchor, prompt, options };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function startCenteredDialogue(lines) {
  activeDialogue = { type: "centered", lines };
  activeDialogueIndex = 0;
  renderActiveDialogue();
}

function completeVendedoraTrade() {
  hasCompletedVendedoraTrade = true;
  pendingVendedoraDismissAfterDialogue = false;
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = "none";
    fondo2HotspotLeft.style.pointerEvents = "none";
  }
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
  if (activeDialogue.type === "terminal") {
    const input = document.getElementById("speech-terminal-input");
    const value = input ? input.value.trim() : "";
    if (value === activeDialogue.expectedCode) {
      grantLlaveFromTerminal();
      startDialogue(activeDialogue.anchor, TELE_SUCCESS_DIALOGUE, TELE_RESULT_BUBBLE_OFFSET);
    } else {
      startDialogue(activeDialogue.anchor, TELE_FAIL_DIALOGUE, TELE_RESULT_BUBBLE_OFFSET);
    }
    return;
  }
  if (activeDialogue.type !== "linear" && activeDialogue.type !== "centered") return;
  if (activeDialogueIndex >= activeDialogue.lines.length - 1) {
    if (pendingVendedoraDismissAfterDialogue && activeDialogue.anchor === vendedora) {
      completeVendedoraTrade();
    }
    closeSpeech();
    return;
  }
  activeDialogueIndex += 1;
  renderActiveDialogue();
}

function isInFondo2() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo2.png");
}

function isInFondo3() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo3.png");
}

function isInFondo4() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo4.png");
}

function isInFondo5() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo5.png");
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
  openItemModal(ANILLO_OBTAINED_MODAL);
}

function grantLlaveFromTerminal() {
  if (hasLlave || !llaveItem) return;
  hasLlave = true;
  const secondSlot = inventorySlots[1];
  if (secondSlot) {
    secondSlot.appendChild(llaveItem);
  }
  llaveItem.style.display = "block";
  openItemModal(LLAVE_OBTAINED_MODAL);
}

function pickupBrebaje() {
  if (hasBrebaje || !brebajeItem) return;
  hasBrebaje = true;
  if (brebaje) {
    brebaje.style.display = "none";
    brebaje.style.pointerEvents = "none";
  }
  const thirdSlot = inventorySlots[2];
  if (thirdSlot) {
    thirdSlot.appendChild(brebajeItem);
  }
  brebajeItem.style.display = "block";
  openItemModal(BREBAJE_OBTAINED_MODAL);
}

function unlockFondo4DoorWithLlave() {
  if (!hasLlave || !llaveItem) return;
  hasLlave = false;
  hasUnlockedFondo4Door = true;
  llaveItem.style.display = "none";
  llaveItem.style.pointerEvents = "none";
  llaveItem.setAttribute("draggable", "false");
  startTravelDialogue(guardian, FONDO4_UNLOCK_DIALOGUE, goToFondo5, ENTER_SPEECH_NEXT_LABEL);
}

function isPointInsideElement(clientX, clientY, el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function tradeAnilloForFactura() {
  if (!hasAnillo || !anilloItem || !facturaItem || !vendedora) return;

  const targetSlot = anilloItem.parentElement && anilloItem.parentElement.classList.contains("inventory-slot")
    ? anilloItem.parentElement
    : inventorySlots[0];

  hasAnillo = false;
  hasFactura = true;
  anilloItem.style.display = "none";
  anilloItem.style.pointerEvents = "none";
  anilloItem.setAttribute("draggable", "false");

  if (targetSlot) {
    targetSlot.appendChild(facturaItem);
  }
  facturaItem.style.display = "block";
  openItemModal(FACTURA_OBTAINED_MODAL);

  pendingVendedoraDismissAfterDialogue = true;
  closeSpeech();
  startDialogue(vendedora, VENDEDORA_PAYMENT_DIALOGUE);
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

function openItemModal(content = ANILLO_MODAL) {
  if (itemModalImage && content.imageSrc) {
    itemModalImage.src = content.imageSrc;
    itemModalImage.alt = content.imageAlt || "";
  }
  if (itemModalText) {
    itemModalText.innerHTML = content.textHtml || "";
  }
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
  pendingSpeechForFondo4Hotspot = false;
  pendingSpeechForFondo5Hotspot = false;
  pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo2.png";
  background.alt = "Fondo 2";
  setSceneBackgroundClass("in-fondo2");

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
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = hasCompletedVendedoraTrade ? "none" : "block";
    fondo2HotspotLeft.style.pointerEvents = hasCompletedVendedoraTrade ? "none" : "auto";
  }
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo3Hotspot) {
    fondo3Hotspot.style.display = "none";
  }
  if (fondo3HotspotLeft) {
    fondo3HotspotLeft.style.display = "none";
  }
  if (fondo4HotspotLeftBottom) {
    fondo4HotspotLeftBottom.style.display = "none";
  }
  if (fondo5HotspotLeft) {
    fondo5HotspotLeft.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  nextArrow.style.display = "none";
  prevArrow.style.display = "block";
  prevArrow.setAttribute("aria-label", "Volver a fondo 1");
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
  pendingSpeechForFondo4Hotspot = false;
  pendingSpeechForFondo5Hotspot = false;
  pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo3.png";
  background.alt = "Fondo 3";
  setSceneBackgroundClass("in-fondo3");

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
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = "none";
  }
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo3Hotspot) {
    fondo3Hotspot.style.display = "block";
  }
  if (fondo3HotspotLeft) {
    fondo3HotspotLeft.style.display = "block";
  }
  if (fondo4HotspotLeftBottom) {
    fondo4HotspotLeftBottom.style.display = "none";
  }
  if (fondo5HotspotLeft) {
    fondo5HotspotLeft.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = hasBrebaje ? "none" : "block";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  nextArrow.style.display = "none";
  prevArrow.style.display = "block";
  prevArrow.style.visibility = "visible";
  prevArrow.style.pointerEvents = "auto";
  prevArrow.setAttribute("aria-label", "Ir a fondo 4");
}

function goToFondo4(fromFondo5 = false) {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  pendingSpeechForGaston = false;
  pendingSpeechForArdillaGuardiana = false;
  pendingSpeechForBici = false;
  pendingSpeechForTele = false;
  pendingSpeechForFondo4Hotspot = false;
  pendingSpeechForFondo5Hotspot = false;
  pendingSpeechForFondo5CenterHotspot = false;

  background.src = "images/fondo4.png";
  background.alt = "Fondo 4";
  setSceneBackgroundClass("in-fondo4");

  snapGuardianToPosition(
    fromFondo5 ? FONDO4_GUARDIAN_LEFT_FROM_FONDO5 : FONDO4_GUARDIAN_LEFT,
    INITIAL_GUARDIAN_BOTTOM
  );
  guardian.style.transform = "scaleX(-1)";

  gaston.style.display = "none";
  if (tele) {
    tele.style.display = "none";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "none";
  }
  if (bici) {
    bici.style.display = "none";
  }
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = "none";
  }
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo3Hotspot) {
    fondo3Hotspot.style.display = "none";
  }
  if (fondo3HotspotLeft) {
    fondo3HotspotLeft.style.display = "none";
  }
  if (fondo4HotspotLeftBottom) {
    fondo4HotspotLeftBottom.style.display = "block";
  }
  if (fondo5HotspotLeft) {
    fondo5HotspotLeft.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Volver a fondo 3");
  prevArrow.style.display = "none";
}

function goToFondo5() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  pendingSpeechForGaston = false;
  pendingSpeechForArdillaGuardiana = false;
  pendingSpeechForBici = false;
  pendingSpeechForTele = false;
  pendingSpeechForFondo4Hotspot = false;
  pendingSpeechForFondo5Hotspot = false;
  pendingSpeechForFondo5CenterHotspot = false;

  background.src = "images/fondo5.png";
  background.alt = "Fondo 5";
  setSceneBackgroundClass("in-fondo5");

  snapGuardianToPosition(FONDO5_GUARDIAN_LEFT, INITIAL_GUARDIAN_BOTTOM);

  gaston.style.display = "none";
  if (tele) {
    tele.style.display = "none";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "none";
  }
  if (bici) {
    bici.style.display = "none";
  }
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = "none";
  }
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo3Hotspot) {
    fondo3Hotspot.style.display = "none";
  }
  if (fondo3HotspotLeft) {
    fondo3HotspotLeft.style.display = "none";
  }
  if (fondo4HotspotLeftBottom) {
    fondo4HotspotLeftBottom.style.display = "none";
  }
  if (fondo5HotspotLeft) {
    fondo5HotspotLeft.style.display = "block";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Volver a fondo 4");
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
  pendingSpeechForFondo4Hotspot = false;
  pendingSpeechForFondo5Hotspot = false;
  pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo1.png";
  background.alt = "Fondo 1";
  setSceneBackgroundClass("in-fondo1");

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
  if (fondo2HotspotLeft) {
    fondo2HotspotLeft.style.display = "none";
  }
  if (vendedora) {
    vendedora.style.display = "none";
  }
  if (fondo3Hotspot) {
    fondo3Hotspot.style.display = "none";
  }
  if (fondo3HotspotLeft) {
    fondo3HotspotLeft.style.display = "none";
  }
  if (fondo4HotspotLeftBottom) {
    fondo4HotspotLeftBottom.style.display = "none";
  }
  if (fondo5HotspotLeft) {
    fondo5HotspotLeft.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  anilloWorld.style.display = hasAnillo ? "none" : "block";
  anilloWorld.style.pointerEvents = hasAnillo ? "none" : "auto";
  inventory.style.display = "block";
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Ir a fondo 2");
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
      startTerminalDialogue(guardian, TELE_DIALOGUE, TELE_CORRECT_CODE, TELE_INPUT_BUBBLE_OFFSET);
      pendingSpeechForTele = false;
    }
  });
}

if (fondo3Hotspot) {
  fondo3Hotspot.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    faceGuardianToward(fondo3Hotspot);
    startDialogue(guardian, FONDO3_HOTSPOT_DIALOGUE);
  });
}

if (fondo3HotspotLeft) {
  fondo3HotspotLeft.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    faceGuardianToward(fondo3HotspotLeft);
    startDialogue(guardian, FONDO3_HOTSPOT_DIALOGUE);
  });
}

if (fondo4HotspotLeftBottom) {
  fondo4HotspotLeftBottom.addEventListener("click", () => {
    if (hasUnlockedFondo4Door) {
      goToFondo5();
      return;
    }
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo4Hotspot = true;
    moveGuardianInFrontOf(fondo4HotspotLeftBottom, false);
    if (isGuardianBeside(fondo4HotspotLeftBottom)) {
      faceGuardianToward(fondo4HotspotLeftBottom);
      startDialogue(guardian, FONDO4_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo4Hotspot = false;
    }
  });
}

if (fondo5HotspotLeft) {
  fondo5HotspotLeft.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = true;
    pendingSpeechForFondo5CenterHotspot = false;
    moveGuardianInFrontOf(fondo5HotspotLeft, false);
    if (isGuardianBeside(fondo5HotspotLeft)) {
      faceGuardianToward(fondo5HotspotLeft);
      startDialogue(guardian, FONDO5_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo5Hotspot = false;
    }
  });
}

if (fondo5HotspotCenter) {
  fondo5HotspotCenter.addEventListener("click", () => {
    if (!hasActivatedFondo5CenterHotspot) return;
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = true;
    moveGuardianInFrontOf(fondo5HotspotCenter, false);
    if (isGuardianBeside(fondo5HotspotCenter)) {
      faceGuardianToward(fondo5HotspotCenter);
      startDialogue(guardian, FONDO5_CENTER_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo5CenterHotspot = false;
    }
  });
}

if (fondo2HotspotLeft) {
  fondo2HotspotLeft.addEventListener("click", () => {
    if (hasCompletedVendedoraTrade) return;
    closeSpeech();
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForGaston = false;
    pendingSpeechForArdillaGuardiana = false;
    if (vendedora) {
      vendedora.style.display = "block";
      faceGuardianToward(vendedora);
      startDialogue(vendedora, VENDEDORA_DIALOGUE);
      return;
    }
    startDialogue(guardian, VENDEDORA_DIALOGUE);
  });
}

if (nextArrow) {
  nextArrow.addEventListener("click", () => {
    if (isInFondo5()) {
      goToFondo4(true);
      return;
    }
    if (isInFondo4()) {
      goToFondo3();
      return;
    }
    goToFondo2();
  });
}

if (prevArrow) {
  prevArrow.addEventListener("click", () => {
    if (isInFondo3()) {
      goToFondo4();
      return;
    }
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
  setupInventoryItemDrag(anilloItem, "anillo");
  anilloItem.addEventListener("click", () => {
    if (!hasAnillo) return;
    openItemModal(ANILLO_MODAL);
  });
}

if (facturaItem) {
  setupInventoryItemDrag(facturaItem, "factura");
  facturaItem.addEventListener("click", () => {
    if (!hasFactura) return;
    openItemModal(isInFondo5() ? FACTURA_MODAL_FONDO5 : FACTURA_MODAL);
  });
}

if (llaveItem) {
  setupInventoryItemDrag(llaveItem, "llave");
  llaveItem.addEventListener("click", () => {
    if (!hasLlave) return;
    openItemModal(LLAVE_MODAL);
  });
}

if (brebajeItem) {
  setupInventoryItemDrag(brebajeItem, "brebaje");
  brebajeItem.addEventListener("click", () => {
    if (!hasBrebaje) return;
    openItemModal(BREBAJE_MODAL);
  });
}

if (brebaje) {
  brebaje.addEventListener("click", () => {
    pickupBrebaje();
  });
}

if (scene) {
  scene.addEventListener("dragstart", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (INVENTORY_DRAGGABLE_IDS.has(target.id)) return;
    event.preventDefault();
  });

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
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;
    startDialogue(guardian, FONDO2_HOTSPOT_DIALOGUE);
  });

  scene.addEventListener("dragover", (event) => {
    if (!draggedInventoryItem) return;
    event.preventDefault();
    moveDragProxy(event.clientX, event.clientY);
  });

  scene.addEventListener("drop", (event) => {
    if (!draggedInventoryItem) return;
    event.preventDefault();
    removeDragProxy();
    const droppedItem = draggedInventoryItem;
    draggedInventoryItem = null;

    const { clientX, clientY } = event;
    const droppedOnVendedora = vendedora
      && window.getComputedStyle(vendedora).display !== "none"
      && isPointInsideElement(clientX, clientY, vendedora);
    if (droppedOnVendedora && droppedItem === "anillo") {
      tradeAnilloForFactura();
      return;
    }
    const droppedOnFondo4Hotspot = fondo4HotspotLeftBottom
      && isInFondo4()
      && window.getComputedStyle(fondo4HotspotLeftBottom).display !== "none"
      && isPointInsideElement(clientX, clientY, fondo4HotspotLeftBottom);
    if (droppedOnFondo4Hotspot && droppedItem === "llave" && hasLlave) {
      unlockFondo4DoorWithLlave();
      return;
    }
    const droppedOnFondo5Hotspot = fondo5HotspotLeft
      && isInFondo5()
      && window.getComputedStyle(fondo5HotspotLeft).display !== "none"
      && isPointInsideElement(clientX, clientY, fondo5HotspotLeft);
    if (droppedOnFondo5Hotspot && droppedItem === "brebaje" && hasBrebaje) {
      closeSpeech();
      hasActivatedFondo5CenterHotspot = true;
      updateFondo5CenterHotspotState();
      startCenteredDialogue(FONDO5_BREBAJE_DIALOGUE);
      return;
    }

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
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
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
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
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
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
    } else if (
      pendingSpeechForTele
      && tele
      && isGuardianBeside(tele)
    ) {
      faceGuardianToward(tele);
      startTerminalDialogue(guardian, TELE_DIALOGUE, TELE_CORRECT_CODE, TELE_INPUT_BUBBLE_OFFSET);
      pendingSpeechForTele = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
    } else if (
      pendingSpeechForFondo4Hotspot
      && fondo4HotspotLeftBottom
      && isGuardianBeside(fondo4HotspotLeftBottom)
    ) {
      faceGuardianToward(fondo4HotspotLeftBottom);
      startDialogue(guardian, FONDO4_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
    } else if (
      pendingSpeechForFondo5Hotspot
      && fondo5HotspotLeft
      && isGuardianBeside(fondo5HotspotLeft)
    ) {
      faceGuardianToward(fondo5HotspotLeft);
      startDialogue(guardian, FONDO5_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
    } else if (
      pendingSpeechForFondo5CenterHotspot
      && fondo5HotspotCenter
      && isGuardianBeside(fondo5HotspotCenter)
    ) {
      faceGuardianToward(fondo5HotspotCenter);
      startDialogue(guardian, FONDO5_CENTER_HOTSPOT_DIALOGUE);
      pendingSpeechForFondo5CenterHotspot = false;
      pendingSpeechForGaston = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
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
  if (itemModal && itemModal.classList.contains("open") && itemModal.contains(event.target)) return;
  if (speech.contains(event.target)) return;
  if (pendingVendedoraDismissAfterDialogue && activeDialogue && activeDialogue.anchor === vendedora) {
    completeVendedoraTrade();
  }
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
