import { UrlEncoderTranslations } from "../types/pages/tools/url-encoder";

export const urlEncoder: UrlEncoderTranslations = {
  title: "URLエンコーダー/デコーダー",
  description: "安全な送信と保存のためのURLエンコードとデコード",
  keywords: [
    "URLエンコーダー",
    "URLデコーダー",
    "URLエンコード",
    "URLデコード",
    "URLツール",
  ],
  encode: "エンコード",
  decode: "デコード",
  switch: "モード切替",
  originalUrl: "元のURL",
  encodedUrl: "エンコード済みURL",
  examples: "例",
  encodingExample: "エンコード例:",
  specialCharacters: "特殊文字:",
  inputLabel: "入力:",
  outputLabel: "出力:",
  spaceToPercent: "スペース → %20, & → %26, = → %3D, ? → %3F",
  decodedUrl: "デコード済みURL",
  invalidInput: "エラー: 無効な入力です",
  enterUrl: "エンコードするURLを入力してください",
  enterEncodedUrl: "デコードするエンコード済みURLを入力してください",
  faqList: [
    {
      q: "URLエンコードとは何ですか？",
      a: "URLエンコードは、URL内で使用できない特殊文字を安全な形式に変換するプロセスです。例えば、スペースは%20に変換されます。",
    },
    {
      q: "なぜURLエンコードが必要ですか？",
      a: "URLには特定の文字（スペース、&、=など）を直接含めることができないため、これらを%で始まる16進コードに変換する必要があります。",
    },
    {
      q: "どのような文字がエンコードされますか？",
      a: "スペース、日本語文字、特殊記号（&、=、?、#など）、およびURLで特別な意味を持つ文字がエンコードされます。",
    },
    {
      q: "エンコードされたURLをデコードできますか？",
      a: "はい、このツールではエンコードとデコードの両方が可能です。スイッチボタンで切り替えられます。",
    },
  ],
};
