import { FAQItem } from "../../faq";

export interface RandomNumberTranslations {
  title: string;
  description: string;
  keywords: string[];
  min: string;
  max: string;
  generate: string;
  faqList: FAQItem[];
}
