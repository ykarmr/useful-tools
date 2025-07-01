import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "Generador de Equipos",
  subtitle: "Divide jugadores de manera justa en equipos equilibrados",
  description:
    "Crea equipos equilibrados de forma aleatoria a partir de una lista de jugadores. Perfecto para una división justa de equipos en deportes y juegos con distribución automática de jugadores.",
  keywords: [
    "generador de equipos",
    "división de equipos",
    "distribución de jugadores",
    "equipos aleatorios",
    "equipos equilibrados",
    "equipos deportivos",
    "división de grupos",
    "asignación de equipos",
    "distribución justa",
  ],
  howToUse: {
    title: "Cómo usar",
    steps: [
      "Ingresa el nombre del jugador y haz clic en 'Agregar'",
      "Selecciona el tamaño del equipo (2-8 jugadores)",
      "Agrega todos los jugadores necesarios",
      "Haz clic en 'Generar Equipos' para la división aleatoria",
    ],
  },
  features: {
    title: "Características principales",
    items: [
      "Generación de equipos completamente aleatoria",
      "Distribución automática de jugadores restantes",
      "Función de guardado automático de lista de jugadores",
      "Visualización colorida de equipos con colores únicos",
      "Configuración flexible del tamaño de equipo (2-8 jugadores)",
    ],
  },
  addPlayer: "Agregar Jugador",
  playerName: "Nombre del jugador...",
  teamSize: "Cantidad de jugadores por equipo",
  generateTeams: "Generar Equipos",
  players: "jugadores",
  teams: "Equipos",
  noPlayers:
    "No se han agregado jugadores aún. ¡Agrega algunos jugadores para comenzar!",
  noPlayersDescription: "Agrega jugadores para comenzar a crear equipos",
  notEnoughPlayers:
    "Se necesitan al menos {needed} jugadores para crear equipos",
  defaultTeamName: "Equipo",
  duplicatePlayerError: "Ya existe un jugador con este nombre",
  confirmClearAll: "¿Estás seguro de que deseas eliminar todos los jugadores?",
  generating: "Generando...",
  resetTeams: "Reiniciar Equipos",
  clearAll: "Eliminar Todos",
  teamGenerationInfo: "Información de Generación de Equipos:",
  teamsOfPlayers: "{teams} equipos de {size} jugadores cada uno",
  remainingPlayersDistributed:
    "{remaining} jugadores restantes se distribuirán entre los equipos existentes",
  failedToGenerate: "Error al generar equipos",
  playersUnit: "jugadores",
  faqList: [
    {
      q: "¿Cómo se generan los equipos?",
      a: "Los equipos se generan aleatoriamente desde tu lista de jugadores usando el algoritmo Fisher-Yates. El generador distribuye a los jugadores lo más uniformemente posible según el tamaño de equipo especificado, con jugadores restantes distribuidos aleatoriamente entre equipos existentes.",
    },
    {
      q: "¿Puedo regenerar equipos con los mismos jugadores?",
      a: "Sí, puedes hacer clic en 'Generar Equipos' múltiples veces para crear diferentes combinaciones aleatorias de equipos desde la misma lista de jugadores. Cada generación produce una disposición completamente nueva y aleatoria.",
    },
    {
      q: "¿Qué pasa si el número de jugadores no se divide uniformemente en equipos?",
      a: "Si quedan jugadores después de crear equipos uniformes, se distribuirán aleatoriamente entre los equipos existentes, resultando en algunos equipos con un jugador extra. La distribución busca ser lo más justa posible.",
    },
    {
      q: "¿Hay un límite en cuántos jugadores puedo agregar?",
      a: "No hay un límite técnico estricto, pero por propósitos prácticos y rendimiento óptimo, recomendamos mantener un número razonable para tu caso de uso previsto. La herramienta maneja grupos grandes de manera efectiva.",
    },
    {
      q: "¿Se guarda automáticamente mi lista de jugadores?",
      a: "Sí, tu lista de jugadores se guarda automáticamente en el almacenamiento local de tu navegador. Cuando recargues la página, tu lista de jugadores se restaurará, pero los equipos generados se borrarán.",
    },
    {
      q: "¿Puedo agregar jugadores con nombres duplicados?",
      a: "No, no se permiten nombres de jugadores duplicados. Cada jugador debe tener un nombre único para asegurar una generación de equipos adecuada y evitar confusión.",
    },
  ],
};
