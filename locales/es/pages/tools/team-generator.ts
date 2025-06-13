import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "Generador de Equipos",
  description: "Herramienta para generar equipos aleatorios",
  keywords: [
    "generador de equipos",
    "herramienta de equipo",
    "formación de equipos",
    "aleatorio",
    "selección de miembros del equipo",
  ],
  addPlayer: "Agregar Jugador",
  playerName: "Nombre del jugador...",
  teamSize: "Cantidad de jugadores por equipo",
  generateTeams: "Generar Equipos",
  players: "jugadores",
  teams: "Equipos",
  noPlayers:
    "No se han agregado jugadores aún. ¡Agrega algunos jugadores para comenzar!",
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
      a: "Los equipos se generan aleatoriamente desde tu lista de jugadores. El generador distribuye a los jugadores lo más uniformemente posible según el tamaño de equipo especificado, con cualquier jugador restante distribuido aleatoriamente.",
    },
    {
      q: "¿Puedo regenerar equipos con los mismos jugadores?",
      a: "Sí, puedes hacer clic en 'Generar Equipos' múltiples veces para crear diferentes combinaciones aleatorias de equipos desde la misma lista de jugadores.",
    },
    {
      q: "¿Qué pasa si el número de jugadores no se divide uniformemente en equipos?",
      a: "Si quedan jugadores después de crear equipos uniformes, se distribuirán aleatoriamente entre los equipos existentes, resultando en algunos equipos con un jugador extra.",
    },
    {
      q: "¿Hay un límite en cuántos jugadores puedo agregar?",
      a: "No hay un límite estricto, pero por propósitos prácticos, recomendamos mantener un número razonable para tu caso de uso previsto.",
    },
  ],
};
