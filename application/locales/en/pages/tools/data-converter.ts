import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "Data Format Converter",
  description:
    "Online tool for converting between JSON, YAML, TOML, and XML data formats.",
  keywords: [
    "data conversion",
    "format conversion",
    "JSON",
    "YAML",
    "TOML",
    "XML",
    "config file",
    "converter tool",
  ],
  inputLabel: "Input Data",
  outputLabel: "Conversion Result",
  formatLabel: "Output Format",
  sampleDataLabel: "Sample Data",
  outputPlaceholder: "Conversion result will be displayed here...",
  convertButton: "Convert",
  copyButton: "Copy",
  clearButton: "Clear",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
    xml: "XML",
  },
  placeholders: {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "Sample JSON data"\n}',
    yaml: 'name: example\nversion: "1.0.0"\ndescription: Sample YAML data',
    toml: 'name = "example"\nversion = "1.0.0"\ndescription = "Sample TOML data"',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <name>example</name>\n  <version>1.0.0</version>\n  <description>Sample XML data</description>\n</root>',
  },
  messages: {
    conversionSuccess: "Conversion completed successfully",
    invalidFormat: "Invalid input data format",
    emptyInput: "Please enter data to convert",
    copied: "Copied to clipboard",
  },
  features: {
    title: "Features",
    list: [
      "Mutual conversion between JSON ⇔ YAML ⇔ TOML ⇔ XML",
      "Syntax highlighting display",
      "Error validation and format verification",
      "One-click copy function",
      "Real-time preview",
    ],
  },
  faqList: [
    {
      q: "What data formats can be converted?",
      a: "Supports JSON, YAML, TOML, and XML formats with mutual conversion between these formats.",
    },
    {
      q: "Will data be lost during conversion?",
      a: "Basic data structures are preserved, but format-specific features (XML attributes, TOML comments, etc.) may be lost during conversion.",
    },
    {
      q: "Can large files be converted?",
      a: "Since it runs in the browser, performance may degrade with very large files. Works fine with typical configuration file sizes.",
    },
    {
      q: "Where is the converted data stored?",
      a: "This tool runs entirely in the browser and data is not sent to external servers. Copy the conversion result to clipboard for use.",
    },
  ],
};
