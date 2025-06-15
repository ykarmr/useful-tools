import { RandomStringTranslations } from "@/locales/types/pages/tools/random-string";

export const randomString: RandomStringTranslations = {
  title: "随机字符串生成器",
  description: "为密码或ID生成随机字符串",
  keywords: ["随机字符串", "生成器", "密码", "ID", "随机", "字符串"],
  generate: "生成字符串",
  length: "长度",
  result: "生成的字符串",
  includeNumbers: "包含数字",
  includeSymbols: "包含符号",
  faqList: [
    {
      q: "包含哪些字符？",
      a: "默认包含字母（大写和小写）。您可以选择添加数字和符号。",
    },
    {
      q: "生成的字符串有多强？",
      a: "强度取决于长度和使用的字符类型。包含数字和符号的较长字符串更强。",
    },
    {
      q: "用作密码安全吗？",
      a: "适合一般用途，但对于重要账户，我们建议使用专用密码管理器。",
    },
    {
      q: "可能生成相同的字符串吗？",
      a: "这取决于字符数量和使用的组合，但有足够的长度，重复的可能性非常低。",
    },
  ],
};

export default randomString;
