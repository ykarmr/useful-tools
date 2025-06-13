import { QrGeneratorTranslations } from "../types/pages/tools/qr-generator";

export const qrGenerator: QrGeneratorTranslations = {
  title: "QR Code Generator",
  description: "Generate QR codes for text, URLs, WiFi passwords, and more",
  keywords: ["QR code", "generator", "text", "URL", "WiFi password", "data"],
  text: "Text",
  size: "Size (px)",
  generate: "Generate QR Code",
  result: "QR Code Result",
  download: "Download QR Code",
  placeholder: "Enter text or URL to generate QR code",
  faqList: [
    {
      q: "What information can I encode in a QR code?",
      a: "You can encode text, URLs, email addresses, phone numbers, WiFi passwords, and various other types of information in QR codes.",
    },
    {
      q: "What's the quality of generated QR codes?",
      a: "We generate high-quality vector-based QR codes suitable for both printing and digital display.",
    },
    {
      q: "Can I change the QR code size?",
      a: "Yes, you can adjust the QR code size according to your needs. Larger sizes are easier to scan from a distance.",
    },
    {
      q: "Do generated QR codes have an expiration date?",
      a: "QR codes themselves don't expire. However, the content they point to (like URLs) may change or become unavailable.",
    },
  ],
};
