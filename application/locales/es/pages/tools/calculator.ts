import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

export const calculator: CalculatorTranslations = {
  title: "Calculadora",
  description: "Calculadora matemática básica",
  keywords: [
    "calculadora",
    "matemáticas",
    "aritmética",
    "suma",
    "resta",
    "multiplicación",
    "división",
  ],
  howToUse: {
    title: "Cómo usar",
    steps: [
      "Haz clic en los botones numéricos en la pantalla para ingresar valores",
      "Haz clic en un botón operador (+, -, ×, ÷) para seleccionar la operación deseada",
      "Ingresa el siguiente número",
      "Haz clic en el botón '=' para mostrar el resultado del cálculo",
      "Usa el botón 'C' para borrar todos los valores",
    ],
  },
  features: {
    title: "Características principales",
    items: [
      "Operaciones aritméticas básicas (suma, resta, multiplicación, división)",
      "Cálculos con números decimales",
      "Cambio de signo (botón ±)",
      "Cálculo de porcentaje (botón %)",
      "Función de borrado con un clic",
      "Diseño responsivo para compatibilidad móvil",
    ],
  },
  faqList: [
    {
      q: "¿Cómo puedo hacer cálculos?",
      a: "Presiona los botones numéricos para ingresar valores y selecciona un operador (+, −, ×, ÷) para realizar cálculos. Finalmente, presiona '=' para ver el resultado.",
    },
    {
      q: "¿Puedo usar decimales?",
      a: "Sí, puedes ingresar decimales presionando el botón '.'. Los cálculos con decimales se manejan con precisión.",
    },
    {
      q: "¿Cómo reinicio los cálculos?",
      a: "Presiona el botón 'C' para reiniciar todas las entradas y el historial de cálculos, permitiéndote comenzar un nuevo cálculo.",
    },
    {
      q: "¿Cómo funciona el botón ±?",
      a: "Cambia instantáneamente el signo (positivo/negativo) del número actualmente mostrado. Útil para cálculos con números negativos.",
    },
    {
      q: "¿Cómo funciona el botón %?",
      a: "Convierte el número actual a un porcentaje (divide por 100). Por ejemplo: ingresar 50 y presionar % da 0.5.",
    },
    {
      q: "¿Puedo realizar cálculos continuos?",
      a: "Sí, después de que se muestre un resultado de cálculo, puedes presionar el siguiente operador para continuar calculando continuamente.",
    },
    {
      q: "¿Qué pasa si se muestra un error?",
      a: "Los errores aparecen cuando se realizan cálculos inválidos (como división por cero). Presiona el botón 'C' para reiniciar.",
    },
  ],
};
