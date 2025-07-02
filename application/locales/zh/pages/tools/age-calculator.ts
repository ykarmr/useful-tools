import { AgeCalculatorTranslations } from "@/locales/types";

export const ageCalculator: AgeCalculatorTranslations = {
  title: "年龄计算器",
  subtitle: "精确计算年龄和经过天数",
  description:
    "免费工具，准确计算从出生日期开始的当前年龄和经过天数。详细显示年、月、周、日、时、分、秒信息，还可计算到下个生日的天数。",
  keywords: [
    "年龄计算器",
    "年龄计算",
    "经过天数计算器",
    "出生日期计算器",
    "生日计算器",
    "年数计算器",
    "月数计算器",
    "天数计算器",
    "时间计算器",
    "精确年龄计算",
  ],
  howToUse: {
    title: "如何使用年龄计算器",
    steps: [
      "选择或输入您的出生日期",
      "设置参考日期（默认为今天）",
      "点击「计算」按钮显示结果",
      "查看年、月、周、日、时、分、秒的详细年龄信息",
    ],
  },
  features: {
    title: "主要功能",
    items: [
      "精确年龄计算（年、月、周、日、时、分、秒）",
      "计算从出生日期到任何指定日期的经过时间",
      "下个生日倒计时",
      "实时更新功能",
      "清晰易懂的结果显示",
      "支持多语言的直观界面",
    ],
  },
  birthdateLabel: "出生日期",
  birthdatePlaceholder: "请选择您的出生日期",
  targetDateLabel: "参考日期",
  targetDatePlaceholder: "请选择参考日期",
  calculateButton: "计算年龄",
  clearButton: "清除",
  resultPlaceholder: "输入出生日期来计算年龄",
  resultTitle: "计算结果",
  currentAge: "当前年龄",
  daysLived: "已生活天数",
  yearsOld: "年",
  monthsOld: "个月",
  weeksOld: "周",
  daysOld: "天",
  hoursOld: "小时",
  minutesOld: "分钟",
  secondsOld: "秒",
  nextBirthday: "下个生日",
  daysUntilBirthday: "距离下个生日",
  nextBirthdayAge: "岁",
  faqList: [
    {
      q: "年龄计算的精确度如何？",
      a: "此工具基于日期计算来计算精确年龄。可以详细计算到年、月、日、时、分、秒。",
    },
    {
      q: "是否考虑闰年？",
      a: "是的，闰年在计算中被准确考虑。2月29日出生的人的年龄计算也能正确处理。",
    },
    {
      q: "除了当前年龄，能否计算过去或未来日期的年龄？",
      a: "通过更改参考日期，您也可以计算特定过去或未来日期的年龄。",
    },
    {
      q: "如何计算到下个生日的天数？",
      a: "系统自动计算从当前日期到下个生日的天数，并以倒计时格式显示。",
    },
    {
      q: "是否考虑时区？",
      a: "计算基于您浏览器的本地时间。如果需要不同时区的计算，请相应调整参考日期。",
    },
  ],
};
