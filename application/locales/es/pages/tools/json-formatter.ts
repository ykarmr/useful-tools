import { JsonFormatterTranslations } from "@/locales/types/pages/tools/json-formatter";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "Formateador JSON",
  subtitle: "Formatea y valida datos JSON de manera elegante",
  description: "Formatea, valida y embellece datos JSON",
  keywords: [
    "Formateador JSON",
    "Validador JSON",
    "Minificador JSON",
    "Herramientas JSON",
    "Sintaxis resaltada",
  ],
  format: "Formatear",
  minify: "Minificar",
  download: "Descargar",
  placeholder: "Pega o ingresa tus datos JSON aquí...",
  invalidJson: "JSON Inválido",
  statistics: "Estadísticas",
  characters: "Caracteres",
  lines: "Líneas",
  size: "Tamaño",
  indentSize: "Tamaño de indentación",
  input: "Entrada JSON",
  output: "Salida Formateada",
  uploadFile: "Subir Archivo",
  examples: "Ejemplos",
  basicObject: "Objeto básico:",
  objectWithArray: "Objeto con array:",
  indent2: "2 espacios",
  indent4: "4 espacios",
  indent8: "8 espacios",
  howToUse: {
    title: "Cómo usar",
    steps: [
      "Ingresa datos JSON en el área de texto o usa el botón 'Subir Archivo' para cargar un archivo JSON",
      "Selecciona el tamaño de indentación preferido (2, 4 u 8 espacios) según sea necesario",
      "Haz clic en el botón 'Formatear' para embellecer el JSON en un formato legible",
      "Haz clic en el botón 'Minificar' para eliminar espacios en blanco y minimizar el tamaño del archivo",
      "Los errores se detectan automáticamente y se muestran con mensajes de error",
      "Copia el resultado formateado al portapapeles usando el botón copiar o guarda como archivo usando el botón descargar",
    ],
  },
  features: {
    title: "Características principales",
    items: [
      "Formateo y embellecimiento hermoso de JSON",
      "Minificación y compresión de JSON",
      "Validación de sintaxis JSON en tiempo real",
      "Soporte para subida de archivos JSON",
      "Descarga de archivos JSON formateados",
      "Visualización detallada de estadísticas (líneas, caracteres, tamaño de archivo)",
      "Indentación personalizable (2, 4, 8 espacios)",
      "Copia al portapapeles con un clic",
    ],
  },
  faqList: [
    {
      q: "¿Qué es un formateador JSON?",
      a: "Un formateador JSON es una herramienta en línea que formatea datos JSON (JavaScript Object Notation) en un formato legible y valida errores de sintaxis. Ayuda a los desarrolladores a trabajar de manera más eficiente con datos JSON.",
    },
    {
      q: "¿Cuál es la diferencia entre 'Formatear' y 'Minificar'?",
      a: "'Formatear' añade saltos de línea e indentación para hacer el JSON legible para humanos. 'Minificar' elimina espacios en blanco y saltos de línea innecesarios para minimizar el tamaño del archivo.",
    },
    {
      q: "¿Cómo debo elegir el tamaño de indentación?",
      a: "Comúnmente se usan 2 o 4 espacios. Elige basándote en los estándares de codificación de tu proyecto o tu preferencia para legibilidad.",
    },
    {
      q: "¿Hay un límite de tamaño de archivo para las subidas?",
      a: "Los archivos pueden procesarse dentro de las limitaciones del navegador, pero archivos JSON muy grandes (varios MB o más) pueden tardar más en procesarse.",
    },
    {
      q: "¿Qué pasa si hay errores en mi JSON?",
      a: "Los errores de sintaxis se detectan automáticamente y se muestran con mensajes de error. La validación también se ejecuta cuando mueves el foco fuera del campo de entrada.",
    },
    {
      q: "¿Se almacenan mis datos JSON procesados en algún lugar?",
      a: "No, todo el procesamiento se realiza completamente dentro de tu navegador y no se envían datos a ningún servidor. Tu privacidad y seguridad están garantizadas.",
    },
  ],
};
