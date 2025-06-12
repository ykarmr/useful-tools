import type { CalculatorTranslations } from "../types/tools";

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
  faqList: [
    {
      q: "¿Cómo puedo hacer cálculos?",
      a: "Presiona los botones numéricos para ingresar valores y selecciona un operador ( +, −, ×, ÷ ) para realizar cálculos. Finalmente, presiona '=' para ver el resultado.",
    },
    {
      q: "¿Puedo usar decimales?",
      a: "Puedes ingresar decimales presionando el botón '.'",
    },
    {
      q: "¿Cómo puedo borrar todo?",
      a: "Presiona el botón 'C' para reiniciar todas las entradas.",
    },
    {
      q: "¿Qué hace el botón ±?",
      a: "Cambia el signo del número actualmente mostrado entre positivo y negativo.",
    },
    {
      q: "¿Qué hace el botón %?",
      a: "Convierte el número actual en un porcentaje (dividiéndolo por 100).",
    },
  ],
};
