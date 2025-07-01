import { FAQItem } from "../../faq";

export interface TeamGeneratorTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  addPlayer: string;
  playerName: string;
  teamSize: string;
  generateTeams: string;
  players: string;
  teams: string;
  noPlayers: string;
  noPlayersDescription: string;
  notEnoughPlayers: string;
  defaultTeamName: string;
  duplicatePlayerError: string;
  confirmClearAll: string;
  generating: string;
  resetTeams: string;
  clearAll: string;
  teamGenerationInfo: string;
  teamsOfPlayers: string;
  remainingPlayersDistributed: string;
  failedToGenerate: string;
  playersUnit: string;
  faqList: FAQItem[];
}
