import { UrlEncoderTranslations } from "../types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "Codificador de URL",
  description: "Codifica y decodifica cadenas de URL",
  keywords: [
    "codificador de URL",
    "decodificador de URL",
    "codificación de URL",
    "decodificación de URL",
  ],
  encode: "Codificar",
  decode: "Decodificar",
  switch: "Cambiar modo",
  originalUrl: "URL original",
  encodedUrl: "URL codificada",
  examples: "Ejemplos",
  encodingExample: "Ejemplo de codificación:",
  specialCharacters: "Caracteres especiales:",
  inputLabel: "Entrada:",
  outputLabel: "Salida:",
  spaceToPercent: "Espacio → %20, & → %26, = → %3D, ? → %3F",
  decodedUrl: "URL decodificada",
  invalidInput: "Error: Entrada no válida",
  enterUrl: "Ingresa la URL para codificar",
  enterEncodedUrl: "Ingresa la URL codificada para decodificar",
  faqList: [
    {
      q: "¿Qué es la codificación de URL?",
      a: "La codificación de URL es el proceso de convertir caracteres especiales que no pueden usarse en URLs a un formato seguro. Por ejemplo, los espacios se convierten en %20.",
    },
    {
      q: "¿Por qué es necesaria la codificación de URL?",
      a: "Las URLs no pueden contener directamente ciertos caracteres (espacios, &, =, etc.), por lo que estos deben convertirse a códigos hexadecimales que comienzan con %.",
    },
    {
      q: "¿Qué caracteres se codifican?",
      a: "Los espacios, caracteres no ASCII, símbolos especiales (&, =, ?, #, etc.) y caracteres que tienen significado especial en URLs se codifican.",
    },
    {
      q: "¿Puedo decodificar URLs codificadas?",
      a: "Sí, esta herramienta admite tanto codificación como decodificación. Usa el botón de cambio para alternar entre modos.",
    },
  ],
};
