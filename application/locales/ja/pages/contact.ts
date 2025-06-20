import { ContactTranslations } from "@/locales/types/pages/contact";

export const contact: ContactTranslations = {
  title: "お問い合わせ",
  subtitle: "お気軽にご連絡ください",
  description:
    "USEFUL TOOLSについてのご質問やご意見、新機能のご提案など、どんなことでもお気軽にお聞かせください。皆様からいただくフィードバックは、より良いツール作りのために大変貴重です。個人で運営しているプロジェクトのため、お返事までお時間をいただく場合がございますが、必ずご回答いたします。",
  keywords: [
    "お問い合わせ",
    "連絡先",
    "サポート",
    "フィードバック",
    "ご意見",
    "ご提案",
    "ヘルプ",
    "問い合わせ",
  ],
  form: {
    name: "お名前",
    namePlaceholder: "山田太郎",
    nameRequired: "お名前をご入力ください",
    email: "メールアドレス",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "メールアドレスをご入力ください",
    emailInvalid: "正しいメールアドレスを入力してください",
    message: "メッセージ",
    messagePlaceholder:
      "ご質問やご意見、新機能のご提案などをお聞かせください...",
    messageRequired: "メッセージをご入力ください",
    messageMinLength: "メッセージは10文字以上でご入力ください",
    submit: "送信する",
    submitting: "送信中...",
    success:
      "ありがとうございます！メッセージが正常に送信されました。お返事まで少々お時間をいただく場合がございますが、必ずご連絡いたします。",
    error:
      "申し訳ございません。メッセージの送信中にエラーが発生しました。しばらく時間をおいてから、もう一度お試しください。",
  },
};
