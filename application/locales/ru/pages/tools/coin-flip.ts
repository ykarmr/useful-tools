import { CoinFlipTranslations } from "@/locales/types/pages/tools/coin-flip";

export const coinFlip: CoinFlipTranslations = {
  title: "Подбрасывание Монеты",
  subTitle: "Инструмент Быстрого Принятия Решений",
  description:
    "Принимайте быстрые решения с помощью нашего интуитивного инструмента подбрасывания монет. Поддерживает несколько монет и мгновенные справедливые случайные результаты для помощи в выборе между вариантами.",
  keywords: [
    "подбросить монету",
    "орел или решка",
    "инструмент решения",
    "случайный выбор",
    "аверс или реверс",
    "принятие решений",
    "быстрое решение",
    "бинарный выбор",
    "игра удачи",
  ],
  flip: "Подбросить Монету",
  heads: "Орёл",
  tails: "Решка",
  flipping: "Подбрасываем...",
  selectCount: "Количество монет",
  coinSingular: "монета",
  coinPlural: "монет",
  result: "Результат",
  howToUse: {
    title: "Как Пользоваться",
    steps: [
      "Выберите количество монет для подбрасывания (1-10 монет)",
      "Нажмите кнопку 'Подбросить монету'",
      "Наблюдайте, как монеты вращаются и определяют результат",
      "Посмотрите результат (орёл или решка)",
    ],
    features: {
      title: "Функции",
      items: [
        "Множественное подбрасывание монет одновременно (до 10 монет)",
        "Отображение анимации в реальном времени",
        "Мгновенное отображение результата",
        "Полностью случайная генерация результатов",
      ],
    },
  },
  faqList: [
    {
      q: "Как подбросить монету?",
      a: "Нажмите кнопку 'Подбросить монету', чтобы бросить монету и увидеть результат.",
    },
    {
      q: "Как определяется результат?",
      a: "Результат определяется с помощью генератора случайных чисел. Каждый исход имеет вероятность 50%.",
    },
    {
      q: "Когда обновляется результат монеты?",
      a: "Результат обновляется каждый раз, когда вы подбрасываете монету.",
    },
    {
      q: "Сохраняется ли история подбрасываний?",
      a: "Этот инструмент не сохраняет историю. Результаты отображаются только в течение текущей сессии.",
    },
    {
      q: "Можно ли подбросить несколько монет одновременно?",
      a: "Да, вы можете выбрать количество монет для подбрасывания (1-10) перед началом.",
    },
  ],
};
