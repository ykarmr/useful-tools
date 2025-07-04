import type { FlexboxPlaygroundTranslations } from "../../../types/pages/tools/flexbox-playground";

export const flexboxPlayground: FlexboxPlaygroundTranslations = {
  title: "Flexbox Playground",
  subtitle: "Herramienta Visual de Aprendizaje y Prueba de CSS Flexbox",
  description:
    "Una herramienta interactiva para aprender y probar visualmente las propiedades de CSS Flexbox. Ajusta la configuración del contenedor y elementos mientras generas código CSS puro, Tailwind CSS y SCSS automáticamente.",
  keywords: [
    "Flexbox",
    "CSS",
    "Diseño",
    "Flexbox",
    "Tailwind",
    "SCSS",
    "Diseño Responsivo",
  ],

  copy: "Copiar",
  copied: "Copiado",
  copiedToClipboard: "copiado al portapapeles",
  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Ajusta la configuración básica de Flexbox con las propiedades del contenedor",
      "Añade o elimina elementos para ver la vista previa",
      "Configura las propiedades de elementos individuales",
      "Copia el código CSS, Tailwind o SCSS generado",
    ],
  },

  features: {
    title: "Características Principales",
    items: [
      "Vista previa en tiempo real",
      "Soporte para todas las propiedades de Flexbox",
      "Generación de código CSS puro, Tailwind CSS y SCSS",
      "Adición y eliminación dinámica de elementos",
      "Soporte de vista previa responsiva",
    ],
  },

  sections: {
    containerProperties: "Propiedades del Contenedor",
    itemProperties: "Propiedades del Elemento",
    preview: "Vista Previa",
    generatedCode: "Código Generado",
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
      row: "row (horizontal)",
      rowReverse: "row-reverse (horizontal inverso)",
      column: "column (vertical)",
      columnReverse: "column-reverse (vertical inverso)",
    },
    flexWrap: {
      nowrap: "nowrap (sin ajuste)",
      wrap: "wrap (con ajuste)",
      wrapReverse: "wrap-reverse (ajuste inverso)",
    },
    justifyContent: {
      flexStart: "flex-start (alineación al inicio)",
      flexEnd: "flex-end (alineación al final)",
      center: "center (alineación central)",
      spaceBetween: "space-between (espacio entre)",
      spaceAround: "space-around (espacio alrededor)",
      spaceEvenly: "space-evenly (espaciado uniforme)",
    },
    alignItems: {
      stretch: "stretch (estirar elementos)",
      flexStart: "flex-start (alineación al inicio)",
      flexEnd: "flex-end (alineación al final)",
      center: "center (alineación central)",
      baseline: "baseline (alineación por línea base)",
    },
    alignContent: {
      stretch: "stretch (estirar contenido)",
      flexStart: "flex-start (alineación al inicio)",
      flexEnd: "flex-end (alineación al final)",
      center: "center (alineación central)",
      spaceBetween: "space-between (espacio entre)",
      spaceAround: "space-around (espacio alrededor)",
      spaceEvenly: "space-evenly (espaciado uniforme)",
    },
    alignSelf: {
      auto: "auto (heredar)",
      stretch: "stretch (estirar elemento)",
      flexStart: "flex-start (alineación al inicio)",
      flexEnd: "flex-end (alineación al final)",
      center: "center (alineación central)",
      baseline: "baseline (alineación por línea base)",
    },
  },

  codeFormat: {
    title: "Formato de Código",
    pureCss: "CSS Puro",
    tailwindCss: "Tailwind CSS",
    scss: "SCSS",
  },

  previewControls: {
    addItem: "Añadir Elemento",
    removeItem: "Eliminar Elemento",
    resetAll: "Restablecer Todo",
    selectedItem: "Elemento Seleccionado",
  },

  faqList: [
    {
      q: "¿Qué es Flexbox?",
      a: "Flexbox es un método de diseño introducido en CSS3. Proporciona características flexibles para organizar y alinear elementos dentro de un contenedor, siendo ideal para el diseño responsivo.",
    },
    {
      q: "¿Cuál es la diferencia entre justify-content y align-items?",
      a: "justify-content controla la alineación a lo largo del eje principal, mientras que align-items controla la alineación a lo largo del eje transversal. Con flex-direction: row, justify-content afecta la alineación horizontal y align-items afecta la alineación vertical.",
    },
    {
      q: "¿Qué son flex-grow, flex-shrink y flex-basis?",
      a: "flex-grow establece la tasa de crecimiento al llenar el espacio disponible, flex-shrink establece la tasa de reducción cuando el espacio es limitado, y flex-basis establece el tamaño inicial. Estos pueden combinarse usando la propiedad abreviada flex.",
    },
    {
      q: "¿Cómo uso las clases de Flexbox de Tailwind CSS?",
      a: "Tailwind CSS usa clases utilitarias como flex, flex-row, justify-center e items-center para implementar diseños Flexbox. Puedes usar los nombres de clase generados por esta herramienta directamente.",
    },
    {
      q: "¿Cuáles son los beneficios de usar Flexbox para el diseño responsivo?",
      a: "Flexbox ajusta automáticamente la colocación de elementos según el tamaño de pantalla. Usando flex-wrap y flex-direction, puedes lograr diseños óptimos para diferentes dispositivos.",
    },
  ],
};
