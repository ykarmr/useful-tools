import type { GridPlaygroundTranslations } from "../../../types/pages/tools/grid-playground";

export const gridPlayground: GridPlaygroundTranslations = {
  title: "CSS Grid Playground",
  subtitle: "Visually learn and experiment with CSS Grid",
  description:
    "An interactive tool to experiment with CSS Grid properties and see the effects in real-time. Adjust grid layout settings and automatically generate Pure CSS, Tailwind CSS, and SCSS code.",
  keywords: [
    "CSS Grid",
    "Grid Layout",
    "CSS",
    "Layout",
    "Grid",
    "Tailwind",
    "SCSS",
    "Responsive Design",
  ],
  copy: "Copy",
  copied: "Copied",
  copiedToClipboard: "copied to clipboard",

  howToUse: {
    title: "How to Use",
    steps: [
      "Set the number of columns and rows to define the basic grid structure",
      "Adjust gaps (spacing) to fine-tune the layout",
      "Add or remove items to see the preview",
      "Set individual item placement and size",
      "Copy the generated CSS, Tailwind, or SCSS code",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Real-time preview display",
      "Support for all CSS Grid properties",
      "Pure CSS, Tailwind CSS, and SCSS code generation",
      "Dynamic addition and removal of grid items",
      "Intuitive select box controls",
      "Responsive preview",
    ],
  },

  sections: {
    containerProperties: "Grid Container Properties",
    itemProperties: "Grid Item Properties",
    preview: "Preview",
    generatedCode: "Generated Code",
  },

  controls: {
    columns: "Columns",
    rows: "Rows",
    columnGap: "Column Gap (px)",
    rowGap: "Row Gap (px)",
    addItem: "Add Item",
    removeItem: "Remove Item",
    resetGrid: "Reset",
    selectedItem: "Selected Item",
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
    title: "Preview",
    item: "Item",
  },

  faqList: [
    {
      q: "What is CSS Grid?",
      a: "CSS Grid is a powerful two-dimensional layout system that allows you to arrange elements using rows and columns. It's perfect for creating complex layouts with ease.",
    },
    {
      q: "When should I use CSS Grid vs Flexbox?",
      a: "Flexbox is ideal for one-dimensional layouts (row or column), while CSS Grid excels at two-dimensional layouts (rows and columns). Choose based on your layout requirements.",
    },
    {
      q: "Can I use the generated code directly?",
      a: "Yes, the generated code can be used directly in your websites or applications. You can choose from Pure CSS, Tailwind CSS, or SCSS formats.",
    },
    {
      q: "Can I fine-tune grid item positioning?",
      a: "You can customize the placement freely by setting individual grid-column and grid-row properties for each grid item.",
    },
    {
      q: "Is it responsive design compatible?",
      a: "The preview is responsive, but for actual responsive design implementation, you'll need to use media queries to apply different grid settings for different breakpoints.",
    },
  ],
};
