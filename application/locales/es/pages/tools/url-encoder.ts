import { UrlEncoderTranslations } from "@/locales/types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "Codificador/Decodificador de URL",
  subtitle: "Convierte caracteres especiales en URLs a formato seguro",
  description:
    "Codifica y decodifica URLs para transmisión segura y uso en aplicaciones web",
  keywords: [
    "Codificador de URL",
    "Decodificador de URL",
    "Codificación de URL",
    "Decodificación de URL",
    "Herramientas URL",
    "Codificación de Porcentaje",
    "Conversión de Caracteres",
  ],
  encode: "Codificar",
  decode: "Decodificar",
  switch: "Cambiar Modo",
  originalUrl: "URL Original",
  encodedUrl: "URL Codificada",
  examples: "Ejemplos",
  encodingExample: "Ejemplo de codificación:",
  specialCharacters: "Caracteres especiales:",
  inputLabel: "Entrada:",
  outputLabel: "Salida:",
  spaceToPercent: "Espacio → %20, & → %26, = → %3D, ? → %3F",
  decodedUrl: "URL Decodificada",
  invalidInput: "Error: Entrada no válida",
  enterUrl: "Ingrese la URL para codificar",
  enterEncodedUrl: "Ingrese la URL codificada para decodificar",
  howToUse: {
    title: "Cómo Usar el Codificador/Decodificador de URL",
    steps: [
      "Seleccione el modo de codificación o decodificación",
      "Ingrese su URL o URL codificada en el campo de entrada",
      "El resultado se mostrará automáticamente y se puede copiar al portapapeles",
      "Use el botón de cambiar para alternar fácilmente entre modos de codificación y decodificación",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Codificación y decodificación en tiempo real",
      "Codificación de porcentaje compatible con RFC 3986",
      "Conversión segura de caracteres internacionales",
      "Copia al portapapeles con un clic",
      "Manejo de errores para entrada no válida",
      "Diseño responsivo para todos los dispositivos",
    ],
  },
  faqList: [
    {
      q: "¿Qué es la codificación de URL?",
      a: "La codificación de URL (codificación de porcentaje) es el proceso de convertir caracteres especiales y caracteres no ASCII que no se pueden usar en URLs en códigos hexadecimales que comienzan con %. Esto permite que los navegadores web interpreten correctamente las URLs.",
    },
    {
      q: "¿Cuándo necesito codificación de URL?",
      a: "La codificación de URL es necesaria cuando las consultas de búsqueda contienen caracteres no ingleses, al enviar datos de formularios, especificar parámetros de API, o cuando los nombres de archivos contienen caracteres especiales. Es esencial para el desarrollo de aplicaciones web.",
    },
    {
      q: "¿Qué caracteres se codifican?",
      a: "Los espacios, caracteres no ASCII, símbolos especiales (&, =, ?, #, +, etc.), caracteres de control y caracteres que tienen significado especial en URLs se codifican. Los caracteres seguros (alfanuméricos y algunos símbolos) permanecen sin cambios.",
    },
    {
      q: "¿Puedo decodificar URLs codificadas de vuelta a su forma original?",
      a: "Sí, puede usar la función de decodificación de esta herramienta para restaurar URLs codificadas a su formato original. Sin embargo, si la cadena codificada está mal formada, se mostrará un error.",
    },
    {
      q: "¿Hay un límite de longitud para las URLs procesadas por esta herramienta?",
      a: "La herramienta puede manejar URLs largas dentro de los límites del navegador, pero generalmente se recomiendan URLs de menos de 2000 caracteres. Las URLs muy largas pueden causar problemas con algunos servidores web.",
    },
  ],
};
