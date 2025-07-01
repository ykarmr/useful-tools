import { TeamGeneratorTranslations } from "@/locales/types/pages/tools/team-generator";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "团队生成器",
  subtitle: "公平地将玩家分配到平衡的团队中",
  description:
    "从玩家列表中随机创建平衡的团队。非常适合在体育和游戏中进行公平的团队分配，自动分配玩家。",
  keywords: [
    "团队生成器",
    "团队分配",
    "玩家分配",
    "随机团队",
    "平衡团队",
    "运动团队",
    "群组分配",
    "团队编排",
    "公平分配",
  ],
  howToUse: {
    title: "使用方法",
    steps: [
      "输入玩家姓名并点击「添加」按钮",
      "选择团队规模（2-8名玩家）",
      "添加所有必需的玩家",
      "点击「生成团队」进行随机分组",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      "完全随机的团队生成",
      "剩余玩家的自动分配",
      "玩家列表自动保存功能",
      "彩色团队显示，每个团队有独特颜色",
      "灵活的团队规模设置（2-8名玩家）",
    ],
  },
  addPlayer: "添加玩家",
  playerName: "玩家名称...",
  teamSize: "团队大小",
  generateTeams: "生成团队",
  players: "玩家",
  teams: "团队",
  noPlayers: "尚未添加玩家。添加一些玩家开始吧！",
  noPlayersDescription: "添加玩家以开始创建团队",
  notEnoughPlayers: "需要至少 {needed} 名玩家才能创建团队",
  defaultTeamName: "团队",
  duplicatePlayerError: "已存在同名玩家",
  confirmClearAll: "确定要删除所有玩家吗？",
  generating: "生成中...",
  resetTeams: "重置团队",
  clearAll: "清除所有",
  teamGenerationInfo: "团队生成信息：",
  teamsOfPlayers: "{teams} 个团队，每个团队 {size} 名玩家",
  remainingPlayersDistributed: "{remaining} 名剩余玩家将分配到现有团队中",
  failedToGenerate: "生成团队失败",
  playersUnit: "玩家",
  faqList: [
    {
      q: "团队是如何生成的？",
      a: "团队使用Fisher-Yates洗牌算法从您的玩家列表中随机生成。生成器会将玩家尽可能均匀地分配到指定的团队大小中，剩余的玩家会随机分配到现有团队中。",
    },
    {
      q: "我可以用同样的玩家重新生成团队吗？",
      a: '是的，您可以多次点击"生成团队"来从同一玩家列表创建不同的随机团队组合。每次生成都会产生全新的随机排列。',
    },
    {
      q: "如果玩家数量不能被团队数量整除会怎样？",
      a: "如果在创建均匀团队后还有剩余玩家，他们将随机分配给现有团队，导致一些团队多一个玩家。分配力求尽可能公平。",
    },
    {
      q: "我可以添加的玩家数量有限制吗？",
      a: "没有严格的技术限制，但出于实用考虑和最佳性能，我们建议保持合理的数量以适合您的预期用途。该工具可以有效处理大型群组。",
    },
    {
      q: "我的玩家列表会自动保存吗？",
      a: "是的，您的玩家列表会自动保存到浏览器的本地存储中。当您重新加载页面时，您的玩家列表将被恢复，但生成的团队会被清除。",
    },
    {
      q: "我可以添加重复名字的玩家吗？",
      a: "不可以，不允许添加重复的玩家名字。每个玩家必须有唯一的名字，以确保正确的团队生成并避免混淆。",
    },
  ],
};
