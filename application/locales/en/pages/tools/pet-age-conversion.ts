import { PetAgeConversionTranslations } from "@/locales/types/pages/tools/pet-age-conversion";

export const petAgeConversion: PetAgeConversionTranslations = {
  title: "Pet Age Converter",
  subtitle: "Convert your beloved pet's age to human years",
  description:
    "Convert the age of various pets including dogs and cats to human years. Supporting 12 different animals with specialized conversion formulas for accurate results.",
  keywords: [
    "pet age",
    "age converter",
    "dog age",
    "cat age",
    "animal age",
    "human years",
    "pet health",
    "age calculator",
  ],
  howToUse: {
    title: "How to Use",
    steps: [
      "Select your pet type from the dropdown",
      "Enter your pet's age in years",
      "View the automatically converted human age equivalent",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Support for 12 different animals (dogs, cats, rabbits, hamsters, etc.)",
      "Specialized conversion formulas for each species",
      "Decimal age input support",
      "Real-time calculation display",
      "Intuitive and user-friendly interface",
    ],
  },
  petTypeLabel: "Pet Type",
  dog: "Dog",
  cat: "Cat",
  rabbit: "Rabbit",
  hamster: "Hamster",
  ferret: "Ferret",
  horse: "Horse",
  cow: "Cow",
  pig: "Pig",
  sheep: "Sheep",
  goat: "Goat",
  turtle: "Turtle",
  parakeet: "Parakeet",
  petAgeLabel: "Pet Age (years)",
  petAgePlaceholder: "e.g. 5",
  resultPlaceholder: "The converted age will appear here",
  petAgeResult:
    "{petAge} years old {petType} is equivalent to {humanAge} human years.",
  faqList: [
    {
      q: "How accurate are the pet age conversions?",
      a: "The conversions are based on commonly used formulas, but actual aging rates vary by breed and individual. Use these as reference values.",
    },
    {
      q: "Which animals are supported?",
      a: "We support 12 animals including dogs, cats, rabbits, hamsters, horses, cows, and more. Each uses different conversion formulas.",
    },
    {
      q: "What's the maximum age I can calculate?",
      a: "There's no technical limit, but for very old ages, the conversion formulas may be less accurate. We recommend using within typical lifespan ranges.",
    },
    {
      q: "Can I input decimal ages?",
      a: "Yes, you can enter decimal ages like 0.5 years (6 months). This is especially useful for calculating young animal ages.",
    },
  ],
};
