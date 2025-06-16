import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "Editor de Arte de Píxeles",
  description:
    "Crea arte de píxeles en tu navegador. Incluye herramientas de pincel, borrador y cuentagotas con paleta de colores para la creación de arte digital.",
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
      q: "¿Puedo descargar mi obra?",
      a: "Sí, puedes descargar tu obra como imagen PNG de alta resolución haciendo clic en el botón 'Descargar'.",
    },
    {
      q: "¿Qué herramientas están disponibles?",
      a: "El editor incluye tres herramientas: pincel (para dibujar), borrador (para eliminar) y cuentagotas (para seleccionar color). El pincel y el borrador permiten dibujo continuo arrastrando.",
    },
    {
      q: "¿Puedo cambiar el tamaño de la cuadrícula?",
      a: "Sí, puedes cambiar el tamaño del lienzo de 8×8 a 32×32 en incrementos de 2. Al cambiar el tamaño, la obra existente se conserva y se ajusta a las nuevas dimensiones.",
    },
    {
      q: "¿Cómo uso la paleta de colores?",
      a: "Puedes seleccionar de 24 colores predeterminados en la paleta. También puedes usar el selector de color para elegir cualquier color personalizado. El color seleccionado se muestra con su código de color.",
    },
    {
      q: "¿Cómo funciona la herramienta cuentagotas?",
      a: "Selecciona la herramienta cuentagotas y haz clic en cualquier píxel del lienzo para establecer automáticamente el color de ese píxel como tu color seleccionado. Es útil para reutilizar colores existentes.",
    },
  ],
};
