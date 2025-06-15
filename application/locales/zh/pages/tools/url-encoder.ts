import { UrlEncoderTranslations } from "@/locales/types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "URL编码器",
  description: "编码和解码URL字符串",
  keywords: ["URL编码器", "URL解码器", "URL编码", "URL解码", "URL工具"],
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
  faqList: [
    {
      q: "什么是URL编码？",
      a: "URL编码是将不能在URL中使用的特殊字符转换为安全格式的过程。例如，空格变成%20。",
    },
    {
      q: "为什么需要URL编码？",
      a: "URL不能直接包含某些字符（空格、&、=等），因此需要将这些字符转换为以%开头的十六进制代码。",
    },
    {
      q: "哪些字符会被编码？",
      a: "空格、非ASCII字符、特殊符号（&、=、?、#等）以及在URL中具有特殊含义的字符会被编码。",
    },
    {
      q: "可以解码编码的URL吗？",
      a: "是的，此工具支持编码和解码。使用切换按钮在模式之间切换。",
    },
  ],
};
