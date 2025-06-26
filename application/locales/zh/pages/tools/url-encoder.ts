import { UrlEncoderTranslations } from "@/locales/types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "URL编码器/解码器",
  subtitle: "将URL中的特殊字符转换为安全格式",
  description: "编码和解码URL，用于安全传输和Web应用程序使用",
  keywords: [
    "URL编码器",
    "URL解码器",
    "URL编码",
    "URL解码",
    "URL工具",
    "百分号编码",
    "字符转换",
  ],
  encode: "编码",
  decode: "解码",
  switch: "切换模式",
  originalUrl: "原始URL",
  encodedUrl: "编码后的URL",
  examples: "示例",
  encodingExample: "编码示例:",
  specialCharacters: "特殊字符:",
  inputLabel: "输入:",
  outputLabel: "输出:",
  spaceToPercent: "空格 → %20, & → %26, = → %3D, ? → %3F",
  decodedUrl: "解码后的URL",
  invalidInput: "错误: 无效输入",
  enterUrl: "输入要编码的URL",
  enterEncodedUrl: "输入要解码的编码URL",
  howToUse: {
    title: "如何使用URL编码器/解码器",
    steps: [
      "选择编码或解码模式",
      "在输入框中输入您的URL或编码URL",
      "结果将自动显示，可以复制到剪贴板",
      "使用切换按钮轻松在编码和解码模式之间切换",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      "实时编码和解码",
      "符合RFC 3986的百分号编码",
      "国际字符的安全转换",
      "一键复制到剪贴板",
      "无效输入的错误处理",
      "适用于所有设备的响应式设计",
    ],
  },
  faqList: [
    {
      q: "什么是URL编码？",
      a: "URL编码（百分号编码）是将不能在URL中使用的特殊字符和非ASCII字符转换为以%开头的十六进制代码的过程。这使得Web浏览器能够正确解释URL。",
    },
    {
      q: "什么时候需要URL编码？",
      a: "当搜索查询包含非英文字符、发送表单数据、指定API参数或文件名包含特殊字符时需要URL编码。这对于Web应用程序开发是必不可少的。",
    },
    {
      q: "哪些字符会被编码？",
      a: "空格、非ASCII字符、特殊符号（&、=、?、#、+等）、控制字符以及在URL中具有特殊含义的字符会被编码。安全字符（字母数字和某些符号）保持不变。",
    },
    {
      q: "我可以将编码的URL解码回原始形式吗？",
      a: "是的，您可以使用此工具的解码功能将编码的URL恢复为原始格式。但是，如果编码字符串格式不正确，将显示错误。",
    },
    {
      q: "此工具处理的URL长度是否有限制？",
      a: "该工具可以在浏览器限制内处理长URL，但通常建议URL长度少于2000个字符。非常长的URL可能会在某些Web服务器上造成问题。",
    },
  ],
};
