import { SubnetCalculatorTranslations } from "@/locales/types/pages/tools/subnet-calculator";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "Calculadora de Subred",
  subtitle:
    "Calcula instantáneamente información de subred esencial para el diseño de redes",
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

  // Guía de uso
  howToUse: {
    title: "Cómo usar la Calculadora de Subred",
    steps: [
      "Ingrese una dirección IP (ej: 192.168.1.1)",
      "Ingrese la longitud de máscara en notación CIDR (ej: 24)",
      "Haga clic en el botón 'Calcular'",
      "Revise la información de red (dirección de red, broadcast, etc.)",
      "Cambie el formato de visualización para ver en binario, octal o hexadecimal",
      "Ingrese nuevos valores y recalcule para diferentes direcciones IP",
    ],
  },

  // Características
  features: {
    title: "Características Principales",
    items: [
      "Cálculo de subred para direcciones IPv4",
      "Soporte para notación CIDR (/0 a /32)",
      "Cálculo de direcciones de red y broadcast",
      "Mostrar rango de hosts (primera y última dirección de host)",
      "Cálculo del número de hosts disponibles",
      "Cambio entre visualización binaria, octal, decimal y hexadecimal",
      "Validación de entrada en tiempo real y visualización de errores",
      "Diseño responsivo para dispositivos móviles",
    ],
  },

  // Etiquetas de UI
  labels: {
    networkInfo: "Información de Red",
    hostInfo: "Información de Host",
  },

  faqList: [
    {
      q: "¿Qué es una calculadora de subred?",
      a: "Una calculadora de subred es una herramienta que calcula automáticamente información de red como dirección de red, dirección de broadcast, rango de hosts y número de hosts disponibles a partir de una dirección IP y longitud de máscara (notación CIDR). Es útil para el diseño y gestión de redes.",
    },
    {
      q: "¿Qué es la notación CIDR?",
      a: "La notación CIDR (Classless Inter-Domain Routing) es un método de representar direcciones IP agregando una barra y número después de la dirección IP para indicar el número de bits de red. Por ejemplo, /24 significa que los 24 bits superiores son la porción de red, equivalente a una máscara de subred de 255.255.255.0.",
    },
    {
      q: "¿Cómo se calcula el número de hosts?",
      a: "El número de hosts disponibles se calcula a partir del número de bits de host. Por ejemplo, con /24 (8 bits de host), se pueden colocar 2^8 - 2 = 254 hosts. Restamos 2 porque se excluyen la dirección de red y la dirección de broadcast.",
    },
    {
      q: "¿Para qué se usan los diferentes formatos de visualización?",
      a: "La visualización binaria ayuda a entender las operaciones de bits, el hexadecimal se usa en archivos de configuración, y el octal se usa en sistemas específicos. Proporcionamos múltiples formatos de visualización para ayudar con la configuración de dispositivos de red y una comprensión más profunda.",
    },
    {
      q: "¿Son especiales las subredes /31 y /32?",
      a: "Sí. /31 es para conexiones punto a punto con 2 direcciones IP, y /32 es para especificación de host con solo 1 dirección IP. En estos casos, los conceptos usuales de direcciones de red y broadcast no se aplican.",
    },
  ],
};
export default subnetCalculator;
