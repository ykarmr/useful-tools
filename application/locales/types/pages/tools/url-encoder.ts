import { FAQItem } from "../../faq";

export interface UrlEncoderTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  encode: string;
  decode: string;
  switch: string;
  originalUrl: string;
  encodedUrl: string;
  enterUrl: string;
  enterEncodedUrl: string;
  examples: string;
  encodingExample: string;
  specialCharacters: string;
  inputLabel: string;
  outputLabel: string;
  spaceToPercent: string;
  decodedUrl: string;
  invalidInput: string;
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
