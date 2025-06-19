import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "Coin Flip",
  description: "Flip a coin for quick decisions",
  keywords: [
    "coin flip",
    "coin toss",
    "decision making",
    "random choice",
    "heads or tails",
  ],
  flip: "Flip Coin",
  heads: "Heads",
  tails: "Tails",
  flipping: "Flipping...",
  selectCount: "Select number of flips",
  howToUse: {
    title: "How to Use",
    steps: [
      "Select the number of coins to flip (1-10 coins)",
      "Click the 'Flip Coin' button",
      "Watch the coins spin and randomly determine the result",
      "View the result (heads or tails) displayed",
    ],
    features: {
      title: "Features",
      items: [
        "Multiple coin flips simultaneously (up to 10 coins)",
        "Real-time animation display",
        "Instant result display",
        "Completely random result generation",
      ],
    },
  },
  faqList: [
    {
      q: "How do I flip the coin?",
      a: "Click the 'Flip Coin' button to toss the coin and see the result.",
    },
    {
      q: "How is the result determined?",
      a: "The result is determined randomly, showing either heads or tails.",
    },
    {
      q: "When is the coin result updated?",
      a: "The result updates each time you flip the coin.",
    },
    {
      q: "Is there a history of coin flips?",
      a: "This tool does not save history; results are shown only for the current session.",
    },
    {
      q: "Can I flip multiple coins at once?",
      a: "Yes, you can select the number of coins to flip before starting.",
    },
  ],
};
