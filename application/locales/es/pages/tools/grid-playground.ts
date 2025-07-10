import type { GridPlaygroundTranslations } from "../../../types/pages/tools/grid-playground";

export const gridPlayground: GridPlaygroundTranslations = {
  title: "Playground de CSS Grid",
  subtitle: "Aprende y experimenta visualmente con CSS Grid",
  description:
    "Una herramienta interactiva para experimentar con las propiedades de CSS Grid y ver los efectos en tiempo real. Ajusta la configuración del layout de grid y genera automáticamente código Pure CSS, Tailwind CSS y SCSS.",
  keywords: [
    "CSS Grid",
    "Grid Layout",
    "CSS",
    "Diseño",
    "Grid",
    "Tailwind",
    "SCSS",
    "Diseño Responsivo",
  ],
  copy: "Copiar",
  copied: "Copiado",
  copiedToClipboard: "copiado al portapapeles",

  howToUse: {
    title: "Cómo usar",
    steps: [
      "Establece el número de columnas y filas para definir la estructura básica del grid",
      "Ajusta los espacios (gaps) para afinar el diseño",
      "Añade o elimina elementos para ver la vista previa",
      "Configura la posición y tamaño de elementos individuales",
      "Copia el código CSS, Tailwind o SCSS generado",
    ],
  },

  features: {
    title: "Características principales",
    items: [
      "Vista previa en tiempo real",
      "Soporte para todas las propiedades de CSS Grid",
      "Generación de código Pure CSS, Tailwind CSS y SCSS",
      "Adición y eliminación dinámica de elementos del grid",
      "Controles intuitivos con cajas de selección",
      "Vista previa responsiva",
    ],
  },

  sections: {
    containerProperties: "Propiedades del Contenedor Grid",
    itemProperties: "Propiedades de Elementos Grid",
    preview: "Vista Previa",
    generatedCode: "Código Generado",
  },

  controls: {
    columns: "Columnas",
    rows: "Filas",
    columnGap: "Espacio entre Columnas (px)",
    rowGap: "Espacio entre Filas (px)",
    addItem: "Añadir Elemento",
    removeItem: "Eliminar Elemento",
    resetGrid: "Reiniciar",
    selectedItem: "Elemento Seleccionado",
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
    title: "Vista Previa",
    item: "Elemento",
  },

  faqList: [
    {
      q: "¿Qué es CSS Grid?",
      a: "CSS Grid es un potente sistema de diseño bidimensional que permite organizar elementos usando filas y columnas. Es perfecto para crear diseños complejos con facilidad.",
    },
    {
      q: "¿Cuándo debo usar CSS Grid vs Flexbox?",
      a: "Flexbox es ideal para diseños unidimensionales (fila o columna), mientras que CSS Grid destaca en diseños bidimensionales (filas y columnas). Elige según tus necesidades de diseño.",
    },
    {
      q: "¿Puedo usar el código generado directamente?",
      a: "Sí, el código generado se puede usar directamente en tus sitios web o aplicaciones. Puedes elegir entre formatos Pure CSS, Tailwind CSS o SCSS.",
    },
    {
      q: "¿Puedo ajustar finamente la posición de los elementos del grid?",
      a: "Puedes personalizar la colocación libremente estableciendo propiedades individuales de grid-column y grid-row para cada elemento del grid.",
    },
    {
      q: "¿Es compatible con diseño responsivo?",
      a: "La vista previa es responsiva, pero para la implementación real de diseño responsivo, necesitarás usar media queries para aplicar diferentes configuraciones de grid para diferentes breakpoints.",
    },
  ],
};
