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

  // ステータス
  waiting: "変換待ち",
  processingStatus: "変換中...",
  completed: "✓ 変換完了",
  error: "エラー",

  // プレースホルダー
  widthPlaceholder: "幅（px）",
  heightPlaceholder: "高さ（px）",
  autoCalculated: "自動計算されます",
  autoCalculationNote: "縦横比を維持するため、横幅に基づいて自動計算されます",

  // 統計
  resultsSummary: "変換結果サマリー",
  conversionSuccess: "変換成功",
  totalSizeChange: "総容量変化",
  averageCompressionRate: "平均圧縮率",
  errorCount: "エラー",

  // ファイル管理
  filesSelected: "ファイル選択中",
  startConversion: "変換を開始",
  convertingInProgress: "変換中...",
  progressText: "ファイル完了",
  filesProcessed: "件",

  // プレビューモード
  singleView: "単体",
  comparison: "比較",
  sizeLabel: "サイズ",
  fileSizeLabel: "ファイルサイズ",
  formatLabel: "形式",

  // キーボードショートカット
  closeShortcut: "閉じる",
  navigationShortcut: "画像切替",
  zoomShortcut: "ズーム",
  resetShortcut: "リセット",

  // 追加のメッセージ
  maxFilesSizeLimit: "最大20ファイル、各ファイル10MBまで",
  lowQuality: "低品質",
  highQuality: "高品質",
  processingNow: "変換中",
  formatConversionNote: "形式に変換",

  // 使い方ガイド
  howToUse: {
    title: "使い方",
    steps: [
      "変換したい画像ファイルをドラッグ&ドロップまたはクリックして選択します",
      "出力形式（JPEG、PNG、WebP、BMP）を選択します",
      "必要に応じて品質やサイズ設定を調整します",
      "「変換実行」ボタンをクリックして変換を開始します",
      "変換完了後、個別またはまとめてダウンロードできます",
    ],
  },

  // 機能
  features: {
    title: "主な機能",
    items: [
      "複数画像の一括変換（最大20ファイル）",
      "主要な画像形式に対応（JPEG、PNG、WebP、BMP）",
      "品質調整とファイルサイズ最適化",
      "アスペクト比の変更とカスタムサイズ設定",
      "変換前後の比較プレビュー機能",
      "ドラッグ&ドロップ対応の簡単操作",
    ],
  },

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
