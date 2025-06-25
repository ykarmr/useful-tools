import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "Conversor de Formato de Datos",
  subTitle: "Conversor JSON ⇔ YAML ⇔ TOML",
  description:
    "Herramienta en línea para convertir entre formatos de datos JSON, YAML y TOML. Perfecto para archivos de configuración y conversión de estructuras de datos.",
  keywords: [
    "conversión de datos",
    "conversión de formato",
    "JSON",
    "YAML",
    "TOML",
    "archivo de configuración",
    "herramienta convertidor",
    "datos estructurados",
  ],
  inputLabel: "Datos de Entrada",
  outputLabel: "Resultado de Conversión",
  formatLabel: "Formato",
  sampleDataLabel: "Datos de Muestra",
  inputPlaceholder: "Ingrese los datos que desea convertir...",
  outputPlaceholder: "El resultado de la conversión se mostrará aquí...",
  convertButton: "Convertir",
  formatButton: "Formatear",
  copyButton: "Copiar",
  clearButton: "Limpiar",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
  },
  placeholders: {
    json: '{\n  "name": "ejemplo",\n  "version": "1.0.0",\n  "description": "Datos JSON de muestra",\n  "features": ["ligero", "legible", "ampliamente utilizado"]\n}',
    yaml: 'name: ejemplo\nversion: "1.0.0"\ndescription: Datos YAML de muestra\nfeatures:\n  - altamente legible\n  - soporta comentarios\n  - perfecto para archivos de configuración',
    toml: 'name = "ejemplo"\nversion = "1.0.0"\ndescription = "Datos TOML de muestra"\n\n[features]\nreadability = "alta"\ncomments = "soportados"\nuse_case = "archivos de configuración"',
  },
  messages: {
    conversionSuccess: "Conversión completada exitosamente",
    formatSuccess: "Formateo completado exitosamente",
    invalidFormat: "Formato de datos de entrada inválido",
    emptyInput: "Por favor ingresa datos para convertir",
    copied: "Copiado al portapapeles",
    copyError: "Error al copiar",
  },
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Ingrese los datos que desea convertir en el área izquierda",
      "Seleccione el formato de entrada (JSON/YAML/TOML)",
      "Seleccione el formato de salida (JSON/YAML/TOML)",
      "Haga clic en el botón 'Convertir' para realizar la conversión",
      "Revise el resultado de la conversión y copie si es necesario",
    ],
  },
  features: {
    title: "Características y Beneficios",
    list: [
      "Conversión mutua entre JSON ⇔ YAML ⇔ TOML",
      "Selección manual de formato para conversión confiable",
      "Función de formateo de datos de entrada para código limpio",
      "3 tipos de datos de muestra para pruebas",
      "Copia al portapapeles con un clic",
      "Interfaz de usuario simple e intuitiva",
    ],
  },
  faqList: [
    {
      q: "¿Cómo uso esta herramienta?",
      a: "Ingresa datos en el área de texto izquierda o prueba usando los botones de datos de muestra. Selecciona los formatos de entrada y salida, luego haz clic en el botón 'Convertir' para convertir fácilmente entre formatos.",
    },
    {
      q: "¿Qué formatos de datos se pueden convertir?",
      a: "Soporta formatos JSON, YAML y TOML con conversión mutua entre estos tres formatos. Perfecto para archivos de configuración, respuestas API e intercambio de datos en varias aplicaciones.",
    },
    {
      q: "¿Para qué sirve la función de formato?",
      a: "La función de formato embellece tus datos de entrada en el mismo formato. Aplica sangría adecuada y organiza la estructura para hacer tus datos más legibles y comprensibles.",
    },
    {
      q: "¿Para qué sirven los botones de datos de muestra?",
      a: "Puedes insertar datos de muestra para cada formato (JSON, YAML, TOML) en el área de entrada para probar la funcionalidad de la herramienta. También sirven como referencia al usar la herramienta por primera vez.",
    },
    {
      q: "¿Se perderán datos durante la conversión?",
      a: "Las estructuras de datos básicas (objetos, arrays, strings, números, booleanos) se preservan con precisión. Sin embargo, las características específicas del formato (comentarios TOML, anclas YAML, etc.) pueden perderse durante la conversión.",
    },
    {
      q: "¿Puedo guardar los datos convertidos como archivo?",
      a: "El resultado de la conversión se puede copiar al portapapeles usando el botón 'Copiar'. Luego pégalo en un editor de texto y guárdalo con la extensión apropiada (.json, .yaml, .toml).",
    },
  ],
};
