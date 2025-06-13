import { JsonFormatterTranslations } from "@/locales/types/pages/tools/json-formatter";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "JSON格式化器",
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
  faqList: [
    {
      q: "什么是JSON格式化工具？",
      a: "JSON格式化工具用于美化和验证JSON（JavaScript Object Notation）数据，使其更易读并识别语法错误。",
    },
    {
      q: "如何处理无效的JSON文件？",
      a: "当输入无效JSON时，会显示错误消息以帮助识别问题区域。",
    },
    {
      q: "能处理大型JSON文件吗？",
      a: "可以，但由于浏览器限制，非常大的文件可能会导致性能变慢。",
    },
    {
      q: "我的数据安全吗？",
      a: "所有处理都在您的浏览器内完成，不会将数据发送到任何服务器。",
    },
  ],
};
