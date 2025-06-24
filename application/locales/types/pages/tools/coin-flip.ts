import { FAQItem } from "../../faq";

export interface CoinFlipTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  flip: string;
  heads: string;
  tails: string;
  flipping: string;
  selectCount: string;
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
