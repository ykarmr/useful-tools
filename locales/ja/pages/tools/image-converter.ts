import type { ImageConverterTranslations } from "@/locales/types/pages/tools/image-converter";

export const imageConverter: ImageConverterTranslations = {
  title: "画像変換ツール",
  description:
    "複数の画像を一括で形式変換・サイズ変更できるツール。ドラッグ&ドロップ対応でプレビュー機能付き",
  keywords: [
    "画像変換",
    "画像フォーマット変換",
    "画像リサイズ",
    "JPEG変換",
    "PNG変換",
    "WebP変換",
    "一括変換",
    "ドラッグ&ドロップ",
  ],

  // ファイル選択・ドロップエリア
  dropZone: "画像ファイルをここにドラッグ&ドロップまたはクリックして選択",
  dropZoneActive: "ファイルをドロップしてください",
  selectFiles: "ファイルを選択",
  supportedFormats: "対応形式: JPEG, PNG, WebP, BMP",

  // ファイル情報
  selectedFiles: "選択されたファイル",
  fileInfo: "ファイル情報",
  originalSize: "元のサイズ",
  newSize: "変換後サイズ",
  fileName: "ファイル名",
  fileSize: "ファイルサイズ",
  format: "形式",
  dimensions: "解像度",
  convertedSize: "変換後ファイルサイズ",
  convertedDimensions: "変換後解像度",
  compressionRatio: "圧縮率",
  sizeReduction: "ファイルサイズ削減",

  // 変換設定
  convertSettings: "変換設定",
  outputFormat: "出力形式",
  aspectRatio: "アスペクト比",
  quality: "品質",
  width: "幅",
  height: "高さ",
  maintainAspectRatio: "縦横比を維持",

  // アクション
  convert: "変換実行",
  download: "ダウンロード",
  downloadAll: "すべてダウンロード",
  clear: "クリア",
  preview: "プレビュー",
  remove: "削除",

  // プレビュー
  previewTitle: "プレビュー",
  original: "元画像",
  converted: "変換後",
  noPreview: "プレビューなし",
  processing: "処理中...",

  // フォーマット
  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",

  // アスペクト比
  originalRatio: "元の比率",
  square: "正方形 (1:1)",
  landscape: "横長 (16:9)",
  portrait: "縦長 (9:16)",
  custom: "カスタム",

  // メッセージ
  conversionComplete: "変換が完了しました",
  conversionError: "変換中にエラーが発生しました",
  unsupportedFormat: "サポートされていない形式です",
  fileTooLarge: "ファイルサイズが大きすぎます（最大10MB）",
  maxFiles: "最大20ファイルまで選択できます",

  // FAQ
  faqList: [
    {
      q: "どの画像形式に対応していますか？",
      a: "JPEG、PNG、WebP、BMPに対応しています。これらの形式間で相互変換が可能です。",
    },
    {
      q: "一度に何枚まで変換できますか？",
      a: "最大20枚の画像を一度に変換できます。各ファイルの最大サイズは10MBです。",
    },
    {
      q: "画像の品質を調整できますか？",
      a: "はい、JPEG形式への変換時は品質を1-100%の範囲で調整できます。",
    },
    {
      q: "アスペクト比を変更できますか？",
      a: "元の比率を維持するか、正方形、16:9、9:16、またはカスタムサイズに変更できます。",
    },
    {
      q: "変換した画像はどこに保存されますか？",
      a: "変換した画像はブラウザのダウンロードフォルダに保存されます。個別またはZIPファイルでまとめてダウンロードできます。",
    },
  ],
};
