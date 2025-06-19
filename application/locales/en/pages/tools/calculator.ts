import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

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
  howToUse: {
    title: "How to Use",
    steps: [
      "Click the number buttons on the screen to enter values",
      "Click an operator button (+, -, ×, ÷) to select the desired operation",
      "Enter the next number",
      "Click the '=' button to display the calculation result",
      "Use the 'C' button to clear all values",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Basic four arithmetic operations (addition, subtraction, multiplication, division)",
      "Calculations with decimal numbers",
      "Sign switching (± button)",
      "Percentage calculation (% button)",
      "One-click clear function",
      "Responsive design for mobile compatibility",
    ],
  },
  faqList: [
    {
      q: "How do I perform calculations?",
      a: "Press the number buttons to enter values, select an operator (+, -, ×, ÷), and press '=' to display the result.",
    },
    {
      q: "Can I use decimal points?",
      a: "Yes, you can enter decimal points by pressing the '.' button. Calculations with decimals are handled accurately.",
    },
    {
      q: "How do I reset calculations?",
      a: "Press the 'C' button to reset all inputs and calculation history, allowing you to start a new calculation.",
    },
    {
      q: "How does the ± button work?",
      a: "It instantly toggles the sign (positive/negative) of the currently displayed number. Useful for calculations with negative numbers.",
    },
    {
      q: "How does the % button work?",
      a: "It converts the current number to a percentage (divides by 100). For example: entering 50 and pressing % gives 0.5.",
    },
    {
      q: "Can I perform continuous calculations?",
      a: "Yes, after a calculation result is displayed, you can press the next operator to continue calculating continuously.",
    },
    {
      q: "What if an error is displayed?",
      a: "Errors appear when invalid calculations (like division by zero) are performed. Press the 'C' button to reset.",
    },
  ],
};
