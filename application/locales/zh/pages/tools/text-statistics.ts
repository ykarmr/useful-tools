import { TextStatisticsTranslations } from "../../../types/pages/tools/text-statistics";

export const textStatistics: TextStatisticsTranslations = {
  title: "文本统计分析器",
  subtitle: "即时分析详细的文本统计信息",
  description:
    "分析文本字符数、单词数、阅读时间和详细统计信息的综合文本分析工具",
  keywords: [
    "文本分析",
    "字符计数",
    "单词计数",
    "阅读时间",
    "文本统计",
    "文本分析器",
    "文档分析",
    "写作工具",
    "字符串统计",
  ],
  inputLabel: "输入要分析的文本",
  inputPlaceholder: "输入要分析的文本...",
  inputDescription:
    "在此区域输入要分析的文本。将自动计算字符数、单词数、阅读时间和其他统计信息。",
  inputAriaLabel: "文本分析输入区域",
  inputCharacterCount: "已输入字符数：{count}",
  frequencyCount: "{count}次",
  exportOptions: "导出选项",
  emptyStateTitle: "请输入要分析的文本",
  emptyStateDescription: "将显示字符数、单词数、阅读时间和其他详细统计信息",
  analyzeText: "分析文本",
  clear: "清除",
  statistics: "统计信息",
  characters: "字符数（含空格）",
  charactersNoSpaces: "字符数（不含空格）",
  words: "单词数",
  sentences: "句子数",
  paragraphs: "段落数",
  lines: "行数",
  readingTime: "阅读时间",
  minutes: "分钟",
  readingSpeed: "阅读速度",
  wordsPerMinute: "字/分钟",
  avgWordsPerSentence: "每句平均字数",
  avgSentencesPerParagraph: "每段平均句数",
  mostCommonWords: "最常用词",
  word: "词语",
  frequency: "频率",
  textComplexity: "文本复杂度",
  simple: "简单",
  moderate: "中等",
  complex: "复杂",
  languageDetection: "语言检测",
  detected: "检测到的语言",
  unknown: "未知",
  copyStats: "复制统计信息",
  copied: "已复制",
  exportData: "导出数据",
  downloadTXT: "下载统计信息为TXT",
  downloadJSON: "下载统计信息为JSON",
  noText: "请输入要分析的文本。",
  howToUse: {
    title: "使用方法",
    steps: [
      "在上方的文本区域输入您想要分析的文本",
      "字符数、单词数和句子数等基本统计信息会自动显示",
      "阅读时间和文本复杂度也会同时分析",
      "复制统计信息或将其下载为文件",
    ],
  },
  features: {
    title: "功能特点",
    items: [
      "自动统计字符、单词、句子和段落数量",
      "阅读时间估算（针对不同语言优化）",
      "文本复杂度分析",
      "自动语言检测",
      "词频分析",
      "统计数据导出功能",
      "实时分析",
      "多语言支持",
    ],
  },
  faqList: [
    {
      q: "阅读时间是如何计算的？",
      a: "阅读时间基于平均阅读速度计算。我们对日文使用400字符/分钟，对中文使用400字符/分钟。这是一个估计值，因为个人阅读速度会有所不同。",
    },
    {
      q: "支持哪些语言？",
      a: "支持主要语言，包括日语、英语、中文、韩语、俄语、西班牙语和法语。对每种语言都会执行针对性优化的分析。",
    },
    {
      q: "如何计算单词数？",
      a: "根据语言执行适当的词语分割。英语使用空格分隔符，而中文将汉字、假名、片假名和字母数字字符的组合识别为词语。",
    },
    {
      q: "如何确定文本复杂度？",
      a: "文本复杂度基于每句话的平均词数确定。对于中文：少于15个词为简单，15-25个词为中等，超过25个词为复杂。",
    },
    {
      q: "我可以导出统计信息吗？",
      a: "是的。您可以将统计信息下载为文本文件（.txt）或JSON格式。这便于数据存储和与其他工具的集成。",
    },
    {
      q: "我输入的文本会被存储吗？",
      a: "不会。输入的文本仅在您的浏览器内处理，绝不会发送到服务器。您的隐私受到保护。",
    },
  ],
};
