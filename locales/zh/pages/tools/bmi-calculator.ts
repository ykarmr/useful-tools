import { BmiCalculatorTranslations } from "@/locales/types/pages/tools/bmi-calculator";

export const bmiCalculator: BmiCalculatorTranslations = {
  title: "BMI计算器",
  description:
    "根据身高和体重计算BMI（身体质量指数），提供理想体重范围和健康建议",
  keywords: [
    "BMI计算器",
    "身体质量指数",
    "理想体重",
    "健康管理",
    "肥胖",
    "体重管理",
    "饮食",
    "健康检查",
    "代谢",
    "健身",
  ],

  inputSection: "身体信息",
  heightLabel: "身高",
  heightPlaceholder: "例如 170",
  weightLabel: "体重",
  weightPlaceholder: "例如 65",
  unitSystem: "单位制",
  metric: "公制（厘米・公斤）",
  imperial: "英制（英尺・磅）",

  resultSection: "BMI计算结果",
  bmiValue: "BMI值",
  bmiCategory: "分类",
  idealWeightRange: "理想体重范围",
  idealWeightDescription: "基于BMI 18.5-25的理想体重范围",
  healthAdvice: "健康建议",
  recommendation: "建议",

  categories: {
    underweight: "体重不足",
    normal: "正常体重",
    overweight: "超重",
    obese: "肥胖",
  },

  advice: {
    underweight:
      "您的体重低于健康范围。考虑均衡饮食，摄入足够的热量，必要时请咨询医疗保健提供者。",
    normal: "您的体重在健康范围内。保持当前的健康生活习惯。",
    overweight: "您的体重高于健康范围。考虑调整饮食并加入规律的体育活动。",
    obese:
      "您的体重表明肥胖。这会增加健康风险。请咨询医疗保健提供者制定综合的体重管理计划。",
  },

  statistics: "详细信息",
  statsLabels: {
    height: "身高",
    weight: "体重",
    bmi: "BMI值",
    category: "分类",
    idealMin: "理想体重下限",
    idealMax: "理想体重上限",
  },

  errors: {
    invalidHeight: "请输入有效的身高",
    invalidWeight: "请输入有效的体重",
    heightRange: "身高必须在50厘米到300厘米之间",
    weightRange: "体重必须在1公斤到500公斤之间",
  },

  calculate: "计算BMI",
  reset: "重置",

  units: {
    cm: "厘米",
    kg: "公斤",
    ft: "英尺",
    in: "英寸",
    lbs: "磅",
  },

  faqList: [
    {
      q: "什么是BMI？",
      a: "BMI（身体质量指数）是基于身高和体重的国际公认的身体脂肪测量方法。计算公式为体重(kg) ÷ 身高(m)²。",
    },
    {
      q: "BMI分类是什么？",
      a: "BMI分类为：低于18.5（体重不足），18.5-24.9（正常体重），25-29.9（超重），30及以上（肥胖）。",
    },
    {
      q: "如果我的BMI很高该怎么办？",
      a: "如果您的BMI超过25，考虑改善饮食并增加体育活动。目标是每周逐渐减重0.5-1公斤以获得可持续的结果。",
    },
    {
      q: "BMI有限制吗？",
      a: "BMI不考虑肌肉质量，因此可能高估运动员的体脂并低估老年人的体脂。最好与其他健康评估一起使用。",
    },
    {
      q: "理想体重是如何计算的？",
      a: "理想体重使用BMI 22作为目标计算，健康范围从BMI 18.5到25。BMI 22在统计上与最低的健康风险相关。",
    },
  ],
};
