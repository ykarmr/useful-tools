import { RandomStringTranslations } from "@/locales/types/pages/tools/random-string";

export const randomString: RandomStringTranslations = {
  title: "Random String Generator",
  subTitle: "Generate secure passwords and IDs instantly",
  description:
    "Create strong passwords and unique IDs with customizable settings. Adjust security levels with number and symbol combinations using our powerful random string generator.",
  keywords: [
    "random string",
    "password generator",
    "ID generator",
    "string generator",
    "security",
    "random generation",
    "password tool",
    "string creator",
  ],
  length: "Length",
  includeNumbers: "Include Numbers",
  includeSymbols: "Include Symbols",
  generate: "Generate String",
  result: "Generated String",
  howToUse: {
    title: "How to Use Random String Generator",
    steps: [
      "Set desired character length with slider (4-50 characters)",
      "Check 'Include Numbers' to add digits",
      "Check 'Include Symbols' to add special characters",
      "Click 'Generate String' button",
      "Copy the generated string for use",
    ],
  },
  features: {
    title: "Random String Generator Features",
    items: [
      "Adjustable length from 4 to 50 characters",
      "Supports letters, numbers, and symbols combination",
      "One-click copy function for easy use",
      "Customizable security level options",
      "Completely browser-based and secure",
      "Full mobile and tablet compatibility",
    ],
  },
  faqList: [
    {
      q: "What characters are included?",
      a: "By default, uppercase and lowercase letters are included. You can optionally add numbers (0-9) and symbols (!@#$%^&* etc.). More character types result in stronger passwords.",
    },
    {
      q: "How secure are the generated strings?",
      a: "Security depends on length and character variety. Strings with 12+ characters including numbers and symbols provide adequate strength for general use. For critical accounts, 16+ characters are recommended.",
    },
    {
      q: "Can this replace a password manager?",
      a: "This tool is excellent for password generation but has no storage capability. We strongly recommend storing generated passwords in a trusted password manager.",
    },
    {
      q: "Is it possible to generate the same string twice?",
      a: "Theoretically possible but extremely unlikely. For example, with 12 characters using all character types, the probability of generating identical strings is astronomically small.",
    },
    {
      q: "Are generated strings stored anywhere?",
      a: "No, all processing occurs within your browser and generated strings are never transmitted to servers. It's completely private and secure.",
    },
  ],
};
