import type { ImageConverterTranslations } from "../types/image-converter";

export const imageConverter: ImageConverterTranslations = {
  title: "Image Converter",
  description:
    "Convert multiple image formats and resize images in batch. Supports drag & drop with preview functionality",
  keywords: [
    "image converter",
    "image format conversion",
    "image resize",
    "JPEG converter",
    "PNG converter",
    "WebP converter",
    "batch conversion",
    "drag and drop",
  ],

  // ファイル選択・ドロップエリア
  dropZone: "Drag & drop image files here or click to select",
  dropZoneActive: "Drop files here",
  selectFiles: "Select Files",
  supportedFormats: "Supported: JPEG, PNG, WebP, BMP",

  // ファイル情報
  selectedFiles: "Selected Files",
  fileInfo: "File Info",
  originalSize: "Original Size",
  newSize: "New Size",
  fileName: "File Name",
  fileSize: "File Size",
  format: "Format",
  dimensions: "Dimensions",
  convertedSize: "Converted File Size",
  convertedDimensions: "Converted Dimensions",
  compressionRatio: "Compression Ratio",
  sizeReduction: "Size Reduction",

  // 変換設定
  convertSettings: "Conversion Settings",
  outputFormat: "Output Format",
  aspectRatio: "Aspect Ratio",
  quality: "Quality",
  width: "Width",
  height: "Height",
  maintainAspectRatio: "Maintain Aspect Ratio",

  // アクション
  convert: "Convert",
  download: "Download",
  downloadAll: "Download All",
  clear: "Clear",
  preview: "Preview",
  remove: "Remove",

  // プレビュー
  previewTitle: "Preview",
  original: "Original",
  converted: "Converted",
  noPreview: "No Preview",
  processing: "Processing...",

  // フォーマット
  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",

  // アスペクト比
  originalRatio: "Original Ratio",
  square: "Square (1:1)",
  landscape: "Landscape (16:9)",
  portrait: "Portrait (9:16)",
  custom: "Custom",

  // メッセージ
  conversionComplete: "Conversion completed",
  conversionError: "Error occurred during conversion",
  unsupportedFormat: "Unsupported format",
  fileTooLarge: "File too large (max 10MB)",
  maxFiles: "Maximum 20 files allowed",

  // FAQ
  faqList: [
    {
      q: "What image formats are supported?",
      a: "JPEG, PNG, WebP, and BMP formats are supported. You can convert between these formats.",
    },
    {
      q: "How many images can I convert at once?",
      a: "You can convert up to 20 images at once. Each file has a maximum size limit of 10MB.",
    },
    {
      q: "Can I adjust image quality?",
      a: "Yes, when converting to JPEG format, you can adjust quality from 1-100%.",
    },
    {
      q: "Can I change the aspect ratio?",
      a: "You can maintain the original ratio or change to square, 16:9, 9:16, or custom dimensions.",
    },
    {
      q: "Where are converted images saved?",
      a: "Converted images are saved to your browser's download folder. You can download individually or as a ZIP file.",
    },
  ],
};
