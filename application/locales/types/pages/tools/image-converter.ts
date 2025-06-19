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

  // ステータス
  waiting: string;
  processingStatus: string;
  completed: string;
  error: string;

  // プレースホルダー
  widthPlaceholder: string;
  heightPlaceholder: string;
  autoCalculated: string;
  autoCalculationNote: string;

  // 統計
  resultsSummary: string;
  conversionSuccess: string;
  totalSizeChange: string;
  averageCompressionRate: string;
  errorCount: string;

  // ファイル管理
  filesSelected: string;
  startConversion: string;
  convertingInProgress: string;
  progressText: string;
  filesProcessed: string;

  // プレビューモード
  singleView: string;
  comparison: string;
  sizeLabel: string;
  fileSizeLabel: string;
  formatLabel: string;

  // キーボードショートカット
  closeShortcut: string;
  navigationShortcut: string;
  zoomShortcut: string;
  resetShortcut: string;

  // 追加のメッセージ
  maxFilesSizeLimit: string;
  lowQuality: string;
  highQuality: string;
  processingNow: string;
  formatConversionNote: string;

  // 使い方ガイド
  howToUse: {
    title: string;
    steps: string[];
  };

  // 機能
  features: {
    title: string;
    items: string[];
  };

  // FAQ
  faqList: FAQItem[];
}
