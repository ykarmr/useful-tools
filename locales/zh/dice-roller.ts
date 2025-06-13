import { DiceRollerTranslations } from "../types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "骰子",
  description: "投掷可自定义面数的骰子",
  keywords: ["骰子", "投掷骰子", "随机数", "游戏", "桌面游戏"],
  roll: "投掷骰子",
  sides: "面数",
  result: "结果",
  resultMessage: "你投掷了 {result}！",
  selectCount: "选择要投掷的骰子数量",
  faqList: [
    {
      q: "如何投掷骰子？",
      a: "点击“投掷骰子”按钮，骰子将被投掷并显示结果。",
    },
    {
      q: "结果是如何确定的？",
      a: "结果是随机生成的，显示指定面数的骰子投掷结果。",
    },
    {
      q: "骰子的结果何时更新？",
      a: "每次投掷新骰子时，结果都会更新。",
    },
    {
      q: "骰子投掷的历史会被保存吗？",
      a: "此工具不会保存历史记录，结果仅在当前会话中显示。",
    },
    {
      q: "可以同时投掷多个骰子吗？",
      a: "是的，您可以在开始前选择要投掷的骰子数量。",
    },
  ],
};
