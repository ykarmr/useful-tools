import { RandomNumberTranslations } from "../types/pages/tools/random-number";

export const randomNumber: RandomNumberTranslations = {
  title: "随机数生成器",
  description: "在范围内生成随机数",
  keywords: ["随机", "数字", "生成器", "随机数", "随机数生成器"],
  min: "最小值",
  max: "最大值",
  generate: "生成",
  faqList: [
    {
      q: "生成什么类型的随机数？",
      a: "在指定的最小值和最大值范围内，以等概率生成随机整数。",
    },
    {
      q: "最小值和最大值有限制吗？",
      a: "最小值必须小于最大值。非常大的值可能会影响精度。",
    },
    {
      q: "会连续生成相同的数字吗？",
      a: "是的，由于这些是随机数，可能会连续生成相同的数字。这是正常行为。",
    },
    {
      q: "这些是密码学安全的随机数吗？",
      a: "此工具不适用于密码或加密密钥等安全用途。它适用于一般用途和游戏。",
    },
  ],
};

export default randomNumber;
