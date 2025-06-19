import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "Dice Roller",
  description: "Roll dice with customizable sides",
  keywords: [
    "dice roller",
    "dice",
    "roll dice",
    "random number",
    "gaming",
    "tabletop games",
  ],
  sides: "Sides",
  roll: "Roll Dice",
  result: "Result",
  resultMessage: "You rolled a {result}!",
  selectCount: "Select number of dice to roll",
  howToUse: {
    title: "How to Use Dice Roller",
    steps: [
      "Select the number of sides for the dice (4 to 32 sides)",
      "Choose the number of dice to roll (1 to 10 dice)",
      "Click the 'Roll Dice' button",
      "Watch the dice animate and see the results displayed",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Support for various dice types from 4 to 32 sides",
      "Roll up to 10 dice simultaneously",
      "Real-time animation display",
      "Completely random result generation",
      "Perfect for tabletop RPGs and board games",
      "Simple and intuitive operation",
    ],
  },
  faqList: [
    {
      q: "What types of dice are available?",
      a: "You can use 4-sided, 6-sided, 8-sided, 10-sided, 12-sided, 16-sided, 20-sided, 24-sided, and 32-sided dice. All common dice used in tabletop RPGs and board games are supported.",
    },
    {
      q: "What is the maximum number of dice I can roll at once?",
      a: "You can roll up to 10 dice simultaneously. Use the dropdown menu to select between 1 and 10 dice.",
    },
    {
      q: "Are the dice results truly random?",
      a: "Yes, we use JavaScript's Math.random() function to generate completely random results. Each face has an equal probability of appearing, ensuring fair outcomes.",
    },
    {
      q: "Can I view the history of my dice rolls?",
      a: "The current version does not include a history feature. Only the latest result is displayed, and previous results are overwritten when you roll new dice.",
    },
    {
      q: "Can I roll the dice again while the animation is playing?",
      a: "No, the button is disabled during the animation (approximately 1 second). You can roll the dice again once the animation is complete.",
    },
    {
      q: "What can I use this tool for?",
      a: "This tool is perfect for tabletop RPGs (D&D, Pathfinder, etc.), board games, probability learning, random selection scenarios, and any situation where you need fair, random results.",
    },
  ],
};
