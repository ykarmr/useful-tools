import { FAQItem } from "../../faq";

export interface ColorPaletteTranslations {
  title: string;
  subTitle: string;
  description: string;
  keywords: string[];
  baseColor: string;
  baseColorPlaceholder: string;
  generatePalette: string;
  colorFormat: string;
  hexFormat: string;
  rgbFormat: string;
  hslFormat: string;
  paletteType: string;
  monochromatic: string;
  analogous: string;
  complementary: string;
  triadic: string;
  tetradic: string;
  copy: string;
  copied: string;
  clear: string;
  randomColor: string;
  colorInfo: string;
  luminance: string;
  saturation: string;
  brightness: string;
  colorBlindTest: string;
  protanopia: string;
  deuteranopia: string;
  tritanopia: string;
  normal: string;
  exportPalette: string;
  downloadCSS: string;
  downloadJSON: string;
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faqList: FAQItem[];
}
