import { ScoreboardTranslations } from "@/locales/types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "记分板",
  description: "跟踪比赛和游戏分数",
  keywords: ["记分板", "分数", "团队", "玩家", "跟踪"],
  teamName: "团队名称...",
  addTeam: "添加团队",
  resetScores: "重置所有分数",
  winner: "赢家！",
  tied: "平局！",
  defaultTeamA: "团队 A",
  defaultTeamB: "团队 B",
  faqList: [
    {
      q: "我可以添加多少个团队到记分板？",
      a: "您最多可以添加8个团队到记分板。这个限制有助于保持界面的可管理性和易用性。",
    },
    {
      q: "分数可以变成负数吗？",
      a: "不可以，分数不能低于零。如果团队的分数已经是0，点击减号按钮不会进一步减少。",
    },
    {
      q: "我可以更改团队名称吗？",
      a: "是的，您可以点击任何团队名称进入编辑模式，然后输入新名称并保存更改。",
    },
    {
      q: "我的记分板数据会被保存吗？",
      a: "所有团队数据和分数都会自动保存到您浏览器的本地存储中。当您重新加载页面时，您的数据将被恢复。",
    },
  ],
};
