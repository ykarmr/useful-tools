import type { FlexboxPlaygroundTranslations } from "../../../types/pages/tools/flexbox-playground";

export const flexboxPlayground: FlexboxPlaygroundTranslations = {
  title: "Flexbox 游乐场",
  subtitle: "CSS Flexbox 可视化学习和测试工具",
  description:
    "一个交互式工具，用于可视化学习和测试 CSS Flexbox 属性。调整容器和项目设置，同时自动生成 Pure CSS、Tailwind CSS 和 SCSS 代码。",
  keywords: [
    "Flexbox",
    "CSS",
    "布局",
    "弹性盒子",
    "Tailwind",
    "SCSS",
    "响应式设计",
  ],
  copy: "复制",
  copied: "已复制",
  copiedToClipboard: "已复制到剪贴板",
  howToUse: {
    title: "使用方法",
    steps: [
      "使用容器属性调整 Flexbox 基本设置",
      "添加或删除项目来查看预览",
      "设置单个项目的属性",
      "复制生成的 CSS、Tailwind 或 SCSS 代码",
    ],
  },

  features: {
    title: "主要功能",
    items: [
      "实时预览显示",
      "支持所有 Flexbox 属性",
      "生成 Pure CSS、Tailwind CSS 和 SCSS 代码",
      "动态添加和删除项目",
      "响应式预览支持",
    ],
  },

  sections: {
    containerProperties: "容器属性",
    itemProperties: "项目属性",
    preview: "预览",
    generatedCode: "生成的代码",
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
      row: "row（水平排列）",
      rowReverse: "row-reverse（水平反向排列）",
      column: "column（垂直排列）",
      columnReverse: "column-reverse（垂直反向排列）",
    },
    flexWrap: {
      nowrap: "nowrap（不换行）",
      wrap: "wrap（允许换行）",
      wrapReverse: "wrap-reverse（反向换行）",
    },
    justifyContent: {
      flexStart: "flex-start（起始对齐）",
      flexEnd: "flex-end（结束对齐）",
      center: "center（居中对齐）",
      spaceBetween: "space-between（两端对齐）",
      spaceAround: "space-around（周围对齐）",
      spaceEvenly: "space-evenly（均匀分布）",
    },
    alignItems: {
      stretch: "stretch（拉伸项目）",
      flexStart: "flex-start（起始对齐）",
      flexEnd: "flex-end（结束对齐）",
      center: "center（居中对齐）",
      baseline: "baseline（基线对齐）",
    },
    alignContent: {
      stretch: "stretch（拉伸内容）",
      flexStart: "flex-start（起始对齐）",
      flexEnd: "flex-end（结束对齐）",
      center: "center（居中对齐）",
      spaceBetween: "space-between（两端对齐）",
      spaceAround: "space-around（周围对齐）",
      spaceEvenly: "space-evenly（均匀分布）",
    },
    alignSelf: {
      auto: "auto（继承）",
      stretch: "stretch（拉伸项目）",
      flexStart: "flex-start（起始对齐）",
      flexEnd: "flex-end（结束对齐）",
      center: "center（居中对齐）",
      baseline: "baseline（基线对齐）",
    },
  },

  codeFormat: {
    title: "代码格式",
    pureCss: "Pure CSS",
    tailwindCss: "Tailwind CSS",
    scss: "SCSS",
  },

  previewControls: {
    addItem: "添加项目",
    removeItem: "删除项目",
    resetAll: "重置所有",
    selectedItem: "选中的项目",
  },

  faqList: [
    {
      q: "什么是 Flexbox？",
      a: "Flexbox 是 CSS3 中引入的一种布局方法。它提供了在容器内灵活排列和对齐项目的功能，非常适合响应式设计。",
    },
    {
      q: "justify-content 和 align-items 有什么区别？",
      a: "justify-content 控制主轴方向的对齐，而 align-items 控制交叉轴方向的对齐。当 flex-direction: row 时，justify-content 影响水平对齐，align-items 影响垂直对齐。",
    },
    {
      q: "flex-grow、flex-shrink 和 flex-basis 是什么？",
      a: "flex-grow 设置填充可用空间时的增长率，flex-shrink 设置空间不足时的收缩率，flex-basis 设置初始大小。这些可以使用 flex 简写属性组合使用。",
    },
    {
      q: "如何使用 Tailwind CSS 的 Flexbox 类？",
      a: "Tailwind CSS 使用实用程序类，如 flex、flex-row、justify-center 和 items-center 来实现 Flexbox 布局。您可以直接使用此工具生成的类名。",
    },
    {
      q: "在响应式设计中使用 Flexbox 的好处是什么？",
      a: "Flexbox 根据屏幕大小自动调整项目位置。使用 flex-wrap 和 flex-direction，您可以为不同设备实现最佳布局。",
    },
  ],
};
