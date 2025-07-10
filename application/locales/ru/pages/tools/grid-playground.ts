import type { GridPlaygroundTranslations } from "../../../types/pages/tools/grid-playground";

export const gridPlayground: GridPlaygroundTranslations = {
  title: "Площадка CSS Grid",
  subtitle: "Визуально изучайте и экспериментируйте с CSS Grid",
  description:
    "Интерактивный инструмент для экспериментов со свойствами CSS Grid и просмотра эффектов в реальном времени. Настраивайте параметры сетки и автоматически генерируйте код Pure CSS, Tailwind CSS и SCSS.",
  keywords: [
    "CSS Grid",
    "Grid Layout",
    "CSS",
    "Макет",
    "Сетка",
    "Tailwind",
    "SCSS",
    "Адаптивный дизайн",
  ],
  copy: "Копировать",
  copied: "Скопировано",
  copiedToClipboard: "скопировано в буфер обмена",

  howToUse: {
    title: "Как использовать",
    steps: [
      "Установите количество столбцов и строк для определения базовой структуры сетки",
      "Настройте промежутки (gaps) для тонкой настройки макета",
      "Добавляйте или удаляйте элементы для просмотра превью",
      "Настройте позицию и размер отдельных элементов",
      "Скопируйте сгенерированный код CSS, Tailwind или SCSS",
    ],
  },

  features: {
    title: "Основные функции",
    items: [
      "Предварительный просмотр в реальном времени",
      "Поддержка всех свойств CSS Grid",
      "Генерация кода Pure CSS, Tailwind CSS и SCSS",
      "Динамическое добавление и удаление элементов сетки",
      "Интуитивные элементы управления с выпадающими списками",
      "Адаптивный предварительный просмотр",
    ],
  },

  sections: {
    containerProperties: "Свойства контейнера Grid",
    itemProperties: "Свойства элементов Grid",
    preview: "Предварительный просмотр",
    generatedCode: "Сгенерированный код",
  },

  controls: {
    columns: "Столбцы",
    rows: "Строки",
    columnGap: "Промежуток между столбцами (px)",
    rowGap: "Промежуток между строками (px)",
    addItem: "Добавить элемент",
    removeItem: "Удалить элемент",
    resetGrid: "Сброс",
    selectedItem: "Выбранный элемент",
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
    title: "Предварительный просмотр",
    item: "Элемент",
  },

  faqList: [
    {
      q: "Что такое CSS Grid?",
      a: "CSS Grid — это мощная двумерная система компоновки, позволяющая размещать элементы с использованием строк и столбцов. Идеально подходит для создания сложных макетов с легкостью.",
    },
    {
      q: "Когда использовать CSS Grid против Flexbox?",
      a: "Flexbox идеален для одномерных макетов (строка или столбец), в то время как CSS Grid превосходен для двумерных макетов (строки и столбцы). Выбирайте в зависимости от требований к макету.",
    },
    {
      q: "Можно ли использовать сгенерированный код напрямую?",
      a: "Да, сгенерированный код можно использовать напрямую в ваших веб-сайтах или приложениях. Вы можете выбрать из форматов Pure CSS, Tailwind CSS или SCSS.",
    },
    {
      q: "Можно ли точно настроить позиционирование элементов сетки?",
      a: "Вы можете свободно настраивать размещение, устанавливая индивидуальные свойства grid-column и grid-row для каждого элемента сетки.",
    },
    {
      q: "Совместимо ли с адаптивным дизайном?",
      a: "Предварительный просмотр адаптивный, но для фактической реализации адаптивного дизайна вам понадобится использовать медиа-запросы для применения различных настроек сетки для разных точек останова.",
    },
  ],
};
