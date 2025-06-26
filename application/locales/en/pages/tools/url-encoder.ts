import { UrlEncoderTranslations } from "@/locales/types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "URL Encoder/Decoder",
  subtitle: "Convert special characters in URLs to safe format",
  description:
    "Encode and decode URLs for safe transmission and web application use",
  keywords: [
    "URL Encoder",
    "URL Decoder",
    "Encode URL",
    "Decode URL",
    "URL Tools",
    "Percent Encoding",
    "Character Conversion",
  ],
  encode: "Encode",
  decode: "Decode",
  switch: "Switch Mode",
  originalUrl: "Original URL",
  encodedUrl: "Encoded URL",
  examples: "Examples",
  encodingExample: "Encoding example:",
  specialCharacters: "Special characters:",
  inputLabel: "Input:",
  outputLabel: "Output:",
  spaceToPercent: "Space → %20, & → %26, = → %3D, ? → %3F",
  decodedUrl: "Decoded URL",
  invalidInput: "Error: Invalid input",
  enterUrl: "Enter URL to encode",
  enterEncodedUrl: "Enter encoded URL to decode",
  howToUse: {
    title: "How to Use URL Encoder/Decoder",
    steps: [
      "Select encode or decode mode",
      "Enter your URL or encoded URL in the input field",
      "The result will be displayed automatically and can be copied to clipboard",
      "Use the switch button to easily toggle between encoding and decoding modes",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Real-time encoding and decoding",
      "RFC 3986 compliant percent encoding",
      "Safe conversion of international characters",
      "One-click copy to clipboard",
      "Error handling for invalid input",
      "Responsive design for all devices",
    ],
  },
  faqList: [
    {
      q: "What is URL encoding?",
      a: "URL encoding (percent encoding) is the process of converting special characters and non-ASCII characters that cannot be used in URLs into hexadecimal codes starting with %. This allows web browsers to correctly interpret URLs.",
    },
    {
      q: "When do I need URL encoding?",
      a: "URL encoding is needed when search queries contain non-English characters, when sending form data, specifying API parameters, or when file names contain special characters. It's essential for web application development.",
    },
    {
      q: "Which characters get encoded?",
      a: "Spaces, non-ASCII characters, special symbols (&, =, ?, #, +, etc.), control characters, and characters that have special meaning in URLs get encoded. Safe characters (alphanumeric and some symbols) remain unchanged.",
    },
    {
      q: "Can I decode encoded URLs back to original form?",
      a: "Yes, you can use the decode function of this tool to restore encoded URLs to their original format. However, if the encoded string is malformed, an error will be displayed.",
    },
    {
      q: "Is there a length limit for URLs processed by this tool?",
      a: "The tool can handle long URLs within browser limits, but URLs under 2000 characters are generally recommended. Very long URLs may cause issues with some web servers.",
    },
  ],
};
