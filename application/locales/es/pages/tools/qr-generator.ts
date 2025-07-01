import { QrGeneratorTranslations } from "@/locales/types/pages/tools/qr-generator";

export const qrGenerator: QrGeneratorTranslations = {
  title: "Generador de Códigos QR",
  subtitle: "Convierte texto y URLs a códigos QR al instante",
  description:
    "Herramienta gratuita para convertir texto, URLs, información de contacto y más en códigos QR de alta calidad. Los códigos QR generados se pueden descargar en formato PNG.",
  keywords: [
    "código QR",
    "generador",
    "texto",
    "URL",
    "contraseña WiFi",
    "datos",
    "convertidor",
    "descarga",
  ],
  text: "Texto",
  size: "Tamaño (px)",
  generate: "Generar Código QR",
  result: "Código QR Generado",
  download: "Descargar Código QR",
  placeholder: "Ingresa texto, URL o información para generar un código QR",
  howToUse: {
    title: "Cómo Usar el Generador de Códigos QR",
    steps: [
      "Ingresa el texto o URL que deseas convertir en el cuadro de texto",
      "Selecciona el tamaño deseado del código QR desde el menú desplegable",
      "Haz clic en 'Generar Código QR' para crear tu código QR",
      "Previsualiza el código QR generado en el área de visualización",
      "Haz clic en 'Descargar Código QR' para guardarlo como archivo PNG",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Convierte varios tipos de datos incluyendo texto, URLs e información de contacto",
      "5 opciones de tamaño desde 150px hasta 500px",
      "Descargas en formato PNG de alta calidad",
      "Vista previa en tiempo real para resultados instantáneos",
      "Contador de caracteres para gestión de entrada",
      "Diseño responsivo optimizado para dispositivos móviles",
    ],
  },
  faqList: [
    {
      q: "¿Qué tipos de información se pueden codificar en códigos QR?",
      a: "Puedes codificar texto, URLs, direcciones de correo, números de teléfono, contraseñas WiFi, información de contacto y varios otros tipos de datos. La herramienta soporta hasta 500 caracteres.",
    },
    {
      q: "¿Cuál es la calidad de los códigos QR generados?",
      a: "Generamos códigos QR en formato PNG de alta calidad con tamaños seleccionables de 150px a 500px, adecuados tanto para aplicaciones impresas como digitales.",
    },
    {
      q: "¿Puedo cambiar el tamaño del código QR?",
      a: "Sí, puedes elegir entre 5 tamaños diferentes: 150px, 200px, 300px, 400px y 500px. Selecciona el tamaño apropiado según tu uso previsto. Los tamaños más grandes son más fáciles de escanear desde mayores distancias.",
    },
    {
      q: "¿Los códigos QR generados tienen fecha de caducidad?",
      a: "Los códigos QR en sí mismos no caducan. Sin embargo, el contenido al que apuntan (como URLs) puede cambiar o volverse no disponible con el tiempo. La información de texto estático se puede usar permanentemente.",
    },
    {
      q: "¿Qué debo hacer si el código QR no se puede leer?",
      a: "Intenta aumentar el tamaño del código QR, acortar el contenido de entrada, ajustar la distancia de la cámara del smartphone o actualizar tu aplicación lectora de códigos QR a la última versión.",
    },
  ],
};
