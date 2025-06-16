import { HtmlEscapeTranslations } from "@/locales/types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "Herramienta de Escape HTML",
  description:
    "Una herramienta para escapar y desescapar caracteres especiales HTML de forma segura.",
  keywords: [
    "escape HTML",
    "caracteres especiales HTML",
    "escape de caracteres",
    "conversión HTML",
    "herramientas de desarrollo",
    "codificación de caracteres",
    "seguridad",
    "prevención XSS",
  ],
  inputLabel: "Cadena a escapar",
  inputPlaceholder:
    'Ingrese código HTML (ej: <div class="example">Hello & World</div>)',
  outputLabel: "Cadena escapada",
  outputPlaceholder: "El resultado escapado se mostrará aquí",
  escapeButton: "Escapar",
  unescapeButton: "Desescapar",
  clearButton: "Limpiar",
  copyButton: "Copiar",
  copiedMessage: "¡Copiado!",
  // Mensajes de error
  messages: {
    inputRequired: "Por favor ingrese una cadena",
    noContentToCopy: "No hay contenido para copiar",
    copyFailed: "Error al copiar",
    charactersEscaped: " caracteres escapados",
    charactersUnescaped: " caracteres desescapados",
  },
  // Texto de la interfaz
  ui: {
    characters: "caracteres",
    lines: "líneas",
    inputExample: "Entrada:",
    outputExample: "Salida:",
  },
  stats: {
    title: "Estadísticas",
    originalLength: "Longitud original",
    escapedLength: "Longitud convertida",
    charactersEscaped: "Caracteres escapados",
  },
  examples: {
    title: "Ejemplos",
    basicHtml: {
      title: "Etiquetas HTML básicas",
      input: "<div>Hello World</div>",
      output: "&lt;div&gt;Hello World&lt;/div&gt;",
    },
    attributes: {
      title: "Atributos HTML",
      input: '<img src="image.jpg" alt="My Image">',
      output: "&lt;img src=&quot;image.jpg&quot; alt=&quot;My Image&quot;&gt;",
    },
    quotes: {
      title: "Comillas y ampersand",
      input: 'Say "Hello" & goodbye',
      output: "Say &quot;Hello&quot; &amp; goodbye",
    },
    scriptTag: {
      title: "Etiqueta script (prevención XSS)",
      input: '<script>alert("peligroso")</script>',
      output: "&lt;script&gt;alert(&quot;peligroso&quot;)&lt;/script&gt;",
    },
    mixedContent: {
      title: "Contenido mixto",
      input:
        '<div class="test" onclick="alert(\'click\')">Content & More</div>',
      output:
        "&lt;div class=&quot;test&quot; onclick=&quot;alert(&#x27;click&#x27;)&quot;&gt;Content &amp; More&lt;/div&gt;",
    },
  },
  faqList: [
    {
      q: "¿Qué es el escape HTML?",
      a: 'El escape HTML es el proceso de convertir caracteres que tienen significado especial en HTML (<, >, &, ", etc.) en referencias de caracteres para que se muestren correctamente en los navegadores. También juega un papel importante en la prevención de ataques XSS.',
    },
    {
      q: "¿Qué caracteres se escapan?",
      a: "Los principales caracteres que se escapan son: < se convierte en &lt;, > se convierte en &gt;, & se convierte en &amp;, \" se convierte en &quot;, ' se convierte en &#x27;. Estos caracteres tienen significado especial en HTML, por lo que necesitan ser escapados para mostrarse como texto.",
    },
    {
      q: "¿Cuándo debo usar el escape HTML?",
      a: "Use el escape HTML al incrustar entrada de usuario en HTML, al mostrar etiquetas HTML como texto, y como medida de seguridad para prevenir ataques XSS. Es esencial en el desarrollo de aplicaciones web.",
    },
    {
      q: "¿Cuándo uso el desescapado?",
      a: "Use el desescapado cuando quiera convertir HTML escapado de vuelta a su forma original o al restaurar datos escapados guardados en una base de datos. Sin embargo, úselo con cuidado entendiendo los riesgos de seguridad.",
    },
  ],
};
