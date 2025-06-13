import { FAQItem } from "../../faq";

// 画像変換機能の翻訳型定義
export interface ImageConverterTranslations {
  title: string;
  description: string;
  keywords: string[];

  // ファイル選択・ドロップエリア
  dropZone: string;
  dropZoneActive: string;
  selectFiles: string;
  supportedFormats: string;

  // ファイル情報
  selectedFiles: string;
  fileInfo: string;
  originalSize: string;
  newSize: string;
  fileName: string;
  fileSize: string;
  format: string;
  dimensions: string;
  convertedSize: string;
  convertedDimensions: string;
  compressionRatio: string;
  sizeReduction: string;

  // 変換設定
  convertSettings: string;
  outputFormat: string;
  aspectRatio: string;
  quality: string;
  width: string;
  height: string;
  maintainAspectRatio: string;

  // アクション
  convert: string;
  download: string;
  downloadAll: string;
  clear: string;
  preview: string;
  remove: string;

  // プレビュー
  previewTitle: string;
  original: string;
  converted: string;
  noPreview: string;
  processing: string;

  // フォーマット
  jpeg: string;
  png: string;
  webp: string;
  bmp: string;

  // アスペクト比
  originalRatio: string;
  square: string;
  landscape: string;
  portrait: string;
  custom: string;

  // メッセージ
  conversionComplete: string;
  conversionError: string;
  unsupportedFormat: string;
  fileTooLarge: string;
  maxFiles: string;

  // FAQ
  faqList: FAQItem[];
}
