import { FAQItem } from "../../faq";

export interface SubnetCalculatorTranslations {
  title: string;
  subtitle: string;
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

  // 使い方ガイド
  howToUse: {
    title: string;
    steps: string[];
  };

  // 機能
  features: {
    title: string;
    items: string[];
  };

  // UI ラベル
  labels: {
    networkInfo: string;
    hostInfo: string;
  };

  faqList: FAQItem[];
}
