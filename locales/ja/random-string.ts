import { RandomStringTranslations } from "../types/pages/tools/random-string";

export const randomString: RandomStringTranslations = {
  title: "ランダム文字列生成",
  description: "パスワードやIDのためのランダム文字列を生成",
  keywords: [
    "ランダム文字列",
    "生成器",
    "パスワード",
    "ID",
    "ランダム",
    "文字列",
  ],
  length: "長さ",
  includeNumbers: "数字を含む",
  includeSymbols: "記号を含む",
  generate: "文字列を生成",
  result: "生成された文字列",
  faqList: [
    {
      q: "どのような文字が含まれますか？",
      a: "デフォルトでは英字（大文字・小文字）が含まれます。オプションで数字と記号も追加できます。",
    },
    {
      q: "生成された文字列の強度はどの程度ですか？",
      a: "文字列の長さと使用する文字の種類によって決まります。長いほど、また数字や記号を含むほど強くなります。",
    },
    {
      q: "パスワードとして使用しても安全ですか？",
      a: "一般的な用途には十分ですが、重要なアカウントには専用のパスワードマネージャーの使用を推奨します。",
    },
    {
      q: "同じ文字列が生成される可能性はありますか？",
      a: "文字数と使用する文字の組み合わせによりますが、十分な長さがあれば重複の可能性は非常に低くなります。",
    },
  ],
};
