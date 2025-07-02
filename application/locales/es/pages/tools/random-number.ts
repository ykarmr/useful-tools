import { RandomNumberTranslations } from "@/locales/types/pages/tools/random-number";

export const randomNumber: RandomNumberTranslations = {
  title: "Generador de Números Aleatorios",
  subtitle:
    "Genera números aleatorios al instante dentro de rangos específicos",
  description:
    "Una herramienta simple para generar números enteros aleatorios dentro del rango especificado. Perfecto para juegos, sorteos, muestreo y diversas aplicaciones donde necesites números aleatorios.",
  keywords: [
    "aleatorio",
    "número",
    "generador",
    "número aleatorio",
    "entero",
    "rango",
    "sorteo",
    "muestreo",
  ],
  min: "Mínimo",
  max: "Máximo",
  generate: "Generar Número",
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Introduce los valores mínimo y máximo",
      "Haz clic en el botón 'Generar Número'",
      "Se mostrará un número aleatorio dentro del rango especificado",
      "Haz clic en el botón nuevamente para generar un nuevo número aleatorio",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Generación de números aleatorios en cualquier rango de enteros",
      "Visualización de resultados en tiempo real",
      "Manejo de errores y validación",
      "Diseño responsivo",
      "Animaciones suaves",
    ],
  },
  faqList: [
    {
      q: "¿Qué tipo de números aleatorios se generan?",
      a: "Se generan números enteros aleatorios con igual probabilidad dentro del rango mínimo y máximo especificado utilizando la función Math.random() de JavaScript con un algoritmo pseudo-aleatorio.",
    },
    {
      q: "¿Hay límites en los valores mínimo y máximo?",
      a: "El valor mínimo debe ser menor que el valor máximo. Aunque técnicamente son posibles valores muy grandes, recomendamos mantenerse dentro de rangos razonables debido a las limitaciones de precisión numérica de JavaScript.",
    },
    {
      q: "¿Puede generarse el mismo número consecutivamente?",
      a: "Sí, debido a la naturaleza de la aleatoriedad, el mismo número puede generarse consecutivamente. Esto es comportamiento normal y demuestra verdadera aleatoriedad.",
    },
    {
      q: "¿Son números aleatorios criptográficamente seguros?",
      a: "No, los números generados por esta herramienta no son criptográficamente seguros. No los uses para contraseñas, claves de cifrado u otros propósitos de seguridad. Son adecuados para juegos y aplicaciones generales.",
    },
    {
      q: "¿Puedo generar números negativos?",
      a: "Sí, puedes establecer un valor mínimo negativo para generar números aleatorios que incluyan valores negativos. Por ejemplo, puedes generar números de -100 a 100.",
    },
  ],
};

export default randomNumber;
