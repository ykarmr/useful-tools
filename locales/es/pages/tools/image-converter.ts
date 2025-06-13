import type { ImageConverterTranslations } from "@/locales/types/pages/tools/image-converter";

export const imageConverter: ImageConverterTranslations = {
  title: "Conversor de Imágenes",
  description:
    "Convierte múltiples formatos de imagen y redimensiona imágenes por lotes. Soporta arrastrar y soltar con funcionalidad de vista previa",
  keywords: [
    "conversor de imágenes",
    "conversión de formato de imagen",
    "redimensionar imagen",
    "conversor JPEG",
    "conversor PNG",
    "conversor WebP",
    "conversión por lotes",
    "arrastrar y soltar",
  ],

  dropZone:
    "Arrastra y suelta archivos de imagen aquí o haz clic para seleccionar",
  dropZoneActive: "Suelta los archivos aquí",
  selectFiles: "Seleccionar Archivos",
  supportedFormats: "Soportado: JPEG, PNG, WebP, BMP",

  selectedFiles: "Archivos Seleccionados",
  fileInfo: "Información del Archivo",
  originalSize: "Tamaño Original",
  newSize: "Nuevo Tamaño",
  fileName: "Nombre del Archivo",
  fileSize: "Tamaño del Archivo",
  format: "Formato",
  dimensions: "Dimensiones",
  convertedSize: "Tamaño del Archivo Convertido",
  convertedDimensions: "Dimensiones Convertidas",
  compressionRatio: "Ratio de Compresión",
  sizeReduction: "Reducción de Tamaño",

  convertSettings: "Configuración de Conversión",
  outputFormat: "Formato de Salida",
  aspectRatio: "Relación de Aspecto",
  quality: "Calidad",
  width: "Ancho",
  height: "Alto",
  maintainAspectRatio: "Mantener Relación de Aspecto",

  convert: "Convertir",
  download: "Descargar",
  downloadAll: "Descargar Todo",
  clear: "Limpiar",
  preview: "Vista Previa",
  remove: "Eliminar",

  previewTitle: "Vista Previa",
  original: "Original",
  converted: "Convertido",
  noPreview: "Sin Vista Previa",
  processing: "Procesando...",

  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",

  originalRatio: "Proporción Original",
  square: "Cuadrado (1:1)",
  landscape: "Paisaje (16:9)",
  portrait: "Retrato (9:16)",
  custom: "Personalizado",

  conversionComplete: "Conversión completada",
  conversionError: "Error durante la conversión",
  unsupportedFormat: "Formato no soportado",
  fileTooLarge: "Archivo demasiado grande (máx 10MB)",
  maxFiles: "Máximo 20 archivos permitidos",

  faqList: [
    {
      q: "¿Qué formatos de imagen están soportados?",
      a: "Se soportan los formatos JPEG, PNG, WebP y BMP. Puedes convertir entre estos formatos.",
    },
    {
      q: "¿Cuántas imágenes puedo convertir a la vez?",
      a: "Puedes convertir hasta 20 imágenes a la vez. Cada archivo tiene un límite de tamaño máximo de 10MB.",
    },
    {
      q: "¿Puedo ajustar la calidad de la imagen?",
      a: "Sí, al convertir a formato JPEG, puedes ajustar la calidad del 1-100%.",
    },
    {
      q: "¿Puedo cambiar la relación de aspecto?",
      a: "Puedes mantener la proporción original o cambiar a cuadrado, 16:9, 9:16 o dimensiones personalizadas.",
    },
    {
      q: "¿Dónde se guardan las imágenes convertidas?",
      a: "Las imágenes convertidas se guardan en la carpeta de descargas de tu navegador. Puedes descargar individualmente o como archivo ZIP.",
    },
  ],
};
