import type { HtmlEscapeTranslations } from "../../types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "HTML转义工具",
  description: "安全地转义和反转义HTML特殊字符的工具。",
  keywords: [
    "HTML转义",
    "HTML特殊字符",
    "字符转义",
    "HTML转换",
    "开发工具",
    "字符编码",
    "安全",
    "XSS防护",
  ],
  inputLabel: "要转义的字符串",
  inputPlaceholder:
    '输入HTML代码（例如：<div class="example">Hello & World</div>）',
  outputLabel: "转义后的字符串",
  outputPlaceholder: "转义结果将在此显示",
  escapeButton: "转义",
  unescapeButton: "反转义",
  clearButton: "清除",
  copyButton: "复制",
  copiedMessage: "已复制！",
  stats: {
    title: "统计信息",
    originalLength: "原始长度",
    escapedLength: "转换后长度",
    charactersEscaped: "转义字符数",
  },
  examples: {
    title: "示例",
    basicHtml: {
      title: "基本HTML标签",
      input: "<div>Hello World</div>",
      output: "&lt;div&gt;Hello World&lt;/div&gt;",
    },
    attributes: {
      title: "HTML属性",
      input: '<img src="image.jpg" alt="My Image">',
      output: "&lt;img src=&quot;image.jpg&quot; alt=&quot;My Image&quot;&gt;",
    },
    quotes: {
      title: "引号和&符号",
      input: 'Say "Hello" & goodbye',
      output: "Say &quot;Hello&quot; &amp; goodbye",
    },
  },
  faqList: [
    {
      q: "什么是HTML转义？",
      a: 'HTML转义是将在HTML中具有特殊含义的字符（<、>、&、"等）转换为字符引用的过程，以便它们在浏览器中正确显示。它在防止XSS攻击方面也起着重要作用。',
    },
    {
      q: "哪些字符会被转义？",
      a: "主要被转义的字符包括：< 变成 &lt;，> 变成 &gt;，& 变成 &amp;，\" 变成 &quot;，' 变成 &#x27;。这些字符在HTML中具有特殊含义，因此需要转义才能显示为文本。",
    },
    {
      q: "何时应该使用HTML转义？",
      a: "在将用户输入嵌入HTML时、想要将HTML标签显示为文本时，以及作为防止XSS攻击的安全措施时使用HTML转义。这在Web应用程序开发中是必需的。",
    },
    {
      q: "何时使用反转义？",
      a: "当您想要将转义的HTML转换回原始形式或恢复保存在数据库中的转义数据时使用反转义。但是，请在理解安全风险的基础上谨慎使用。",
    },
  ],
};
