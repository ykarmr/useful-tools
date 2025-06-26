import { FAQItem } from "../../faq";

export interface TextStatisticsTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  inputLabel: string;
  inputPlaceholder: string;
  inputDescription: string;
  inputAriaLabel: string;
  inputCharacterCount: string;
  frequencyCount: string;
  exportOptions: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  analyzeText: string;
  clear: string;
  statistics: string;
  characters: string;
  charactersNoSpaces: string;
  words: string;
  sentences: string;
  paragraphs: string;
  lines: string;
  readingTime: string;
  minutes: string;
  readingSpeed: string;
  wordsPerMinute: string;
  avgWordsPerSentence: string;
  avgSentencesPerParagraph: string;
  mostCommonWords: string;
  word: string;
  frequency: string;
  textComplexity: string;
  simple: string;
  moderate: string;
  complex: string;
  languageDetection: string;
  detected: string;
  unknown: string;
  copyStats: string;
  copied: string;
  exportData: string;
  downloadTXT: string;
  downloadJSON: string;
  noText: string;
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
