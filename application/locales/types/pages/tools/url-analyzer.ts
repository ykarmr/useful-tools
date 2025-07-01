import { FAQItem } from "../../faq";

export interface UrlAnalyzerTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  analyze: string;
  analyzing: string;
  urlPlaceholder: string;
  basicInfo: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  invalidUrl: string;
  queryParams: string;
  queryCount: string;
  noQueryParams: string;
  paramName: string;
  paramValue: string;
  copy: string;
  securityInfo: string;
  https: string;
  sample: string;
  secure: string;
  insecure: string;
  clear: string;
  copied: string;
  notAvailable: string;
  howToUse: {
    title: string;
    steps: string[];
    features: {
      title: string;
      items: string[];
    };
  };
  faqList: FAQItem[];
}
