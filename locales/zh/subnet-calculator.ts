import { SubnetCalculatorTranslations } from "../types/pages/tools/subnet-calculator";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "子网计算器",
  description: "根据IP地址和子网掩码长度计算网络信息。",
  keywords: ["子网", "IP地址", "网络", "计算器", "掩码"],
  ipAddress: "IP地址",
  subnetMaskLength: "子网掩码长度（CIDR）",
  subnetMask: "子网掩码",
  networkAddress: "网络地址",
  broadcastAddress: "广播地址",
  firstHost: "第一个主机地址",
  lastHost: "最后一个主机地址",
  hosts: "主机数",
  invalidInput: "输入无效",
  displayBase: "显示基数",
  octal: "八进制",
  binary: "二进制",
  decimal: "十进制",
  hexadecimal: "十六进制",
  errorEmptyIp: "IP地址不能为空",
  errorInvalidIp: "无效的IP地址格式",
  errorEmptyMask: "子网掩码长度不能为空",
  errorInvalidMask: "无效的子网掩码长度",
  calculate: "计算",
  faqList: [
    {
      q: "什么是子网掩码长度（CIDR）？",
      a: "子网掩码长度（CIDR表示法）是指网络前缀的位数，范围从0到32。例如，/24表示前24位用于网络部分。",
    },
    {
      q: "如何理解计算结果？",
      a: "计算结果包括网络地址、子网掩码、广播地址、第一个主机地址、最后一个主机地址和可用主机数。",
    },
    {
      q: "支持哪些显示格式？",
      a: "支持二进制、八进制、十进制和十六进制四种显示格式，可以根据需要切换查看。",
    },
    {
      q: "私有IP地址和公有IP地址有什么区别？",
      a: "私有IP地址（如192.168.x.x、10.x.x.x）用于内部网络，公有IP地址用于互联网通信。计算器对两者都适用。",
    },
  ],
};
export default subnetCalculator;
