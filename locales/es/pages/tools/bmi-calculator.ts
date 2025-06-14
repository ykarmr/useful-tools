import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "Calculadora de IMC",
  description:
    "Calcula tu IMC (Índice de Masa Corporal) a partir de altura y peso, con rango de peso ideal y consejos de salud",
  keywords: [
    "calculadora IMC",
    "índice masa corporal",
    "peso ideal",
    "gestión salud",
    "obesidad",
    "control peso",
    "dieta",
    "chequeo salud",
    "metabólico",
    "fitness",
  ],

  inputSection: "Información Corporal",
  heightLabel: "Altura",
  heightPlaceholder: "Ingresa altura",
  weightLabel: "Peso",
  weightPlaceholder: "Ingresa peso",
  unitSystem: "Sistema de Unidades",
  metric: "Métrico (cm・kg)",
  imperial: "Imperial (ft・lbs)",

  resultSection: "Resultados del Cálculo IMC",
  bmiValue: "Valor IMC",
  bmiCategory: "Categoría",
  idealWeightRange: "Rango de Peso Ideal",
  idealWeightDescription: "Rango de peso ideal basado en IMC 18.5-25",
  healthAdvice: "Consejos de Salud",
  recommendation: "Recomendación",

  categories: {
    underweight: "Bajo peso",
    normal: "Peso normal",
    overweight: "Sobrepeso",
    obese: "Obeso",
  },

  advice: {
    underweight:
      "Tu peso está por debajo del rango saludable. Considera una dieta equilibrada con calorías adecuadas y consulta a un profesional de la salud si es necesario.",
    normal:
      "Tu peso está dentro del rango saludable. Mantén tus hábitos de vida saludables actuales.",
    overweight:
      "Tu peso está por encima del rango saludable. Considera revisar tu dieta e incorporar actividad física regular.",
    obese:
      "Tu peso indica obesidad. Esto aumenta los riesgos para la salud. Consulta con un profesional de la salud para un plan integral de control de peso.",
  },

  statistics: "Información Detallada",
  statsLabels: {
    height: "Altura",
    weight: "Peso",
    bmi: "Valor IMC",
    category: "Categoría",
    idealMin: "Peso Ideal Mín",
    idealMax: "Peso Ideal Máx",
  },

  errors: {
    invalidHeight: "Por favor ingresa una altura válida",
    invalidWeight: "Por favor ingresa un peso válido",
    heightRange: "La altura debe estar entre 50cm y 300cm",
    weightRange: "El peso debe estar entre 1kg y 500kg",
  },

  calculate: "Calcular IMC",
  reset: "Resetear",

  units: {
    cm: "cm",
    kg: "kg",
    ft: "ft",
    in: "in",
    lbs: "lbs",
  },

  faqList: [
    {
      q: "¿Qué es el IMC?",
      a: "El IMC (Índice de Masa Corporal) es una medida internacionalmente reconocida de grasa corporal basada en altura y peso. Se calcula como peso(kg) ÷ altura(m)².",
    },
    {
      q: "¿Cuáles son las categorías del IMC?",
      a: "Las categorías del IMC son: Menos de 18.5 (bajo peso), 18.5-24.9 (peso normal), 25-29.9 (sobrepeso), y 30 y superior (obeso).",
    },
    {
      q: "¿Qué debo hacer si mi IMC es alto?",
      a: "Si tu IMC es superior a 25, considera mejorar tu dieta y aumentar la actividad física. Apunta a una pérdida gradual de peso de 0.5-1 kg por semana para resultados sostenibles.",
    },
    {
      q: "¿Hay limitaciones en el IMC?",
      a: "El IMC no considera la masa muscular, por lo que puede sobreestimar la grasa corporal en atletas y subestimarla en adultos mayores. Es mejor usarlo junto con otras evaluaciones de salud.",
    },
    {
      q: "¿Cómo se calcula el peso ideal?",
      a: "El peso ideal se calcula usando IMC 22 como objetivo, con un rango saludable de IMC 18.5 a 25. El IMC 22 está estadísticamente asociado con los menores riesgos para la salud.",
    },
  ],
};
