import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "チーム生成ツール",
  subtitle: "プレイヤーを公平にバランスの取れたチームに分割",
  description:
    "プレイヤーリストからランダムにバランスの取れたチームを作成するツール。スポーツやゲームでの公平なチーム分けが簡単にできます。",
  keywords: [
    "チーム生成",
    "チーム分け",
    "プレイヤー分配",
    "ランダムチーム",
    "バランス調整",
    "スポーツチーム",
    "グループ分け",
    "チーム編成",
    "公平分配",
  ],
  howToUse: {
    title: "使い方",
    steps: [
      "プレイヤー名を入力して「追加」ボタンをクリック",
      "チームサイズ（2～8人）を選択",
      "必要なプレイヤーをすべて追加",
      "「チーム生成」ボタンでランダムにチーム分け",
    ],
  },
  features: {
    title: "主な機能",
    items: [
      "完全ランダムなチーム生成",
      "余ったプレイヤーの自動分散",
      "プレイヤーリストの自動保存",
      "カラフルなチーム表示",
      "柔軟なチームサイズ設定",
    ],
  },
  addPlayer: "プレイヤー追加",
  playerName: "プレイヤー名...",
  teamSize: "チームサイズ",
  generateTeams: "チーム生成",
  players: "人",
  teams: "チーム",
  noPlayers:
    "まだプレイヤーが追加されていません。プレイヤーを追加して開始しましょう！",
  noPlayersDescription: "プレイヤーを追加してチーム分けを始めましょう",
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
      q: "チームはどのように生成されますか？",
      a: "プレイヤーリストから完全にランダムにチームが生成されます。指定されたチームサイズに可能な限り均等に分配し、余ったプレイヤーは既存チームにランダムに分散されます。",
    },
    {
      q: "同じプレイヤーで何度もチーム生成できますか？",
      a: "はい、「チーム生成」ボタンを何度でもクリックして、同じプレイヤーリストから異なるランダムなチーム組み合わせを作成できます。",
    },
    {
      q: "プレイヤー数がチームサイズで割り切れない場合はどうなりますか？",
      a: "余ったプレイヤーは既存のチームにランダムに分散され、一部のチームが1人多くなります。できるだけ公平に分配されるようになっています。",
    },
    {
      q: "追加できるプレイヤー数に制限はありますか？",
      a: "厳密な制限はありませんが、実用的な観点から適切な人数でのご利用をおすすめします。大人数でも正常に動作します。",
    },
    {
      q: "プレイヤーリストは保存されますか？",
      a: "はい、追加したプレイヤーリストはブラウザのローカルストレージに自動保存されます。ページを再読み込みしても、プレイヤーリストが復元されます。",
    },
    {
      q: "同じ名前のプレイヤーを追加できますか？",
      a: "いいえ、重複する名前のプレイヤーは追加できません。各プレイヤーは一意の名前である必要があります。",
    },
  ],
};
