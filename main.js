const scene = document.getElementById("scene");
const sceneViewport = document.getElementById("scene-viewport");
const background = document.getElementById("background");
const guardian = document.getElementById("guardian");
const presentador = document.getElementById("presentador");
const tele = document.getElementById("tele");
const ardillaGuardiana = document.getElementById("ardillaguardiana");
const bici = document.getElementById("bici");
const vendedora = document.getElementById("vendedora");
const brebaje = document.getElementById("brebaje");
const monedaWorld = document.getElementById("moneda-world");
const tarjetaWorld = document.getElementById("tarjeta-world");
const brocheinversionWorld = document.getElementById("brocheinversion-world");
const brocheinteresWorld = document.getElementById("brocheinteres-world");
const fondo2HotspotLeft = document.getElementById("fondo2-hotspot-left");
const fondo3HotspotLeft = document.getElementById("fondo3-hotspot-left");
const fondo3Hotspot = document.getElementById("fondo3-hotspot");
const fondo4HotspotLeftBottom = document.getElementById("fondo4-hotspot-left-bottom");
const fondo5HotspotLeft = document.getElementById("fondo5-hotspot-left");
const fondo5HotspotCenter = document.getElementById("fondo5-hotspot-center");
const fondo5HotspotRight = document.getElementById("fondo5-hotspot-right");
const anilloWorld = document.getElementById("anillo-world");
const anilloItem = document.getElementById("anillo-item");
const facturaItem = document.getElementById("factura-item");
const llaveItem = document.getElementById("llave-item");
const brebajeItem = document.getElementById("brebaje-item");
const monedaItem = document.getElementById("moneda-item");
const tarjetaItem = document.getElementById("tarjeta-item");
const brocheinversionItem = document.getElementById("brocheinversion-item");
const brocheinteresItem = document.getElementById("brocheinteres-item");
const nextArrow = document.getElementById("next-arrow");
const prevArrow = document.getElementById("prev-arrow");
const speech = document.getElementById("speech");
const speechText = document.getElementById("speech-text");
const speechOptions = document.getElementById("speech-options");
const speechNextBtn = document.getElementById("speech-next-btn");
const panelOverlay = document.getElementById("panel-overlay");
const panelA = document.getElementById("panel-a");
const panelB = document.getElementById("panel-b");
const panelC = document.getElementById("panel-c");
const panelD = document.getElementById("panel-d");
const inventory = document.getElementById("inventory");
const inventorySlots = [...document.querySelectorAll(".inventory-slot")];
const itemModal = document.getElementById("item-modal");
const itemModalContent = document.getElementById("item-modal-content");
const itemModalClose = document.getElementById("item-modal-close");
const itemModalImage = document.getElementById("item-modal-image");
const itemModalText = document.getElementById("item-modal-text");
const mobileHintBtn = document.getElementById("mobile-hint-btn");
const hintModal = document.getElementById("hint-modal");
const hintModalContent = document.getElementById("hint-modal-content");
const hintBaseImage = document.getElementById("hint-base-image");
const hintModalText = document.getElementById("hint-modal-text");
const hintModalOptions = document.getElementById("hint-modal-options");
const hintYesBtn = document.getElementById("hint-yes-btn");
const hintNoBtn = document.getElementById("hint-no-btn");
const hintCloseBtn = document.getElementById("hint-close-btn");
const endingOverlay = document.getElementById("ending-overlay");
const endingWebBtn = document.getElementById("ending-web-btn");
const INTERACTION_GAP = 12;
const ARDILLA_DIALOGUE_GAP = 4;
const GUARDIAN_IDLE_SRC = "images/guardian.webp";
const GUARDIAN_WALK_FRAMES = [
  "images/guardian2.webp",
  "images/guardian3.webp",
  "images/guardian4.webp"
];
const GUARDIAN_WALK_FRAME_MS = 120;
const GUARDIAN_MOVE_DURATION_LONG_MS = 1400;
const GUARDIAN_MOVE_DURATION_SHORT_MS = 950;
const GUARDIAN_SHORT_MOVE_DISTANCE_PX = 220;
const DEFAULT_SPEECH_NEXT_LABEL = "Continuar";
const TRAVEL_SPEECH_NEXT_LABEL = "Viajar";
const ENTER_SPEECH_NEXT_LABEL = "Entrar";
const TERMINAL_SPEECH_NEXT_LABEL = "Introducir número";
const SPEECH_BASELINE_OFFSET_PX = 8;
const PRESENTADOR_DIALOGUE = [
  "¡Hola, guardiana! Muchas gracias por acudir. Hoy es la Competición Financiera, un juego muy famoso en la ciudad de Aurópolis.",
  "El objetivo es recorrer esta zona delimitada de la ciudad donde encontrarás distintos objetos como una factura o una llave, que os irán guiando hasta encontrar una sala oculta, la sala del tesoro.",
  "Tenéis que ser los primeros en lograr entrar para hacernos con la victoria. ¡Un reto digno de los Guardianes del Tesoro!"
];
const ARDILLA_GUARDIANA_DIALOGUE = {
  prompt: "¿Necesitas información?",
  options: [
    {
      label: "¿Que es un recibo (de la luz, del gas...)?",
      response: "Un recibo es el documento oficial donde una empresa detalla el consumo que realizaste de un servicio durante un periodo específico y el dinero total que debes pagar antes de una fecha límite."
    },
    {
      label: "¿Que son los intereses?",
      response: "Es el coste que se paga por utilizar dinero ajeno o la ganancia que se recibe por prestarlo o invertirlo. Se define como el precio del tiempo y del riesgo, calculado habitualmente como un porcentaje del capital original que determina cuánto crece una deuda o un ahorro en un periodo determinado."
    },
    {
      label: "¿Que es una inversión?",
      response: "Invertir es emplear hoy tu dinero en un activo (como acciones, negocios o propiedades) con la expectativa de obtener un beneficio o ganancia en el futuro, aceptando siempre un nivel de riesgo."
    }
  ]
};
const BICI_DIALOGUE_TO_FONDO3 = ["¿Quieres viajar al parque?"];
const BICI_DIALOGUE_TO_FONDO2 = ["¿Quieres viajar al distrito comercial?"];
const TELE_DIALOGUE = [
  "Es una terminal de juego de la Competición Financiera.\nMuestra la silueta de un reloj y pide introducir un número para continuar."
];
const TELE_CORRECT_CODE = "1031";
const TELE_SUCCESS_DIALOGUE = ["Se ha abierto un compartimento donde se ocultaba una llave y una moneda."];
const TELE_FAIL_DIALOGUE = ["No ha pasado nada."];
const HINT_MODAL_PROMPT_TEXT = "Aquí la base de los Guardianes ¿Necesitas una pista para poder avanzar en tu aventura?";
const HINTS_BY_FONDO = {
  fondo1: "Estás en el punto de partida. Aquí se esconde un valioso objeto y una terminal que te pide un código. Para descifrar dicho código tendrás que ir a otro lugar y el tiempo la solución te dará.",
  fondo2: "Una alegre vendedora está deseando comerciar contigo. ¿No la has visto? Pulsa en los puestos del mercado. Si le das un objeto de valor, te dará algo que necesitas. ¿No has encontrado nada valioso en la localización de inicio?",
  fondo3: "¡Bonito parque! Aquí se ocultan dos objetos que necesitarás en tu aventura. También se oculta una pista necesaría para la terminal del punto de inicio.",
  fondo4: "¡Pocas pistas te puedo dar aquí! Necesitas abrir esa puerta de la izquierda. Tienes que conseguir una llave que, cómo ya habrás imaginado, no se encuentra aquí.",
  fondo5: "¡Te encuentras en la sala del tesoro! Estás cerca de acabar. En una de las estanterías se esconde un objeto que necesitas y en la otra tienes que usar otro objeto, que deberías haber conseguido antes. Al usarlo, obtendrás otro nuevo. ¡Cuantos objetos, que lío!\nLa luz de esta sala es muy especial, quizás eso te permita leer textos ocultos ¿Tienes algún documento?\nY para acabar te encontrarás con el panel final. Tienes cuatro objetos para cuatro huecos. ¿Y cuál es el orden? Lee las descripciones de los objetos y lo descubrirás.\n¡Buena suerte!"
};
const TELE_INPUT_BUBBLE_OFFSET = 75;
const TELE_RESULT_BUBBLE_OFFSET = -20;
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
const FONDO5_PANEL_READY_DIALOGUE = ["*Clik... Clik...*"];
const FONDO5_BREBAJE_CLICK_BUBBLE_OFFSET = 56;
const FONDO5_PANEL_READY_BUBBLE_OFFSET = 72;
const FONDO5_CENTER_HOTSPOT_DIALOGUE = [
  "El cofre se ha abierto un poco pero aún no del todo. Sin embargo se ha iluminado una placa que dice \"La luz nos muestra lo que antes se ocultaba\""
];
const FONDO5_RIGHT_HOTSPOT_DIALOGUE = ["¿Que es esto?"];
const ANILLO_MODAL = {
  imageSrc: "images/anillo.webp",
  imageAlt: "Anillo ampliado",
  textHtml: "Un anillo de origen desconocido.<br>Parece ser de gran valor."
};
const FACTURA_MODAL = {
  imageSrc: "images/factura.webp",
  imageAlt: "Factura ampliada",
  textHtml: "Una de las facturas necesarias para completar la Competición Financiera.<br>Es un recibo de la luz."
};
const FACTURA_MODAL_FONDO5 = {
  imageSrc: "images/factura.webp",
  imageAlt: "Factura ampliada",
  textHtml: "Con la luz de la sala del tesoro, podemos leer algo oculto en la factura: Cuatro elementos necesitarás para la prueba superar."
};
const LLAVE_MODAL = {
  imageSrc: "images/llave.webp",
  imageAlt: "Llave ampliada",
  textHtml: "¿Qué abrira esta llave?"
};
const BREBAJE_MODAL = {
  imageSrc: "images/brebaje.webp",
  imageAlt: "Brebaje ampliado",
  textHtml: "Un brebaje natural creado con flores silvestres. Claramente alguien lo ha dejado aquí para la Competición Financiera."
};
const MONEDA_MODAL = {
  imageSrc: "images/moneda.webp",
  imageAlt: "Moneda ampliada",
  textHtml: "Una moneda de la Competición Financiera. Representa el dinero en efectivo:<br>Es el dinero en forma física (billetes y monedas) que se utiliza para pagar bienes y servicios de manera inmediata, tangible y sin intermediarios electrónicos. En la parte trasera tiene grabada una A."
};
const TARJETA_MODAL = {
  imageSrc: "images/tarjeta.webp",
  imageAlt: "Tarjeta ampliada",
  textHtml: "Una tarjeta de crédito que forma parte de la Competición Financiera. El dinero que gastamos con una tarjeta de crédito viene a ser un préstamo inmediato del banco que te permite gastar dinero que no tienes en ese momento, con la condición de devolverlo en una fecha pactada para evitar intereses. Tiene escrita la letra B."
};
const BROCHEINVERSION_MODAL = {
  imageSrc: "images/brocheinversion.webp",
  imageAlt: "Broche inversion ampliado",
  textHtml: "Un broche de la Competición Financiera. Representa el concepto de inversión: Invertir es emplear hoy tu dinero en un activo (como acciones, negocios o propiedades) con la expectativa de obtener un beneficio o ganancia en el futuro, aceptando siempre un nivel de riesgo. En la parte trasera tiene grabada una C."
};
const BROCHEINTERES_MODAL = {
  imageSrc: "images/brocheinteres.webp",
  imageAlt: "Broche interes ampliado",
  textHtml: "Un broche de la Competición Financiera. Representa el concepto de interés: el interés es el coste que se paga por utilizar dinero ajeno o la ganancia que se recibe por prestarlo o invertirlo. Se define como el precio del tiempo y del riesgo, calculado habitualmente como un porcentaje del capital original que determina cuánto crece una deuda o un ahorro en un periodo determinado. Tiene grabado una D."
};
const ANILLO_OBTAINED_MODAL = {
  imageSrc: "images/anillo.webp",
  imageAlt: "Anillo obtenido",
  textHtml: "¡Has obtenido un anillo!"
};
const FACTURA_OBTAINED_MODAL = {
  imageSrc: "images/factura.webp",
  imageAlt: "Factura obtenida",
  textHtml: "¡Has obtenido una factura!"
};
const LLAVE_OBTAINED_MODAL = {
  imageSrc: "images/llave.webp",
  imageAlt: "Llave obtenida",
  textHtml: "¡Has obtenido una llave!"
};
const BREBAJE_OBTAINED_MODAL = {
  imageSrc: "images/brebaje.webp",
  imageAlt: "Brebaje obtenido",
  textHtml: "¡Has obtenido un brebaje!"
};
const MONEDA_OBTAINED_MODAL = {
  imageSrc: "images/moneda.webp",
  imageAlt: "Moneda obtenida",
  textHtml: "¡Has obtenido una moneda!"
};
const TARJETA_OBTAINED_MODAL = {
  imageSrc: "images/tarjeta.webp",
  imageAlt: "Tarjeta obtenida",
  textHtml: "¡Has obtenido tarjeta de crédito!"
};
const BROCHEINVERSION_OBTAINED_MODAL = {
  imageSrc: "images/brocheinversion.webp",
  imageAlt: "Broche inversion obtenido",
  textHtml: "¡Has obtenido un broche de inversión!"
};
const BROCHEINTERES_OBTAINED_MODAL = {
  imageSrc: "images/brocheinteres.webp",
  imageAlt: "Broche interes obtenido",
  textHtml: "¡Has obtenido un broche de interés!"
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
let hasMoneda = false;
let hasTarjeta = false;
let hasBrocheinversion = false;
let hasBrocheinteres = false;
let hasCompletedVendedoraTrade = false;
let hasUnlockedFondo4Door = false;
let hasActivatedFondo5CenterHotspot = false;
let hasUnlockedFondo5Panel = false;
let hasCompletedPanelDropPuzzle = false;
let hasUsedFondo5LeftHotspot = false;
let hasTriggeredEnding = false;
let pendingVendedoraDismissAfterDialogue = false;
let speechAnchor = null;
let dragProxy = null;
let pendingSpeechForPresentador = false;
let pendingSpeechForArdillaGuardiana = false;
let pendingSpeechForBici = false;
let pendingSpeechForTele = false;
let pendingSpeechForFondo4Hotspot = false;
let pendingSpeechForFondo5Hotspot = false;
let pendingSpeechForFondo5CenterHotspot = false;
let pendingSpeechForFondo5RightHotspot = false;
let activeDialogue = null;
let activeDialogueIndex = 0;
let anilloPickupPending = false;
let anilloPickupTimeoutId = null;
let draggedInventoryItem = null;
let guardianWalkIntervalId = null;
let guardianWalkFrameIndex = 0;
let draggedSourceElement = null;
let itemModalContext = "";
let panelDropACompleted = false;
let panelDropBCompleted = false;
let panelDropCCompleted = false;
let panelDropDCompleted = false;
let pendingTerminalSuccessDialogue = false;
let pendingTerminalSuccessAnchor = null;
let pendingBrocheinversionFromFondo5Right = false;
let pendingPanelCompletionHeroLine = false;
let hintModalMode = "prompt";
let confettiCanvas = null;
let confettiContext = null;
let confettiParticles = [];
let confettiAnimationId = null;
let confettiEndAt = 0;

function resizeConfettiCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function stopConfettiCelebration() {
  if (confettiAnimationId !== null) {
    window.cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }
  confettiParticles = [];
  confettiContext = null;
  if (confettiCanvas) {
    confettiCanvas.remove();
    confettiCanvas = null;
  }
}

function startConfettiCelebration() {
  stopConfettiCelebration();
  confettiCanvas = document.createElement("canvas");
  confettiCanvas.setAttribute("aria-hidden", "true");
  confettiCanvas.style.position = "fixed";
  confettiCanvas.style.inset = "0";
  confettiCanvas.style.pointerEvents = "none";
  confettiCanvas.style.zIndex = "25";
  document.body.appendChild(confettiCanvas);
  resizeConfettiCanvas();
  confettiContext = confettiCanvas.getContext("2d");
  if (!confettiContext) {
    stopConfettiCelebration();
    return;
  }

  const colors = ["#ffd23f", "#4dabf7", "#ff6b6b", "#51cf66", "#f783ac", "#845ef7"];
  const pieceCount = 190;
  confettiParticles = Array.from({ length: pieceCount }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -Math.random() * confettiCanvas.height * 0.9,
    w: 5 + Math.random() * 7,
    h: 8 + Math.random() * 10,
    vx: -1.1 + Math.random() * 2.2,
    vy: 2.4 + Math.random() * 3.8,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: -0.18 + Math.random() * 0.36,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  confettiEndAt = performance.now() + 4300;

  const animate = (now) => {
    if (!confettiContext || !confettiCanvas) return;
    const fade = now > confettiEndAt
      ? Math.max(0, 1 - (now - confettiEndAt) / 900)
      : 1;
    if (fade <= 0) {
      stopConfettiCelebration();
      return;
    }
    confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiContext.globalAlpha = fade;
    for (const p of confettiParticles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      if (p.y > confettiCanvas.height + 18) {
        if (now <= confettiEndAt) {
          p.y = -22;
          p.x = Math.random() * confettiCanvas.width;
        }
      }
      confettiContext.save();
      confettiContext.translate(p.x, p.y);
      confettiContext.rotate(p.rot);
      confettiContext.fillStyle = p.color;
      confettiContext.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiContext.restore();
    }
    confettiContext.globalAlpha = 1;
    confettiAnimationId = window.requestAnimationFrame(animate);
  };
  confettiAnimationId = window.requestAnimationFrame(animate);
}
const PRELOAD_EXTRA_IMAGE_SRCS = [
  "images/fondo1.webp",
  "images/fondo2.webp",
  "images/fondo3.webp",
  "images/fondo4.webp",
  "images/fondo5.webp",
  "images/guardian.webp",
  ...GUARDIAN_WALK_FRAMES
];
let hasStartedAssetWarmup = false;

function warmupImageSource(src) {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = src;
    const done = () => resolve();
    if (typeof img.decode === "function") {
      img.decode().then(done).catch(done);
      return;
    }
    if (img.complete) {
      done();
      return;
    }
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

function warmupGameAssets() {
  if (hasStartedAssetWarmup) return;
  hasStartedAssetWarmup = true;
  const allSources = new Set(PRELOAD_EXTRA_IMAGE_SRCS);
  const inlineImages = document.querySelectorAll("img[src]");
  for (const img of inlineImages) {
    const src = img.getAttribute("src");
    if (src) allSources.add(src);
  }
  const tasks = [...allSources].map((src) => warmupImageSource(src));
  Promise.allSettled(tasks).catch(() => {});
}
const TRANSPARENT_DRAG_IMAGE = new Image();
TRANSPARENT_DRAG_IMAGE.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const BASE_WIDTH = 1328;
const BASE_HEIGHT = 800;
const INVENTORY_DRAGGABLE_IDS = new Set([
  "anillo-item",
  "factura-item",
  "llave-item",
  "brebaje-item",
  "moneda-item",
  "tarjeta-item",
  "brocheinversion-item",
  "brocheinteres-item"
]);
const SCENE_BACKGROUND_CLASSES = [
  "in-fondo1",
  "in-fondo2",
  "in-fondo3",
  "in-fondo4",
  "in-fondo5"
];
const DEV_START_AT_PANEL_TEST = false;

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

function updateFondo5LeftHotspotState() {
  if (!fondo5HotspotLeft) return;
  const activeInFondo5 = isInFondo5();
  if (!activeInFondo5) {
    fondo5HotspotLeft.style.display = "none";
    fondo5HotspotLeft.style.pointerEvents = "none";
    return;
  }
  fondo5HotspotLeft.style.display = "block";
  fondo5HotspotLeft.style.pointerEvents = hasUsedFondo5LeftHotspot ? "none" : "auto";
}

function showPanelOverlay() {
  if (!panelOverlay) return;
  panelOverlay.classList.add("open");
  panelOverlay.setAttribute("aria-hidden", "false");
}

function hidePanelOverlay() {
  if (!panelOverlay) return;
  panelOverlay.classList.remove("open");
  panelOverlay.setAttribute("aria-hidden", "true");
}

addFallbackOnError("background", "fondo no encontrado");
addFallbackOnError("presentador", "presentador.png no encontrado");
addFallbackOnError("anillo-world", "anillo.webp no encontrado");
addFallbackOnError("anillo-item", "anillo.webp no encontrado");
addFallbackOnError("factura-item", "factura.webp no encontrado");
addFallbackOnError("llave-item", "llave.webp no encontrado");
addFallbackOnError("brebaje-item", "brebaje.webp no encontrado");
addFallbackOnError("ardillaguardiana", "ardillaguardiana.webp no encontrado");
addFallbackOnError("bici", "bici.webp no encontrado");
addFallbackOnError("tele", "tele.webp no encontrado");
addFallbackOnError("vendedora", "vendedora.webp no encontrado");
addFallbackOnError("brebaje", "brebaje.webp no encontrado");
addFallbackOnError("moneda-world", "moneda.webp no encontrado");
addFallbackOnError("tarjeta-world", "tarjeta.webp no encontrado");
addFallbackOnError("brocheinversion-world", "brocheinversion.webp no encontrado");
addFallbackOnError("brocheinteres-world", "brocheinteres.webp no encontrado");
addFallbackOnError("moneda-item", "moneda.webp no encontrado");
addFallbackOnError("tarjeta-item", "tarjeta.webp no encontrado");
addFallbackOnError("brocheinversion-item", "brocheinversion.webp no encontrado");
addFallbackOnError("brocheinteres-item", "brocheinteres.webp no encontrado");
addFallbackOnError("mobile-hint-btn", "movil.webp no encontrado");
addFallbackOnError("hint-base-image", "base.webp no encontrado");
addFallbackOnError("guardianes-logo", "guardianes.webp no encontrado");
addFallbackOnError("abanca-logo", "abanca.webp no encontrado");

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
  if (itemType === "moneda") return hasMoneda;
  if (itemType === "tarjeta") return hasTarjeta;
  if (itemType === "brocheinversion") return hasBrocheinversion;
  if (itemType === "brocheinteres") return hasBrocheinteres;
  return false;
}

function isInventoryItemVisible(itemEl) {
  if (!itemEl) return false;
  return window.getComputedStyle(itemEl).display !== "none";
}

function ensureVisibleInventoryItemsAreInteractive() {
  const items = [
    anilloItem,
    facturaItem,
    llaveItem,
    brebajeItem,
    monedaItem,
    tarjetaItem,
    brocheinversionItem,
    brocheinteresItem
  ];
  for (const itemEl of items) {
    if (!itemEl) continue;
    if (!isInventoryItemVisible(itemEl)) continue;
    itemEl.style.pointerEvents = "auto";
    itemEl.setAttribute("draggable", "true");
  }
}

function setupInventoryItemDrag(itemEl, itemType) {
  if (!itemEl) return;
  itemEl.addEventListener("dragstart", (event) => {
    const isOwned = isItemOwned(itemType);
    const isVisible = window.getComputedStyle(itemEl).display !== "none";
    if (!isOwned && !isVisible) {
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

function facePresentadorTowardGuardian() {
  if (!presentador || !guardian) return;
  const guardianRect = getWorldRect(guardian);
  const presentadorRect = getWorldRect(presentador);
  const guardianCenter = guardianRect.left + guardianRect.width / 2;
  const presentadorCenter = presentadorRect.left + presentadorRect.width / 2;
  const scale = guardianCenter < presentadorCenter ? -1 : 1;
  presentador.style.transform = `translateX(-50%) scaleX(${scale})`;
}

function moveGuardianTo(targetWorldX) {
  const guardianWidth = guardian.offsetWidth;
  const currentLeft = guardian.offsetLeft;

  let clampedX = Math.min(
    BASE_WIDTH - guardianWidth,
    Math.max(0, targetWorldX - guardianWidth * 0.5)
  );

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

function moveGuardianInFrontOf(el, _avoidCollision = true, gap = INTERACTION_GAP) {
  const targetRect = getWorldRect(el);
  const guardianWidth = guardian.offsetWidth;
  const guardianCenter = guardian.offsetLeft + guardianWidth / 2;
  const targetCenter = targetRect.left + targetRect.width / 2;

  const x = guardianCenter < targetCenter
    ? targetRect.left - guardianWidth / 2 - gap
    : targetRect.right + guardianWidth / 2 + gap;
  moveGuardianTo(x);
}

function isGuardianBeside(el) {
  const guardianRect = getWorldRect(guardian);
  const targetRect = getWorldRect(el);
  const leftDistance = Math.abs(targetRect.left - guardianRect.right);
  const rightDistance = Math.abs(guardianRect.left - targetRect.right);
  const closeEnough = leftDistance <= INTERACTION_GAP + 8 || rightDistance <= INTERACTION_GAP + 8;
  const verticalOverlap = guardianRect.bottom > targetRect.top && guardianRect.top < targetRect.bottom;
  return closeEnough && verticalOverlap;
}

function positionSpeechAt(el, extraTop = 0) {
  const targetRect = getWorldRect(el);
  const speechBottomAnchorY = targetRect.top - SPEECH_BASELINE_OFFSET_PX;
  const anchoredBottom = BASE_HEIGHT - speechBottomAnchorY + extraTop;
  speech.style.left = `${targetRect.left + 50}px`;
  speech.style.top = "auto";
  speech.style.bottom = `${anchoredBottom}px`;
}

function positionSpeechCenter() {
  const centerX = BASE_WIDTH / 2;
  const centerY = BASE_HEIGHT / 2;
  speech.style.left = `${centerX - 150}px`;
  speech.style.top = `${centerY - 110}px`;
  speech.style.bottom = "auto";
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
      if (activeDialogue.type === "travel") {
        speechNextBtn.style.display = "block";
        speechNextBtn.textContent = activeDialogue.nextLabel || TRAVEL_SPEECH_NEXT_LABEL;
      } else if (activeDialogue.hideNextButton) {
        speechNextBtn.style.display = "none";
      } else {
        speechNextBtn.style.display = "block";
        speechNextBtn.textContent = DEFAULT_SPEECH_NEXT_LABEL;
      }
    }
  }
  if (activeDialogue.type === "centered") {
    positionSpeechCenter();
  } else {
    positionSpeechAt(activeDialogue.anchor, activeDialogue.speechExtraTop || 0);
  }
  speech.style.display = "block";
}

function startDialogue(anchor, lines, speechExtraTop = 0, options = {}) {
  activeDialogue = {
    type: "linear",
    anchor,
    lines,
    speechExtraTop,
    hideNextButton: options.hideNextButton === true
  };
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

function showEndingOverlay() {
  if (!endingOverlay || hasTriggeredEnding) return;
  hasTriggeredEnding = true;
  stopConfettiCelebration();
  closeSpeech();
  hidePanelOverlay();
  if (nextArrow) {
    nextArrow.style.display = "none";
  }
  if (prevArrow) {
    prevArrow.style.display = "none";
  }
  if (inventory) {
    inventory.style.display = "none";
  }
  endingOverlay.classList.add("open");
  endingOverlay.setAttribute("aria-hidden", "false");
}

function startPanelCompletionSequence() {
  hidePanelOverlay();
  pendingPanelCompletionHeroLine = true;
  startDialogue(guardian, ["¡Lo hemos conseguido!"]);
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
      pendingTerminalSuccessDialogue = true;
      pendingTerminalSuccessAnchor = activeDialogue.anchor || guardian;
      grantLlaveFromTerminal();
    } else {
      pendingTerminalSuccessDialogue = false;
      pendingTerminalSuccessAnchor = null;
      startDialogue(activeDialogue.anchor, TELE_FAIL_DIALOGUE, TELE_RESULT_BUBBLE_OFFSET);
    }
    return;
  }
  if (activeDialogue.type !== "linear" && activeDialogue.type !== "centered") return;
  if (activeDialogueIndex >= activeDialogue.lines.length - 1) {
    if (pendingPanelCompletionHeroLine && activeDialogue.anchor === guardian) {
      pendingPanelCompletionHeroLine = false;
      closeSpeech();
      startConfettiCelebration();
      showEndingOverlay();
      return;
    }
    if (pendingBrocheinversionFromFondo5Right) {
      pendingBrocheinversionFromFondo5Right = false;
      closeSpeech();
      grantBrocheinversionFromFondo5Right();
      return;
    }
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
  return src.includes("images/fondo2.webp");
}

function isInFondo3() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo3.webp");
}

function isInFondo4() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo4.webp");
}

function isInFondo5() {
  if (!background) return false;
  const src = background.getAttribute("src") || background.src || "";
  return src.includes("images/fondo5.webp");
}

function getCurrentFondoKey() {
  if (isInFondo5()) return "fondo5";
  if (isInFondo4()) return "fondo4";
  if (isInFondo3()) return "fondo3";
  if (isInFondo2()) return "fondo2";
  return "fondo1";
}

function openHintModalPrompt() {
  if (!hintModal || !hintModalText || !hintModalOptions || !hintCloseBtn) return;
  hintModalMode = "prompt";
  hintModalText.textContent = HINT_MODAL_PROMPT_TEXT;
  hintModalOptions.style.display = "flex";
  hintCloseBtn.style.display = "none";
  hintModal.classList.add("open");
  hintModal.setAttribute("aria-hidden", "false");
}

function showHintForCurrentFondo() {
  if (!hintModalText || !hintModalOptions || !hintCloseBtn) return;
  hintModalMode = "hint";
  const fondoKey = getCurrentFondoKey();
  const hintText = HINTS_BY_FONDO[fondoKey] || "PRUEBA";
  hintModalText.textContent = hintText;
  hintModalOptions.style.display = "none";
  hintCloseBtn.style.display = "block";
}

function closeHintModal() {
  if (!hintModal || !hintModalText || !hintModalOptions || !hintCloseBtn) return;
  hintModal.classList.remove("open");
  hintModal.setAttribute("aria-hidden", "true");
  hintModalMode = "prompt";
  hintModalText.textContent = HINT_MODAL_PROMPT_TEXT;
  hintModalOptions.style.display = "flex";
  hintCloseBtn.style.display = "none";
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
  anilloItem.style.pointerEvents = "auto";
  anilloItem.setAttribute("draggable", "true");
  ensureVisibleInventoryItemsAreInteractive();
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
  llaveItem.style.pointerEvents = "auto";
  llaveItem.setAttribute("draggable", "true");
  ensureVisibleInventoryItemsAreInteractive();
  itemModalContext = "terminal_llave_success";
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
  ensureVisibleInventoryItemsAreInteractive();
  openItemModal(BREBAJE_OBTAINED_MODAL);
}

function pickupMoneda() {
  if (hasMoneda || !monedaItem) return;
  hasMoneda = true;
  if (monedaWorld) {
    monedaWorld.style.display = "none";
    monedaWorld.style.pointerEvents = "none";
  }
  const fourthSlot = inventorySlots[3];
  if (fourthSlot) {
    fourthSlot.appendChild(monedaItem);
  }
  monedaItem.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
}

function pickupTarjeta() {
  if (hasTarjeta || !tarjetaItem) return;
  hasTarjeta = true;
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
    tarjetaWorld.style.pointerEvents = "none";
  }
  const fifthSlot = inventorySlots[4];
  if (fifthSlot) {
    fifthSlot.appendChild(tarjetaItem);
  }
  tarjetaItem.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
}

function grantTarjetaFromBrebajeUse() {
  if (hasTarjeta || !tarjetaItem) return;
  hasTarjeta = true;
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
    tarjetaWorld.style.pointerEvents = "none";
  }
  const thirdSlot = inventorySlots[2];
  if (thirdSlot) {
    thirdSlot.appendChild(tarjetaItem);
  }
  tarjetaItem.style.display = "block";
  tarjetaItem.style.pointerEvents = "auto";
  tarjetaItem.setAttribute("draggable", "true");
  ensureVisibleInventoryItemsAreInteractive();
}

function pickupBrocheinversion() {
  if (hasBrocheinversion || !brocheinversionItem) return;
  hasBrocheinversion = true;
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
    brocheinversionWorld.style.pointerEvents = "none";
  }
  const sixthSlot = inventorySlots[5];
  if (sixthSlot) {
    sixthSlot.appendChild(brocheinversionItem);
  }
  brocheinversionItem.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  openItemModal(BROCHEINVERSION_OBTAINED_MODAL);
}

function grantBrocheinversionFromFondo5Right() {
  if (hasBrocheinversion || !brocheinversionItem) return;
  hasBrocheinversion = true;
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "none";
    fondo5HotspotRight.style.pointerEvents = "none";
  }
  const secondSlot = inventorySlots[1];
  if (secondSlot) {
    secondSlot.appendChild(brocheinversionItem);
  }
  brocheinversionItem.style.display = "block";
  brocheinversionItem.style.pointerEvents = "auto";
  brocheinversionItem.setAttribute("draggable", "true");
  ensureVisibleInventoryItemsAreInteractive();
  openItemModal(BROCHEINVERSION_OBTAINED_MODAL);
}

function pickupBrocheinteres() {
  if (hasBrocheinteres || !brocheinteresItem) return;
  hasBrocheinteres = true;
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "none";
    brocheinteresWorld.style.pointerEvents = "none";
  }
  const seventhSlot = inventorySlots[6];
  if (seventhSlot) {
    seventhSlot.appendChild(brocheinteresItem);
  }
  brocheinteresItem.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  openItemModal(BROCHEINTERES_OBTAINED_MODAL);
}

function completePanelDropTarget(itemType, targetEl) {
  if (!targetEl) return false;
  if (itemType === "moneda" && targetEl === panelA && !panelDropACompleted && hasMoneda) {
    panelDropACompleted = true;
    hasMoneda = false;
    monedaItem.style.display = "none";
    monedaItem.style.pointerEvents = "none";
    monedaItem.setAttribute("draggable", "false");
    return true;
  }
  if (itemType === "tarjeta" && targetEl === panelB && !panelDropBCompleted && hasTarjeta) {
    panelDropBCompleted = true;
    hasTarjeta = false;
    tarjetaItem.style.display = "none";
    tarjetaItem.style.pointerEvents = "none";
    tarjetaItem.setAttribute("draggable", "false");
    return true;
  }
  if (itemType === "brocheinversion" && targetEl === panelC && !panelDropCCompleted && hasBrocheinversion) {
    panelDropCCompleted = true;
    hasBrocheinversion = false;
    brocheinversionItem.style.display = "none";
    brocheinversionItem.style.pointerEvents = "none";
    brocheinversionItem.setAttribute("draggable", "false");
    return true;
  }
  if (itemType === "brocheinteres" && targetEl === panelD && !panelDropDCompleted && hasBrocheinteres) {
    panelDropDCompleted = true;
    hasBrocheinteres = false;
    brocheinteresItem.style.display = "none";
    brocheinteresItem.style.pointerEvents = "none";
    brocheinteresItem.setAttribute("draggable", "false");
    return true;
  }
  return false;
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
  ensureVisibleInventoryItemsAreInteractive();
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
  const shouldTriggerFondo5PanelReady =
    itemModalContext === "factura_fondo5"
    && isInFondo5();
  const shouldHandleTerminalSuccess =
    itemModalContext === "terminal_llave_success";
  const shouldHandleTerminalCoinSuccess =
    itemModalContext === "terminal_moneda_success";
  const shouldTriggerBrebajeClik =
    itemModalContext === "tarjeta_from_brebaje"
    && isInFondo5();
  itemModal.classList.remove("open");
  itemModal.setAttribute("aria-hidden", "true");
  itemModalContext = "";
  if (shouldHandleTerminalSuccess && pendingTerminalSuccessDialogue) {
    pickupMoneda();
    itemModalContext = "terminal_moneda_success";
    openItemModal(MONEDA_OBTAINED_MODAL);
    return;
  }
  if (shouldHandleTerminalCoinSuccess && pendingTerminalSuccessDialogue) {
    startDialogue(
      pendingTerminalSuccessAnchor || guardian,
      TELE_SUCCESS_DIALOGUE,
      TELE_RESULT_BUBBLE_OFFSET
    );
    pendingTerminalSuccessDialogue = false;
    pendingTerminalSuccessAnchor = null;
  }
  if (shouldTriggerFondo5PanelReady && !hasUnlockedFondo5Panel) {
    hasUnlockedFondo5Panel = true;
    startDialogue(
      fondo5HotspotCenter || guardian,
      FONDO5_PANEL_READY_DIALOGUE,
      FONDO5_PANEL_READY_BUBBLE_OFFSET,
      { hideNextButton: true }
    );
  }
  if (shouldTriggerBrebajeClik) {
    startDialogue(
      fondo5HotspotCenter || guardian,
      FONDO5_BREBAJE_DIALOGUE,
      FONDO5_BREBAJE_CLICK_BUBBLE_OFFSET
    );
  }
}

function goToFondo2() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  hidePanelOverlay();
    pendingSpeechForPresentador = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo2.webp";
  background.alt = "Fondo 2";
  setSceneBackgroundClass("in-fondo2");  if (tele) {
    tele.style.display = "none";
  }
  if (presentador) {
    presentador.style.display = "none";
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
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  if (monedaWorld) {
    monedaWorld.style.display = "none";
  }
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
  }
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
    brocheinversionWorld.style.pointerEvents = "none";
  }
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  nextArrow.style.display = "none";
  prevArrow.style.display = "block";
  prevArrow.setAttribute("aria-label", "Volver a fondo 1");
}

function goToFondo3() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  hidePanelOverlay();
    pendingSpeechForPresentador = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo3.webp";
  background.alt = "Fondo 3";
  setSceneBackgroundClass("in-fondo3");  if (tele) {
    tele.style.display = "none";
  }
  if (presentador) {
    presentador.style.display = "none";
  }
  if (ardillaGuardiana) {
    ardillaGuardiana.style.display = "block";
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
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = hasBrebaje ? "none" : "block";
    brebaje.style.pointerEvents = hasBrebaje ? "none" : "auto";
  }
  if (monedaWorld) {
    monedaWorld.style.display = "none";
  }
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
  }
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
    brocheinversionWorld.style.pointerEvents = "none";
  }
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "block";
    brocheinteresWorld.style.pointerEvents = "auto";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
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
  hidePanelOverlay();
    pendingSpeechForPresentador = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;

  background.src = "images/fondo4.webp";
  background.alt = "Fondo 4";
  setSceneBackgroundClass("in-fondo4");

  snapGuardianToPosition(
    fromFondo5 ? FONDO4_GUARDIAN_LEFT_FROM_FONDO5 : FONDO4_GUARDIAN_LEFT,
    INITIAL_GUARDIAN_BOTTOM
  );
  guardian.style.transform = "scaleX(-1)";  if (tele) {
    tele.style.display = "none";
  }
  if (presentador) {
    presentador.style.display = "none";
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
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  if (monedaWorld) {
    monedaWorld.style.display = "none";
  }
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
  }
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
  }
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Volver a fondo 3");
  prevArrow.style.display = "none";
}

function goToFondo5() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  hidePanelOverlay();
    pendingSpeechForPresentador = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;

  background.src = "images/fondo5.webp";
  background.alt = "Fondo 5";
  setSceneBackgroundClass("in-fondo5");

  snapGuardianToPosition(FONDO5_GUARDIAN_LEFT, INITIAL_GUARDIAN_BOTTOM);  if (tele) {
    tele.style.display = "none";
  }
  if (presentador) {
    presentador.style.display = "none";
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
    updateFondo5LeftHotspotState();
  }
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "block";
    fondo5HotspotRight.style.pointerEvents = "auto";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  if (monedaWorld) {
    monedaWorld.style.display = "none";
    monedaWorld.style.pointerEvents = "none";
  }
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
    tarjetaWorld.style.pointerEvents = "none";
  }
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
    brocheinversionWorld.style.pointerEvents = "none";
  }
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "none";
    brocheinteresWorld.style.pointerEvents = "none";
  }
  anilloWorld.style.display = "none";
  inventory.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Volver a fondo 4");
  prevArrow.style.display = "none";
}

function goToFondo1() {
  closeItemModal();
  closeSpeech();
  cancelPendingAnilloPickup();
  stopGuardianWalkAnimation();
  hidePanelOverlay();
    pendingSpeechForPresentador = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;

  snapGuardianToInitialPosition();

  background.src = "images/fondo1.webp";
  background.alt = "Fondo 1";
  setSceneBackgroundClass("in-fondo1");  if (tele) {
    tele.style.display = "block";
  }
  if (presentador) {
    presentador.style.display = "block";
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
  if (fondo5HotspotRight) {
    fondo5HotspotRight.style.display = "none";
  }
  updateFondo5CenterHotspotState();
  if (brebaje) {
    brebaje.style.display = "none";
  }
  if (monedaWorld) {
    monedaWorld.style.display = "none";
  }
  if (tarjetaWorld) {
    tarjetaWorld.style.display = "none";
  }
  if (brocheinversionWorld) {
    brocheinversionWorld.style.display = "none";
  }
  if (brocheinteresWorld) {
    brocheinteresWorld.style.display = "none";
  }
  anilloWorld.style.display = hasAnillo ? "none" : "block";
  anilloWorld.style.pointerEvents = hasAnillo ? "none" : "auto";
  inventory.style.display = "block";
  ensureVisibleInventoryItemsAreInteractive();
  nextArrow.style.display = "block";
  nextArrow.setAttribute("aria-label", "Ir a fondo 2");
  prevArrow.style.display = "none";
}

if (presentador) {
  presentador.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForPresentador = true;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    moveGuardianInFrontOf(presentador, false, ARDILLA_DIALOGUE_GAP);
    if (isGuardianBeside(presentador)) {
      faceGuardianToward(presentador);
      facePresentadorTowardGuardian();
      startDialogue(presentador, PRESENTADOR_DIALOGUE);
      pendingSpeechForPresentador = false;
    }
  });
}

if (ardillaGuardiana) {
  ardillaGuardiana.addEventListener("click", () => {
    closeSpeech();
    pendingSpeechForArdillaGuardiana = true;
    pendingSpeechForPresentador = false;
    pendingSpeechForBici = false;
    pendingSpeechForTele = false;
    moveGuardianInFrontOf(ardillaGuardiana, false, ARDILLA_DIALOGUE_GAP);
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
    pendingSpeechForPresentador = false;
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
    pendingSpeechForPresentador = false;
    pendingSpeechForBici = false;
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
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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
    if (hasUsedFondo5LeftHotspot) return;
    closeSpeech();
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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
    if (hasUnlockedFondo5Panel) {
      closeSpeech();
      showPanelOverlay();
      return;
    }
    closeSpeech();
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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

if (fondo5HotspotRight) {
  fondo5HotspotRight.addEventListener("click", () => {
    if (hasBrocheinversion) return;
    closeSpeech();
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
    pendingSpeechForArdillaGuardiana = false;
    pendingSpeechForFondo4Hotspot = false;
    pendingSpeechForFondo5Hotspot = false;
    pendingSpeechForFondo5CenterHotspot = false;
    pendingSpeechForFondo5RightHotspot = true;
    pendingBrocheinversionFromFondo5Right = true;
    moveGuardianInFrontOf(fondo5HotspotRight, false);
    if (isGuardianBeside(fondo5HotspotRight)) {
      faceGuardianToward(fondo5HotspotRight);
      startDialogue(guardian, FONDO5_RIGHT_HOTSPOT_DIALOGUE);
    pendingSpeechForFondo5RightHotspot = false;
    }
  });
}

if (fondo2HotspotLeft) {
  fondo2HotspotLeft.addEventListener("click", () => {
    if (hasCompletedVendedoraTrade) return;
    closeSpeech();
    pendingSpeechForPresentador = false;
    pendingSpeechForTele = false;
    pendingSpeechForBici = false;
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
    if (!isInventoryItemVisible(anilloItem)) return;
    openItemModal(ANILLO_MODAL);
  });
}

if (facturaItem) {
  setupInventoryItemDrag(facturaItem, "factura");
  facturaItem.addEventListener("click", () => {
    if (!hasFactura && !isInventoryItemVisible(facturaItem)) return;
    const inFondo5 = isInFondo5();
    itemModalContext = inFondo5 ? "factura_fondo5" : "factura_default";
    openItemModal(inFondo5 ? FACTURA_MODAL_FONDO5 : FACTURA_MODAL);
  });
}

if (llaveItem) {
  setupInventoryItemDrag(llaveItem, "llave");
  llaveItem.addEventListener("click", () => {
    if (!isInventoryItemVisible(llaveItem)) return;
    openItemModal(LLAVE_MODAL);
  });
}

if (brebajeItem) {
  setupInventoryItemDrag(brebajeItem, "brebaje");
  brebajeItem.addEventListener("click", () => {
    if (!hasBrebaje && !isInventoryItemVisible(brebajeItem)) return;
    openItemModal(BREBAJE_MODAL);
  });
}

if (monedaItem) {
  setupInventoryItemDrag(monedaItem, "moneda");
  monedaItem.addEventListener("click", () => {
    if (!hasMoneda && !isInventoryItemVisible(monedaItem)) return;
    openItemModal(MONEDA_MODAL);
  });
}

if (tarjetaItem) {
  setupInventoryItemDrag(tarjetaItem, "tarjeta");
  tarjetaItem.addEventListener("click", () => {
    if (!hasTarjeta && !isInventoryItemVisible(tarjetaItem)) return;
    openItemModal(TARJETA_MODAL);
  });
}

if (brocheinversionItem) {
  setupInventoryItemDrag(brocheinversionItem, "brocheinversion");
  brocheinversionItem.addEventListener("click", () => {
    if (!hasBrocheinversion && !isInventoryItemVisible(brocheinversionItem)) return;
    openItemModal(BROCHEINVERSION_MODAL);
  });
}

if (brocheinteresItem) {
  setupInventoryItemDrag(brocheinteresItem, "brocheinteres");
  brocheinteresItem.addEventListener("click", () => {
    if (!hasBrocheinteres && !isInventoryItemVisible(brocheinteresItem)) return;
    openItemModal(BROCHEINTERES_MODAL);
  });
}

if (brebaje) {
  brebaje.addEventListener("click", () => {
    pickupBrebaje();
  });
}

if (monedaWorld) {
  monedaWorld.addEventListener("click", () => {
    pickupMoneda();
  });
}

if (tarjetaWorld) {
  tarjetaWorld.addEventListener("click", () => {
    pickupTarjeta();
  });
}

if (brocheinversionWorld) {
  brocheinversionWorld.addEventListener("click", () => {
    pickupBrocheinversion();
  });
}

if (brocheinteresWorld) {
  brocheinteresWorld.addEventListener("click", () => {
    pickupBrocheinteres();
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
    pendingSpeechForPresentador = false;
    pendingSpeechForBici = false;
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
      hasBrebaje = false;
      if (brebajeItem) {
        brebajeItem.style.display = "none";
        brebajeItem.style.pointerEvents = "none";
        brebajeItem.setAttribute("draggable", "false");
      }
      grantTarjetaFromBrebajeUse();
      hasUsedFondo5LeftHotspot = true;
      hasActivatedFondo5CenterHotspot = true;
      updateFondo5LeftHotspotState();
      updateFondo5CenterHotspotState();
      itemModalContext = "tarjeta_from_brebaje";
      openItemModal(TARJETA_OBTAINED_MODAL);
      return;
    }
    const panelOpen = panelOverlay && panelOverlay.classList.contains("open");
    if (panelOpen) {
      const panelTargets = [panelA, panelB, panelC, panelD];
      const droppedPanelTarget = panelTargets.find((target) => isPointInsideElement(clientX, clientY, target));
      const panelPuzzleItems = new Set(["moneda", "tarjeta", "brocheinversion", "brocheinteres"]);
      if (droppedPanelTarget) {
        const correctDrop = completePanelDropTarget(droppedItem, droppedPanelTarget);
        if (!correctDrop) {
          buzz();
          return;
        }
        if (
          panelDropACompleted
          && panelDropBCompleted
          && panelDropCCompleted
          && panelDropDCompleted
          && !hasCompletedPanelDropPuzzle
        ) {
          hasCompletedPanelDropPuzzle = true;
          startPanelCompletionSequence();
        }
        return;
      }
      if (panelPuzzleItems.has(droppedItem)) {
        buzz();
        return;
      }
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
    if (pendingSpeechForPresentador && presentador && isGuardianBeside(presentador)) {
      faceGuardianToward(presentador);
      facePresentadorTowardGuardian();
      startDialogue(presentador, PRESENTADOR_DIALOGUE);
      pendingSpeechForPresentador = false;
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
      pendingSpeechForPresentador = false;
      pendingSpeechForArdillaGuardiana = false;
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
      pendingSpeechForPresentador = false;
      pendingSpeechForBici = false;
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
      pendingSpeechForPresentador = false;
      pendingSpeechForTele = false;
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
      pendingSpeechForPresentador = false;
      pendingSpeechForFondo4Hotspot = false;
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
      pendingSpeechForPresentador = false;
      pendingSpeechForFondo5Hotspot = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
    } else if (
      pendingSpeechForFondo5RightHotspot
      && fondo5HotspotRight
      && isInFondo5()
      && isGuardianBeside(fondo5HotspotRight)
    ) {
      faceGuardianToward(fondo5HotspotRight);
      startDialogue(guardian, FONDO5_RIGHT_HOTSPOT_DIALOGUE);
      pendingSpeechForPresentador = false;
      pendingSpeechForFondo5RightHotspot = false;
      pendingSpeechForFondo5CenterHotspot = false;
      pendingSpeechForArdillaGuardiana = false;
      pendingSpeechForBici = false;
      pendingSpeechForTele = false;
      pendingSpeechForFondo4Hotspot = false;
      pendingSpeechForFondo5Hotspot = false;
    } else if (
      pendingSpeechForFondo5CenterHotspot
      && fondo5HotspotCenter
      && isGuardianBeside(fondo5HotspotCenter)
    ) {
      faceGuardianToward(fondo5HotspotCenter);
      startDialogue(guardian, FONDO5_CENTER_HOTSPOT_DIALOGUE);
      pendingSpeechForPresentador = false;
      pendingSpeechForFondo5CenterHotspot = false;
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

if (mobileHintBtn) {
  mobileHintBtn.addEventListener("click", () => {
    openHintModalPrompt();
  });
}

if (hintYesBtn) {
  hintYesBtn.addEventListener("click", () => {
    showHintForCurrentFondo();
  });
}

if (hintNoBtn) {
  hintNoBtn.addEventListener("click", () => {
    closeHintModal();
  });
}

if (hintCloseBtn) {
  hintCloseBtn.addEventListener("click", () => {
    closeHintModal();
  });
}

if (hintModal) {
  hintModal.addEventListener("click", (event) => {
    if (event.target === hintModal) {
      closeHintModal();
    }
  });
}

if (hintModalContent) {
  hintModalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (endingWebBtn) {
  endingWebBtn.addEventListener("click", () => {
    window.open("https://guardianesdeltesoro.afundacion.org", "_blank", "noopener,noreferrer");
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeHintModal();
    closeItemModal();
    return;
  }
  if (event.key !== "Enter") return;
  if (itemModal && itemModal.classList.contains("open")) {
    event.preventDefault();
    closeItemModal();
    return;
  }
  if (speech.style.display === "none" || !activeDialogue) return;
  if (!speechNextBtn || speechNextBtn.style.display === "none") return;

  event.preventDefault();
  advanceActiveDialogue();
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
  resizeConfettiCanvas();
  if (speechAnchor && speech.style.display !== "none") {
    positionSpeechAt(speechAnchor, activeDialogue?.speechExtraTop || 0);
  }
});
if (scene && sceneViewport) {
  warmupGameAssets();
  preloadGuardianWalkFrames();
  stopGuardianWalkAnimation();
  layoutScene();
  ensureVisibleInventoryItemsAreInteractive();
  if (DEV_START_AT_PANEL_TEST) {
    hasActivatedFondo5CenterHotspot = true;
    hasUnlockedFondo5Panel = true;
    goToFondo5();
    showPanelOverlay();
  }
}

if (inventory) {
  inventory.addEventListener("pointerdown", () => {
    ensureVisibleInventoryItemsAreInteractive();
  });
}
