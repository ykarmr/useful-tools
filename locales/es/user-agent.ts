import { UserAgentTranslations } from "../types/pages/tools/user-agent";

export const userAgent: UserAgentTranslations = {
  title: "Detector de User Agent",
  description: "Detecta y analiza información del user agent del navegador",
  keywords: [
    "user agent",
    "información del navegador",
    "detector de user agent",
    "análisis de user agent",
    "detector de navegador",
  ],
  browser: "Navegador",
  os: "Sistema Operativo",
  device: "Dispositivo",
  platform: "Plataforma",
  mobile: "Móvil",
  fullString: "Cadena Completa del User Agent",
  capabilities: "Capacidades",
  supported: "Soportado",
  notSupported: "No Soportado",
  deviceInfo: "Información del Dispositivo",
  faqList: [
    {
      q: "¿Qué es una cadena de user agent?",
      a: "Una cadena de user agent es información de identificación que tu navegador envía a los servidores web, incluyendo tipo de navegador, versión, sistema operativo y otros detalles.",
    },
    {
      q: "¿Esta información afecta mi privacidad?",
      a: "Las cadenas de user agent son información pública accesible a todos los sitios web. Aunque no contienen información de identificación personal, pueden usarse para huellas digitales.",
    },
    {
      q: "¿Por qué los navegadores a veces reportan información falsa?",
      a: "Por razones de compatibilidad, muchos navegadores se disfrazan como otros navegadores. Esto ayuda a asegurar que los sitios web funcionen correctamente en diferentes navegadores.",
    },
    {
      q: "¿Cuál es la diferencia entre navegadores móviles y de escritorio?",
      a: "Los navegadores móviles típicamente envían cadenas de user agent diferentes para recibir contenido optimizado para el tamaño de pantalla e interfaces táctiles.",
    },
  ],
};
