import { SubnetCalculatorTranslations } from "@/locales/types/pages/tools/subnet-calculator";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "Subnet Calculator",
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
  errorEmptyIp: "IP address cannot be empty",
  errorInvalidIp: "Invalid IP address format",
  errorEmptyMask: "Subnet mask length cannot be empty",
  errorInvalidMask: "Invalid subnet mask length",
  calculate: "Calculate",
  faqList: [
    {
      q: "What is a subnet calculator?",
      a: "A subnet calculator helps you determine network information like network address, broadcast address, and host range from an IP address and subnet mask.",
    },
    {
      q: "What is CIDR notation?",
      a: "CIDR (Classless Inter-Domain Routing) notation uses a slash followed by a number (like /24) to indicate how many bits are used for the network portion of the address.",
    },
    {
      q: "How many hosts can be in a subnet?",
      a: "The number of hosts depends on the subnet mask. For example, /24 allows 254 hosts, while /16 allows 65,534 hosts.",
    },
    {
      q: "What are the different display formats for?",
      a: "Different formats (binary, decimal, hexadecimal, octal) help network administrators view IP addresses in various representations for different purposes.",
    },
  ],
};
export default subnetCalculator;
