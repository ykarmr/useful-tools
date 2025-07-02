import { SubnetCalculatorTranslations } from "@/locales/types/pages/tools/subnet-calculator";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "子网计算器",
  subtitle: "快速计算网络设计所需的子网信息",
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
  errorEmptyIp: "请输入IP地址",
  errorInvalidIp: "IP地址格式无效",
  errorEmptyMask: "请输入子网掩码长度",
  errorInvalidMask: "子网掩码长度必须在0到32之间",
  calculate: "计算",

  // 使用指南
  howToUse: {
    title: "子网计算器使用方法",
    steps: [
      "输入IP地址（例：192.168.1.1）",
      "输入CIDR记法的子网掩码长度（例：24）",
      "点击「计算」按钮",
      "查看网络信息（网络地址、广播地址等）",
      "切换显示格式以二进制、八进制或十六进制查看",
      "输入新值并重新计算不同的IP地址",
    ],
  },

  // 功能特性
  features: {
    title: "主要功能",
    items: [
      "IPv4地址子网计算",
      "支持CIDR记法（/0到/32）",
      "计算网络地址和广播地址",
      "显示主机范围（第一个和最后一个主机地址）",
      "计算可用主机数量",
      "二进制、八进制、十进制、十六进制显示切换",
      "实时输入验证和错误显示",
      "响应式设计支持移动设备",
    ],
  },

  // UI 标签
  labels: {
    networkInfo: "网络信息",
    hostInfo: "主机信息",
  },

  faqList: [
    {
      q: "什么是子网计算器？",
      a: "子网计算器是一个工具，可以根据IP地址和子网掩码长度（CIDR记法）自动计算网络地址、广播地址、主机范围和可用主机数等网络信息。它对网络设计和管理很有用。",
    },
    {
      q: "什么是CIDR记法？",
      a: "CIDR（无类域间路由）记法是通过在IP地址后添加斜杠和数字来表示网络位数的方法。例如，/24表示上位24位是网络部分，相当于255.255.255.0的子网掩码。",
    },
    {
      q: "主机数是如何计算的？",
      a: "可用主机数是根据主机位数计算的。例如，/24（8个主机位）可以放置2^8 - 2 = 254台主机。减去2是因为排除了网络地址和广播地址。",
    },
    {
      q: "不同的显示格式有什么用？",
      a: "二进制显示有助于理解位运算，十六进制用于配置文件，八进制用于特定系统。我们提供多种显示格式来帮助网络设备配置和加深理解。",
    },
    {
      q: "/31和/32子网有什么特殊之处？",
      a: "是的。/31用于点对点连接，有2个IP地址，/32用于主机指定，只有1个IP地址。在这些情况下，通常的网络地址和广播地址概念不适用。",
    },
  ],
};
export default subnetCalculator;
