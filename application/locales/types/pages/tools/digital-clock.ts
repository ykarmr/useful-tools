import { FAQItem } from "../../faq";

export interface DigitalClockTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  settings: string;
  format24Hour: string;
  showSeconds: string;
  showDate: string;
  fullscreen: string;
  exitFullscreen: string;
  fullscreenMode: string;
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
