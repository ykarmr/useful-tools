import type { SubnetCalculatorTranslations } from "../types/tools";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "Calculadora de Subred",
  description:
    "Calcula información de red a partir de la dirección IP y la longitud de la máscara.",
  keywords: ["subred", "dirección IP", "red", "calculadora", "máscara"],
  ipAddress: "Dirección IP",
  subnetMaskLength: "Longitud de la máscara (CIDR)",
  subnetMask: "Máscara de subred",
  networkAddress: "Dirección de red",
  broadcastAddress: "Dirección de broadcast",
  firstHost: "Primera dirección de host",
  lastHost: "Última dirección de host",
  hosts: "Número de hosts",
  invalidInput: "Entrada inválida",
  displayBase: "Base de visualización",
  octal: "Octal",
  binary: "Binario",
  decimal: "Decimal",
  hexadecimal: "Hexadecimal",
  errorEmptyIp: "Por favor, ingrese una dirección IP.",
  errorInvalidIp: "El formato de la dirección IP no es válido.",
  errorEmptyMask: "Por favor, ingrese la longitud de la máscara de subred.",
  errorInvalidMask:
    "La longitud de la máscara de subred debe estar entre 0 y 32.",
  calculate: "Calcular",
};
export default subnetCalculator;
