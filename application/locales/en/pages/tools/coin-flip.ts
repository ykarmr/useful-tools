import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "Coin Flip",
  subTitle: "Quick Decision Making Tool",
  description:
    "Make swift decisions with our intuitive coin flip tool. Support for multiple coins and instant, fair random results to help you decide between options.",
  keywords: [
    "coin flip",
    "coin toss",
    "decision tool",
    "random choice",
    "heads or tails",
    "decision maker",
    "quick decision",
    "binary choice",
    "luck game",
  ],
  flip: "Flip Coin",
  heads: "Heads",
  tails: "Tails",
  flipping: "Flipping...",
  selectCount: "Number of coins",
  howToUse: {
    title: "How to Use",
    steps: [
      "Select the number of coins to flip (1-10 coins)",
      "Click the 'Flip Coin' button",
      "Watch the coins spin and determine the result",
      "View the result (heads or tails)",
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
      a: "The result is determined using a random number generator. Each outcome has a 50% probability.",
    },
    {
      q: "When does the coin result update?",
      a: "The result updates each time you flip the coin.",
    },
    {
      q: "Is coin flip history saved?",
      a: "This tool does not save history. Results are only shown for the current session.",
    },
    {
      q: "Can I flip multiple coins at once?",
      a: "Yes, you can select the number of coins to flip (1-10) before starting.",
    },
  ],
};
