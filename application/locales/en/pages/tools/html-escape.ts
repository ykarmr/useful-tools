import { HtmlEscapeTranslations } from "@/locales/types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "HTML Escape Tool",
  subtitle: "Safely escape and unescape HTML special characters",
  description: "Safely escape and unescape HTML special characters.",
  keywords: [
    "HTML escape",
    "HTML special characters",
    "character escape",
    "HTML conversion",
    "developer tools",
    "character encoding",
    "security",
    "XSS prevention",
  ],
  howToUse: {
    title: "How to Use HTML Escape Tool",
    steps: [
      "Paste or type your HTML text or HTML entities in the input area",
      "Click 'Escape' to convert special characters to HTML entities",
      "Click 'Unescape' to convert HTML entities back to regular text",
      "Copy the result using the copy button or clear all to start over",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      {
        title: "Bidirectional Conversion",
        description:
          "Both escape and unescape HTML entities with high accuracy",
      },
      {
        title: "XSS Prevention",
        description:
          "Helps prevent cross-site scripting attacks by properly escaping user input",
      },
      {
        title: "Complete Character Support",
        description:
          "Handles all HTML entities including named, numeric, and hexadecimal entities",
      },
      {
        title: "Real-time Processing",
        description:
          "Instant conversion with detailed statistics and character count",
      },
    ],
  },
  inputLabel: "Text to escape",
  inputPlaceholder:
    'Enter HTML code (e.g., <div class="example">Hello & World</div>)',
  outputLabel: "Escaped text",
  outputPlaceholder: "Escaped result appears here",
  escapeButton: "Escape",
  unescapeButton: "Unescape",
  clearButton: "Clear",
  copyButton: "Copy",
  copiedMessage: "Copied!",
  // Error messages
  messages: {
    inputRequired: "Enter text to escape",
    noContentToCopy: "No content to copy",
    copyFailed: "Copy failed",
    charactersEscaped: " characters escaped",
    charactersUnescaped: " characters unescaped",
  },
  // UI text
  ui: {
    characters: "characters",
    lines: "lines",
    inputExample: "Input:",
    outputExample: "Output:",
  },
  stats: {
    title: "Statistics",
    originalLength: "Original length",
    escapedLength: "Converted length",
    charactersEscaped: "Characters escaped",
  },
  examples: {
    title: "Examples",
    basicHtml: {
      title: "Basic HTML tags",
      input: "<div>Hello World</div>",
      output: "&lt;div&gt;Hello World&lt;/div&gt;",
    },
    attributes: {
      title: "HTML attributes",
      input: '<img src="image.jpg" alt="My Image">',
      output: "&lt;img src=&quot;image.jpg&quot; alt=&quot;My Image&quot;&gt;",
    },
    quotes: {
      title: "Quotes and ampersand",
      input: 'Say "Hello" & goodbye',
      output: "Say &quot;Hello&quot; &amp; goodbye",
    },
    scriptTag: {
      title: "Script tag (XSS prevention)",
      input: '<script>alert("dangerous")</script>',
      output: "&lt;script&gt;alert(&quot;dangerous&quot;)&lt;/script&gt;",
    },
    mixedContent: {
      title: "Mixed content",
      input:
        '<div class="test" onclick="alert(\'click\')">Content & More</div>',
      output:
        "&lt;div class=&quot;test&quot; onclick=&quot;alert(&#x27;click&#x27;)&quot;&gt;Content &amp; More&lt;/div&gt;",
    },
  },
  faqList: [
    {
      q: "What is HTML escaping?",
      a: 'HTML escaping is the process of converting characters that have special meaning in HTML (<, >, &, ", etc.) into character references so they display correctly in browsers. It also plays an important role in preventing XSS attacks.',
    },
    {
      q: "Which characters are escaped?",
      a: "The main characters that are escaped are: < becomes &lt;, > becomes &gt;, & becomes &amp;, \" becomes &quot;, ' becomes &#x27;. These characters have special meaning in HTML, so they need to be escaped to display as text.",
    },
    {
      q: "When should I use HTML escaping?",
      a: "Use HTML escaping when embedding user input into HTML, when displaying HTML tags as text, and as a security measure to prevent XSS attacks. It's essential in web application development.",
    },
    {
      q: "When do I use unescaping?",
      a: "Use unescaping when you want to convert escaped HTML back to its original form or when restoring escaped data saved in a database. However, use it carefully with understanding of security risks.",
    },
  ],
};
