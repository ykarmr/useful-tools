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
  faqList: [
    {
      q: "How are teams generated?",
      a: "Teams are randomly generated from your player list. The generator distributes players as evenly as possible across the specified team size, with any remaining players distributed randomly.",
    },
    {
      q: "Can I regenerate teams with the same players?",
      a: "Yes, you can click 'Generate Teams' multiple times to create different random team combinations from the same player list.",
    },
    {
      q: "What happens if the number of players doesn't divide evenly into teams?",
      a: "If there are remaining players after creating even teams, they will be distributed randomly among the existing teams, resulting in some teams having one extra player.",
    },
    {
      q: "Is there a limit to how many players I can add?",
      a: "There's no strict limit, but for practical purposes, we recommend keeping the number reasonable for your intended use case.",
    },
  ],
};
