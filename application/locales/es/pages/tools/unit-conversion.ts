import { UnitConversionTranslations } from "@/locales/types/pages/tools/unit-conversion";

export const unitConversion: UnitConversionTranslations = {
  title: "Conversión de Unidades",
  description: "Convierte fácilmente entre diferentes unidades de medida",
  keywords: [
    "conversión de unidades",
    "medición",
    "convertir unidades",
    "conversión de longitud",
    "conversión de peso",
    "conversión de temperatura",
    "conversión de volumen",
  ],
  placeholder: "Ingresa el valor y selecciona las unidades...",
  resultPlaceholder: "El valor convertido aparecerá aquí...",
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
      a: "Admitimos 10 categorías de conversiones de unidades: longitud, peso, área, volumen, temperatura, velocidad, tiempo, presión, energía y almacenamiento de datos.",
    },
    {
      q: "¿Qué tan precisas son las conversiones?",
      a: "Las conversiones utilizan factores de conversión precisos y son exactas hasta múltiples lugares decimales. Sin embargo, para aplicaciones científicas, verifique que la precisión cumpla con sus requisitos.",
    },
    {
      q: "¿Puedo convertir entre diferentes sistemas de medida?",
      a: "Sí, puedes convertir entre sistemas métricos, imperiales y otros sistemas de medida. Por ejemplo, convertir de pies a metros o de Fahrenheit a Celsius.",
    },
    {
      q: "¿Las conversiones de temperatura se manejan de manera diferente?",
      a: "Sí, las conversiones de temperatura usan fórmulas especiales en lugar de multiplicación simple, ya que involucran cálculos de desplazamiento (ej., Celsius a Fahrenheit: °F = °C × 9/5 + 32).",
    },
  ],
};
