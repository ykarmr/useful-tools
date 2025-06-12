import type { UserAgentTranslations } from "../types";

export const userAgent: UserAgentTranslations = {
  title: "User Agent Information",
  description: "View detailed information about your browser and system",
  keywords: [
    "user agent",
    "browser information",
    "system information",
    "device details",
    "user agent string",
  ],
  browser: "Browser",
  os: "Operating System",
  device: "Device",
  platform: "Platform",
  mobile: "Mobile",
  fullString: "Full User Agent String",
  capabilities: "Capabilities",
  supported: "Supported",
  notSupported: "Not Supported",
  deviceInfo: "Device Information",
  faqList: [
    {
      q: "What is a user agent string?",
      a: "A user agent string is identification information that your browser sends to web servers, including browser type, version, operating system, and other details.",
    },
    {
      q: "Does this information affect my privacy?",
      a: "User agent strings are public information accessible to all websites. While they don't contain personally identifiable information, they can be used for fingerprinting.",
    },
    {
      q: "Why do browsers sometimes report false information?",
      a: "For compatibility reasons, many browsers masquerade as other browsers. This helps ensure websites work properly across different browsers.",
    },
    {
      q: "What's the difference between mobile and desktop browsers?",
      a: "Mobile browsers typically send different user agent strings to receive content optimized for screen size and touch interfaces.",
    },
  ],
};
