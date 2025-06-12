import type { JsonFormatterTranslations } from "../types/tools";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "Formateador JSON",
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
  faqList: [
    {
      q: "¿Qué es un formateador JSON?",
      a: "Un formateador JSON es una herramienta que embellece y valida datos JSON (JavaScript Object Notation), haciéndolos más legibles e identificando errores de sintaxis.",
    },
    {
      q: "¿Cómo se manejan los archivos JSON inválidos?",
      a: "Cuando se ingresa JSON inválido, se muestra un mensaje de error para ayudar a identificar las áreas problemáticas.",
    },
    {
      q: "¿Puede manejar archivos JSON grandes?",
      a: "Sí, pero archivos muy grandes pueden causar rendimiento más lento debido a limitaciones del navegador.",
    },
    {
      q: "¿Están seguros mis datos?",
      a: "Todo el procesamiento se realiza dentro de su navegador y no se envían datos a ningún servidor.",
    },
  ],
};
