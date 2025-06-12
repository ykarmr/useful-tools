import type { JsonFormatterTranslations } from "../types";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "JSON Formatter",
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
  faqList: [
    {
      q: "What is a JSON formatter?",
      a: "A JSON formatter is a tool that beautifies and validates JSON (JavaScript Object Notation) data, making it more readable and identifying syntax errors.",
    },
    {
      q: "How are invalid JSON files handled?",
      a: "When invalid JSON is entered, an error message is displayed to help identify the problematic areas.",
    },
    {
      q: "Can it handle large JSON files?",
      a: "Yes, but very large files may cause slower performance due to browser limitations.",
    },
    {
      q: "Is my data secure?",
      a: "All processing is done within your browser and no data is sent to any server.",
    },
  ],
};
