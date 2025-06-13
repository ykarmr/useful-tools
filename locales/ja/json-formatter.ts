import { JsonFormatterTranslations } from "../types/pages/tools/json-formatter";

export const jsonFormatter: JsonFormatterTranslations = {
  title: "JSONフォーマッター",
  description: "JSONデータの整形、圧縮、検証をシンタックスハイライト付きで実行",
  keywords: [
    "JSONフォーマッター",
    "JSONバリデーター",
    "JSONミニファイア",
    "JSONツール",
    "シンタックスハイライト",
  ],
  input: "入力JSON",
  output: "整形済み出力",
  format: "整形",
  minify: "圧縮",
  invalidJson: "無効なJSON",
  indentSize: "インデント",
  uploadFile: "ファイルアップロード",
  statistics: "統計",
  lines: "行数",
  characters: "文字数",
  size: "サイズ",
  examples: "例",
  basicObject: "基本的なオブジェクト:",
  objectWithArray: "配列を含むオブジェクト:",
  download: "ダウンロード",
  placeholder: "ここにJSONを貼り付けるか、ファイルをアップロードしてください",
  indent2: "インデント: 2",
  indent4: "インデント: 4",
  indent8: "インデント: 8",
  faqList: [
    {
      q: "JSONフォーマッターとは何ですか？",
      a: "JSON（JavaScript Object Notation）を読みやすい形式に整形し、構文エラーを検証するツールです。",
    },
    {
      q: "無効なJSONはどう処理されますか？",
      a: "無効なJSONが入力された場合、エラーメッセージが表示され、問題のある箇所を特定できます。",
    },
    {
      q: "大きなJSONファイルも処理できますか？",
      a: "はい、ただしブラウザの制限により、非常に大きなファイルでは動作が遅くなる可能性があります。",
    },
    {
      q: "データは安全ですか？",
      a: "すべての処理はブラウザ内で行われ、データがサーバーに送信されることはありません。",
    },
  ],
};
