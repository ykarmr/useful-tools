import { QrGeneratorTranslations } from "../types/pages/tools/qr-generator";

export const qrGenerator: QrGeneratorTranslations = {
  title: "二维码生成器",
  description: "生成自定义二维码",
  keywords: ["二维码", "生成器", "文本", "URL", "WiFi密码", "数据"],
  text: "文本",
  size: "大小 (px)",
  generate: "生成二维码",
  result: "二维码结果",
  download: "下载二维码",
  placeholder: "输入文本或URL以生成二维码",
  faqList: [
    {
      q: "二维码可以编码什么信息？",
      a: "可以编码文本、URL、电子邮件地址、电话号码、WiFi密码等各种类型的信息。",
    },
    {
      q: "生成的二维码质量如何？",
      a: "我们生成高质量的矢量二维码，适合打印和数字显示。",
    },
    {
      q: "可以更改二维码大小吗？",
      a: "是的，您可以根据需要调整二维码大小。较大的尺寸更容易从远距离扫描。",
    },
    {
      q: "生成的二维码有有效期吗？",
      a: "二维码本身不会过期。但是，它们指向的内容（如URL）可能会更改或变得不可用。",
    },
  ],
};
