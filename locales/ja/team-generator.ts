import type { TeamGeneratorTranslations } from "../types";

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
};
