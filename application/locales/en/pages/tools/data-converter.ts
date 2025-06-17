import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "Data Format Converter",
  description:
    "Online tool for converting between JSON, YAML, and TOML data formats. Perfect for configuration files and data structure conversion.",
  keywords: [
    "data conversion",
    "format conversion",
    "JSON",
    "YAML",
    "TOML",
    "config file",
    "converter tool",
    "structured data",
  ],
  inputLabel: "Input Data",
  outputLabel: "Conversion Result",
  formatLabel: "Format",
  sampleDataLabel: "Sample Data",
  outputPlaceholder: "Conversion result will be displayed here...",
  convertButton: "Convert",
  formatButton: "Format",
  copyButton: "Copy",
  clearButton: "Clear",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
  },
  placeholders: {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "Sample JSON data",\n  "features": ["lightweight", "readable", "widely used"]\n}',
    yaml: 'name: example\nversion: "1.0.0"\ndescription: Sample YAML data\nfeatures:\n  - highly readable\n  - supports comments\n  - perfect for config files',
    toml: 'name = "example"\nversion = "1.0.0"\ndescription = "Sample TOML data"\n\n[features]\nreadability = "high"\ncomments = "supported"\nuse_case = "config files"',
  },
  messages: {
    conversionSuccess: "Conversion completed successfully",
    formatSuccess: "Formatting completed successfully",
    invalidFormat: "Invalid input data format",
    emptyInput: "Please enter data to convert",
    copied: "Copied to clipboard",
    copyError: "Failed to copy",
  },
  features: {
    title: "Features & Benefits",
    list: [
      "Mutual conversion between JSON ⇔ YAML ⇔ TOML",
      "Manual format selection for reliable conversion",
      "Input data formatting for clean code",
      "3 types of sample data for testing",
      "One-click copy to clipboard",
      "Simple and intuitive user interface",
    ],
  },
  faqList: [
    {
      q: "How do I use this tool?",
      a: "Enter data in the left text area or try using the sample data buttons below. Select the input and output formats, then click the 'Convert' button to easily convert between formats.",
    },
    {
      q: "What data formats can be converted?",
      a: "Supports JSON, YAML, and TOML formats with mutual conversion between these three formats. Perfect for configuration files, API responses, and data exchange in various applications.",
    },
    {
      q: "What is the format feature for?",
      a: "The format feature beautifies your input data in the same format. It properly indents and organizes the structure to make your data more readable and understandable.",
    },
    {
      q: "What are the sample data buttons for?",
      a: "You can insert sample data for each format (JSON, YAML, TOML) into the input area to test the tool's functionality. They also serve as reference when using the tool for the first time.",
    },
    {
      q: "Will data be lost during conversion?",
      a: "Basic data structures (objects, arrays, strings, numbers, booleans) are accurately preserved. However, format-specific features (TOML comments, YAML anchors, etc.) may be lost during conversion.",
    },
    {
      q: "Can I save the converted data as a file?",
      a: "The conversion result can be copied to clipboard using the 'Copy' button. Then paste it into a text editor and save with the appropriate extension (.json, .yaml, .toml).",
    },
  ],
};
