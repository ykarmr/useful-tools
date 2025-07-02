import { PetAgeConversionTranslations } from "@/locales/types/pages/tools/pet-age-conversion";

export const petAgeConversion: PetAgeConversionTranslations = {
  title: "Conversor de Edad de Mascotas",
  subtitle: "Convierte la edad de tu querida mascota a años humanos",
  description:
    "Convierte la edad de varias mascotas incluyendo perros y gatos a años humanos. Compatible con 12 animales diferentes usando fórmulas de conversión especializadas para resultados precisos.",
  keywords: [
    "edad de mascotas",
    "conversor de edad",
    "edad de perro",
    "edad de gato",
    "edad animal",
    "años humanos",
    "salud de mascotas",
    "calculadora de edad",
  ],
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Selecciona el tipo de mascota del menú desplegable",
      "Ingresa la edad de tu mascota en años",
      "Ve el equivalente en años humanos calculado automáticamente",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Compatible con 12 animales diferentes (perros, gatos, conejos, hámsters, etc.)",
      "Fórmulas de conversión especializadas para cada especie",
      "Soporte para entrada de edad decimal",
      "Visualización de cálculo en tiempo real",
      "Interfaz intuitiva y fácil de usar",
    ],
  },
  petTypeLabel: "Tipo de Mascota",
  dog: "Perro",
  cat: "Gato",
  rabbit: "Conejo",
  hamster: "Hámster",
  ferret: "Hurón",
  horse: "Caballo",
  cow: "Vaca",
  pig: "Cerdo",
  sheep: "Oveja",
  goat: "Cabra",
  turtle: "Tortuga",
  parakeet: "Periquito",
  petAgeLabel: "Edad de la Mascota (años)",
  petAgePlaceholder: "ej. 5",
  resultPlaceholder: "La edad convertida aparecerá aquí",
  petAgeResult:
    "{petAge} años de edad {petType} es equivalente a {humanAge} años humanos.",
  faqList: [
    {
      q: "¿Qué tan precisas son las conversiones de edad de mascotas?",
      a: "Las conversiones se basan en fórmulas comúnmente utilizadas, pero las tasas de envejecimiento reales varían según la raza y el individuo. Úsalas como valores de referencia.",
    },
    {
      q: "¿Qué animales son compatibles?",
      a: "Admitimos 12 animales incluyendo perros, gatos, conejos, hámsters, caballos, vacas y más. Cada uno usa diferentes fórmulas de conversión.",
    },
    {
      q: "¿Cuál es la edad máxima que puedo calcular?",
      a: "No hay límite técnico, pero para edades muy avanzadas, las fórmulas de conversión pueden ser menos precisas. Recomendamos usar dentro de rangos típicos de vida útil.",
    },
    {
      q: "¿Puedo ingresar edades decimales?",
      a: "Sí, puedes ingresar edades decimales como 0.5 años (6 meses). Esto es especialmente útil para calcular edades de animales jóvenes.",
    },
  ],
};
