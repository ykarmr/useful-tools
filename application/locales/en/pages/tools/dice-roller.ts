import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "Dice Roller",
  subTitle: "Digital Polyhedral Dice Tool",
  description:
    "Online tool for rolling various dice types from 4 to 32 sides with statistics and history tracking.",
  keywords: [
    "dice roller",
    "dice",
    "random",
    "gaming",
    "tabletop",
    "polyhedral",
  ],
  sides: "Sides",
  roll: "Roll",
  count: "Count",
  total: "Total",
  history: "History",
  clearHistory: "Clear History",
  statistics: {
    title: "Statistics",
    overallStats: "Overall Statistics",
    totalRolls: "Total Dice",
    rollSessions: "Roll Sessions",
    averageValue: "Average",
    highestLowest: "High/Low",
    currentSettings: "Current Settings",
    totalSum: "Total Sum",
    distribution: "Roll Distribution",
  },
  howToUse: {
    title: "How to Use",
    steps: [
      "Select dice type (4 to 32 sides available)",
      "Set number of dice to roll (1 to 10)",
      "Click the Roll button",
      "View animated results and check detailed statistics in history",
    ],
  },
  features: {
    title: "Features",
    items: [
      "9 different dice types from 4 to 32 sides",
      "Roll up to 10 dice simultaneously",
      "Real-time animation display",
      "Cryptographically secure random generation",
      "Detailed statistics (average, high/low, distribution)",
      "History tracking for last 10 rolls",
    ],
  },
  faqList: [
    {
      q: "What types of dice are available?",
      a: "You can use 4, 6, 8, 10, 12, 16, 20, 24, and 32-sided dice. This covers all common polyhedral dice used in tabletop RPGs and board games.",
    },
    {
      q: "What's the maximum number of dice I can roll?",
      a: "You can roll up to 10 dice simultaneously. Use the dropdown menu to select from 1 to 10 dice.",
    },
    {
      q: "Are the results truly random?",
      a: "Yes, we use JavaScript's cryptographically secure random number generation to ensure completely random results. Each side has an equal probability of being rolled.",
    },
    {
      q: "Can I view my roll history?",
      a: "Yes, the last 10 rolls are displayed in the history section with detailed statistics for each roll, including average values, highest/lowest results, and outcome distribution.",
    },
    {
      q: "Can I roll again during animation?",
      a: "No, the roll button is disabled during the animation (about 1 second). You can roll again once the animation completes.",
    },
    {
      q: "What can I use this tool for?",
      a: "Perfect for tabletop RPGs (D&D, Pathfinder, etc.), board games, probability learning, and any situation requiring random selection. The detailed statistics make it ideal for probability education.",
    },
  ],
};
