import { ContactTranslations } from "@/locales/types/pages/contact";

export const contact: ContactTranslations = {
  title: "お問い合わせ",
  subtitle: "お気軽にご連絡ください",
  keywords: [
    "お問い合わせ",
    "連絡先",
    "サポート",
    "カスタマーサービス",
    "フィードバック",
    "ヘルプ",
    "問い合わせ",
  ],
  description:
    "ご質問、ご提案、フィードバックはございませんか？ぜひお聞かせください。メッセージをお送りいただければ、可能な限り迅速にご返信いたします。",
  form: {
    name: "お名前",
    namePlaceholder: "お名前をご入力ください",
    nameRequired: "お名前は必須です",
    email: "メールアドレス",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "メールアドレスは必須です",
    emailInvalid: "有効なメールアドレスを入力してください",
    message: "メッセージ",
    messagePlaceholder: "お問い合わせの詳細をお聞かせください...",
    messageRequired: "メッセージは必須です",
    messageMinLength: "メッセージは10文字以上で入力してください",
    submit: "メッセージを送信",
    submitting: "送信中...",
    success:
      "ありがとうございます！メッセージが正常に送信されました。近日中にご返信いたします。",
    error:
      "申し訳ございません。メッセージの送信中にエラーが発生しました。後でもう一度お試しください。",
  },
};
