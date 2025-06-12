import type { QrGeneratorTranslations } from "../types/tools";

export const qrGenerator: QrGeneratorTranslations = {
  title: "Generador de Códigos QR",
  description: "Genera códigos QR personalizados",
  keywords: [
    "código QR",
    "generador",
    "texto",
    "URL",
    "contraseña WiFi",
    "datos",
  ],
  text: "Texto",
  size: "Tamaño (px)",
  generate: "Generar Código QR",
  result: "Resultado del Código QR",
  download: "Descargar Código QR",
  placeholder: "Ingresa texto o URL para generar el código QR",
  faqList: [
    {
      q: "¿Qué información puedo codificar en un código QR?",
      a: "Puedes codificar texto, URLs, direcciones de correo, números de teléfono, contraseñas WiFi y varios otros tipos de información.",
    },
    {
      q: "¿Cuál es la calidad de los códigos QR generados?",
      a: "Generamos códigos QR vectoriales de alta calidad adecuados tanto para impresión como para visualización digital.",
    },
    {
      q: "¿Puedo cambiar el tamaño del código QR?",
      a: "Sí, puedes ajustar el tamaño del código QR según tus necesidades. Los tamaños más grandes son más fáciles de escanear desde la distancia.",
    },
    {
      q: "¿Los códigos QR generados tienen fecha de vencimiento?",
      a: "Los códigos QR en sí no expiran. Sin embargo, el contenido al que apuntan (como URLs) puede cambiar o volverse no disponible.",
    },
  ],
};

export default qrGenerator;
