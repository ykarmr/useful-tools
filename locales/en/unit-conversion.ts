import { UnitConversionTranslations } from "../types";

export const unitConversion: UnitConversionTranslations = {
  title: "Unit Conversion",
  description: "Convert between different units of measurement easily",
  keywords: [
    "unit conversion",
    "measurement",
    "convert units",
    "length conversion",
    "weight conversion",
    "temperature conversion",
    "volume conversion",
  ],
  placeholder: "Enter value and select units...",
  resultPlaceholder: "Converted value will appear here...",
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
      a: "We support 10 categories of unit conversions: length, weight, area, volume, temperature, speed, time, pressure, energy, and data storage.",
    },
    {
      q: "How accurate are the conversions?",
      a: "Conversions use precise conversion factors and are accurate to multiple decimal places. However, for scientific applications, please verify the precision meets your requirements.",
    },
    {
      q: "Can I convert between different measurement systems?",
      a: "Yes, you can convert between metric, imperial, and other measurement systems. For example, converting from feet to meters or Fahrenheit to Celsius.",
    },
    {
      q: "Are temperature conversions handled differently?",
      a: "Yes, temperature conversions use special formulas rather than simple multiplication, as they involve offset calculations (e.g., Celsius to Fahrenheit: °F = °C × 9/5 + 32).",
    },
  ],
};
