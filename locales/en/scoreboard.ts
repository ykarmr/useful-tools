import { ScoreboardTranslations } from "../types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "Scoreboard",
  description: "Keep track of scores for multiple teams or players",
  keywords: ["scoreboard", "scores", "teams", "players", "tracking"],
  teamName: "Team name...",
  addTeam: "Add Team",
  resetScores: "Reset All Scores",
  winner: "Winner!",
  tied: "Tied!",
  defaultTeamA: "Team A",
  defaultTeamB: "Team B",
  faqList: [
    {
      q: "How many teams can I add to the scoreboard?",
      a: "You can add up to 8 teams to the scoreboard. This limit helps keep the interface manageable and easy to use.",
    },
    {
      q: "Can scores go negative?",
      a: "No, scores cannot go below zero. If a team's score is already 0, clicking the minus button will not decrease it further.",
    },
    {
      q: "Can I change team names?",
      a: "Yes, you can click on any team name to enter edit mode, then type a new name and save your changes.",
    },
    {
      q: "Is my scoreboard data saved?",
      a: "All team data and scores are automatically saved to your browser's local storage. When you reload the page, your data will be restored.",
    },
  ],
};
