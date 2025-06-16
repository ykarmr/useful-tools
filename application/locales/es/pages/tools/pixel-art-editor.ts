import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "Editor de Arte de Píxeles",
  description:
    "Crea arte de píxeles en tu navegador. Incluye múltiples herramientas de pincel, paletas de colores y soporte de capas para la creación de arte digital.",
  keywords: [
    "arte de píxeles",
    "arte digital",
    "editor de imágenes",
    "creación de arte",
    "herramienta de diseño",
    "canvas",
  ],

  howToUse: {
    title: "Cómo Usar",
    basic: "Operaciones Básicas",
    step1: "Selecciona una herramienta (pincel, borrador, cuentagotas)",
    step2: "Elige un color de la paleta de colores",
    step3: "Haz clic y arrastra en el lienzo para dibujar",
    advanced: "Funciones Útiles",
    tip1: "Tamaño de cuadrícula ajustable de 8×8 a 32×32",
    tip2: "Arrastra para dibujo continuo, cuentagotas para elegir colores",
    tip3: "Descarga imágenes de alta resolución en formato PNG",
  },

  toolPanel: {
    tools: "Herramientas",
    colors: "Paleta de Colores",
    canvasSettings: "Configuración del Lienzo",
    gridSize: "Tamaño de Cuadrícula",
    actions: "Acciones",
  },

  tools: {
    brush: "Pincel",
    eraser: "Borrador",
    eyedropper: "Cuentagotas",
    bucket: "Rellenar",
  },

  canvas: {
    title: "Lienzo",
    size: "Tamaño",
    pixels: "píxeles",
    instruction: "Clic izquierdo para dibujar, arrastra para dibujo continuo",
    gridSize: "Tamaño de Cuadrícula",
    pixelSize: "Tamaño de Píxel",
    showGrid: "Mostrar Cuadrícula",
  },

  actions: {
    clear: "Limpiar",
    download: "Descargar",
    undo: "Deshacer",
    redo: "Rehacer",
    save: "Guardar",
    load: "Cargar",
  },

  messages: {
    saved: "Obra guardada",
    loaded: "Obra cargada",
    cleared: "Lienzo limpiado",
    downloadReady: "Imagen lista para descargar",
    error: "Ha ocurrido un error",
    unsupportedBrowser: "Tu navegador no soporta esta función",
  },

  faqList: [
    {
      q: "¿Qué es el arte de píxeles?",
      a: "El arte de píxeles es una forma de arte digital donde las imágenes se crean colocando deliberadamente píxeles individuales. Es común en los gráficos 2D de videojuegos retro y se caracteriza por su apariencia pixelada.",
    },
    {
      q: "¿Puedo guardar mi obra?",
      a: "Sí, puedes descargar tu obra como imagen PNG. También puedes guardar los datos de tu trabajo en el almacenamiento local del navegador y reanudar la edición más tarde.",
    },
    {
      q: "¿Qué herramientas están disponibles?",
      a: "El editor incluye pincel, borrador, balde de relleno, herramientas de línea, rectángulo y círculo, y un cuentagotas. También están disponibles las funciones de deshacer y rehacer.",
    },
    {
      q: "¿Puedo cambiar el tamaño de la cuadrícula?",
      a: "Sí, puedes seleccionar varios tamaños de lienzo de 8x8 a 32x32. También puedes ajustar el tamaño de visualización de los píxeles.",
    },
    {
      q: "¿Puedo personalizar la paleta de colores?",
      a: "Sí, puedes agregar colores personalizados o usar paletas predefinidas (estilo de juego retro, monocromo, etc.). Puedes registrar hasta 32 colores.",
    },
    {
      q: "¿Qué es el modo de dibujo simétrico?",
      a: "Cuando el modo de dibujo simétrico está habilitado, el dibujo se refleja automáticamente horizontal o verticalmente desde la línea central del lienzo. Esto permite crear diseños simétricos de manera eficiente.",
    },
  ],
};
