import type { FlexboxPlaygroundTranslations } from "../../../types/pages/tools/flexbox-playground";

export const flexboxPlayground: FlexboxPlaygroundTranslations = {
  title: "Flexbox Площадка",
  subtitle: "Визуальный инструмент изучения и тестирования CSS Flexbox",
  description:
    "Интерактивный инструмент для визуального изучения и тестирования свойств CSS Flexbox. Настройте контейнер и элементы, автоматически генерируя код Pure CSS, Tailwind CSS и SCSS.",
  keywords: [
    "Flexbox",
    "CSS",
    "Макет",
    "Флексбокс",
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
      "Настройте базовые параметры Flexbox с помощью свойств контейнера",
      "Добавьте или удалите элементы для просмотра превью",
      "Настройте свойства отдельных элементов",
      "Скопируйте сгенерированный код CSS, Tailwind или SCSS",
    ],
  },

  features: {
    title: "Основные возможности",
    items: [
      "Предварительный просмотр в реальном времени",
      "Поддержка всех свойств Flexbox",
      "Генерация кода Pure CSS, Tailwind CSS и SCSS",
      "Динамическое добавление и удаление элементов",
      "Поддержка адаптивного превью",
    ],
  },

  sections: {
    containerProperties: "Свойства контейнера",
    itemProperties: "Свойства элемента",
    preview: "Предварительный просмотр",
    generatedCode: "Сгенерированный код",
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
      row: "row (горизонтально)",
      rowReverse: "row-reverse (горизонтально в обратном порядке)",
      column: "column (вертикально)",
      columnReverse: "column-reverse (вертикально в обратном порядке)",
    },
    flexWrap: {
      nowrap: "nowrap (без переноса)",
      wrap: "wrap (с переносом)",
      wrapReverse: "wrap-reverse (обратный перенос)",
    },
    justifyContent: {
      flexStart: "flex-start (выравнивание по началу)",
      flexEnd: "flex-end (выравнивание по концу)",
      center: "center (центральное выравнивание)",
      spaceBetween: "space-between (пространство между)",
      spaceAround: "space-around (пространство вокруг)",
      spaceEvenly: "space-evenly (равномерное распределение)",
    },
    alignItems: {
      stretch: "stretch (растянуть элементы)",
      flexStart: "flex-start (выравнивание по началу)",
      flexEnd: "flex-end (выравнивание по концу)",
      center: "center (центральное выравнивание)",
      baseline: "baseline (выравнивание по базовой линии)",
    },
    alignContent: {
      stretch: "stretch (растянуть содержимое)",
      flexStart: "flex-start (выравнивание по началу)",
      flexEnd: "flex-end (выравнивание по концу)",
      center: "center (центральное выравнивание)",
      spaceBetween: "space-between (пространство между)",
      spaceAround: "space-around (пространство вокруг)",
      spaceEvenly: "space-evenly (равномерное распределение)",
    },
    alignSelf: {
      auto: "auto (наследовать)",
      stretch: "stretch (растянуть элемент)",
      flexStart: "flex-start (выравнивание по началу)",
      flexEnd: "flex-end (выравнивание по концу)",
      center: "center (центральное выравнивание)",
      baseline: "baseline (выравнивание по базовой линии)",
    },
  },

  codeFormat: {
    title: "Формат кода",
    pureCss: "Чистый CSS",
    tailwindCss: "Tailwind CSS",
    scss: "SCSS",
  },

  previewControls: {
    addItem: "Добавить элемент",
    removeItem: "Удалить элемент",
    resetAll: "Сбросить все",
    selectedItem: "Выбранный элемент",
  },

  faqList: [
    {
      q: "Что такое Flexbox?",
      a: "Flexbox - это метод компоновки, введенный в CSS3. Он предоставляет гибкие возможности для размещения и выравнивания элементов внутри контейнера, что делает его идеальным для адаптивного дизайна.",
    },
    {
      q: "В чем разница между justify-content и align-items?",
      a: "justify-content управляет выравниванием по главной оси, а align-items управляет выравниванием по поперечной оси. При flex-direction: row, justify-content влияет на горизонтальное выравнивание, а align-items - на вертикальное.",
    },
    {
      q: "Что такое flex-grow, flex-shrink и flex-basis?",
      a: "flex-grow устанавливает скорость роста при заполнении доступного пространства, flex-shrink устанавливает скорость сжатия при ограниченном пространстве, а flex-basis устанавливает начальный размер. Их можно объединить, используя сокращенное свойство flex.",
    },
    {
      q: "Как использовать классы Flexbox в Tailwind CSS?",
      a: "Tailwind CSS использует утилитарные классы, такие как flex, flex-row, justify-center и items-center для реализации Flexbox макетов. Вы можете использовать имена классов, генерируемые этим инструментом, напрямую.",
    },
    {
      q: "Каковы преимущества использования Flexbox для адаптивного дизайна?",
      a: "Flexbox автоматически регулирует размещение элементов в зависимости от размера экрана. Используя flex-wrap и flex-direction, вы можете достичь оптимальных макетов для разных устройств.",
    },
  ],
};
