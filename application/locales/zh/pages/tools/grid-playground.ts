import type { GridPlaygroundTranslations } from "../../../types/pages/tools/grid-playground";

export const gridPlayground: GridPlaygroundTranslations = {
  title: "CSS Grid 游乐场",
  subtitle: "可视化学习和实验CSS Grid",
  description:
    "一个交互式工具，可以实验CSS Grid属性并实时查看效果。调整网格布局设置并自动生成Pure CSS、Tailwind CSS和SCSS代码。",
  keywords: [
    "CSS Grid",
    "Grid Layout",
    "CSS",
    "布局",
    "网格",
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
      "设置列数和行数以定义基本网格结构",
      "调整间隙以微调布局",
      "添加或删除项目以查看预览",
      "设置单个项目的位置和大小",
      "复制生成的CSS、Tailwind或SCSS代码",
    ],
  },

  features: {
    title: "主要功能",
    items: [
      "实时预览显示",
      "支持所有CSS Grid属性",
      "Pure CSS、Tailwind CSS和SCSS代码生成",
      "动态添加和删除网格项目",
      "直观的选择框控件",
      "响应式预览",
    ],
  },

  sections: {
    containerProperties: "网格容器属性",
    itemProperties: "网格项目属性",
    preview: "预览",
    generatedCode: "生成的代码",
  },

  controls: {
    columns: "列数",
    rows: "行数",
    columnGap: "列间距 (px)",
    rowGap: "行间距 (px)",
    addItem: "添加项目",
    removeItem: "删除项目",
    resetGrid: "重置",
    selectedItem: "选中的项目",
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
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
      spaceAround: "space-around",
      spaceBetween: "space-between",
      spaceEvenly: "space-evenly",
    },
    alignContent: {
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
      spaceAround: "space-around",
      spaceBetween: "space-between",
      spaceEvenly: "space-evenly",
    },
    justifyItems: {
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
    },
    alignItems: {
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
    },
    gridAutoFlow: {
      row: "row",
      column: "column",
      rowDense: "row dense",
      columnDense: "column dense",
    },
    justifySelf: {
      auto: "auto",
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
    },
    alignSelf: {
      auto: "auto",
      start: "start",
      end: "end",
      center: "center",
      stretch: "stretch",
    },
  },

  tabs: {
    pureCSS: "Pure CSS",
    tailwindCSS: "Tailwind CSS",
    scss: "SCSS",
  },

  preview: {
    title: "预览",
    item: "项目",
  },

  faqList: [
    {
      q: "什么是CSS Grid？",
      a: "CSS Grid是一个强大的二维布局系统，允许您使用行和列来排列元素。它非常适合轻松创建复杂的布局。",
    },
    {
      q: "何时使用CSS Grid vs Flexbox？",
      a: "Flexbox适用于一维布局（行或列），而CSS Grid擅长二维布局（行和列）。根据您的布局需求进行选择。",
    },
    {
      q: "生成的代码可以直接使用吗？",
      a: "是的，生成的代码可以直接在您的网站或应用程序中使用。您可以选择Pure CSS、Tailwind CSS或SCSS格式。",
    },
    {
      q: "可以精细调整网格项目的位置吗？",
      a: "您可以通过为每个网格项目设置单独的grid-column和grid-row属性来自由自定义放置。",
    },
    {
      q: "是否与响应式设计兼容？",
      a: "预览是响应式的，但对于实际的响应式设计实现，您需要使用媒体查询为不同的断点应用不同的网格设置。",
    },
  ],
};
