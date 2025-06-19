import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "Lanzamiento de Moneda",
  description: "Lanza una moneda para decisiones rápidas",
  keywords: [
    "lanzamiento de moneda",
    "decisión rápida",
    "cara o cruz",
    "elección aleatoria",
    "toma de decisiones",
  ],
  flip: "Lanzar Moneda",
  heads: "Cara",
  tails: "Cruz",
  flipping: "Lanzando...",
  selectCount: "Selecciona el número de lanzamientos",
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Selecciona el número de monedas a lanzar (1-10 monedas)",
      "Haz clic en el botón 'Lanzar Moneda'",
      "Observa las monedas girar y determinar aleatoriamente el resultado",
      "Ve el resultado (cara o cruz) mostrado",
    ],
    features: {
      title: "Características",
      items: [
        "Lanzamiento múltiple de monedas simultáneamente (hasta 10 monedas)",
        "Pantalla de animación en tiempo real",
        "Pantalla de resultados instantánea",
        "Generación de resultados completamente aleatoria",
      ],
    },
  },
  faqList: [
    {
      q: "¿Cómo lanzo la moneda?",
      a: "Haz clic en el botón 'Lanzar Moneda' para lanzar la moneda y ver el resultado.",
    },
    {
      q: "¿Cómo se determina el resultado?",
      a: "El resultado se determina aleatoriamente, mostrando cara o cruz.",
    },
    {
      q: "¿Cuándo se actualiza el resultado del lanzamiento?",
      a: "El resultado se actualiza cada vez que lanzas la moneda.",
    },
    {
      q: "¿Hay un historial de lanzamientos de moneda?",
      a: "Esta herramienta no guarda historial; los resultados se muestran solo para la sesión actual.",
    },
    {
      q: "¿Puedo lanzar varias monedas a la vez?",
      a: "Sí, puedes seleccionar el número de monedas a lanzar antes de comenzar.",
    },
  ],
};
