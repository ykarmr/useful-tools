import type { SubnetCalculatorTranslations } from "../types/tools";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "サブネット計算機",
  description:
    "IPアドレスとサブネットマスク長からネットワーク情報を計算します。",
  keywords: ["サブネット", "IPアドレス", "ネットワーク", "計算", "マスク"],
  ipAddress: "IPアドレス",
  subnetMaskLength: "サブネットマスク長（CIDR）",
  subnetMask: "サブネットマスク",
  networkAddress: "ネットワークアドレス",
  broadcastAddress: "ブロードキャストアドレス",
  firstHost: "最初のホストアドレス",
  lastHost: "最後のホストアドレス",
  hosts: "ホスト数",
  invalidInput: "無効な入力です",
  displayBase: "表示形式",
  octal: "8進数",
  binary: "2進数",
  decimal: "10進数",
  hexadecimal: "16進数",

  errorEmptyIp: "IPアドレスを入力してください。",
  errorInvalidIp: "IPアドレスの形式が正しくありません。",
  errorEmptyMask: "サブネットマスク長を入力してください。",
  errorInvalidMask: "サブネットマスク長は0〜32の範囲で入力してください。",
  calculate: "計算",
};
export default subnetCalculator;
