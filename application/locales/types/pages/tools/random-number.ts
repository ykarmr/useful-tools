import { FAQItem } from "../../faq";

export interface RandomNumberTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  min: string;
  max: string;
  generate: string;
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
