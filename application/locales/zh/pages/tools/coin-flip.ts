import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "硬币翻转",
  description: "快速决策的硬币翻转",
  keywords: ["硬币翻转", "抛硬币", "决策", "随机选择", "正反面"],
  flip: "翻转硬币",
  heads: "正面",
  tails: "反面",
  flipping: "翻转中...",
  selectCount: "选择翻转次数",
  faqList: [
    {
      q: "如何翻转硬币？",
      a: "点击“翻转硬币”按钮来抛硬币并查看结果。",
    },
    {
      q: "结果是如何确定的？",
      a: "结果是随机确定的，显示正面或反面。",
    },
    {
      q: "硬币结果何时更新？",
      a: "每次翻转硬币时，结果都会更新。",
    },
    {
      q: "硬币翻转的历史会保存吗？",
      a: "此工具不保存历史记录；结果仅在当前会话中显示。",
    },
    {
      q: "可以同时翻转多枚硬币吗？",
      a: "是的，您可以在开始前选择要翻转的硬币数量。",
    },
  ],
};
