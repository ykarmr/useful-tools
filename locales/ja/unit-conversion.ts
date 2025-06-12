import { UnitConversionTranslations } from "../types";

export const unitConversion: UnitConversionTranslations = {
  title: "単位変換",
  description: "さまざまな測定単位を簡単に変換します",
  keywords: [
    "単位変換",
    "測定",
    "単位を変換",
    "長さ変換",
    "重量変換",
    "温度変換",
    "体積変換",
  ],
  placeholder: "値を入力して単位を選択...",
  resultPlaceholder: "変換された値がここに表示されます...",

  length: "長さ",
  weight: "重さ",
  area: "面積",
  volume: "体積",
  temperature: "温度",
  speed: "速度",
  time: "時間",
  pressure: "圧力",
  energy: "エネルギー",
  data: "データ",

  categoryLabel: "カテゴリ",
  fromLabel: "変換元",
  toLabel: "変換先",
  inputLabel: "入力値",
  faqList: [
    {
      q: "どのような単位変換に対応していますか？",
      a: "長さ、重量、面積、体積、温度、速度、時間、圧力、エネルギー、データ量の10カテゴリの単位変換に対応しています。",
    },
    {
      q: "変換の精度はどの程度ですか？",
      a: "標準的な換算係数を使用しており、一般的な用途には十分な精度があります。科学的・工学的な計算には専用ツールの使用をお勧めします。",
    },
    {
      q: "温度変換は絶対温度にも対応していますか？",
      a: "はい、摂氏、華氏に加えて、ケルビン（絶対温度）の相互変換も対応しています。",
    },
    {
      q: "新しい単位を追加できますか？",
      a: "現在のバージョンでは、予め定義された単位のみ使用可能です。カスタム単位の追加はできません。",
    },
  ],
};
