import { FAQItem } from "../../faq";

export interface JsonFormatterTranslations {
  title: string;
  description: string;
  keywords: string[];
  input: string;
  output: string;
  format: string;
  minify: string;
  invalidJson: string;
  indentSize: string;
  uploadFile: string;
  placeholder: string;
  statistics: string;
  lines: string;
  characters: string;
  size: string;
  examples: string;
  basicObject: string;
  objectWithArray: string;
  download: string;
  indent2: string;
  indent4: string;
  indent8: string;
  faqList: FAQItem[];
}
