import { PetAgeConversionTranslations } from "../types";

export const petAgeConversion: PetAgeConversionTranslations = {
  title: "ペット年齢換算",
  description: "犬や猫の年齢を人間の年齢に換算します",
  keywords: ["ペット年齢", "犬", "猫", "人間換算", "年齢計算"],
  petTypeLabel: "ペットの種類",
  dog: "犬",
  cat: "猫",
  rabbit: "ウサギ",
  hamster: "ハムスター",
  ferret: "フェレット",
  horse: "ウマ",
  cow: "ウシ",
  pig: "ブタ",
  sheep: "ヒツジ",
  goat: "ヤギ",
  turtle: "カメ",
  parakeet: "インコ",
  petAgeLabel: "ペットの年齢（年）",
  petAgePlaceholder: "例: 5",
  resultPlaceholder: "換算結果がここに表示されます",
  petAgeResult: "{petType}の{petAge}歳は人間の{humanAge}歳に相当します。",
  faqList: [
    {
      q: "ペット年齢の換算は正確ですか？",
      a: "一般的に使用される換算式に基づいていますが、品種や個体差により実際の老化速度は異なります。参考値としてご利用ください。",
    },
    {
      q: "どのような動物に対応していますか？",
      a: "犬、猫をはじめ、うさぎ、ハムスター、馬、牛など12種類の動物に対応しています。それぞれ異なる換算式を使用しています。",
    },
    {
      q: "最大何歳まで計算できますか？",
      a: "技術的には制限はありませんが、非常に高齢の場合は換算式の精度が下がる可能性があります。一般的な寿命範囲での使用をお勧めします。",
    },
    {
      q: "小数点以下の年齢は入力できますか？",
      a: "はい、0.5歳（6ヶ月）のように小数点以下も入力可能です。特に若い動物の年齢計算に有用です。",
    },
  ],
};
