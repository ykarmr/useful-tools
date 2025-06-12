import type { CalculatorTranslations } from "../types";

export const calculator: CalculatorTranslations = {
  title: "Calculator",
  description: "A fully functional calculator with basic arithmetic operations",
  keywords: [
    "calculator",
    "math",
    "arithmetic",
    "addition",
    "subtraction",
    "multiplication",
    "division",
  ],
  faqList: [
    {
      q: "How do I perform calculations?",
      a: "Press the number buttons to enter values, select an operator (+, -, ×, ÷), and press '=' to display the result.",
    },
    {
      q: "Can I use decimal points?",
      a: "Yes, you can enter decimal points by pressing the '.' button.",
    },
    {
      q: "How do I clear the calculator?",
      a: "Press the 'C' button to reset all inputs.",
    },
    {
      q: "How does the ± button work?",
      a: "It toggles the sign (positive/negative) of the currently displayed number.",
    },
    {
      q: "How does the % button work?",
      a: "It converts the current number to a percentage (divides by 100).",
    },
    {
      q: "Is calculation history saved?",
      a: "This calculator only retains calculation history during the session. History is cleared when the page is reloaded.",
    },
    {
      q: "Can it handle complex calculations?",
      a: "It supports basic arithmetic operations (addition, subtraction, multiplication, division) but does not support complex functions or scientific calculations.",
    },
  ],
};
