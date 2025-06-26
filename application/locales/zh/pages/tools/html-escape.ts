import { HtmlEscapeTranslations } from "@/locales/types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "HTML转义工具",
  subtitle: "安全地转义和反转义HTML特殊字符",
  description: "安全地转义和反转义HTML特殊字符。",
  keywords: [
    "HTML转义",
    "HTML特殊字符",
    "字符转义",
    "HTML转换",
    "开发工具",
    "字符编码转换",
    "安全",
    "XSS防护",
  ],
  howToUse: {
    title: "HTML转义工具使用方法",
    steps: [
      "在输入区域粘贴或输入HTML文本或HTML实体",
      "点击「转义」将特殊字符转换为HTML实体",
      "点击「反转义」将HTML实体转换回普通字符",
      "使用复制按钮复制结果，或点击清空重新开始",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      {
        title: "双向转换",
        description: "高精度执行HTML实体的转义和反转义",
      },
      {
        title: "XSS防护",
        description: "正确转义用户输入，防止跨站脚本攻击",
      },
      {
        title: "完整字符支持",
        description: "处理所有命名、数值和十六进制HTML实体",
      },
      {
        title: "实时处理",
        description: "通过详细统计和字符计数进行即时转换",
      },
    ],
  },
  inputLabel: "待转义文本",
  inputPlaceholder:
    '输入HTML代码（例：<div class="example">Hello & World</div>）',
  outputLabel: "转义后文本",
  outputPlaceholder: "转义结果将在此显示",
  escapeButton: "转义",
  unescapeButton: "反转义",
  clearButton: "清空",
  copyButton: "复制",
  copiedMessage: "已复制",
  // 错误信息
  messages: {
    inputRequired: "请输入要转义的文本",
    noContentToCopy: "没有可复制的内容",
    copyFailed: "复制失败",
    charactersEscaped: "个字符已转义",
    charactersUnescaped: "个字符已反转义",
  },
  // UI 文本
  ui: {
    characters: "字符",
    lines: "行",
    inputExample: "输入:",
    outputExample: "输出:",
  },
  stats: {
    title: "统计信息",
    originalLength: "原始字符数",
    escapedLength: "转换后字符数",
    charactersEscaped: "已转义字符数",
  },
  examples: {
    title: "使用示例",
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
      title: "引号和符号",
      input: 'Say "Hello" & goodbye',
      output: "Say &quot;Hello&quot; &amp; goodbye",
    },
    scriptTag: {
      title: "脚本标签（XSS防护）",
      input: '<script>alert("危险")</script>',
      output: "&lt;script&gt;alert(&quot;危险&quot;)&lt;/script&gt;",
    },
    mixedContent: {
      title: "混合内容",
      input:
        '<div class="test" onclick="alert(\'click\')">Content & More</div>',
      output:
        "&lt;div class=&quot;test&quot; onclick=&quot;alert(&#x27;click&#x27;)&quot;&gt;Content &amp; More&lt;/div&gt;",
    },
  },
  faqList: [
    {
      q: "什么是HTML转义？",
      a: 'HTML转义是将在HTML中具有特殊含义的字符（如<、>、&、"等）转换为字符引用，以便在浏览器中正确显示。它在防止XSS攻击方面也起着重要作用。',
    },
    {
      q: "哪些字符会被转义？",
      a: "主要转义以下字符：< 转为 &lt;，> 转为 &gt;，& 转为 &amp;，\" 转为 &quot;，' 转为 &#x27;。这些字符在HTML中具有特殊含义，因此需要转义才能作为文本显示。",
    },
    {
      q: "什么时候使用HTML转义？",
      a: "在将用户输入嵌入HTML时、将HTML标签作为文本显示时、以及作为防止XSS攻击的安全措施时使用。这是Web应用程序开发中的必要处理。",
    },
    {
      q: "什么时候使用反转义？",
      a: "在将转义的HTML恢复为原始形式时，或恢复数据库中存储的转义数据时使用。请在理解安全风险的基础上谨慎使用。",
    },
  ],
};
