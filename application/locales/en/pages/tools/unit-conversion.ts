import { UnitConversionTranslations } from "@/locales/types/pages/tools/unit-conversion";

export const unitConversion: UnitConversionTranslations = {
  title: "Unit Conversion Tool",
  subtitle: "Convert any measurement unit accurately",
  description:
    "Instantly convert between various measurement units including length, weight, area, volume, temperature, and more. Perfect for daily use and professional applications.",
  keywords: [
    "unit conversion",
    "measurement",
    "convert units",
    "length conversion",
    "weight conversion",
    "temperature conversion",
    "volume conversion",
    "area conversion",
    "speed conversion",
    "time conversion",
    "pressure conversion",
    "energy conversion",
    "data conversion",
  ],
  placeholder: "Enter value to convert",
  resultPlaceholder: "Conversion result will appear here",

  howToUse: {
    title: "How to Use",
    steps: [
      "Select the category you want to convert (length, weight, etc.)",
      "Enter the value you want to convert in the input field",
      "Choose the source unit and target unit from dropdowns",
      "The conversion result will be displayed automatically",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Supports 10 categories of unit conversion",
      "High-precision conversion calculations",
      "Real-time conversion",
      "Supports both SI units and Imperial units",
      "Special handling for temperature conversion",
      "Data storage conversion (binary units)",
    ],
  },
  length: "Length",
  weight: "Weight",
  area: "Area",
  volume: "Volume",
  temperature: "Temperature",
  speed: "Speed",
  time: "Time",
  pressure: "Pressure",
  energy: "Energy",
  data: "Data",

  categoryLabel: "Category",
  fromLabel: "From",
  toLabel: "To",
  inputLabel: "Input Value",
  faqList: [
    {
      q: "What types of unit conversions are supported?",
      a: "We support 10 categories of unit conversions: length, weight, area, volume, temperature, speed, time, pressure, energy, and data storage. You can convert between metric, imperial, and other measurement systems.",
    },
    {
      q: "How accurate are the conversions?",
      a: "Conversions use international standard conversion factors and are accurate to 8 decimal places for general use. For scientific and engineering calculations, we recommend using specialized tools.",
    },
    {
      q: "Are temperature conversions handled differently from other units?",
      a: "Yes, temperature conversions use special formulas rather than simple multiplication because they involve offset calculations (e.g., °C = (°F - 32) × 5/9).",
    },
    {
      q: "For data conversions, do you use binary or decimal systems?",
      a: "Data storage conversions use the binary system (1024-base), which provides accurate conversions commonly used in computer systems (e.g., 1KB = 1024 bytes).",
    },
    {
      q: "Can I add custom units?",
      a: "Currently, only predefined units are available. We plan to add more units in future updates.",
    },
  ],
};
