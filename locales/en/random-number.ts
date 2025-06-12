import type { RandomNumberTranslations } from "../types";

export const randomNumber: RandomNumberTranslations = {
  title: "Random Number Generator",
  description: "Generate random numbers within a range",
  keywords: [
    "random",
    "number",
    "generator",
    "random number",
    "random number generator",
  ],
  min: "Minimum",
  max: "Maximum",
  generate: "Generate",
  faqList: [
    {
      q: "What type of random numbers are generated?",
      a: "Random integers are generated with equal probability within the specified minimum and maximum range.",
    },
    {
      q: "Are there any limits on the minimum and maximum values?",
      a: "The minimum value must be less than the maximum value. Very large values may affect precision.",
    },
    {
      q: "Can the same number be generated consecutively?",
      a: "Yes, since these are random numbers, the same number can be generated consecutively. This is normal behavior.",
    },
    {
      q: "Are these cryptographically secure random numbers?",
      a: "This tool is not suitable for security purposes such as passwords or encryption keys. It's intended for general use and games.",
    },
  ],
};
