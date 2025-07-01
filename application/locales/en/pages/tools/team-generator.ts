import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "Team Generator Tool",
  subtitle: "Fairly divide players into balanced teams",
  description:
    "Create balanced teams randomly from a player list. Perfect for fair team division in sports and games with automatic player distribution.",
  keywords: [
    "team generator",
    "team division",
    "player distribution",
    "random teams",
    "balanced teams",
    "sports teams",
    "group division",
    "team assignment",
    "fair distribution",
  ],
  howToUse: {
    title: "How to Use",
    steps: [
      "Enter player name and click 'Add' button",
      "Select team size (2-8 players)",
      "Add all required players",
      "Click 'Generate Teams' for random team division",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Completely random team generation",
      "Automatic distribution of remaining players",
      "Auto-save player list functionality",
      "Colorful team display with unique colors",
      "Flexible team size settings (2-8 players)",
    ],
  },
  addPlayer: "Add Player",
  playerName: "Player name...",
  teamSize: "Team Size",
  generateTeams: "Generate Teams",
  players: "players",
  teams: "Teams",
  noPlayers: "No players added yet. Add some players to get started!",
  noPlayersDescription: "Add players to start creating teams",
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
      a: "Teams are randomly generated from your player list using a Fisher-Yates shuffle algorithm. The generator distributes players as evenly as possible across the specified team size, with any remaining players distributed randomly among existing teams.",
    },
    {
      q: "Can I regenerate teams with the same players?",
      a: "Yes, you can click 'Generate Teams' multiple times to create different random team combinations from the same player list. Each generation produces a completely new random arrangement.",
    },
    {
      q: "What happens if the number of players doesn't divide evenly into teams?",
      a: "If there are remaining players after creating even teams, they will be distributed randomly among the existing teams, resulting in some teams having one extra player. The distribution aims to be as fair as possible.",
    },
    {
      q: "Is there a limit to how many players I can add?",
      a: "There's no strict technical limit, but for practical purposes and optimal performance, we recommend keeping the number reasonable for your intended use case. The tool handles large groups effectively.",
    },
    {
      q: "Is my player list saved automatically?",
      a: "Yes, your player list is automatically saved to your browser's local storage. When you reload the page, your player list will be restored, but generated teams will be cleared.",
    },
    {
      q: "Can I add players with duplicate names?",
      a: "No, duplicate player names are not allowed. Each player must have a unique name to ensure proper team generation and avoid confusion.",
    },
  ],
};
