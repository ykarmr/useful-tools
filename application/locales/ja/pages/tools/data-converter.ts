import { DataConverterTranslations } from "../../../types/pages/tools/data-converter";

export const dataConverter: DataConverterTranslations = {
  title: "データフォーマット変換ツール",
  description:
    "JSON、YAML、TOML、XMLの各データフォーマット間で相互変換を行うオンラインツールです。",
  keywords: [
    "データ変換",
    "フォーマット変換",
    "JSON",
    "YAML",
    "TOML",
    "XML",
    "設定ファイル",
    "変換ツール",
  ],
  inputLabel: "入力データ",
  outputLabel: "変換結果",
  formatLabel: "出力フォーマット",
  sampleDataLabel: "サンプルデータ",
  outputPlaceholder: "変換結果がここに表示されます...",
  convertButton: "変換実行",
  copyButton: "コピー",
  clearButton: "クリア",
  formatOptions: {
    json: "JSON",
    yaml: "YAML",
    toml: "TOML",
    xml: "XML",
  },
  placeholders: {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "Sample JSON data"\n}',
    yaml: 'name: example\nversion: "1.0.0"\ndescription: Sample YAML data',
    toml: 'name = "example"\nversion = "1.0.0"\ndescription = "Sample TOML data"',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <name>example</name>\n  <version>1.0.0</version>\n  <description>Sample XML data</description>\n</root>',
  },
  messages: {
    conversionSuccess: "変換が完了しました",
    invalidFormat: "入力データの形式が正しくありません",
    emptyInput: "変換するデータを入力してください",
    copied: "クリップボードにコピーしました",
  },
  features: {
    title: "機能",
    list: [
      "JSON ⇔ YAML ⇔ TOML ⇔ XML の相互変換",
      "シンタックスハイライト表示",
      "エラー検証とフォーマット確認",
      "ワンクリックでコピー機能",
      "リアルタイムプレビュー",
    ],
  },
  faqList: [
    {
      q: "どのような形式のデータを変換できますか？",
      a: "JSON、YAML、TOML、XMLの4つの形式に対応しており、これらの形式間で相互変換が可能です。",
    },
    {
      q: "変換時にデータが失われることはありますか？",
      a: "基本的なデータ構造は保持されますが、各形式固有の機能（XMLの属性、TOMLのコメントなど）は変換時に失われる場合があります。",
    },
    {
      q: "大きなファイルも変換できますか？",
      a: "ブラウザ上で動作するため、あまりに大きなファイルの場合はパフォーマンスが低下する可能性があります。一般的な設定ファイルサイズであれば問題なく変換できます。",
    },
    {
      q: "変換したデータはどこに保存されますか？",
      a: "このツールはブラウザ上で完結し、データは外部サーバーに送信されません。変換結果はクリップボードにコピーしてお使いください。",
    },
  ],
};
