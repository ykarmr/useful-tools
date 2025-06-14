import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "BMI Calculator",
  description:
    "Calculate your BMI (Body Mass Index) from height and weight, with ideal weight range and health advice",
  keywords: [
    "BMI calculator",
    "body mass index",
    "ideal weight",
    "health management",
    "obesity",
    "weight management",
    "diet",
    "health checkup",
    "metabolic",
    "fitness",
  ],

  // Input section
  inputSection: "Body Information",
  heightLabel: "Height",
  heightPlaceholder: "Enter height",
  weightLabel: "Weight",
  weightPlaceholder: "Enter weight",
  unitSystem: "Unit System",
  metric: "Metric (cm・kg)",
  imperial: "Imperial (ft・lbs)",

  // Results
  resultSection: "BMI Calculation Results",
  bmiValue: "BMI Value",
  bmiCategory: "Category",
  idealWeightRange: "Ideal Weight Range",
  idealWeightDescription: "Ideal weight range based on BMI 18.5-25",
  healthAdvice: "Health Advice",
  recommendation: "Recommendation",

  // BMI categories
  categories: {
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    obese: "Obese",
  },

  // Advice
  advice: {
    underweight:
      "Your weight is below the healthy range. Consider a balanced diet with adequate calories and consult a healthcare provider if needed.",
    normal:
      "Your weight is within the healthy range. Maintain your current healthy lifestyle habits.",
    overweight:
      "Your weight is above the healthy range. Consider reviewing your diet and incorporating regular physical activity.",
    obese:
      "Your weight indicates obesity. This increases health risks. Consult with a healthcare provider for a comprehensive weight management plan.",
  },

  // Statistics
  statistics: "Detailed Information",
  statsLabels: {
    height: "Height",
    weight: "Weight",
    bmi: "BMI Value",
    category: "Category",
    idealMin: "Ideal Weight Min",
    idealMax: "Ideal Weight Max",
  },

  // Error messages
  errors: {
    invalidHeight: "Please enter a valid height",
    invalidWeight: "Please enter a valid weight",
    heightRange: "Height must be between 50cm and 300cm",
    weightRange: "Weight must be between 1kg and 500kg",
  },

  // Buttons
  calculate: "Calculate BMI",
  reset: "Reset",

  // Units
  units: {
    cm: "cm",
    kg: "kg",
    ft: "ft",
    in: "in",
    lbs: "lbs",
  },

  faqList: [
    {
      q: "What is BMI?",
      a: "BMI (Body Mass Index) is an internationally recognized measure of body fat based on height and weight. It's calculated as weight(kg) ÷ height(m)².",
    },
    {
      q: "What are the BMI categories?",
      a: "BMI categories are: Under 18.5 (underweight), 18.5-24.9 (normal weight), 25-29.9 (overweight), and 30 and above (obese).",
    },
    {
      q: "What should I do if my BMI is high?",
      a: "If your BMI is over 25, consider improving your diet and increasing physical activity. Aim for gradual weight loss of 1-2 pounds per week for sustainable results.",
    },
    {
      q: "Are there limitations to BMI?",
      a: "BMI doesn't account for muscle mass, so it may overestimate body fat in athletes and underestimate it in older adults. It's best used alongside other health assessments.",
    },
    {
      q: "How is ideal weight calculated?",
      a: "Ideal weight is calculated using BMI 22 as the target, with a healthy range from BMI 18.5 to 25. BMI 22 is statistically associated with the lowest health risks.",
    },
  ],
};
