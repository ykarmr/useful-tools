import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "硬币翻转",
  subTitle: "快速决策工具",
  description:
    "使用我们直观的硬币翻转工具快速做出决策。支持多枚硬币，提供即时、公平的随机结果，帮助您在选择之间做出决定。",
  keywords: [
    "硬币翻转",
    "抛硬币",
    "决策工具",
    "随机选择",
    "正反面",
    "决策制定",
    "快速决定",
    "二元选择",
    "运气游戏",
  ],
  flip: "翻转硬币",
  heads: "正面",
  tails: "反面",
  flipping: "翻转中...",
  selectCount: "硬币数量",
  coinSingular: "枚",
  coinPlural: "枚",
  result: "结果",
  howToUse: {
    title: "使用方法",
    steps: [
      "选择要翻转的硬币数量（1-10枚硬币）",
      "点击「翻转硬币」按钮",
      "观看硬币旋转并确定结果",
      "查看结果（正面或反面）",
    ],
    features: {
      title: "功能",
      items: [
        "同时翻转多枚硬币（最多10枚硬币）",
        "实时动画显示",
        "即时结果显示",
        "完全随机的结果生成",
      ],
    },
  },
  faqList: [
    {
      q: "如何翻转硬币？",
      a: "点击「翻转硬币」按钮来抛硬币并查看结果。",
    },
    {
      q: "结果是如何确定的？",
      a: "结果通过随机数生成器确定。每个结果的概率为50%。",
    },
    {
      q: "硬币结果何时更新？",
      a: "每次翻转硬币时，结果都会更新。",
    },
    {
      q: "会保存翻转历史吗？",
      a: "此工具不保存历史记录。结果仅在当前会话中显示。",
    },
    {
      q: "可以同时翻转多枚硬币吗？",
      a: "是的，您可以在开始前选择要翻转的硬币数量（1-10枚）。",
    },
  ],
};
