import { UnitConversionTranslations } from "@/locales/types/pages/tools/unit-conversion";

export const unitConversion: UnitConversionTranslations = {
  title: "Herramienta de Conversión de Unidades",
  subtitle: "Convierte cualquier unidad de medida con precisión",
  description:
    "Convierte instantáneamente entre varias unidades de medida incluyendo longitud, peso, área, volumen, temperatura y más. Perfecto para uso diario y aplicaciones profesionales.",
  keywords: [
    "conversión de unidades",
    "medición",
    "convertir unidades",
    "conversión de longitud",
    "conversión de peso",
    "conversión de temperatura",
    "conversión de volumen",
    "conversión de área",
    "conversión de velocidad",
    "conversión de tiempo",
    "conversión de presión",
    "conversión de energía",
    "conversión de datos",
  ],
  placeholder: "Ingresa el valor a convertir",
  resultPlaceholder: "El resultado de la conversión aparecerá aquí",

  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Selecciona la categoría que deseas convertir (longitud, peso, etc.)",
      "Ingresa el valor que deseas convertir en el campo de entrada",
      "Elige la unidad de origen y la unidad de destino de las listas desplegables",
      "El resultado de la conversión se mostrará automáticamente",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Admite 10 categorías de conversión de unidades",
      "Cálculos de conversión de alta precisión",
      "Conversión en tiempo real",
      "Compatible con unidades SI e imperiales",
      "Manejo especial para conversión de temperatura",
      "Conversión de almacenamiento de datos (unidades binarias)",
    ],
  },
  length: "longitud",
  weight: "peso",
  area: "área",
  volume: "volumen",
  temperature: "temperatura",
  speed: "velocidad",
  time: "tiempo",
  pressure: "presión",
  energy: "energía",
  data: "datos",

  categoryLabel: "Categoría",
  fromLabel: "Desde",
  toLabel: "Hasta",
  inputLabel: "Valor de Entrada",
  faqList: [
    {
      q: "¿Qué tipos de conversiones de unidades se admiten?",
      a: "Admitimos 10 categorías de conversiones de unidades: longitud, peso, área, volumen, temperatura, velocidad, tiempo, presión, energía y almacenamiento de datos. Puedes convertir entre sistemas métricos, imperiales y otros sistemas de medida.",
    },
    {
      q: "¿Qué tan precisas son las conversiones?",
      a: "Las conversiones utilizan factores de conversión estándar internacionales y son precisas hasta 8 decimales para uso general. Para cálculos científicos e ingenieriles, recomendamos usar herramientas especializadas.",
    },
    {
      q: "¿Las conversiones de temperatura se manejan de manera diferente a otras unidades?",
      a: "Sí, las conversiones de temperatura usan fórmulas especiales en lugar de multiplicación simple porque involucran cálculos de desplazamiento (ej., °C = (°F - 32) × 5/9).",
    },
    {
      q: "Para conversiones de datos, ¿usan sistemas binarios o decimales?",
      a: "Las conversiones de almacenamiento de datos usan el sistema binario (base 1024), lo que proporciona conversiones precisas comúnmente usadas en sistemas informáticos (ej., 1KB = 1024 bytes).",
    },
    {
      q: "¿Puedo agregar unidades personalizadas?",
      a: "Actualmente, solo están disponibles unidades predefinidas. Planeamos agregar más unidades en futuras actualizaciones.",
    },
  ],
};
