import { FAQItem } from "../../faq";

export interface ScoreboardTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  teamName: string;
  addTeam: string;
  resetScores: string;
  winner: string;
  tied: string;
  defaultTeamA: string;
  defaultTeamB: string;
  maxTeamsReached: string;
  howToUse: {
    title: string;
    steps: string[];
    features: {
      title: string;
      items: string[];
    };
  };
  faqList: FAQItem[];
}
