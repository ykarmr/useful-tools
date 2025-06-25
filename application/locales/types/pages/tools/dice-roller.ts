import { FAQItem } from "../../faq";

export interface DiceRollerTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  sides: string;
  roll: string;
  count: string;
  total: string;
  history: string;
  clearHistory: string;
  statistics: {
    title: string;
    overallStats: string;
    totalRolls: string;
    rollSessions: string;
    averageValue: string;
    highestLowest: string;
    currentSettings: string;
    totalSum: string;
    distribution: string;
  };
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faqList: FAQItem[];
}
