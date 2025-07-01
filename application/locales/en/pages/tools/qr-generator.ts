import { QrGeneratorTranslations } from "@/locales/types/pages/tools/qr-generator";

export const qrGenerator: QrGeneratorTranslations = {
  title: "QR Code Generator",
  subtitle: "Convert text and URLs to QR codes instantly",
  description:
    "Free tool to convert text, URLs, contact information, and more into high-quality QR codes. Generated QR codes can be downloaded in PNG format.",
  keywords: [
    "QR code",
    "generator",
    "text",
    "URL",
    "WiFi password",
    "data",
    "converter",
    "download",
  ],
  text: "Text",
  size: "Size (px)",
  generate: "Generate QR Code",
  result: "Generated QR Code",
  download: "Download QR Code",
  placeholder: "Enter text, URL, or information to generate a QR code",
  howToUse: {
    title: "How to Use QR Code Generator",
    steps: [
      "Enter the text or URL you want to convert in the text box",
      "Select your desired QR code size from the dropdown menu",
      "Click the 'Generate QR Code' button to create your QR code",
      "Preview the generated QR code in the display area",
      "Click 'Download QR Code' to save it as a PNG file",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Convert various data types including text, URLs, and contact info",
      "5 size options ranging from 150px to 500px",
      "High-quality PNG format downloads",
      "Real-time preview for instant results",
      "Character count display for input management",
      "Responsive design optimized for mobile devices",
    ],
  },
  faqList: [
    {
      q: "What types of information can be encoded in QR codes?",
      a: "You can encode text, URLs, email addresses, phone numbers, WiFi passwords, contact information, and various other data types. The tool supports up to 500 characters.",
    },
    {
      q: "What is the quality of the generated QR codes?",
      a: "We generate high-quality PNG QR codes with selectable sizes from 150px to 500px, suitable for both print and digital display applications.",
    },
    {
      q: "Can I change the QR code size?",
      a: "Yes, you can choose from 5 different sizes: 150px, 200px, 300px, 400px, and 500px. Select the appropriate size based on your intended use. Larger sizes are easier to scan from greater distances.",
    },
    {
      q: "Do generated QR codes have an expiration date?",
      a: "QR codes themselves do not expire. However, the content they point to (like URLs) may change or become unavailable over time. Static text information can be used permanently.",
    },
    {
      q: "What should I do if the QR code cannot be read?",
      a: "Try increasing the QR code size, shortening the input content, adjusting your smartphone camera distance, or updating your QR code reader app to the latest version.",
    },
  ],
};
