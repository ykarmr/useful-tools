import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "サイコロ",
  subTitle: "多面体ダイスのデジタルツール",
  description:
    "4面から32面まで、様々な種類のサイコロを振れるオンラインツール。統計情報や履歴も確認できます。",
  keywords: ["サイコロ", "ダイス", "ランダム", "ゲーム", "TRPG", "多面体"],
  sides: "面数",
  roll: "振る",
  count: "個数",
  total: "合計",
  history: "履歴",
  clearHistory: "履歴をクリア",
  statistics: {
    title: "統計情報",
    overallStats: "全体統計",
    totalRolls: "総サイコロ数",
    rollSessions: "ロール回数",
    averageValue: "平均値",
    highestLowest: "最高/最低",
    totalSum: "合計値",
    distribution: "出目分布",
    currentSettings: "現在の設定",
  },
  howToUse: {
    title: "使い方",
    steps: [
      "サイコロの面数を選択（4面から32面まで）",
      "振る個数を設定（1個から10個まで）",
      "「振る」ボタンをクリック",
      "アニメーション結果を確認し、履歴で詳細統計を見る",
    ],
  },
  features: {
    title: "特徴",
    items: [
      "4面から32面まで9種類のサイコロに対応",
      "最大10個まで同時振り可能",
      "リアルタイムアニメーション表示",
      "暗号学的に安全な乱数生成",
      "詳細な統計情報（平均値、最高/最低値、出目分布）",
      "最新10回分の履歴機能",
    ],
  },
  faqList: [
    {
      q: "どの種類のサイコロが使えますか？",
      a: "4面、6面、8面、10面、12面、16面、20面、24面、32面のサイコロが利用できます。TRPGやボードゲームで使用される一般的な多面体サイコロに対応しています。",
    },
    {
      q: "同時に振れる最大数は？",
      a: "最大10個のサイコロを同時に振ることができます。ドロップダウンメニューから1～10個まで選択できます。",
    },
    {
      q: "結果は本当にランダムですか？",
      a: "はい、JavaScriptの暗号学的に安全な乱数生成を使用して、完全にランダムな結果を生成しています。各面が出る確率は等しく公平です。",
    },
    {
      q: "履歴を確認できますか？",
      a: "はい、直近10回までの結果が履歴として表示されます。各ロールの詳細な統計情報（平均値、最高/最低値、出目分布）も確認できます。",
    },
    {
      q: "アニメーション中に再度振れますか？",
      a: "いいえ、アニメーション中（約1秒間）はボタンが無効になります。アニメーション完了後に次のロールが可能です。",
    },
    {
      q: "どのような場面で使用できますか？",
      a: "TRPG（D&D、パスファインダーなど）、ボードゲーム、確率学習、ランダム選択など、様々な用途でご利用いただけます。詳細な統計情報により、確率の学習にも最適です。",
    },
  ],
};
