import { ScoreboardTranslations } from "@/locales/types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "スコアボード",
  description: "複数のチームやプレイヤーのスコアを管理",
  keywords: ["スコアボード", "スコア", "チーム", "プレイヤー", "管理"],
  teamName: "チーム名...",
  addTeam: "チーム追加",
  resetScores: "全スコアリセット",
  winner: "勝者！",
  tied: "同点！",
  defaultTeamA: "チーム A",
  defaultTeamB: "チーム B",
  faqList: [
    {
      q: "最大何チームまで追加できますか？",
      a: "最大8チームまで追加可能です。多くのチームを管理しやすくするため、この制限を設けています。",
    },
    {
      q: "スコアがマイナスになることはありますか？",
      a: "いいえ、スコアは0未満になりません。マイナスボタンを押してもスコアが0の場合は変化しません。",
    },
    {
      q: "チーム名を変更できますか？",
      a: "はい、チーム名をクリックして編集モードにし、新しい名前を入力して保存できます。",
    },
    {
      q: "スコアデータは保存されますか？",
      a: "すべてのチームデータとスコアはブラウザのローカルストレージに自動保存されます。ページを再読み込みしても、データが復元されます。",
    },
  ],
};
