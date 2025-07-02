import { SubnetCalculatorTranslations } from "@/locales/types/pages/tools/subnet-calculator";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "Subnet Calculator",
  subtitle:
    "Instantly calculate subnet information essential for network design",
  description:
    "Calculate network information from IP address and subnet mask length.",
  keywords: ["subnet", "IP address", "network", "calculator", "mask"],
  ipAddress: "IP Address",
  subnetMaskLength: "Subnet Mask Length (CIDR)",
  subnetMask: "Subnet Mask",
  networkAddress: "Network Address",
  broadcastAddress: "Broadcast Address",
  firstHost: "First Host Address",
  lastHost: "Last Host Address",
  hosts: "Number of Hosts",
  invalidInput: "Invalid input",
  displayBase: "Display Base",
  octal: "Octal",
  binary: "Binary",
  decimal: "Decimal",
  hexadecimal: "Hexadecimal",
  errorEmptyIp: "Please enter an IP address",
  errorInvalidIp: "Invalid IP address format",
  errorEmptyMask: "Please enter subnet mask length",
  errorInvalidMask: "Subnet mask length must be between 0 and 32",
  calculate: "Calculate",

  // How to use guide
  howToUse: {
    title: "How to Use Subnet Calculator",
    steps: [
      "Enter an IP address (e.g., 192.168.1.1)",
      "Enter subnet mask length in CIDR notation (e.g., 24)",
      "Click the 'Calculate' button",
      "Review network information (network address, broadcast address, etc.)",
      "Switch display format to view in binary, octal, or hexadecimal",
      "Enter new values and recalculate for different IP addresses",
    ],
  },

  // Features
  features: {
    title: "Key Features",
    items: [
      "IPv4 address subnet calculation",
      "Support for CIDR notation (/0 to /32)",
      "Calculate network and broadcast addresses",
      "Display host range (first and last host addresses)",
      "Calculate number of available hosts",
      "Switch between binary, octal, decimal, and hexadecimal display",
      "Real-time input validation and error display",
      "Responsive design for mobile devices",
    ],
  },

  // UI Labels
  labels: {
    networkInfo: "Network Information",
    hostInfo: "Host Information",
  },

  faqList: [
    {
      q: "What is a subnet calculator?",
      a: "A subnet calculator is a tool that automatically calculates network information such as network address, broadcast address, host range, and number of available hosts from an IP address and subnet mask length (CIDR notation). It's useful for network design and management.",
    },
    {
      q: "What is CIDR notation?",
      a: "CIDR (Classless Inter-Domain Routing) notation is a method of representing IP addresses by adding a slash and number after the IP address to indicate the number of network bits. For example, /24 means the upper 24 bits are the network portion, equivalent to a subnet mask of 255.255.255.0.",
    },
    {
      q: "How is the number of hosts calculated?",
      a: "The number of available hosts is calculated from the number of host bits. For example, with /24 (8 host bits), 2^8 - 2 = 254 hosts can be placed. We subtract 2 because the network address and broadcast address are excluded.",
    },
    {
      q: "What are the different display formats used for?",
      a: "Binary display helps understand bit operations, hexadecimal is used in configuration files, and octal is used in specific systems. We provide multiple display formats to help with network device configuration and deeper understanding.",
    },
    {
      q: "Are /31 and /32 subnets special?",
      a: "Yes. /31 is for point-to-point connections with 2 IP addresses, and /32 is for host specification with only 1 IP address. In these cases, the usual concepts of network and broadcast addresses don't apply.",
    },
  ],
};
export default subnetCalculator;
