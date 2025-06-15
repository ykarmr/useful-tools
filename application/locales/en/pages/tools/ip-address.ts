import { IpAddressTranslations } from "@/locales/types/pages/tools/ip-address";

export const ipAddress: IpAddressTranslations = {
  title: "IP Address Information",
  description: "View your public IP address and location information",
  keywords: [
    "IP address",
    "public IP",
    "location information",
    "geolocation",
    "ISP",
    "internet service provider",
  ],
  location: "Location Information",
  country: "Country",
  region: "Region",
  city: "City",
  timezone: "Timezone",
  coordinates: "Coordinates",
  isp: "Internet Service Provider",
  retry: "Retry",
  fetchingInfo: "Fetching IP information...",
  noInfoFound: "No IP information found",
  failedToFetch: "Failed to fetch IP information",
  refreshInfo: "Refresh Information",
  securityNote: "Security Note",
  securityDescription:
    "Your IP address and location information are visible to websites you visit. Consider using a VPN for enhanced privacy.",
  ipInfo: "IP Information",
  yourIP: "Your Public IP Address",
  postal: "Postal Code",
  security: "Security",
  faqList: [
    {
      q: "What is an IP address?",
      a: "An IP address is a unique numerical identifier assigned to devices connected to the internet. It allows devices to communicate with each other over the internet.",
    },
    {
      q: "What's the difference between public and private IP addresses?",
      a: "A public IP address is directly accessible from the internet, while a private IP address is used within local networks (like your home Wi-Fi) and is not directly accessible from the internet.",
    },
    {
      q: "Why can you see my location from my IP address?",
      a: "IP addresses are assigned by Internet Service Providers (ISPs) to specific geographic regions, which allows for approximate location estimation based on the IP address.",
    },
    {
      q: "How accurate is the location information?",
      a: "Location accuracy varies. It's generally accurate at the country and region level, but may be less precise at the city or street level.",
    },
    {
      q: "How can I hide my IP address?",
      a: "You can use a VPN (Virtual Private Network) or proxy server to mask your real IP address and enhance your privacy online.",
    },
    {
      q: "Does my IP address change?",
      a: "Most ISPs assign dynamic IP addresses, which means your IP address may change when you reconnect to the internet or after a certain period of time.",
    },
  ],
};
