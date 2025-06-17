import { FAQItem } from "../../faq";

export interface DataConverterTranslations {
  title: string;
  description: string;
  keywords: string[];
  inputLabel: string;
  outputLabel: string;
  formatLabel: string;
  sampleDataLabel: string;
  outputPlaceholder: string;
  convertButton: string;
  copyButton: string;
  clearButton: string;
  formatOptions: {
    json: string;
    yaml: string;
    toml: string;
    xml: string;
  };
  placeholders: {
    json: string;
    yaml: string;
    toml: string;
    xml: string;
  };
  messages: {
    conversionSuccess: string;
    invalidFormat: string;
    emptyInput: string;
    copied: string;
  };
  features: {
    title: string;
    list: string[];
  };
  faqList: FAQItem[];
}
