import { DiceRollerTranslations } from "@/locales/types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "骰子",
  subTitle: "数字多面体骰子工具",
  description: "在线投掷4面到32面各种类型骰子的工具，包含统计和历史记录。",
  keywords: ["骰子", "投掷骰子", "随机数", "游戏", "桌面游戏"],
  roll: "投掷",
  sides: "面",
  count: "数量",
  total: "总计",
  history: "历史",
  clearHistory: "清除历史",
  statistics: {
    title: "统计信息",
    overallStats: "总体统计",
    totalRolls: "骰子总数",
    rollSessions: "投掷次数",
    averageValue: "平均值",
    highestLowest: "最高 / 最低",
    currentSettings: "当前设置",
    totalSum: "总和",
    distribution: "结果分布",
  },
  howToUse: {
    title: "使用方法",
    steps: [
      "选择骰子类型（可选4到32面）",
      "设置投掷骰子数量（1到10个）",
      "点击投掷按钮",
      "查看动画结果并在历史记录中查看详细统计",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      "9种不同类型的骰子，从4面到32面",
      "最多可同时投掷10个骰子",
      "实时动画显示",
      "加密安全的随机数生成",
      "详细统计信息（平均值、最高/最低值、分布）",
      "最近10次投掷的历史记录跟踪",
    ],
  },
  faqList: [
    {
      q: "有哪些类型的骰子可以使用？",
      a: "您可以使用4面、6面、8面、10面、12面、16面、20面、24面和32面骰子。包括桌面RPG和桌游中使用的所有常见多面体骰子。",
    },
    {
      q: "一次最多可以投掷多少个骰子？",
      a: "您可以同时投掷最多10个骰子。使用下拉菜单选择1到10个骰子。",
    },
    {
      q: "骰子结果真的是随机的吗？",
      a: "是的，我们使用JavaScript的加密安全随机数生成来确保完全随机的结果。每个面都有相等的出现概率。",
    },
    {
      q: "我可以查看骰子投掷的历史记录吗？",
      a: "是的，最近10次投掷会显示在历史记录部分，每次投掷都有详细统计信息，包括平均值、最高/最低结果和结果分布。",
    },
    {
      q: "动画播放时可以再次投掷骰子吗？",
      a: "不可以，动画期间（大约1秒）按钮会被禁用。动画完成后您可以再次投掷骰子。",
    },
    {
      q: "这个工具可以用于什么场合？",
      a: "非常适合桌面RPG（D&D、Pathfinder等）、桌游、概率学习以及任何需要随机选择的情况。详细的统计信息使其成为概率教育的理想工具。",
    },
  ],
};
