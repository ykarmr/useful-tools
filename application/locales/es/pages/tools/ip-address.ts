import { IpAddressTranslations } from "@/locales/types/pages/tools/ip-address";

export const ipAddress: IpAddressTranslations = {
  title: "Consulta de Dirección IP",
  description: "Ve tu dirección IP e información de red",
  keywords: [
    "dirección IP",
    "consulta de IP",
    "información de red",
    "ubicación IP",
    "ISP",
    "geolocalización IP",
  ],
  howToUse: {
    title: "Cómo Usar la Herramienta de Información de IP",
    steps: [
      "Tu dirección IP pública se obtiene y muestra automáticamente al abrir la página",
      "Ve información detallada incluyendo ubicación, detalles del ISP y coordenadas",
      "Haz clic en cualquier información para copiarla al portapapeles",
      "Usa el botón 'Actualizar Información' para obtener los datos más recientes",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Detección y visualización automática de la dirección IP pública",
      "Visualización de información de ubicación (ciudad, región, país)",
      "Visualización de información del Proveedor de Servicios de Internet (ISP)",
      "Información de zona horaria y coordenadas",
      "Función de copia con un clic para toda la información",
      "Capacidad de actualización manual de información",
      "Notas informativas sobre privacidad y seguridad",
    ],
  },
  location: "Ubicación",
  country: "País",
  region: "Región",
  city: "Ciudad",
  timezone: "Zona Horaria",
  isp: "Proveedor de Servicios de Internet",
  coordinates: "Coordenadas",
  retry: "Reintentar",
  fetchingInfo: "Obteniendo información de IP...",
  noInfoFound: "No se encontró información de IP",
  failedToFetch: "Error al obtener información de IP",
  refreshInfo: "Actualizar Información",
  securityNote: "Nota de Seguridad",
  securityDescription:
    "Tu dirección IP y ubicación son visibles para los sitios web que visitas. Considera usar una VPN para mayor privacidad.",
  ipInfo: "Información de IP",
  yourIP: "Tu Dirección IP Pública",
  postal: "Código Postal",
  security: "Seguridad",
  faqList: [
    {
      q: "¿Qué es una dirección IP?",
      a: "Una dirección IP es un identificador numérico único asignado a dispositivos conectados a internet. Permite que los dispositivos se comuniquen entre sí a través de internet.",
    },
    {
      q: "¿Cuál es la diferencia entre direcciones IP públicas y privadas?",
      a: "Una dirección IP pública es directamente accesible desde internet, mientras que una dirección IP privada se usa dentro de redes locales (como tu Wi-Fi doméstico) y no es directamente accesible desde internet.",
    },
    {
      q: "¿Por qué se puede ver mi ubicación desde mi dirección IP?",
      a: "Las direcciones IP son asignadas por los Proveedores de Servicios de Internet (ISP) a regiones geográficas específicas, lo que permite una estimación aproximada de la ubicación basada en la dirección IP.",
    },
    {
      q: "¿Qué tan precisa es la información de ubicación?",
      a: "La precisión de la ubicación varía. Generalmente es precisa a nivel de país y región, pero puede ser menos exacta a nivel de ciudad o calle.",
    },
    {
      q: "¿Cómo puedo ocultar mi dirección IP?",
      a: "Puedes usar una VPN (Red Privada Virtual) o servidor proxy para enmascarar tu dirección IP real y mejorar tu privacidad en línea.",
    },
    {
      q: "¿Cambia mi dirección IP?",
      a: "La mayoría de los ISP asignan direcciones IP dinámicas, lo que significa que tu dirección IP puede cambiar cuando te reconectes a internet o después de cierto período de tiempo.",
    },
  ],
};
