import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "BMI計算ツール",
  description:
    "身長と体重からBMI（体格指数）を計算し、適正体重範囲と健康アドバイスを提供します",
  keywords: [
    "BMI計算",
    "体格指数",
    "適正体重",
    "健康管理",
    "肥満度",
    "体重管理",
    "ダイエット",
    "健康診断",
    "メタボリック",
    "フィットネス",
  ],

  // 入力セクション
  inputSection: "身体情報入力",
  heightLabel: "身長",
  heightPlaceholder: "身長を入力",
  weightLabel: "体重",
  weightPlaceholder: "体重を入力",
  unitSystem: "単位系",
  metric: "メートル法（cm・kg）",
  imperial: "ヤード・ポンド法（ft・lbs）",

  // 結果表示
  resultSection: "BMI計算結果",
  bmiValue: "BMI値",
  bmiCategory: "体格分類",
  idealWeightRange: "適正体重範囲",
  idealWeightDescription: "BMI 18.5-25 に基づく理想体重範囲",
  healthAdvice: "健康アドバイス",
  recommendation: "推奨事項",

  // BMIカテゴリ
  categories: {
    underweight: "低体重",
    normal: "普通体重",
    overweight: "肥満1度",
    obese: "肥満2度以上",
  },

  // アドバイス
  advice: {
    underweight:
      "体重が不足気味です。バランスの良い食事と適度な運動を心がけ、必要に応じて医師にご相談ください。",
    normal: "理想的な体重範囲内です。現在の健康的な生活習慣を維持しましょう。",
    overweight:
      "体重がやや多めです。食生活の見直しと定期的な運動をおすすめします。",
    obese:
      "肥満状態です。生活習慣病のリスクが高まるため、医師と相談の上、計画的な体重管理を行いましょう。",
  },

  // 統計情報
  statistics: "詳細情報",
  statsLabels: {
    height: "身長",
    weight: "体重",
    bmi: "BMI値",
    category: "体格分類",
    idealMin: "適正体重下限",
    idealMax: "適正体重上限",
  },

  // エラーメッセージ
  errors: {
    invalidHeight: "有効な身長を入力してください",
    invalidWeight: "有効な体重を入力してください",
    heightRange: "身長は50cm〜300cmの範囲で入力してください",
    weightRange: "体重は1kg〜500kgの範囲で入力してください",
  },

  // ボタン
  calculate: "BMIを計算",
  reset: "リセット",

  // 単位
  units: {
    cm: "cm",
    kg: "kg",
    ft: "ft",
    in: "in",
    lbs: "lbs",
  },

  faqList: [
    {
      q: "BMIとは何ですか？",
      a: "BMI（Body Mass Index）は体格指数とも呼ばれ、身長と体重から肥満度を判定する国際的な指標です。計算式は「体重(kg) ÷ 身長(m)²」です。",
    },
    {
      q: "BMIの基準値はどのようになっていますか？",
      a: "日本肥満学会の基準では、18.5未満が低体重、18.5〜25未満が普通体重、25〜30未満が肥満1度、30以上が肥満2度以上とされています。",
    },
    {
      q: "BMIが高い場合、どうすればよいですか？",
      a: "BMIが25以上の場合は、食事の見直しと適度な運動を組み合わせた生活習慣の改善をおすすめします。急激な体重減少は避け、月1-2kgペースでの減量が理想的です。",
    },
    {
      q: "BMIの限界はありますか？",
      a: "BMIは筋肉量を考慮しないため、筋肉質な方は実際より高く、高齢者は低く算出される場合があります。体脂肪率なども合わせて総合的に判断することが大切です。",
    },
    {
      q: "適正体重はどのように計算されますか？",
      a: "適正体重はBMI22を基準として計算されます。下限はBMI18.5、上限はBMI25として算出しています。BMI22は統計的に最も病気になりにくい値とされています。",
    },
  ],
};
