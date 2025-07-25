import { RandomNumberTranslations } from "@/locales/types/pages/tools/random-number";

export const randomNumber: RandomNumberTranslations = {
  title: "Random Number Generator",
  subtitle: "Generate random numbers instantly within specified ranges",
  description:
    "A simple tool to generate random integers within your specified range. Perfect for games, lotteries, sampling, and various other applications where you need random numbers.",
  keywords: [
    "random",
    "number",
    "generator",
    "random number",
    "integer",
    "range",
    "lottery",
    "sampling",
  ],
  min: "Minimum",
  max: "Maximum",
  generate: "Generate Number",
  howToUse: {
    title: "How to Use",
    steps: [
      "Enter the minimum and maximum values",
      "Click the 'Generate Number' button",
      "A random number within the specified range will be displayed",
      "Click the button again to generate a new random number",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Random number generation within any integer range",
      "Real-time result display",
      "Error handling and validation",
      "Responsive design",
      "Smooth animations",
    ],
  },
  faqList: [
    {
      q: "What type of random numbers are generated?",
      a: "Random integers are generated with equal probability within the specified minimum and maximum range using JavaScript's Math.random() function with a pseudo-random algorithm.",
    },
    {
      q: "Are there any limits on the minimum and maximum values?",
      a: "The minimum value must be less than the maximum value. While technically very large values are possible, we recommend staying within reasonable ranges due to JavaScript's number precision limitations.",
    },
    {
      q: "Can the same number be generated consecutively?",
      a: "Yes, due to the nature of randomness, the same number can be generated consecutively. This is normal behavior and demonstrates true randomness.",
    },
    {
      q: "Are these cryptographically secure random numbers?",
      a: "No, the numbers generated by this tool are not cryptographically secure. Do not use them for passwords, encryption keys, or other security purposes. They're suitable for games and general applications.",
    },
    {
      q: "Can I generate negative numbers?",
      a: "Yes, you can set a negative minimum value to generate random numbers that include negative values. For example, you can generate numbers from -100 to 100.",
    },
  ],
};
