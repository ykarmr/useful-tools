import { FAQItem } from "../../faq";

export interface PetAgeConversionTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  petTypeLabel: string;
  dog: string;
  cat: string;
  rabbit: string;
  hamster: string;
  ferret: string;
  horse: string;
  cow: string;
  pig: string;
  sheep: string;
  goat: string;
  turtle: string;
  parakeet: string;
  petAgeLabel: string;
  petAgePlaceholder: string;
  resultPlaceholder: string;
  petAgeResult: string;
  faqList: FAQItem[];
}
