import { ContactTranslations } from "@/locales/types/pages/contact";

export const contact: ContactTranslations = {
  title: "Связаться с нами",
  subtitle: "Мы будем рады услышать ваше мнение",
  description:
    "Есть вопросы о USEFUL TOOLS? Идеи для новых функций? Мы приветствуем все отзывы, предложения и запросы. Ваше мнение помогает нам создавать лучшие инструменты для всех. Поскольку это личный проект, время ответа может варьироваться, но мы обязательно свяжемся с вами.",
  keywords: [
    "контакты",
    "связаться",
    "поддержка",
    "обратная связь",
    "предложения",
    "помощь",
    "запрос",
  ],
  form: {
    name: "Имя",
    namePlaceholder: "Иван Иванов",
    nameRequired: "Пожалуйста, введите ваше имя",
    email: "Электронная почта",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "Пожалуйста, введите адрес электронной почты",
    emailInvalid: "Пожалуйста, введите действительный адрес электронной почты",
    message: "Сообщение",
    messagePlaceholder:
      "Поделитесь своими вопросами, отзывами или предложениями...",
    messageRequired: "Пожалуйста, введите ваше сообщение",
    messageMinLength: "Пожалуйста, введите не менее 10 символов",
    submit: "Отправить сообщение",
    submitting: "Отправка...",
    success:
      "Спасибо! Ваше сообщение успешно отправлено. Ответ может занять некоторое время, но мы обязательно свяжемся с вами.",
    error:
      "Извините, произошла ошибка при отправке сообщения. Пожалуйста, подождите немного и попробуйте снова.",
  },
};
