import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

export const calculator: CalculatorTranslations = {
  title: "Online Calculator",
  subTitle: "Free High-Performance Calculator",
  description:
    "A simple and user-friendly online calculator that supports mathematical four arithmetic operations and decimal calculations. Free calculation tool that works instantly in your browser.",
  keywords: [
    "calculator",
    "online calculator",
    "free calculator",
    "math calculator",
    "arithmetic calculator",
    "decimal calculator",
    "web calculator",
    "browser calculator",
  ],
  howToUse: {
    title: "How to Use the Calculator",
    steps: [
      "Tap number buttons to input values",
      "Select an operator (+, -, ×, ÷) to specify calculation method",
      "Continue entering the second number",
      "Press '=' button to display the result",
      "Use 'C' button to reset input",
    ],
  },
  features: {
    title: "Calculator Features",
    items: [
      "Complete support for four arithmetic operations (addition, subtraction, multiplication, division)",
      "Accurate decimal point calculations",
      "Positive/negative number switching (± function)",
      "Percentage calculation feature",
      "One-touch clear function",
      "Smartphone and tablet compatible",
    ],
  },
  faqList: [
    {
      q: "How do I use the online calculator?",
      a: "Tap the number buttons to input values, select an operator (+, -, ×, ÷), continue entering the second number, and press '=' to display the calculation result.",
    },
    {
      q: "Can I perform decimal calculations?",
      a: "Yes, use the '.' button to input decimal points. The calculator accurately processes precise calculations including numbers like 0.5 or 3.14.",
    },
    {
      q: "How do I clear the calculation results?",
      a: "Tap the 'C' button to reset all input content and calculation history, allowing you to start fresh calculations.",
    },
    {
      q: "What is the ± button function?",
      a: "It instantly switches the sign of the displayed number. You can change positive numbers to negative and negative numbers to positive, making it convenient for minus calculations.",
    },
    {
      q: "How do I use the % button?",
      a: "It converts the entered number to a percentage (1/100th). For example: enter 50 and press % to convert it to 0.5.",
    },
    {
      q: "Can I perform continuous calculations?",
      a: "Absolutely. After the calculation result is displayed, you can continue pressing operators to perform continuous calculations using the previous result.",
    },
    {
      q: "What should I do if an error occurs?",
      a: "If an error occurs due to invalid calculations like division by zero, tap the 'C' button to reset and recalculate with correct values.",
    },
  ],
};
