import type { TeamGeneratorTranslations } from "../types/tools";

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
};
