import { JsonFormatterTranslations } from "@/locales/types/pages/tools/json-formatter";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "JSON格式化器",
  subtitle: "优雅地格式化和验证JSON数据",
  description: "格式化、验证和美化JSON数据",
  keywords: [
    "JSON格式化器",
    "JSON验证器",
    "JSON压缩器",
    "JSON美化器",
    "语法高亮",
    "JSON工具",
  ],
  format: "格式化",
  minify: "压缩",
  download: "下载",
  placeholder: "在此粘贴或输入您的JSON数据...",
  invalidJson: "无效的JSON",
  statistics: "统计",
  characters: "字符数",
  lines: "行数",
  size: "大小",
  indentSize: "缩进大小",
  input: "输入JSON",
  output: "格式化输出",
  uploadFile: "上传文件",
  examples: "示例",
  basicObject: "基本对象:",
  objectWithArray: "包含数组的对象:",
  indent2: "2个空格",
  indent4: "4个空格",
  indent8: "8个空格",
  howToUse: {
    title: "使用方法",
    steps: [
      '在文本区域输入JSON数据或使用"上传文件"按钮加载JSON文件',
      "根据需要选择首选的缩进大小（2、4或8个空格）",
      '点击"格式化"按钮将JSON转换为可读格式',
      '点击"压缩"按钮删除空白字符并最小化文件大小',
      "错误会自动检测并显示错误消息",
      "使用复制按钮将格式化结果复制到剪贴板，或使用下载按钮保存为文件",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      "优美的JSON格式化和美化",
      "JSON压缩和最小化",
      "实时JSON语法验证",
      "JSON文件上传支持",
      "下载格式化的JSON文件",
      "详细统计信息显示（行数、字符数、文件大小）",
      "可自定义缩进（2、4、8个空格）",
      "一键复制到剪贴板",
    ],
  },
  faqList: [
    {
      q: "什么是JSON格式化工具？",
      a: "JSON格式化工具是一个在线工具，用于将JSON（JavaScript Object Notation）数据格式化为可读格式并验证语法错误。它帮助开发者更高效地处理JSON数据。",
    },
    {
      q: '"格式化"和"压缩"有什么区别？',
      a: '"格式化"添加换行符和缩进，使JSON对人类可读。"压缩"删除不必要的空白字符和换行符，以最小化文件大小。',
    },
    {
      q: "如何选择缩进大小？",
      a: "通常使用2个或4个空格。根据项目的编码标准或您对可读性的偏好来选择。",
    },
    {
      q: "上传文件有大小限制吗？",
      a: "可以在浏览器限制范围内处理文件，但非常大的JSON文件（几MB或更大）可能需要更长的处理时间。",
    },
    {
      q: "如果我的JSON有错误会怎样？",
      a: "语法错误会自动检测并显示相应的错误消息。当输入字段失去焦点时也会执行验证。",
    },
    {
      q: "我处理的JSON数据会被存储在某处吗？",
      a: "不会，所有处理都完全在您的浏览器内完成，不会向任何服务器发送数据。您的隐私和安全得到保障。",
    },
  ],
};
