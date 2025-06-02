import type { TeamGeneratorTranslations } from "../types";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "Team Generator",
  description: "Randomly create balanced teams from a list of players",
  keywords: [
    "team generator",
    "random teams",
    "team creation",
    "balanced teams",
    "player distribution",
  ],
  addPlayer: "Add Player",
  playerName: "Player name...",
  teamSize: "Team Size",
  generateTeams: "Generate Teams",
  players: "players",
  teams: "Teams",
  noPlayers: "No players added yet. Add some players to get started!",
  notEnoughPlayers: "Need at least {needed} players to create teams",
  defaultTeamName: "Team",
  duplicatePlayerError: "A player with this name already exists",
  confirmClearAll: "Are you sure you want to remove all players?",
  generating: "Generating...",
  resetTeams: "Reset Teams",
  clearAll: "Clear All",
  teamGenerationInfo: "Team Generation Info:",
  teamsOfPlayers: "{teams} teams of {size} players each",
  remainingPlayersDistributed:
    "{remaining} remaining players will be distributed to existing teams",
  failedToGenerate: "Failed to generate teams",
  playersUnit: "players",
};
