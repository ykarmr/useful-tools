import { ScoreboardTranslations } from "@/locales/types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "スコアボード",
  subtitle: "ゲームやスポーツの得点管理",
  description:
    "チームや選手の得点をリアルタイムで管理し、勝者を自動判定するスコアボードツール",
  keywords: [
    "スコアボード",
    "得点",
    "チーム",
    "選手",
    "管理",
    "ゲーム",
    "スポーツ",
    "競技",
  ],
  teamName: "チーム名を入力",
  addTeam: "チーム追加",
  resetScores: "スコアをリセット",
  winner: "勝者！",
  tied: "同点！",
  defaultTeamA: "チーム A",
  defaultTeamB: "チーム B",
  maxTeamsReached: "最大8チームまで追加できます",
  howToUse: {
    title: "使い方",
    steps: [
      "チーム名を入力して「チーム追加」でチームを登録",
      "各チームの「+」「-」ボタンで得点を調整",
      "チーム名をクリックして名前を変更",
      "最高得点のチームが自動的に勝者として表示",
      "「スコアをリセット」で全チームの得点を0に戻す",
    ],
    features: {
      title: "特徴",
      items: [
        "最大8チームの同時管理",
        "チーム別カラー表示",
        "リアルタイム勝者判定",
        "直感的な操作",
        "自動データ保存",
      ],
    },
  },
  faqList: [
    {
      q: "何チームまで追加できますか？",
      a: "最大8チームまで追加できます。各チームには自動で異なる色が割り当てられ、見分けやすくなります。",
    },
    {
      q: "得点がマイナスになりますか？",
      a: "いいえ、得点は0未満になりません。得点が0の時にマイナスボタンを押しても変化しません。",
    },
    {
      q: "チーム名は変更できますか？",
      a: "はい、チーム名の横の編集アイコンをクリックするか、チーム名自体をクリックして編集できます。",
    },
    {
      q: "データは保存されますか？",
      a: "すべてのチームデータと得点はブラウザに自動保存されます。ページを再読み込みしても前回のデータが復元されます。",
    },
    {
      q: "複数チームが同点の場合は？",
      a: "最高得点が同じチームが複数ある場合、「同点！」として全てのチーム名が表示されます。",
    },
    {
      q: "チームを削除するとどうなりますか？",
      a: "チームを削除すると、そのチームのデータは完全に削除されます。誤って削除した場合は新しく作成し直す必要があります。",
    },
  ],
};
