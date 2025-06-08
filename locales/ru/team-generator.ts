import type { TeamGeneratorTranslations } from "../types";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "Генератор команд",
  description: "Создавайте случайно сбалансированные команды из списка игроков",
  keywords: [
    "генератор команд",
    "список игроков",
    "случайные команды",
    "сбалансированные команды",
  ],
  addPlayer: "Добавить игрока",
  playerName: "Имя игрока...",
  teamSize: "Размер команды",
  generateTeams: "Создать команды",
  players: "игроков",
  teams: "команды",
  noPlayers:
    "Пока не добавлено ни одного игрока. Добавьте игроков, чтобы начать!",
  notEnoughPlayers: "Для создания команд необходимо минимум {needed} игроков",
  defaultTeamName: "Команда",
  duplicatePlayerError: "Игрок с таким именем уже существует",
  confirmClearAll: "Удалить всех игроков?",
  generating: "Генерация...",
  resetTeams: "Сбросить команды",
  clearAll: "Удалить всех",
  teamGenerationInfo: "Информация о генерации команд:",
  teamsOfPlayers: "Можно создать {teams} команд (по {size} игроков)",
  remainingPlayersDistributed:
    "{remaining} игроков будут распределены по существующим командам",
  failedToGenerate: "Не удалось создать команды",
  playersUnit: "игроков",
};
