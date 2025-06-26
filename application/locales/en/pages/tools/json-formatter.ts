import { JsonFormatterTranslations } from "@/locales/types/pages/tools/json-formatter";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "JSON Formatter",
  subtitle: "Format and validate JSON data beautifully",
  description:
    "Format, minify, and validate JSON data with syntax highlighting",
  keywords: [
    "JSON Formatter",
    "JSON Validator",
    "JSON Minifier",
    "JSON Beautifier",
    "Syntax Highlighting",
    "JSON Tools",
  ],
  input: "Input JSON",
  output: "Formatted Output",
  format: "Format",
  minify: "Minify",
  invalidJson: "Invalid JSON",
  indentSize: "Indent",
  uploadFile: "Upload File",
  statistics: "Statistics",
  lines: "Lines",
  characters: "Characters",
  size: "Size",
  examples: "Examples",
  basicObject: "Basic object:",
  objectWithArray: "Object with array:",
  download: "Download",
  placeholder: "Paste your JSON here or upload a file",
  indent2: "2 spaces",
  indent4: "4 spaces",
  indent8: "8 spaces",
  howToUse: {
    title: "How to Use",
    steps: [
      "Enter JSON data in the text area or use the 'Upload File' button to load a JSON file",
      "Select your preferred indent size (2, 4, or 8 spaces) as needed",
      "Click the 'Format' button to beautify JSON into a readable format",
      "Click the 'Minify' button to remove whitespace and minimize file size",
      "Errors are automatically detected and displayed with error messages",
      "Copy the formatted result to clipboard using the copy button or save as a file using the download button",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Beautiful JSON formatting and beautification",
      "JSON minification and compression",
      "Real-time JSON syntax validation",
      "JSON file upload support",
      "Download formatted JSON files",
      "Detailed statistics display (lines, characters, file size)",
      "Customizable indentation (2, 4, 8 spaces)",
      "One-click clipboard copy",
    ],
  },
  faqList: [
    {
      q: "What is a JSON formatter?",
      a: "A JSON formatter is an online tool that formats JSON (JavaScript Object Notation) data into a readable format and validates syntax errors. It helps developers work more efficiently with JSON data.",
    },
    {
      q: "What's the difference between 'Format' and 'Minify'?",
      a: "'Format' adds line breaks and indentation to make JSON human-readable. 'Minify' removes unnecessary whitespace and line breaks to minimize file size.",
    },
    {
      q: "How should I choose the indent size?",
      a: "Commonly, 2 or 4 spaces are used. Choose based on your project's coding standards or your preference for readability.",
    },
    {
      q: "Is there a file size limit for uploads?",
      a: "Files can be processed within browser limitations, but very large JSON files (several MB or more) may take longer to process.",
    },
    {
      q: "What happens if there are errors in my JSON?",
      a: "Syntax errors are automatically detected and displayed with error messages. Validation also runs when you move focus away from the input field.",
    },
    {
      q: "Is my processed JSON data stored anywhere?",
      a: "No, all processing is done entirely within your browser and no data is sent to any server. Your privacy and security are guaranteed.",
    },
  ],
};
