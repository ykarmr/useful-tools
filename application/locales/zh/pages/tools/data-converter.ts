import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "数据格式转换器",
  subTitle: "JSON ⇔ YAML ⇔ TOML 转换器",
  description:
    "在线工具，可在 JSON、YAML 和 TOML 数据格式之间进行转换。非常适合配置文件和数据结构转换。",
  keywords: [
    "数据转换",
    "格式转换",
    "JSON",
    "YAML",
    "TOML",
    "配置文件",
    "转换工具",
    "结构化数据",
  ],
  inputLabel: "输入数据",
  outputLabel: "转换结果",
  formatLabel: "格式",
  sampleDataLabel: "示例数据",
  inputPlaceholder: "请输入要转换的数据...",
  outputPlaceholder: "转换结果将显示在这里...",
  convertButton: "转换",
  formatButton: "格式化",
  copyButton: "复制",
  clearButton: "清除",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
  },
  placeholders: {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "JSON格式示例数据",\n  "features": ["轻量级", "可读性强", "广泛使用"]\n}',
    yaml: 'name: example\nversion: "1.0.0"\ndescription: YAML格式示例数据\nfeatures:\n  - 高度可读\n  - 支持注释\n  - 非常适合配置文件',
    toml: 'name = "example"\nversion = "1.0.0"\ndescription = "TOML格式示例数据"\n\n[features]\nreadability = "高"\ncomments = "支持"\nuse_case = "配置文件"',
  },
  messages: {
    conversionSuccess: "转换成功完成",
    formatSuccess: "格式化成功完成",
    invalidFormat: "输入数据格式无效",
    emptyInput: "请输入要转换的数据",
    copied: "已复制到剪贴板",
    copyError: "复制失败",
  },
  howToUse: {
    title: "使用方法",
    steps: [
      "在左侧区域输入要转换的数据",
      "选择输入格式（JSON/YAML/TOML）",
      "选择输出格式（JSON/YAML/TOML）",
      "点击'转换'按钮执行转换",
      "查看转换结果，如需要可进行复制",
    ],
  },
  features: {
    title: "功能特色",
    list: [
      "JSON ⇔ YAML ⇔ TOML 之间的相互转换",
      "手动格式选择，确保转换可靠",
      "输入数据格式化功能，代码更整洁",
      "3种示例数据可供测试",
      "一键复制到剪贴板",
      "简单直观的用户界面",
    ],
  },
  faqList: [
    {
      q: "如何使用这个工具？",
      a: '在左侧文本区域输入数据或尝试使用示例数据按钮。选择输入和输出格式，然后点击"转换"按钮即可轻松在格式之间进行转换。',
    },
    {
      q: "可以转换哪些数据格式？",
      a: "支持JSON、YAML和TOML格式，这三种格式之间可以相互转换。非常适合配置文件、API响应和各种应用程序中的数据交换。",
    },
    {
      q: "格式化功能是做什么的？",
      a: "格式化功能可以美化您的输入数据，保持相同格式。它会正确缩进并整理结构，使您的数据更易读和理解。",
    },
    {
      q: "示例数据按钮有什么用？",
      a: "您可以将每种格式（JSON、YAML、TOML）的示例数据插入到输入区域来测试工具的功能。它们也可以作为首次使用工具时的参考。",
    },
    {
      q: "转换过程中会丢失数据吗？",
      a: "基本数据结构（对象、数组、字符串、数字、布尔值）会被准确保留。但是，格式特定的功能（TOML注释、YAML锚点等）在转换过程中可能会丢失。",
    },
    {
      q: "可以将转换后的数据保存为文件吗？",
      a: '转换结果可以使用"复制"按钮复制到剪贴板。然后粘贴到文本编辑器中，并以适当的扩展名（.json、.yaml、.toml）保存。',
    },
  ],
};
