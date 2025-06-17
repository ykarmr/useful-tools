import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "データフォーマット変換ツール",
  description:
    "JSON、YAML、TOMLの各データフォーマット間で相互変換を行うオンラインツールです。設定ファイルやデータ構造の変換に便利です。",
  keywords: [
    "データ変換",
    "フォーマット変換",
    "JSON",
    "YAML",
    "TOML",
    "設定ファイル",
    "変換ツール",
    "構造化データ",
  ],
  inputLabel: "入力データ",
  outputLabel: "変換結果",
  formatLabel: "フォーマット",
  sampleDataLabel: "サンプルデータ",
  outputPlaceholder: "変換結果がここに表示されます...",
  convertButton: "変換実行",
  formatButton: "整形",
  copyButton: "コピー",
  clearButton: "クリア",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
  },
  placeholders: {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "JSON形式のサンプルデータです",\n  "features": ["軽量", "読みやすい", "広く使われている"]\n}',
    yaml: 'name: example\nversion: "1.0.0"\ndescription: YAML形式のサンプルデータです\nfeatures:\n  - 可読性が高い\n  - コメント対応\n  - 設定ファイルに最適',
    toml: 'name = "example"\nversion = "1.0.0"\ndescription = "TOML形式のサンプルデータです"\n\n[features]\nreadability = "高い"\ncomments = "対応"\nuse_case = "設定ファイル"',
  },
  messages: {
    conversionSuccess: "変換が完了しました",
    formatSuccess: "整形が完了しました",
    invalidFormat: "入力データの形式が正しくありません",
    emptyInput: "変換するデータを入力してください",
    copied: "クリップボードにコピーしました",
    copyError: "コピーに失敗しました",
  },
  features: {
    title: "機能と特徴",
    list: [
      "JSON ⇔ YAML ⇔ TOML の相互変換",
      "入力フォーマットの手動選択による確実な変換",
      "入力データの整形機能でコードを美しく",
      "3種類のサンプルデータで動作確認",
      "ワンクリックでクリップボードにコピー",
      "シンプルで直感的なユーザーインターフェース",
    ],
  },
  faqList: [
    {
      q: "このツールの使い方を教えてください",
      a: "左側のテキストエリアにデータを入力するか、下にあるサンプルデータボタンで試用できます。入力・出力フォーマットを選択して「変換実行」ボタンをクリックするだけで簡単に変換できます。",
    },
    {
      q: "どのような形式のデータを変換できますか？",
      a: "JSON、YAML、TOMLの3つの形式に対応しており、これらの形式間で相互変換が可能です。設定ファイルやAPIレスポンス、データ交換など様々な用途に活用できます。",
    },
    {
      q: "整形機能は何のためにありますか？",
      a: "入力したデータを同じ形式のまま見やすく整形します。インデントを整えたり、改行を適切に配置して、データ構造を理解しやすくする機能です。",
    },
    {
      q: "サンプルデータボタンは何のためにありますか？",
      a: "各形式（JSON、YAML、TOML）のサンプルデータを入力エリアに挿入して、ツールの動作を試すことができます。初めて使用する際の参考にもなります。",
    },
    {
      q: "変換時にデータが失われることはありますか？",
      a: "基本的なデータ構造（オブジェクト、配列、文字列、数値、真偽値）は正確に保持されます。ただし、各形式固有の機能（TOMLのコメント、YAMLのアンカーなど）は変換時に失われる場合があります。",
    },
    {
      q: "変換したデータをファイルとして保存できますか？",
      a: "変換結果は「コピー」ボタンでクリップボードにコピーできます。その後、テキストエディタに貼り付けて適切な拡張子（.json、.yaml、.toml）で保存してください。",
    },
  ],
};
