import { SubnetCalculatorTranslations } from "../types/pages/tools/subnet-calculator";

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
  faqList: [
    {
      q: "サブネット計算機とは何ですか？",
      a: "IPアドレスとサブネットマスクから、ネットワークアドレス、ブロードキャストアドレス、ホスト範囲などのネットワーク情報を計算するツールです。",
    },
    {
      q: "CIDR記法とは何ですか？",
      a: "CIDR（Classless Inter-Domain Routing）記法は、スラッシュに続く数字（/24など）でネットワーク部のビット数を表示する記法です。",
    },
    {
      q: "サブネットに何台のホストを配置できますか？",
      a: "サブネットマスクによって決まります。例えば/24では254台、/16では65,534台のホストが配置可能です。",
    },
    {
      q: "異なる表示形式は何のためにありますか？",
      a: "2進数、10進数、16進数、8進数の各形式は、ネットワーク管理者が様々な目的でIPアドレスを異なる表現で確認するためのものです。",
    },
  ],
};
export default subnetCalculator;
