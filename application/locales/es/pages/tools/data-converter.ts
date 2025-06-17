import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "Conversor de Formato de Datos",
  description:
    "Herramienta en línea para convertir entre formatos de datos JSON, YAML, TOML y XML.",
  keywords: [
    "conversión de datos",
    "conversión de formato",
    "JSON",
    "YAML",
    "TOML",
    "XML",
    "archivo de configuración",
    "herramienta convertidor",
  ],
  inputLabel: "Datos de Entrada",
  outputLabel: "Resultado de Conversión",
  formatLabel: "Formato de Salida",
  sampleDataLabel: "Datos de Muestra",
  outputPlaceholder: "El resultado de la conversión se mostrará aquí...",
  convertButton: "Convertir",
  copyButton: "Copiar",
  clearButton: "Limpiar",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
    xml: "XML",
  },
  placeholders: {
    json: '{\n  "name": "ejemplo",\n  "version": "1.0.0",\n  "description": "Datos JSON de muestra"\n}',
    yaml: 'name: ejemplo\nversion: "1.0.0"\ndescription: Datos YAML de muestra',
    toml: 'name = "ejemplo"\nversion = "1.0.0"\ndescription = "Datos TOML de muestra"',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <name>ejemplo</name>\n  <version>1.0.0</version>\n  <description>Datos XML de muestra</description>\n</root>',
  },
  messages: {
    conversionSuccess: "Conversión completada exitosamente",
    invalidFormat: "Formato de datos de entrada inválido",
    emptyInput: "Por favor ingresa datos para convertir",
    copied: "Copiado al portapapeles",
  },
  features: {
    title: "Características",
    list: [
      "Conversión mutua entre JSON ⇔ YAML ⇔ TOML ⇔ XML",
      "Visualización con resaltado de sintaxis",
      "Validación de errores y verificación de formato",
      "Función de copia con un clic",
      "Vista previa en tiempo real",
    ],
  },
  faqList: [
    {
      q: "¿Qué formatos de datos se pueden convertir?",
      a: "Soporta formatos JSON, YAML, TOML y XML con conversión mutua entre estos formatos.",
    },
    {
      q: "¿Se perderán datos durante la conversión?",
      a: "Las estructuras básicas de datos se preservan, pero las características específicas del formato (atributos XML, comentarios TOML, etc.) pueden perderse durante la conversión.",
    },
    {
      q: "¿Se pueden convertir archivos grandes?",
      a: "Como funciona en el navegador, el rendimiento puede degradarse con archivos muy grandes. Funciona bien con tamaños típicos de archivos de configuración.",
    },
    {
      q: "¿Dónde se almacenan los datos convertidos?",
      a: "Esta herramienta funciona completamente en el navegador y los datos no se envían a servidores externos. Copia el resultado de la conversión al portapapeles para usar.",
    },
  ],
};
