import { FAQItem } from "../../faq";

export interface SubnetCalculatorTranslations {
  title: string;
  description: string;
  keywords: string[];
  ipAddress: string;
  subnetMaskLength: string;
  subnetMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  hosts: string;
  invalidInput: string;

  displayBase: string;
  octal: string;
  binary: string;
  decimal: string;
  hexadecimal: string;

  errorEmptyIp: string;
  errorInvalidIp: string;
  errorEmptyMask: string;
  errorInvalidMask: string;
  calculate: string;
  faqList: FAQItem[];
}
