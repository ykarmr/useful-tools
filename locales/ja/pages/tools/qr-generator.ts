import { QrGeneratorTranslations } from "@/locales/types/pages/tools/qr-generator";

export const qrGenerator: QrGeneratorTranslations = {
  title: "QRコード生成",
  description: "テキスト、URL、WiFiパスワードなどのQRコードを生成",
  keywords: ["QRコード", "生成", "テキスト", "URL", "WiFiパスワード", "データ"],
  text: "テキスト",
  size: "サイズ (px)",
  generate: "QRコードを生成",
  result: "QRコードの結果",
  download: "QRコードをダウンロード",
  placeholder: "QRコードを生成するテキストまたはURLを入力してください",
  faqList: [
    {
      q: "どのような情報をQRコードにできますか？",
      a: "テキスト、URL、メールアドレス、電話番号、WiFiパスワードなど、様々な情報をQRコードに変換できます。",
    },
    {
      q: "生成されたQRコードの品質はどの程度ですか？",
      a: "高品質なベクターベースのQRコードを生成するため、印刷やデジタル表示に適しています。",
    },
    {
      q: "QRコードのサイズは変更できますか？",
      a: "はい、用途に応じてQRコードのサイズを調整できます。大きいサイズは遠距離からでも読み取りやすくなります。",
    },
    {
      q: "生成したQRコードに有効期限はありますか？",
      a: "QRコード自体に有効期限はありません。ただし、URLやリンク先のコンテンツが変更される場合があります。",
    },
  ],
};
