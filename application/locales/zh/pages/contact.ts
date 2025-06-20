import { ContactTranslations } from "@/locales/types/pages/contact";

export const contact: ContactTranslations = {
  title: "联系我们",
  subtitle: "我们很乐意听到您的意见",
  keywords: ["联系", "联系我们", "支持", "反馈", "建议", "帮助", "咨询"],
  description:
    "对USEFUL TOOLS有疑问吗？有新功能建议吗？我们欢迎所有反馈、建议和咨询。您的意见帮助我们为每个人创造更好的工具。由于这是个人项目，回复时间可能有所不同，但我们一定会回复您。",
  form: {
    name: "姓名",
    namePlaceholder: "张三",
    nameRequired: "请输入您的姓名",
    email: "电子邮箱",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "请输入您的电子邮箱",
    emailInvalid: "请输入有效的电子邮箱地址",
    message: "消息",
    messagePlaceholder: "分享您的问题、反馈或功能建议...",
    messageRequired: "请输入您的消息",
    messageMinLength: "请输入至少10个字符",
    submit: "发送消息",
    submitting: "发送中...",
    success:
      "谢谢您！您的消息已成功发送。我们可能需要一些时间回复，但我们一定会联系您。",
    error: "抱歉，发送消息时出现错误。请稍等片刻后重试。",
  },
};
