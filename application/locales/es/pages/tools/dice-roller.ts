import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "Lanzador de Dados",
  description: "Lanza dados con lados personalizables",
  keywords: [
    "lanzador de dados",
    "dados",
    "lanzar dados",
    "número aleatorio",
    "juegos",
    "juegos de mesa",
  ],
  roll: "Lanzar Dados",
  sides: "Lados",
  result: "Resultado",
  resultMessage: "¡Has lanzado un {result}!",
  selectCount: "Selecciona el número de dados a lanzar",
  howToUse: {
    title: "Cómo Usar el Lanzador de Dados",
    steps: [
      "Selecciona el número de caras del dado (4 a 32 caras)",
      "Elige el número de dados a lanzar (1 a 10 dados)",
      "Haz clic en el botón 'Lanzar Dados'",
      "Observa la animación de los dados y ve los resultados mostrados",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Soporte para varios tipos de dados de 4 a 32 caras",
      "Lanza hasta 10 dados simultáneamente",
      "Visualización de animación en tiempo real",
      "Generación de resultados completamente aleatoria",
      "Perfecto para juegos de rol de mesa y juegos de mesa",
      "Operación simple e intuitiva",
    ],
  },
  faqList: [
    {
      q: "¿Qué tipos de dados están disponibles?",
      a: "Puedes usar dados de 4, 6, 8, 10, 12, 16, 20, 24 y 32 caras. Se admiten todos los dados comunes utilizados en juegos de rol de mesa y juegos de mesa.",
    },
    {
      q: "¿Cuál es el número máximo de dados que puedo lanzar a la vez?",
      a: "Puedes lanzar hasta 10 dados simultáneamente. Usa el menú desplegable para seleccionar entre 1 y 10 dados.",
    },
    {
      q: "¿Son realmente aleatorios los resultados de los dados?",
      a: "Sí, utilizamos la función Math.random() de JavaScript para generar resultados completamente aleatorios. Cada cara tiene la misma probabilidad de aparecer, asegurando resultados justos.",
    },
    {
      q: "¿Puedo ver el historial de mis lanzamientos de dados?",
      a: "La versión actual no incluye una función de historial. Solo se muestra el último resultado, y los resultados anteriores se sobrescriben cuando lanzas nuevos dados.",
    },
    {
      q: "¿Puedo lanzar los dados nuevamente mientras se reproduce la animación?",
      a: "No, el botón se desactiva durante la animación (aproximadamente 1 segundo). Puedes lanzar los dados nuevamente una vez que la animación esté completa.",
    },
    {
      q: "¿Para qué puedo usar esta herramienta?",
      a: "Esta herramienta es perfecta para juegos de rol de mesa (D&D, Pathfinder, etc.), juegos de mesa, aprendizaje de probabilidades, escenarios de selección aleatoria y cualquier situación donde necesites resultados justos y aleatorios.",
    },
  ],
};
