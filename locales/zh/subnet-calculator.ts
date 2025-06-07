import type { SubnetCalculatorTranslations } from "../types/tools";

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
};
export default subnetCalculator;
