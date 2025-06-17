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
  formatButton: string;
  copyButton: string;
  clearButton: string;
  formatOptions: {
    json: string;
    yaml: string;
    toml: string;
  };
  placeholders: {
    json: string;
    yaml: string;
    toml: string;
  };
  messages: {
    conversionSuccess: string;
    formatSuccess: string;
    invalidFormat: string;
    emptyInput: string;
    copied: string;
    copyError: string;
  };
  features: {
    title: string;
    list: string[];
  };
  faqList: FAQItem[];
}
