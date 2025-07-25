import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

export const calculator: CalculatorTranslations = {
  title: "関数電卓",
  subTitle: "高機能な科学計算が可能な関数電卓",
  description:
    "三角関数、対数、指数、平方根など、高度な数学計算に対応した関数電卓。計算履歴機能付きで、複雑な計算も効率的に行えます。",
  keywords: [
    "関数電卓",
    "科学計算機",
    "三角関数",
    "対数",
    "指数",
    "平方根",
    "数学計算",
    "計算履歴",
    "Web電卓",
  ],
  howToUse: {
    title: "関数電卓の使い方",
    steps: [
      "基本的な四則演算は数字ボタンと演算子で入力",
      "科学関数（sin、cos、tanなど）を選択して高度な計算を実行",
      "括弧を使って複雑な数式を構成",
      "定数（π、e）を利用した計算も可能",
      "計算履歴から過去の計算を再利用",
      "メモリ機能で値の保存・呼び出しが可能",
    ],
  },
  features: {
    title: "関数電卓の特徴",
    items: [
      "三角関数（sin、cos、tan）と逆三角関数",
      "対数関数（log、ln）と指数関数（exp）",
      "平方根、累乗、絶対値計算",
      "数学定数（π、e）を利用可能",
      "計算履歴の保存・再利用機能",
      "メモリ機能（MC、MR、M+、M-、MS）",
      "括弧を使った複雑な数式の計算",
      "度数法による三角関数計算",
    ],
  },
  history: {
    title: "計算履歴",
    empty: "まだ計算履歴がありません",
  },
  faqList: [
    {
      q: "関数電卓の基本的な使い方を教えてください",
      a: "数字ボタンで値を入力し、演算子や関数ボタンを選択してください。科学関数を使用する場合は、関数ボタンを押してから括弧内に値を入力します。",
    },
    {
      q: "三角関数の計算方法は？",
      a: "sin、cos、tanボタンを押すと関数が入力されます。例：sin(30)と入力すると30度のサインが計算されます。角度は度数法で入力してください。",
    },
    {
      q: "計算履歴はどのように使いますか？",
      a: "右側の履歴パネルで過去の計算を確認できます。履歴項目をクリックすると、その計算式を再利用できます。履歴クリアボタンで全履歴を削除できます。",
    },
    {
      q: "メモリ機能の使い方は？",
      a: "MS（メモリ保存）で現在の値を保存、MR（メモリ呼び出し）で保存した値を呼び出し、M+/M-でメモリ値に加減算、MCでメモリクリアができます。",
    },
    {
      q: "対数の計算方法は？",
      a: "logボタンで常用対数（底10）、lnボタンで自然対数（底e）を計算できます。例：log(100)は2、ln(e)は1になります。",
    },
    {
      q: "括弧を使った計算はできますか？",
      a: "はい、(と)ボタンで括弧を入力できます。例：(2+3)×4のような複雑な計算も正確に処理されます。",
    },
    {
      q: "定数πやeの使い方は？",
      a: "πボタンで円周率（3.14159...）、eボタンで自然対数の底（2.71828...）を入力できます。これらの定数を使った計算も可能です。",
    },
    {
      q: "エラーが出た場合の対処法は？",
      a: "無効な計算でエラーが発生した場合は、Cボタンでリセットしてから、正しい数式で再計算してください。",
    },
  ],
};
