import type { TeamGeneratorTranslations } from "../types/tools";

export const teamGenerator: TeamGeneratorTranslations = {
  title: "团队生成器",
  description: "随机生成团队的工具",
  keywords: ["团队生成器", "随机团队", "团队分配", "团队工具"],
  addPlayer: "添加玩家",
  playerName: "玩家名称...",
  teamSize: "团队大小",
  generateTeams: "生成团队",
  players: "玩家",
  teams: "团队",
  noPlayers: "尚未添加玩家。添加一些玩家开始吧！",
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
      a: "团队从您的玩家列表中随机生成。生成器会将玩家尽可能均匀地分配到指定的团队大小中，剩余的玩家会随机分配。",
    },
    {
      q: "我可以用同样的玩家重新生成团队吗？",
      a: '是的，您可以多次点击"生成团队"来从同一玩家列表创建不同的随机团队组合。',
    },
    {
      q: "如果玩家数量不能被团队数量整除会怎样？",
      a: "如果在创建均匀团队后还有剩余玩家，他们将随机分配给现有团队，导致一些团队多一个玩家。",
    },
    {
      q: "我可以添加的玩家数量有限制吗？",
      a: "没有严格的限制，但出于实用考虑，我们建议保持合理的数量以适合您的预期用途。",
    },
  ],
};
