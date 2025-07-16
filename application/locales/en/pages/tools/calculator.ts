import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

export const calculator: CalculatorTranslations = {
  title: "Scientific Calculator",
  subTitle: "Advanced scientific calculator with function support",
  description:
    "A comprehensive scientific calculator supporting trigonometric functions, logarithms, exponentials, square roots, and more. Features calculation history for efficient complex calculations.",
  keywords: [
    "scientific calculator",
    "function calculator",
    "trigonometric functions",
    "logarithm",
    "exponential",
    "square root",
    "math calculator",
    "calculation history",
    "web calculator",
  ],
  howToUse: {
    title: "How to Use the Scientific Calculator",
    steps: [
      "Use number buttons and operators for basic arithmetic operations",
      "Select scientific functions (sin, cos, tan, etc.) for advanced calculations",
      "Use parentheses to construct complex mathematical expressions",
      "Utilize constants (π, e) for mathematical calculations",
      "Access calculation history to reuse previous calculations",
      "Use memory functions to store and recall values",
    ],
  },
  features: {
    title: "Scientific Calculator Features",
    items: [
      "Trigonometric functions (sin, cos, tan) and inverse trigonometric functions",
      "Logarithmic functions (log, ln) and exponential function (exp)",
      "Square root, power, and absolute value calculations",
      "Mathematical constants (π, e) available",
      "Calculation history save and reuse functionality",
      "Memory functions (MC, MR, M+, M-, MS)",
      "Complex expressions with parentheses support",
      "Degree-based trigonometric calculations",
    ],
  },
  history: {
    title: "Calculation History",
    empty: "No calculations yet",
  },
  faqList: [
    {
      q: "How do I use the scientific calculator?",
      a: "Input values using number buttons and select operators or function buttons. For scientific functions, press the function button and then input the value in parentheses.",
    },
    {
      q: "How do I calculate trigonometric functions?",
      a: "Press sin, cos, or tan buttons to input the function. For example: sin(30) calculates the sine of 30 degrees. Input angles in degrees.",
    },
    {
      q: "How do I use the calculation history?",
      a: "The history panel on the right shows past calculations. Click on any history item to reuse that calculation expression. Use the clear button to delete all history.",
    },
    {
      q: "How do memory functions work?",
      a: "MS (Memory Store) saves current value, MR (Memory Recall) retrieves saved value, M+/M- adds/subtracts to memory value, and MC clears memory.",
    },
    {
      q: "How do I calculate logarithms?",
      a: "Use log button for common logarithm (base 10) and ln button for natural logarithm (base e). For example: log(100) equals 2, ln(e) equals 1.",
    },
    {
      q: "Can I use parentheses in calculations?",
      a: "Yes, use ( and ) buttons to input parentheses. Complex calculations like (2+3)×4 are accurately processed.",
    },
    {
      q: "How do I use constants π and e?",
      a: "Press π button for pi (3.14159...) and e button for Euler's number (2.71828...). You can use these constants in calculations.",
    },
    {
      q: "What should I do if an error occurs?",
      a: "If an error occurs due to invalid calculations, press the C button to reset and recalculate with the correct expression.",
    },
  ],
};
