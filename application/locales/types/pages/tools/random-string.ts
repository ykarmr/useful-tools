import { FAQItem } from "../../faq";

export interface RandomStringTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  length: string;
  includeNumbers: string;
  includeSymbols: string;
  generate: string;
  result: string;
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
