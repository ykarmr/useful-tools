import { FAQItem } from "../../faq";

export interface BmiCalculatorTranslations {
  title: string;
  description: string;
  keywords: string[];

  // 入力セクション
  inputSection: string;
  heightLabel: string;
  heightPlaceholder: string;
  weightLabel: string;
  weightPlaceholder: string;
  unitSystem: string;
  metric: string;
  imperial: string;

  // 結果表示
  resultSection: string;
  bmiValue: string;
  bmiCategory: string;
  idealWeightRange: string;
  idealWeightDescription: string;
  healthAdvice: string;
  recommendation: string;

  // BMIカテゴリ
  categories: {
    underweight: string;
    normal: string;
    overweight: string;
    obese: string;
  };

  // アドバイス
  advice: {
    underweight: string;
    normal: string;
    overweight: string;
    obese: string;
  };

  // 統計情報
  statistics: string;
  statsLabels: {
    height: string;
    weight: string;
    bmi: string;
    category: string;
    idealMin: string;
    idealMax: string;
  };

  // エラーメッセージ
  errors: {
    invalidHeight: string;
    invalidWeight: string;
    heightRange: string;
    weightRange: string;
  };

  // ボタン
  calculate: string;
  reset: string;

  // 単位
  units: {
    cm: string;
    kg: string;
    ft: string;
    in: string;
    lbs: string;
  };

  // 使い方ガイド
  howToUse: {
    title: string;
    steps: string[];
  };

  // 機能
  features: {
    title: string;
    items: string[];
  };

  faqList: FAQItem[];
}
