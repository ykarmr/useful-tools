import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "Lanzador de Dados",
  subTitle: "Herramienta Digital de Dados Poliédricos",
  description:
    "Herramienta online para lanzar varios tipos de dados de 4 a 32 caras con estadísticas e historial.",
  keywords: [
    "lanzador de dados",
    "dados",
    "lanzar dados",
    "número aleatorio",
    "juegos",
    "juegos de mesa",
  ],
  roll: "Lanzar",
  sides: "Caras",
  count: "Cantidad",
  total: "Total",
  history: "Historial",
  clearHistory: "Limpiar Historial",
  statistics: {
    title: "Estadísticas",
    overallStats: "Estadísticas Generales",
    totalRolls: "Total de Dados",
    rollSessions: "Sesiones de Lanzamiento",
    averageValue: "Valor Promedio",
    highestLowest: "Máximo / Mínimo",
    currentSettings: "Configuración Actual",
    totalSum: "Suma Total",
    distribution: "Distribución de Resultados",
  },
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Selecciona el tipo de dado (4 a 32 caras disponibles)",
      "Establece la cantidad de dados a lanzar (1 a 10)",
      "Haz clic en el botón Lanzar",
      "Ve los resultados animados y consulta estadísticas detalladas en el historial",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "9 tipos diferentes de dados de 4 a 32 caras",
      "Lanza hasta 10 dados simultáneamente",
      "Visualización de animación en tiempo real",
      "Generación aleatoria criptográficamente segura",
      "Estadísticas detalladas (promedio, máximo/mínimo, distribución)",
      "Seguimiento del historial de los últimos 10 lanzamientos",
    ],
  },
  faqList: [
    {
      q: "¿Qué tipos de dados están disponibles?",
      a: "Puedes usar dados de 4, 6, 8, 10, 12, 16, 20, 24 y 32 caras. Se incluyen todos los dados poliédricos comunes utilizados en juegos de rol de mesa y juegos de mesa.",
    },
    {
      q: "¿Cuál es el número máximo de dados que puedo lanzar a la vez?",
      a: "Puedes lanzar hasta 10 dados simultáneamente. Usa el menú desplegable para seleccionar entre 1 y 10 dados.",
    },
    {
      q: "¿Son realmente aleatorios los resultados de los dados?",
      a: "Sí, utilizamos la generación de números aleatorios criptográficamente segura de JavaScript para asegurar resultados completamente aleatorios. Cada cara tiene la misma probabilidad de aparecer.",
    },
    {
      q: "¿Puedo ver el historial de mis lanzamientos de dados?",
      a: "Sí, se muestran los últimos 10 lanzamientos en la sección de historial con estadísticas detalladas para cada lanzamiento, incluyendo valores promedio, resultados máximos/mínimos y distribución de resultados.",
    },
    {
      q: "¿Puedo lanzar los dados nuevamente mientras se reproduce la animación?",
      a: "No, el botón se desactiva durante la animación (aproximadamente 1 segundo). Puedes lanzar los dados nuevamente una vez que la animación esté completa.",
    },
    {
      q: "¿Para qué puedo usar esta herramienta?",
      a: "Perfecta para juegos de rol de mesa (D&D, Pathfinder, etc.), juegos de mesa, aprendizaje de probabilidades y cualquier situación que requiera selección aleatoria. Las estadísticas detalladas la hacen ideal para la educación en probabilidades.",
    },
  ],
};
