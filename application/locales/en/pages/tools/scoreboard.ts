import { ScoreboardTranslations } from "@/locales/types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "Scoreboard",
  subtitle: "Score management for games and sports",
  description:
    "Track team and player scores in real-time with automatic winner detection",
  keywords: [
    "scoreboard",
    "scores",
    "teams",
    "players",
    "tracking",
    "sports",
    "games",
    "competition",
  ],
  teamName: "Enter team name",
  addTeam: "Add Team",
  resetScores: "Reset Scores",
  winner: "Winner!",
  tied: "Tied!",
  defaultTeamA: "Team A",
  defaultTeamB: "Team B",
  maxTeamsReached: "Maximum 8 teams can be added",
  howToUse: {
    title: "How to Use",
    steps: [
      "Enter a team name and click 'Add Team' to register teams",
      "Use '+' and '-' buttons on each team card to adjust scores",
      "Click team names to edit and rename them",
      "The highest scoring team automatically appears as winner",
      "Use 'Reset Scores' to set all team scores back to 0",
    ],
    features: {
      title: "Features",
      items: [
        "Manage up to 8 teams simultaneously",
        "Color-coded team identification",
        "Real-time winner detection",
        "Intuitive controls",
        "Automatic data saving",
      ],
    },
  },
  faqList: [
    {
      q: "How many teams can I add?",
      a: "You can add up to 8 teams. Each team is automatically assigned a different color for easy identification.",
    },
    {
      q: "Can scores go negative?",
      a: "No, scores cannot go below zero. If a team's score is already 0, the minus button won't decrease it further.",
    },
    {
      q: "Can I change team names?",
      a: "Yes, click the edit icon next to the team name or click the team name itself to edit it.",
    },
    {
      q: "Is my data saved?",
      a: "All team data and scores are automatically saved to your browser. Your data will be restored when you reload the page.",
    },
    {
      q: "How are ties displayed?",
      a: "When multiple teams have the same highest score, all team names are displayed as 'Tied!'.",
    },
    {
      q: "What happens when I delete a team?",
      a: "When you delete a team, all its data is permanently removed. If you accidentally delete a team, you'll need to create a new one.",
    },
  ],
};
