import { FAQItem } from "../../faq";

export interface UnitConversionTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  placeholder: string;
  resultPlaceholder: string;

  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };

  length: string;
  weight: string;
  area: string;
  volume: string;
  temperature: string;
  speed: string;
  time: string;
  pressure: string;
  energy: string;
  data: string;

  categoryLabel: string;
  fromLabel: string;
  toLabel: string;
  inputLabel: string;
  faqList: FAQItem[];
}
