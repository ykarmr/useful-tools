import { ContactTranslations, PrivacyTranslations } from "../types";

export const contact: ContactTranslations = {
  title: "お問い合わせ",
  subtitle: "お気軽にご連絡ください",
  description:
    "ご質問、ご提案、フィードバックはございませんか？ぜひお聞かせください。メッセージをお送りいただければ、可能な限り迅速にご返信いたします。",
  keywords: [
    "お問い合わせ",
    "連絡先",
    "サポート",
    "カスタマーサービス",
    "フィードバック",
    "ヘルプ",
    "問い合わせ",
  ],
  form: {
    name: "お名前",
    namePlaceholder: "お名前をご入力ください",
    nameRequired: "お名前は必須です",
    email: "メールアドレス",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "メールアドレスは必須です",
    emailInvalid: "有効なメールアドレスを入力してください",
    subject: "件名",
    subjectPlaceholder: "お問い合わせの内容について",
    subjectRequired: "件名は必須です",
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
