import type { GridPlaygroundTranslations } from "../../../types/pages/tools/grid-playground";

export const gridPlayground: GridPlaygroundTranslations = {
  title: "CSS Gridプレイグラウンド",
  subtitle: "CSS Gridの動作を視覚的に確認・学習",
  description:
    "CSS Gridのプロパティを実際に操作しながら動作を確認できるインタラクティブなツール。グリッドレイアウトの設定を変更して、Pure CSS・Tailwind CSS・SCSSのコードを自動生成します。",
  keywords: [
    "CSS Grid",
    "Grid Layout",
    "CSS",
    "レイアウト",
    "グリッド",
    "Tailwind",
    "SCSS",
    "レスポンシブデザイン",
  ],
  copy: "コピー",
  copied: "コピーしました",
  copiedToClipboard: "がクリップボードにコピーされました",

  howToUse: {
    title: "使い方",
    steps: [
      "列数・行数を設定してグリッドの基本構造を決定",
      "ギャップ（間隔）を調整してレイアウトを微調整",
      "アイテムを追加・削除してプレビューを確認",
      "個別アイテムの配置やサイズを設定",
      "生成されたCSS・Tailwind・SCSSコードをコピー",
    ],
  },

  features: {
    title: "主な機能",
    items: [
      "リアルタイムプレビュー表示",
      "全てのCSS Gridプロパティに対応",
      "Pure CSS、Tailwind CSS、SCSSコード生成",
      "グリッドアイテムの動的追加・削除",
      "直感的なセレクトボックス操作",
      "レスポンシブ対応のプレビュー",
    ],
  },

  sections: {
    containerProperties: "グリッドコンテナプロパティ",
    itemProperties: "グリッドアイテムプロパティ",
    preview: "プレビュー",
    generatedCode: "生成されたコード",
  },

  controls: {
    columns: "列数",
    rows: "行数",
    columnGap: "列間隔 (px)",
    rowGap: "行間隔 (px)",
    addItem: "アイテム追加",
    removeItem: "アイテム削除",
    resetGrid: "リセット",
    selectedItem: "選択中のアイテム",
  },

  properties: {
    display: "Display",
    gridTemplateColumns: "Grid Template Columns",
    gridTemplateRows: "Grid Template Rows",
    gridColumnGap: "Grid Column Gap",
    gridRowGap: "Grid Row Gap",
    gap: "Gap",
    justifyContent: "Justify Content",
    alignContent: "Align Content",
    justifyItems: "Justify Items",
    alignItems: "Align Items",
    gridAutoColumns: "Grid Auto Columns",
    gridAutoRows: "Grid Auto Rows",
    gridAutoFlow: "Grid Auto Flow",
    gridColumn: "Grid Column",
    gridRow: "Grid Row",
    justifySelf: "Justify Self",
    alignSelf: "Align Self",
  },

  values: {
    display: {
      grid: "grid",
      inlineGrid: "inline-grid",
    },
    justifyContent: {
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
      spaceAround: "space-around（均等配置）",
      spaceBetween: "space-between（両端寄せ）",
      spaceEvenly: "space-evenly（等間隔配置）",
    },
    alignContent: {
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
      spaceAround: "space-around（均等配置）",
      spaceBetween: "space-between（両端寄せ）",
      spaceEvenly: "space-evenly（等間隔配置）",
    },
    justifyItems: {
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
    },
    alignItems: {
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
    },
    gridAutoFlow: {
      row: "row（行方向）",
      column: "column（列方向）",
      rowDense: "row dense（行方向・密集）",
      columnDense: "column dense（列方向・密集）",
    },
    justifySelf: {
      auto: "auto（自動）",
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
    },
    alignSelf: {
      auto: "auto（自動）",
      start: "start（開始位置寄せ）",
      end: "end（終了位置寄せ）",
      center: "center（中央寄せ）",
      stretch: "stretch（引き延ばし）",
    },
  },

  tabs: {
    pureCSS: "Pure CSS",
    tailwindCSS: "Tailwind CSS",
    scss: "SCSS",
  },

  preview: {
    title: "プレビュー",
    item: "アイテム",
  },

  faqList: [
    {
      q: "CSS Gridとは何ですか？",
      a: "CSS Gridは、2次元のレイアウトシステムで、行と列を使って要素を配置できる強力なCSSの機能です。複雑なレイアウトを簡単に作成できます。",
    },
    {
      q: "FlexboxとCSS Gridの使い分けは？",
      a: "Flexboxは1次元（行または列）のレイアウトに適しており、CSS Gridは2次元（行と列）のレイアウトに適しています。用途に応じて使い分けることが重要です。",
    },
    {
      q: "生成されたコードはそのまま使えますか？",
      a: "はい、生成されたコードはそのままWebサイトやアプリケーションで使用できます。Pure CSS、Tailwind CSS、SCSSの3つの形式から選択できます。",
    },
    {
      q: "グリッドアイテムの配置を細かく調整できますか？",
      a: "各グリッドアイテムの grid-column、grid-row プロパティを個別に設定することで、自由に配置をカスタマイズできます。",
    },
    {
      q: "レスポンシブデザインに対応していますか？",
      a: "プレビューはレスポンシブ対応していますが、実際のレスポンシブデザインの実装には、メディアクエリを使ってブレークポイントごとに異なるグリッド設定を適用する必要があります。",
    },
  ],
};
