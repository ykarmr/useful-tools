import { FAQItem } from "../../faq";

export interface HowToUseStep {
  title?: string;
  description: string;
}

export interface Feature {
  title?: string;
  description: string;
}

export interface CalculatorTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: (string | HowToUseStep)[];
  };
  features: {
    title: string;
    items: (string | Feature)[];
  };
  history: {
    title: string;
    empty: string;
  };
  faqList: FAQItem[];
}
