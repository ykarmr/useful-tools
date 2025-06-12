import type { RandomStringTranslations } from "../types";

export const randomString: RandomStringTranslations = {
  title: "Random String Generator",
  description: "Generate random strings for passwords or IDs",
  keywords: [
    "random string",
    "generator",
    "password",
    "ID",
    "random",
    "string",
  ],
  length: "Length",
  includeNumbers: "Include Numbers",
  includeSymbols: "Include Symbols",
  generate: "Generate String",
  result: "Generated String",
  faqList: [
    {
      q: "What characters are included?",
      a: "By default, letters (uppercase and lowercase) are included. You can optionally add numbers and symbols.",
    },
    {
      q: "How strong are the generated strings?",
      a: "Strength depends on the length and types of characters used. Longer strings with numbers and symbols are stronger.",
    },
    {
      q: "Is it safe to use for passwords?",
      a: "It's suitable for general use, but for important accounts, we recommend using a dedicated password manager.",
    },
    {
      q: "Is it possible to generate the same string?",
      a: "It depends on the number of characters and combinations used, but with sufficient length, the possibility of duplication is very low.",
    },
  ],
};
