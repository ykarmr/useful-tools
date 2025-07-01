import { FAQItem } from "../../faq";

export interface QrGeneratorTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  result: string;
  download: string;
  text: string;
  placeholder: string;
  size: string;
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
