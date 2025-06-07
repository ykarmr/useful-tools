import type { SubnetCalculatorTranslations } from "../types/tools";

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
};
export default subnetCalculator;
