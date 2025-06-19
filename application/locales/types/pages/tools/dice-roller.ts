import { FAQItem } from "../../faq";

export interface DiceRollerTranslations {
  title: string;
  description: string;
  keywords: string[];
  sides: string;
  roll: string;
  result: string;
  resultMessage: string;
  selectCount: string;
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
