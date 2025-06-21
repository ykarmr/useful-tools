import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "Calculadora de IMC",
  subTitle: "Calcula tu Índice de Masa Corporal Gratis",
  description:
    "Calcula tu IMC (Índice de Masa Corporal) al instante a partir de tu altura y peso. Obtén tu rango de peso ideal y consejos de salud personalizados. Herramienta gratuita compatible con sistema métrico e imperial.",
  keywords: [
    "calculadora IMC",
    "calculadora índice masa corporal",
    "IMC gratis",
    "peso ideal",
    "calculadora salud",
    "obesidad",
    "control peso",
    "dieta",
    "evaluación salud",
    "fitness",
    "herramienta IMC",
    "peso saludable",
  ],

  inputSection: "Ingresa tu Información",
  heightLabel: "Altura",
  heightPlaceholder: "ej., 170",
  weightLabel: "Peso",
  weightPlaceholder: "ej., 65",
  unitSystem: "Sistema de Unidades",
  metric: "Métrico (cm・kg)",
  imperial: "Imperial (ft・lbs)",

  resultSection: "Tus Resultados de IMC",
  bmiValue: "Valor de IMC",
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

  // Guía de uso
  howToUse: {
    title: "Cómo usar la Calculadora de IMC",
    steps: [
      "Selecciona el sistema de unidades (Métrico o Imperial)",
      "Ingresa tu altura (cm o ft・in)",
      "Ingresa tu peso (kg o lbs)",
      "Haz clic en el botón 'Calcular IMC'",
      "Revisa tu valor de IMC, categoría, rango de peso ideal y consejos de salud",
      "Usa el botón Resetear para comenzar un nuevo cálculo",
    ],
  },

  // Características
  features: {
    title: "Características Principales",
    items: [
      "Soporte para sistemas de unidades métrico e imperial",
      "Validación de entrada en tiempo real con mensajes de error",
      "Cálculo automático de IMC y clasificación por categorías",
      "Cálculo del rango de peso ideal basado en IMC 18.5-25",
      "Consejos de salud personalizados según la categoría de IMC",
      "Visualización de estadísticas detalladas (altura, peso, IMC, rango de peso ideal)",
      "Visualización de IMC con códigos de color (bajo peso: azul, normal: verde, sobrepeso: amarillo, obeso: rojo)",
    ],
  },

  faqList: [
    {
      q: "¿Qué es el IMC?",
      a: "El IMC (Índice de Masa Corporal) es una medida internacionalmente reconocida de grasa corporal basada en altura y peso. Se calcula como peso(kg) ÷ altura(m)² y es recomendado por la Organización Mundial de la Salud (OMS) como indicador estándar.",
    },
    {
      q: "¿Cuáles son las categorías del IMC y códigos de color?",
      a: "Esta herramienta categoriza el IMC con códigos de color: Menos de 18.5 (bajo peso, azul), 18.5-24.9 (peso normal, verde), 25-29.9 (sobrepeso, amarillo), y 30+ (obeso, rojo). El IMC 22 se considera óptimo con los menores riesgos para la salud.",
    },
    {
      q: "¿Puedo usar tanto unidades métricas como imperiales?",
      a: "Sí, puedes cambiar entre sistemas métrico (cm・kg) e imperial (ft・in・lbs) usando el selector de unidades. Al cambiar unidades, los campos de entrada se actualizan automáticamente y los resultados se muestran en tu sistema seleccionado.",
    },
    {
      q: "¿Cómo ingreso la altura en pies y pulgadas?",
      a: "Al usar unidades imperiales, ingresa la altura en dos campos separados: pies (0-8) a la izquierda y pulgadas (0-11.9) a la derecha. Por ejemplo, para 5 pies 9 pulgadas, ingresa '5' en el campo de pies y '9' en el de pulgadas.",
    },
    {
      q: "¿Cómo se calcula el rango de peso ideal?",
      a: "El rango de peso ideal usa valores de IMC de 18.5-25 con la fórmula 'altura(m)² × IMC'. El límite inferior es altura² × 18.5, el superior es altura² × 25. Para unidades imperiales, el resultado se convierte automáticamente a libras.",
    },
    {
      q: "¿Qué tipo de consejos de salud se proporcionan?",
      a: "Basado en tu categoría de IMC, la herramienta proporciona consejos específicos: bajo peso sugiere mejora nutricional, peso normal recomienda mantener hábitos actuales, sobrepeso sugiere cambios dietéticos y ejercicio, mientras que obeso recomienda consultar profesionales de la salud.",
    },
    {
      q: "¿Qué información se muestra en la sección de estadísticas?",
      a: "La sección de estadísticas muestra información detallada del cálculo incluyendo tu altura y peso ingresados, valor de IMC calculado, clasificación de categoría corporal y rango de peso ideal (mínimo y máximo). Todos los valores se muestran en tu sistema de unidades seleccionado.",
    },
    {
      q: "¿Hay restricciones en los valores de entrada?",
      a: "Por seguridad y precisión, la altura debe estar entre 50-300cm (aproximadamente 1.6-9.8ft) y el peso entre 1-500kg (aproximadamente 2-1100lbs). Las pulgadas deben ser 0-11 (ya que 12 pulgadas = 1 pie). Aparecen mensajes de error para valores fuera de estos rangos.",
    },
    {
      q: "¿Cuáles son las limitaciones del IMC?",
      a: "El IMC no considera la masa muscular, densidad ósea o composición corporal. Puede sobreestimar la grasa corporal en individuos musculosos (atletas) y subestimarla en adultos mayores o aquellos con menor masa muscular. Usa esta herramienta como referencia general junto con otros indicadores de salud.",
    },
    {
      q: "¿Cómo reinicio el cálculo?",
      a: "Un botón 'Reiniciar' aparece cuando has ingresado valores o cuando se muestran resultados. Haz clic en este botón para limpiar todos los valores de entrada y resultados de cálculo, permitiéndote comenzar un nuevo cálculo desde cero.",
    },
  ],
};
