import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "BMI Calculator",
  subTitle: "Free & Easy Body Mass Index Calculator",
  description:
    "Calculate your BMI (Body Mass Index) instantly from height and weight. Get ideal weight range and personalized health advice. Free tool supporting both metric and imperial units.",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "BMI checker",
    "ideal weight calculator",
    "health calculator",
    "obesity calculator",
    "weight management",
    "diet calculator",
    "health assessment",
    "fitness calculator",
    "free BMI tool",
    "weight tracker",
  ],

  // Input section
  inputSection: "Enter Your Information",
  heightLabel: "Height",
  heightPlaceholder: "e.g., 170",
  weightLabel: "Weight",
  weightPlaceholder: "e.g., 65",
  unitSystem: "Unit System",
  metric: "Metric (cm・kg)",
  imperial: "Imperial (ft・lbs)",

  // Results
  resultSection: "Your BMI Results",
  bmiValue: "BMI Value",
  bmiCategory: "Weight Category",
  idealWeightRange: "Healthy Weight Range",
  idealWeightDescription: "Recommended weight range based on BMI 18.5-25",
  healthAdvice: "Health Recommendations",
  recommendation: "Our Recommendation",

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
      "Your weight is below the healthy range. Focus on nutrient-rich foods and consider consulting a healthcare professional to develop a healthy weight gain plan.",
    normal:
      "Excellent! Your weight is in the healthy range. Keep up your current lifestyle with balanced nutrition and regular physical activity.",
    overweight:
      "Your weight is above the healthy range. Consider adopting a balanced diet and increasing physical activity to reach a healthier weight.",
    obese:
      "Your BMI indicates obesity, which may increase health risks. We recommend consulting with a healthcare provider to create a safe and effective weight management plan.",
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
    invalidHeight: "Please enter a valid height value",
    invalidWeight: "Please enter a valid weight value",
    heightRange: "Height must be between 50-300 cm (1.6-9.8 ft)",
    weightRange: "Weight must be between 1-500 kg (2-1100 lbs)",
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

  // How to use guide
  howToUse: {
    title: "How to Use BMI Calculator",
    steps: [
      "Select unit system (Metric or Imperial)",
      "Enter your height (cm or ft・in)",
      "Enter your weight (kg or lbs)",
      "Click 'Calculate BMI' button",
      "Review your BMI value, category, ideal weight range, and health advice",
      "Use Reset button to start a new calculation",
    ],
  },

  // Features
  features: {
    title: "Key Features",
    items: [
      "Support for both Metric and Imperial unit systems",
      "Real-time input validation with error messages",
      "Automatic BMI calculation and category classification",
      "Ideal weight range calculation based on BMI 18.5-25",
      "Personalized health advice based on BMI category",
      "Detailed statistics display (height, weight, BMI, ideal weight range)",
      "Color-coded BMI display (underweight: blue, normal: green, overweight: yellow, obese: red)",
    ],
  },

  faqList: [
    {
      q: "What is BMI?",
      a: "BMI (Body Mass Index) is an internationally recognized measure of body fat based on height and weight. It's calculated as weight(kg) ÷ height(m)² and is recommended by the World Health Organization (WHO) as a standard indicator.",
    },
    {
      q: "What are the BMI categories and color codes?",
      a: "This tool categorizes BMI with color coding: Under 18.5 (underweight, blue), 18.5-24.9 (normal weight, green), 25-29.9 (overweight, yellow), and 30+ (obese, red). BMI 22 is considered optimal with the lowest health risks.",
    },
    {
      q: "Can I use both Metric and Imperial units?",
      a: "Yes, you can switch between Metric (cm・kg) and Imperial (ft・in・lbs) unit systems using the unit selector. When you change units, the input fields automatically update, and results are displayed in your selected system.",
    },
    {
      q: "How do I enter height in feet and inches?",
      a: "When using Imperial units, enter height in two separate fields: feet (0-8) on the left and inches (0-11.9) on the right. For example, for 5 feet 9 inches, enter '5' in the feet field and '9' in the inches field.",
    },
    {
      q: "How is the ideal weight range calculated?",
      a: "The ideal weight range uses BMI values of 18.5-25 with the formula 'height(m)² × BMI'. Lower bound is height² × 18.5, upper bound is height² × 25. For Imperial units, the result is automatically converted to pounds.",
    },
    {
      q: "What kind of health advice is provided?",
      a: "Based on your BMI category, the tool provides specific advice: underweight suggests nutritional improvement, normal weight recommends maintaining current habits, overweight suggests dietary changes and exercise, while obese category recommends consulting healthcare professionals.",
    },
    {
      q: "What information is shown in the statistics section?",
      a: "The statistics section displays detailed calculation information including your entered height and weight, calculated BMI value, body category classification, and ideal weight range (minimum and maximum). All values are shown in your selected unit system.",
    },
    {
      q: "Are there input value restrictions?",
      a: "For safety and accuracy, height must be between 50-300cm (approximately 1.6-9.8ft) and weight between 1-500kg (approximately 2-1100lbs). Inches must be 0-11 (since 12 inches = 1 foot). Error messages appear for values outside these ranges.",
    },
    {
      q: "What are the limitations of BMI?",
      a: "BMI doesn't account for muscle mass, bone density, or body composition. It may overestimate body fat in muscular individuals (athletes) and underestimate it in older adults or those with lower muscle mass. Use this tool as a general reference alongside other health indicators.",
    },
    {
      q: "How do I reset the calculation?",
      a: "A 'Reset' button appears when you've entered values or when results are displayed. Click this button to clear all input values and calculation results, allowing you to start a new calculation from scratch.",
    },
  ],
};
