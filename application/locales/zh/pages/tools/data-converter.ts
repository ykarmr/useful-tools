import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "数据格式转换器",
  description: "在线工具，用于JSON、YAML、TOML和XML数据格式之间的转换。",
  keywords: [
    "数据转换",
    "格式转换",
    "JSON",
    "YAML",
    "TOML",
    "XML",
    "配置文件",
    "转换工具",
  ],
  inputLabel: "输入数据",
  outputLabel: "转换结果",
  formatLabel: "输出格式",
  sampleDataLabel: "示例数据",
  outputPlaceholder: "转换结果将在此处显示...",
  convertButton: "转换",
  copyButton: "复制",
  clearButton: "清除",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
    xml: "XML",
  },
  placeholders: {
    json: '{\n  "name": "示例",\n  "version": "1.0.0",\n  "description": "示例JSON数据"\n}',
    yaml: 'name: 示例\nversion: "1.0.0"\ndescription: 示例YAML数据',
    toml: 'name = "示例"\nversion = "1.0.0"\ndescription = "示例TOML数据"',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <name>示例</name>\n  <version>1.0.0</version>\n  <description>示例XML数据</description>\n</root>',
  },
  messages: {
    conversionSuccess: "转换成功完成",
    invalidFormat: "输入数据格式无效",
    emptyInput: "请输入要转换的数据",
    copied: "已复制到剪贴板",
  },
  features: {
    title: "功能",
    list: [
      "JSON ⇔ YAML ⇔ TOML ⇔ XML 相互转换",
      "语法高亮显示",
      "错误验证和格式检查",
      "一键复制功能",
      "实时预览",
    ],
  },
  faqList: [
    {
      q: "可以转换哪些数据格式？",
      a: "支持JSON、YAML、TOML和XML格式，可在这些格式之间进行相互转换。",
    },
    {
      q: "转换过程中会丢失数据吗？",
      a: "基本数据结构会被保留，但格式特定的功能（XML属性、TOML注释等）在转换时可能会丢失。",
    },
    {
      q: "可以转换大文件吗？",
      a: "由于在浏览器中运行，非常大的文件可能会导致性能下降。对于典型的配置文件大小可以正常工作。",
    },
    {
      q: "转换后的数据存储在哪里？",
      a: "此工具完全在浏览器中运行，数据不会发送到外部服务器。请将转换结果复制到剪贴板使用。",
    },
  ],
};
