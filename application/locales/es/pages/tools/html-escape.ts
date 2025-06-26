import { HtmlEscapeTranslations } from "@/locales/types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "Herramienta de Escape HTML",
  subtitle: "Escapa y desescapa caracteres especiales HTML de forma segura",
  description: "Escapa y desescapa caracteres especiales HTML de forma segura.",
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
  howToUse: {
    title: "Cómo usar la herramienta de escape HTML",
    steps: [
      "Pega o escribe tu texto HTML o entidades HTML en el área de entrada",
      "Haz clic en 'Escapar' para convertir caracteres especiales a entidades HTML",
      "Haz clic en 'Desescapar' para convertir entidades HTML de vuelta a texto regular",
      "Copia el resultado usando el botón copiar o limpia todo para empezar de nuevo",
    ],
  },
  features: {
    title: "Características principales",
    items: [
      {
        title: "Conversión bidireccional",
        description: "Escapa y desescapa entidades HTML con alta precisión",
      },
      {
        title: "Prevención XSS",
        description:
          "Ayuda a prevenir ataques de cross-site scripting escapando adecuadamente la entrada del usuario",
      },
      {
        title: "Soporte completo de caracteres",
        description:
          "Maneja todas las entidades HTML incluyendo entidades nombradas, numéricas y hexadecimales",
      },
      {
        title: "Procesamiento en tiempo real",
        description:
          "Conversión instantánea con estadísticas detalladas y conteo de caracteres",
      },
    ],
  },
  inputLabel: "Texto a escapar",
  inputPlaceholder:
    'Ingresa código HTML (ej.: <div class="example">Hello & World</div>)',
  outputLabel: "Texto escapado",
  outputPlaceholder: "El resultado escapado aparece aquí",
  escapeButton: "Escapar",
  unescapeButton: "Desescapar",
  clearButton: "Limpiar",
  copyButton: "Copiar",
  copiedMessage: "¡Copiado!",
  // Mensajes de error
  messages: {
    inputRequired: "Ingresa texto para escapar",
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
      q: "¿Cuándo usar el escape HTML?",
      a: "Usa el escape HTML al incrustar entrada de usuario en HTML, mostrar etiquetas HTML como texto y como medida de seguridad para prevenir ataques XSS. Es esencial en desarrollo de aplicaciones web.",
    },
    {
      q: "¿Cuándo usar el desescapado?",
      a: "Usa el desescapado para convertir HTML escapado a su forma original o restaurar datos escapados de una base de datos. Úsalo con precaución entendiendo los riesgos de seguridad.",
    },
  ],
};
