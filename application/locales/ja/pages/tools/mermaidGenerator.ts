import { MermaidGeneratorTranslations } from "../../../types/pages/tools/mermaidGenerator";

export const mermaidGenerator: MermaidGeneratorTranslations = {
  title: "Mermaid図表ジェネレーター",
  subtitle: "テキストから美しい図表を簡単作成",
  description:
    "Mermaidシンタックスを使って、フローチャート、シーケンス図、ガントチャートなど様々な図表を簡単に作成・プレビューできるツールです。",
  keywords: [
    "Mermaid",
    "図表",
    "フローチャート",
    "シーケンス図",
    "ガントチャート",
    "クラス図",
    "ダイアグラム",
    "可視化",
    "ドキュメント",
    "設計図",
  ],

  input: {
    title: "Mermaidコード入力",
    placeholder: `graph TD
    A[開始] --> B{条件分岐}
    B -->|Yes| C[処理A]
    B -->|No| D[処理B]
    C --> E[終了]
    D --> E`,
    syntaxHelp: "Mermaidシンタックスガイドを参照",
  },

  diagramTypes: {
    title: "図表タイプ",
    flowchart: "フローチャート",
    sequence: "シーケンス図",
    gantt: "ガントチャート",
    classDiagram: "クラス図",
    stateDiagram: "状態図",
    erDiagram: "ER図",
    userJourney: "ユーザージャーニー",
    gitgraph: "Git履歴図",
  },

  templates: {
    title: "テンプレート",
    useTemplate: "テンプレートを使用",
    flowchartBasic: {
      name: "基本フローチャート",
      description: "シンプルな処理フローの図表",
    },
    sequenceBasic: {
      name: "基本シーケンス図",
      description: "オブジェクト間のやり取りを表現",
    },
    ganttBasic: {
      name: "基本ガントチャート",
      description: "プロジェクトのスケジュール管理",
    },
    classBasic: {
      name: "基本クラス図",
      description: "オブジェクト指向設計の構造",
    },
  },

  preview: {
    title: "プレビュー",
    loading: "図表を生成中...",
    error: "構文エラー: コードを確認してください",
    noContent: "Mermaidコードを入力してください",
  },

  errorMessages: {
    syntaxError: "構文エラー: コードの書式を確認してください",
    expectedElement: "構文エラー: 期待される要素が見つかりません",
    undefinedElement: "未定義の要素が含まれています",
    duplicateElement: "重複する定義があります",
    invalidCharacter: "無効な文字が含まれています",
    flowchartError: "フローチャートの構文に問題があります",
    sequenceError: "シーケンス図の構文に問題があります",
    ganttError: "ガントチャートの構文に問題があります",
    libraryError: "Mermaidライブラリの読み込みに失敗しました",
  },

  ui: {
    characters: "文字",
    syntaxErrorDetected: "構文エラーが検出されました",
    checkPreview: "右側のプレビューで詳細を確認",
    fullScreen: "全画面表示",
    normal: "通常表示",
    close: "閉じる",
    exportNotAvailable: "エクスポートできる図表がありません",
    dragToMove: "ドラッグで移動",
    dragPinchToOperate: "ドラッグ/ピンチで操作",
    buttonForZoom: "ボタンでズーム",
    syntaxErrorDetails: "構文エラーの詳細",
    checkMermaidSyntax: "Mermaidの構文ルールに従っているか確認してください",
    referToTemplate: "テンプレートを参考にしてコードを修正してください",
    checkSpelling: "スペルミスや不正な文字がないかチェックしてください",
    checkBrackets: "括弧やクォートの対応関係を確認してください",
    exportOnlyWhenGenerated:
      "図表が正常に生成されている場合のみダウンロード可能です",
    escToExit: "ESCキーまたは「閉じる」ボタンで通常表示に戻ります",
    escToNormal: "ESCで終了",
    imageLoadFailed: "画像の読み込みに失敗しました",
    previewRightSide: "右側のプレビューで詳細を確認",
    fixCodeFirst: "コードを修正してから再度お試しください",
  },

  export: {
    title: "エクスポート",
    copyCode: "コードをコピー",
    downloadSvg: "SVGダウンロード",
    downloadPng: "PNGダウンロード",
    copySuccess: "コードをコピーしました",
    downloadSuccess: "ダウンロードが完了しました",
    exportError: "エクスポートに失敗しました",
  },

  howToUse: {
    title: "使い方",
    steps: [
      "図表タイプを選択するか、テンプレートを使用してください",
      "左側のエディタにMermaidシンタックスでコードを入力します",
      "右側のプレビューで図表をリアルタイム確認できます",
      "完成したら、コードのコピーやSVG/PNG形式でダウンロードできます",
    ],
    features: {
      title: "主な機能",
      items: [
        "8種類の図表タイプに対応",
        "リアルタイムプレビュー機能",
        "すぐに使えるテンプレート集",
        "構文エラーの自動検出",
        "SVG/PNG形式でのエクスポート",
        "Mermaidコードのコピー機能",
        "レスポンシブデザイン対応",
      ],
    },
  },

  faqList: [
    {
      q: "Mermaidとは何ですか？",
      a: "Mermaidは、テキストベースで図表を作成できるマークアップ言語です。GitHubやNotionなど多くのプラットフォームでサポートされています。",
    },
    {
      q: "どのような図表が作成できますか？",
      a: "フローチャート、シーケンス図、ガントチャート、クラス図、状態図、ER図、ユーザージャーニー図、Git履歴図など8種類の図表が作成できます。",
    },
    {
      q: "作成した図表をドキュメントに埋め込むには？",
      a: "SVG形式でダウンロードして画像として使用するか、Mermaidコードをコピーして対応プラットフォームに貼り付けることができます。",
    },
    {
      q: "構文エラーが表示される場合は？",
      a: "Mermaidの構文ルールに従っているか確認してください。テンプレートを参考にしたり、公式ドキュメントを参照することをお勧めします。",
    },
    {
      q: "作成したデータは保存されますか？",
      a: "このツールはブラウザ上で動作するため、データはサーバーに送信されません。必要に応じてローカルに保存してください。",
    },
  ],
};
