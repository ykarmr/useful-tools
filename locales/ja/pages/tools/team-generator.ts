import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "チーム生成",
  description: "プレイヤーリストからランダムにバランスの取れたチームを作成",
  keywords: [
    "チーム生成",
    "プレイヤーリスト",
    "ランダムチーム",
    "バランスの取れたチーム",
  ],
  addPlayer: "プレイヤー追加",
  playerName: "プレイヤー名...",
  teamSize: "チームサイズ",
  generateTeams: "チーム生成",
  players: "人",
  teams: "チーム",
  noPlayers:
    "まだプレイヤーが追加されていません。プレイヤーを追加して開始しましょう！",
  notEnoughPlayers: "チームを作成するには最低{needed}人のプレイヤーが必要です",
  defaultTeamName: "チーム",
  duplicatePlayerError: "同じ名前のプレイヤーが既に存在します",
  confirmClearAll: "すべてのプレイヤーを削除しますか？",
  generating: "生成中...",
  resetTeams: "チームリセット",
  clearAll: "全削除",
  teamGenerationInfo: "チーム生成情報:",
  teamsOfPlayers: "{teams}チーム作成可能 ({size}人ずつ)",
  remainingPlayersDistributed: "{remaining}人が余り、既存チームに分散されます",
  failedToGenerate: "チーム生成に失敗しました",
  playersUnit: "人",
  faqList: [
    {
      q: "プレイヤー数がチームサイズで割り切れない場合はどうなりますか？",
      a: "余ったプレイヤーは既存のチームに均等に分散されます。例えば、9人で3人チームを作る場合、3つのチームができ、各チームに1人ずつ余りのプレイヤーが追加されます。",
    },
    {
      q: "チーム分けは完全にランダムですか？",
      a: "はい、JavaScriptの乱数ジェネレーターを使用して、プレイヤーを完全にランダムにチームに分配します。すべての組み合わせが等しい確率で生成されます。",
    },
    {
      q: "同じ名前のプレイヤーを追加できますか？",
      a: "いいえ、重複する名前のプレイヤーは追加できません。各プレイヤーは一意の名前である必要があります。",
    },
    {
      q: "プレイヤーリストは保存されますか？",
      a: "はい、追加したプレイヤーリストはブラウザのローカルストレージに自動保存されます。ページを再読み込みしても、プレイヤーリストが復元されます。",
    },
  ],
};
