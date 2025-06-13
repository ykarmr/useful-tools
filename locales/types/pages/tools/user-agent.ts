import { FAQItem } from "../../faq";

export interface UserAgentTranslations {
  title: string;
  description: string;
  keywords: string[];
  browser: string;
  os: string;
  device: string;
  platform: string;
  mobile: string;
  fullString: string;
  capabilities: string;
  supported: string;
  notSupported: string;
  deviceInfo: string;
  faqList: FAQItem[];
}
