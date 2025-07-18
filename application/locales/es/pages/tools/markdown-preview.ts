import { MarkdownPreviewTranslations } from "@/locales/types/pages/tools/markdown-preview";

export const markdownPreview: MarkdownPreviewTranslations = {
  title: "Vista Previa de Markdown",
  subtitle: "Editor y vista previa de Markdown en tiempo real",
  description: "Previsualiza y edita documentos Markdown en tiempo real",
  keywords: [
    "Vista Previa de Markdown",
    "Editor de Markdown",
    "Herramientas de Markdown",
    "Sintaxis de Markdown",
    "Vista Previa en Tiempo Real",
  ],
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Ingresa texto Markdown en el editor izquierdo",
      "Ve la vista previa HTML en tiempo real en el lado derecho",
      "Usa los botones de ejemplo para insertar sintaxis Markdown",
      "Copia tu texto Markdown al portapapeles con el botón copiar",
      "Revisa el conteo de caracteres, palabras y líneas en las estadísticas",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Funcionalidad de vista previa en tiempo real",
      "Soporte para GitHub Flavored Markdown",
      "Amplio soporte de sintaxis incluyendo tablas, bloques de código y citas",
      "Estadísticas de conteo de caracteres, palabras y líneas",
      "Función conveniente de inserción de muestras",
      "Funcionalidad de guardado automático (almacenamiento local)",
      "Soporte de diseño responsivo",
    ],
  },
  preview: "Vista Previa",
  writeHere: "Escribe Aquí",
  noPreview: "Sin vista previa disponible",
  noPreviewSubtext: "Comienza a escribir en el editor para ver la vista previa",
  examples: "Ejemplos",
  headings: "Encabezados",
  lists: "Listas",
  links: "Enlaces",
  code: "Código",
  tables: "Tablas",
  blockquotes: "Citas",
  images: "Imágenes",
  emphasis: "Énfasis",
  horizontalRule: "Línea Horizontal",
  exampleHeading: "# Encabezado 1\n## Encabezado 2\n### Encabezado 3",
  exampleList: "- Elemento 1\n- Elemento 2\n- Elemento 3",
  exampleLink: "[Texto del enlace](https://example.com)",
  exampleCode: "```javascript\nconsole.log('Hola Mundo');\n```",
  exampleTable:
    "| Encabezado 1 | Encabezado 2 |\n|--------------|-------------|\n| Celda 1      | Celda 2     |",
  exampleQuote: "> Esta es una cita",
  markdownGuide: "Guía de Markdown",
  headingsDesc: "# H1 ## H2 ### H3",
  emphasisDesc: "**negrita** *cursiva*",
  listsDesc: "- elemento o 1. elemento",
  linksDesc: "[texto](url)",
  imagesDesc: "![alt](url)",
  codeDesc: "`en línea` o ```bloque```",
  blockquotesDesc: "> texto de cita",
  tablesDesc: "| col | col |",
  horizontalRuleDesc: "---",
  characterCount: "Caracteres",
  lineCount: "Líneas",
  confirmClear: "¿Estás seguro de que quieres limpiar el texto?",
  copy: "Copiar",
  copied: "¡Copiado!",
  wordCount: "Palabras",
  clear: "Limpiar",
  faqList: [
    {
      q: "¿Qué es Markdown?",
      a: "Markdown es un lenguaje de marcado ligero que permite formatear texto usando sintaxis simple y convertirlo a HTML.",
    },
    {
      q: "¿Qué sintaxis de Markdown se admite?",
      a: "Se admite sintaxis estándar de Markdown incluyendo encabezados, listas, enlaces, imágenes, bloques de código, tablas, citas y énfasis.",
    },
    {
      q: "¿La vista previa es en tiempo real?",
      a: "Sí, la vista previa HTML se actualiza en tiempo real mientras escribes.",
    },
    {
      q: "¿Hay una forma de previsualizar mi Markdown?",
      a: "Sí, puedes ver la vista previa en tiempo real mientras escribes.",
    },
  ],
};
