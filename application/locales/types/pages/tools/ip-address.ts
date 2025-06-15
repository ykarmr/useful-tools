import { FAQItem } from "../../faq";

export interface IpAddressTranslations {
  title: string;
  description: string;
  keywords: string[];
  location: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  coordinates: string;
  isp: string;
  retry: string;
  ipInfo: string;
  yourIP: string;
  postal: string;
  fetchingInfo: string;
  noInfoFound: string;
  failedToFetch: string;
  security: string;
  securityNote: string;
  securityDescription: string;
  refreshInfo: string;
  faqList: FAQItem[];
}
