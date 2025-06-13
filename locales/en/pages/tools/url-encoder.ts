import { UrlEncoderTranslations } from "@/locales/types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "URL Encoder/Decoder",
  description: "Encode and decode URLs for safe transmission and storage",
  keywords: [
    "URL Encoder",
    "URL Decoder",
    "Encode URL",
    "Decode URL",
    "URL Tools",
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
  faqList: [
    {
      q: "What is URL encoding?",
      a: "URL encoding is the process of converting special characters that cannot be used in URLs into a safe format. For example, spaces become %20.",
    },
    {
      q: "Why is URL encoding necessary?",
      a: "URLs cannot directly contain certain characters (spaces, &, =, etc.), so these need to be converted to hexadecimal codes starting with %.",
    },
    {
      q: "Which characters get encoded?",
      a: "Spaces, non-ASCII characters, special symbols (&, =, ?, #, etc.), and characters that have special meaning in URLs get encoded.",
    },
    {
      q: "Can I decode encoded URLs?",
      a: "Yes, this tool supports both encoding and decoding. Use the switch button to toggle between modes.",
    },
  ],
};
