import { UnitConversionTranslations } from "@/locales/types/pages/tools/unit-conversion";

export const unitConversion: UnitConversionTranslations = {
  title: "单位换算",
  description: "轻松转换各种测量单位",
  keywords: [
    "单位换算",
    "测量",
    "单位转换",
    "长度换算",
    "重量换算",
    "温度换算",
    "体积换算",
  ],
  placeholder: "输入数值并选择单位...",
  resultPlaceholder: "转换后的数值将显示在此处...",
  length: "长度",
  weight: "重量",
  area: "面积",
  volume: "体积",
  temperature: "温度",
  speed: "速度",
  time: "时间",
  pressure: "压力",
  energy: "能量",
  data: "数据",

  categoryLabel: "类别",
  fromLabel: "从",
  toLabel: "到",
  inputLabel: "输入值",
  faqList: [
    {
      q: "支持哪些类型的单位转换？",
      a: "我们支持10个类别的单位转换：长度、重量、面积、体积、温度、速度、时间、压力、能量和数据存储。",
    },
    {
      q: "转换的精度如何？",
      a: "转换使用精确的转换因子，精确到多个小数位。但对于科学应用，请验证精度是否满足您的要求。",
    },
    {
      q: "我可以在不同的测量系统之间转换吗？",
      a: "是的，您可以在公制、英制和其他测量系统之间转换。例如，从英尺转换为米或从华氏度转换为摄氏度。",
    },
    {
      q: "温度转换是否有特殊处理？",
      a: "是的，温度转换使用特殊公式而不是简单的乘法，因为它们涉及偏移计算（例如，摄氏度到华氏度：°F = °C × 9/5 + 32）。",
    },
  ],
};
