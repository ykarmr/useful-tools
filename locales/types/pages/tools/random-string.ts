import { FAQItem } from "../../faq";

export interface RandomStringTranslations {
  title: string;
  description: string;
  keywords: string[];
  length: string;
  includeNumbers: string;
  includeSymbols: string;
  generate: string;
  result: string;
  faqList: FAQItem[];
}
