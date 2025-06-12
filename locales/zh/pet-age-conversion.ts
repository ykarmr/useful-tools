import { PetAgeConversionTranslations } from "../types";

export const petAgeConversion: PetAgeConversionTranslations = {
  title: "宠物年龄转换",
  description: "将狗或猫的年龄转换为人类年龄",
  keywords: ["宠物年龄", "狗", "猫", "人类转换", "年龄计算"],
  petTypeLabel: "宠物类型",
  dog: "狗",
  cat: "猫",
  rabbit: "兔子",
  hamster: "仓鼠",
  ferret: "雪貂",
  horse: "马",
  cow: "牛",
  pig: "猪",
  sheep: "羊",
  goat: "山羊",
  turtle: "乌龟",
  parakeet: "鹦鹉",
  petAgeLabel: "宠物年龄（年）",
  petAgePlaceholder: "例如：5",
  resultPlaceholder: "转换结果将在此显示",
  petAgeResult: "{petType}的{petAge}岁相当于人类的{humanAge}岁。",
  faqList: [
    {
      q: "宠物年龄转换准确吗？",
      a: "转换基于常用的公式，但实际衰老速度因品种和个体而异。请将这些作为参考值使用。",
    },
    {
      q: "支持哪些动物？",
      a: "我们支持12种动物，包括狗、猫、兔子、仓鼠、马、牛等。每种动物使用不同的转换公式。",
    },
    {
      q: "我可以计算的最大年龄是多少？",
      a: "没有技术限制，但对于非常老的年龄，转换公式可能不太准确。建议在典型寿命范围内使用。",
    },
    {
      q: "我可以输入小数年龄吗？",
      a: "是的，您可以输入小数年龄，如0.5年（6个月）。这对计算幼体动物年龄特别有用。",
    },
  ],
};
