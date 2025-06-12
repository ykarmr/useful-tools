import type { DiceRollerTranslations } from "../types";

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
  faqList: [
    {
      q: "How do I roll the dice?",
      a: "Click the 'Roll Dice' button to roll the dice and see the result.",
    },
    {
      q: "How is the result determined?",
      a: "The result is determined randomly based on the number of sides specified for the dice.",
    },
    {
      q: "When is the dice result updated?",
      a: "The result updates each time you roll the dice.",
    },
    {
      q: "Is there a history of dice rolls?",
      a: "This tool does not save history; results are shown only for the current session.",
    },
    {
      q: "Can I roll multiple dice at once?",
      a: "Yes, you can select the number of dice to roll before starting.",
    },
  ],
};
