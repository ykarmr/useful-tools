import { RandomNumberTranslations } from "@/locales/types/pages/tools/random-number";

export const randomNumber: RandomNumberTranslations = {
  title: "Generador de Números Aleatorios",
  description: "Genera números aleatorios dentro de un rango",
  keywords: [
    "aleatorio",
    "número",
    "generador",
    "número aleatorio",
    "generador de números aleatorios",
  ],
  min: "Mínimo",
  max: "Máximo",
  generate: "Generar",
  faqList: [
    {
      q: "¿Qué tipo de números aleatorios se generan?",
      a: "Se generan números enteros aleatorios con igual probabilidad dentro del rango mínimo y máximo especificado.",
    },
    {
      q: "¿Hay límites en los valores mínimo y máximo?",
      a: "El valor mínimo debe ser menor que el valor máximo. Los valores muy grandes pueden afectar la precisión.",
    },
    {
      q: "¿Puede generarse el mismo número consecutivamente?",
      a: "Sí, dado que son números aleatorios, el mismo número puede generarse consecutivamente. Esto es comportamiento normal.",
    },
    {
      q: "¿Son números aleatorios criptográficamente seguros?",
      a: "Esta herramienta no es adecuada para propósitos de seguridad como contraseñas o claves de cifrado. Está destinada para uso general y juegos.",
    },
  ],
};

export default randomNumber;
