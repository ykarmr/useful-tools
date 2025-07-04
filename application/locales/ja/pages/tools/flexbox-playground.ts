import type { FlexboxPlaygroundTranslations } from "../../../types/pages/tools/flexbox-playground";

export const flexboxPlayground: FlexboxPlaygroundTranslations = {
  title: "Flexboxプレイグラウンド",
  subtitle: "CSS Flexboxの動作を視覚的に確認・学習",
  description:
    "CSS Flexboxのプロパティを実際に操作しながら動作を確認できるインタラクティブなツール。コンテナとアイテムの設定を変更して、Pure CSS・Tailwind CSS・SCSSのコードを自動生成します。",
  keywords: [
    "Flexbox",
    "CSS",
    "レイアウト",
    "フレックスボックス",
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
      "コンテナプロパティでFlexboxの基本設定を調整",
      "アイテムを追加・削除してプレビューを確認",
      "個別アイテムのプロパティを設定",
      "生成されたCSS・Tailwind・SCSSコードをコピー",
    ],
  },

  features: {
    title: "主な機能",
    items: [
      "リアルタイムプレビュー表示",
      "全てのFlexboxプロパティに対応",
      "Pure CSS、Tailwind CSS、SCSSコード生成",
      "アイテムの動的追加・削除",
      "レスポンシブ対応のプレビュー",
    ],
  },

  sections: {
    containerProperties: "コンテナプロパティ",
    itemProperties: "アイテムプロパティ",
    preview: "プレビュー",
    generatedCode: "生成されたコード",
  },

  properties: {
    display: "Display",
    flexDirection: "Flex Direction",
    flexWrap: "Flex Wrap",
    justifyContent: "Justify Content",
    alignItems: "Align Items",
    alignContent: "Align Content",
    gap: "Gap",
    flexGrow: "Flex Grow",
    flexShrink: "Flex Shrink",
    flexBasis: "Flex Basis",
    alignSelf: "Align Self",
    order: "Order",
  },

  values: {
    display: {
      flex: "flex",
      inlineFlex: "inline-flex",
    },
    flexDirection: {
      row: "row（横並び）",
      rowReverse: "row-reverse（横並び逆順）",
      column: "column（縦並び）",
      columnReverse: "column-reverse（縦並び逆順）",
    },
    flexWrap: {
      nowrap: "nowrap（折り返しなし）",
      wrap: "wrap（折り返しあり）",
      wrapReverse: "wrap-reverse（折り返し逆順）",
    },
    justifyContent: {
      flexStart: "flex-start（開始位置寄せ）",
      flexEnd: "flex-end（終了位置寄せ）",
      center: "center（中央寄せ）",
      spaceBetween: "space-between（両端寄せ）",
      spaceAround: "space-around（均等配置）",
      spaceEvenly: "space-evenly（等間隔配置）",
    },
    alignItems: {
      stretch: "stretch（引き延ばし）",
      flexStart: "flex-start（開始位置寄せ）",
      flexEnd: "flex-end（終了位置寄せ）",
      center: "center（中央寄せ）",
      baseline: "baseline（ベースライン揃え）",
    },
    alignContent: {
      stretch: "stretch（引き延ばし）",
      flexStart: "flex-start（開始位置寄せ）",
      flexEnd: "flex-end（終了位置寄せ）",
      center: "center（中央寄せ）",
      spaceBetween: "space-between（両端寄せ）",
      spaceAround: "space-around（均等配置）",
      spaceEvenly: "space-evenly（等間隔配置）",
    },
    alignSelf: {
      auto: "auto（継承）",
      stretch: "stretch（引き延ばし）",
      flexStart: "flex-start（開始位置寄せ）",
      flexEnd: "flex-end（終了位置寄せ）",
      center: "center（中央寄せ）",
      baseline: "baseline（ベースライン揃え）",
    },
  },

  codeFormat: {
    title: "コード形式",
    pureCss: "Pure CSS",
    tailwindCss: "Tailwind CSS",
    scss: "SCSS",
  },

  previewControls: {
    addItem: "アイテム追加",
    removeItem: "アイテム削除",
    resetAll: "すべてリセット",
    selectedItem: "選択中のアイテム",
  },

  faqList: [
    {
      q: "Flexboxとは何ですか？",
      a: "Flexboxは、CSS3で導入されたレイアウト手法の一つです。コンテナ内のアイテムを柔軟に配置・整列できる機能を提供し、レスポンシブデザインに適しています。",
    },
    {
      q: "justify-contentとalign-itemsの違いは何ですか？",
      a: "justify-contentは主軸（メイン軸）方向の配置を制御し、align-itemsは交差軸（クロス軸）方向の配置を制御します。flex-direction: rowの場合、justify-contentは水平方向、align-itemsは垂直方向になります。",
    },
    {
      q: "flex-grow、flex-shrink、flex-basisとは何ですか？",
      a: "flex-growは余白を埋める際の伸び率、flex-shrinkは空間不足時の縮み率、flex-basisは初期サイズを指定します。これらを組み合わせてflexプロパティとして記述することも可能です。",
    },
    {
      q: "TailwindCSSのFlexboxクラスはどのように使いますか？",
      a: "TailwindCSSでは、flex、flex-row、justify-center、items-centerなどのユーティリティクラスを使用してFlexboxレイアウトを実装できます。このツールで生成されたクラス名をそのまま使用できます。",
    },
    {
      q: "レスポンシブデザインでFlexboxを使う利点は何ですか？",
      a: "Flexboxは画面サイズに応じてアイテムが自動的に配置され、flex-wrapやflex-directionを活用することで、デバイスに最適なレイアウトを実現できます。",
    },
  ],
};
