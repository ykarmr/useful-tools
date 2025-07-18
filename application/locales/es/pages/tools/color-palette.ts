import { ColorPaletteTranslations } from "../../../types/pages/tools/color-palette";

export const colorPalette: ColorPaletteTranslations = {
  title: "Generador de Paletas de Colores",
  subTitle: "Crea esquemas de colores profesionales al instante",
  description:
    "Genera paletas de colores hermosas basadas en principios de teoría del color. Crea esquemas profesionales en formatos HEX, RGB, HSL con pruebas de accesibilidad y simulación de daltonismo - perfecto para diseñadores y desarrolladores",
  keywords: [
    "generador paleta colores",
    "herramienta esquemas colores",
    "generador de colores",
    "códigos de color",
    "HEX RGB HSL",
    "teoría del color",
    "herramienta de diseño",
    "esquema de colores",
    "convertidor de colores",
    "selector de colores",
    "creador paletas",
    "accesibilidad",
    "daltonismo",
  ],
  baseColor: "Color Base",
  baseColorPlaceholder: "#3B82F6 o rgb(59,130,246)",
  generatePalette: "Generar Paleta",
  colorFormat: "Formato de Color",
  hexFormat: "HEX",
  rgbFormat: "RGB",
  hslFormat: "HSL",
  paletteType: "Tipo de Paleta",
  monochromatic: "Monocromático",
  analogous: "Análogo",
  complementary: "Complementario",
  triadic: "Triádico",
  tetradic: "Tetrádico",
  copy: "Copiar",
  copied: "Copiado",
  clear: "Limpiar",
  randomColor: "Color Aleatorio",
  colorInfo: "Información del Color",
  luminance: "Luminancia",
  saturation: "Saturación",
  brightness: "Brillo",
  colorBlindTest: "Simulación de Daltonismo",
  protanopia: "Protanopia",
  deuteranopia: "Deuteranopia",
  tritanopia: "Tritanopia",
  normal: "Normal",
  exportPalette: "Exportar Paleta",
  downloadCSS: "Descargar como Variables CSS",
  downloadJSON: "Descargar como JSON",
  howToUse: {
    title: "Cómo usar el generador de paletas de colores",
    steps: [
      "Selecciona un color base usando el selector de color o ingresa un código HEX",
      "Elige tu tipo de paleta: monocromática, análoga, complementaria, triádica o tetrádica",
      "Haz clic en 'Generar Paleta' para crear un esquema de colores basado en principios de teoría del color",
      "Prueba 'Color Aleatorio' para descubrir colores base nuevos para proyectos creativos",
      "Cambia entre formatos HEX, RGB o HSL según sea necesario",
      "Prueba la accesibilidad con simulación de daltonismo para asegurar que tu paleta funcione para todos",
      "Haz clic en cualquier color para copiar su código al portapapeles",
      "Exporta tu paleta como variables CSS o JSON para usar en proyectos de desarrollo",
    ],
  },
  features: {
    title: "Características principales",
    items: [
      "Cinco tipos de paletas profesionales basadas en teoría del color: monocromática, análoga, complementaria, triádica y tetrádica",
      "Soporte completo de formatos de color con HEX, RGB y HSL para flujos de trabajo versátiles",
      "Simulación integrada de daltonismo para pruebas de accesibilidad",
      "Copia de códigos de color al portapapeles con un clic",
      "Cálculo automático de luminancia para análisis de contraste compatible con WCAG",
      "Funcionalidad de exportación para variables CSS y formato JSON",
      "Generación de colores aleatorios para inspiración creativa",
      "Diseño totalmente responsivo optimizado para todos los dispositivos",
    ],
  },
  faqList: [
    {
      q: "¿Cuáles son los diferentes tipos de paleta?",
      a: "Monocromática usa variaciones de un tono, análoga usa colores adyacentes en la rueda cromática, complementaria usa colores opuestos, triádica usa tres colores equidistantes, y tetrádica usa cuatro colores formando un rectángulo en la rueda cromática.",
    },
    {
      q: "¿Cómo funciona la simulación de daltonismo?",
      a: "La herramienta simula tres tipos de deficiencia de visión cromática: protanopia (ceguera al rojo), deuteranopia (ceguera al verde) y tritanopia (ceguera al azul). Esto ayuda a asegurar que tu paleta sea accesible para usuarios con diferencias en la visión del color.",
    },
    {
      q: "¿Qué es la luminancia y por qué es importante?",
      a: "La luminancia mide el brillo percibido de un color (0-100%). Es crucial para determinar las relaciones de contraste texto-fondo para cumplir con estándares de accesibilidad como las directrices WCAG.",
    },
    {
      q: "¿Cómo puedo usar las variables CSS exportadas?",
      a: "Copia las variables CSS exportadas en el selector :root de tu hoja de estilo. Luego puedes usarlas en todo tu CSS como 'color: var(--color-1)' para un tema consistente.",
    },
    {
      q: "¿Puedo ingresar colores en formato RGB o HSL?",
      a: "Actualmente, solo puedes ingresar colores en formato HEX (#RRGGBB), pero la herramienta muestra colores en formatos HEX, RGB y HSL. Puedes copiar colores en cualquiera de estos formatos.",
    },
    {
      q: "¿Cuál es la diferencia entre HEX, RGB y HSL?",
      a: "HEX usa notación hexadecimal (#FF0000), RGB usa valores rojo-verde-azul (0-255), y HSL usa tono (0-360°), saturación (0-100%) y luminosidad (0-100%). Cada formato sirve para diferentes propósitos de diseño y desarrollo.",
    },
  ],
};
