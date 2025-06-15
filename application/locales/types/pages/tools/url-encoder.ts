import { FAQItem } from "../../faq";

export interface UrlEncoderTranslations {
  title: string;
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
  faqList: FAQItem[];
}
