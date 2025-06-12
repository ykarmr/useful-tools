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
  faqList: [
    {
      q: "¿Qué es la longitud de máscara de subred (CIDR)?",
      a: "La longitud de máscara de subred (notación CIDR) es el número de bits del prefijo de red, desde 0 a 32. Por ejemplo, /24 significa que los primeros 24 bits se usan para la parte de red.",
    },
    {
      q: "¿Cómo entender los resultados del cálculo?",
      a: "Los resultados incluyen dirección de red, máscara de subred, dirección de broadcast, primera dirección de host, última dirección de host y número de hosts disponibles.",
    },
    {
      q: "¿Qué formatos de visualización se admiten?",
      a: "Se admiten cuatro formatos de visualización: binario, octal, decimal y hexadecimal, que puedes cambiar según sea necesario.",
    },
    {
      q: "¿Cuál es la diferencia entre direcciones IP privadas y públicas?",
      a: "Las direcciones IP privadas (como 192.168.x.x, 10.x.x.x) se usan para redes internas, mientras que las direcciones IP públicas se usan para comunicación en Internet. La calculadora funciona para ambas.",
    },
  ],
};
export default subnetCalculator;
