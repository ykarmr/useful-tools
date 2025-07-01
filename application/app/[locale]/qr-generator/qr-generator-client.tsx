"use client";

import { useState } from "react";
import { QrCode, Download, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import ToolFaq from "@/components/layout/tool-faq";
import { Locale, Translations } from "@/locales";

interface QRGeneratorClientProps {
  locale: Locale;
  t: Translations;
}

export default function QRGeneratorClient({
  locale,
  t,
}: QRGeneratorClientProps) {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateQR = () => {
    if (!text.trim()) return;

    // Using QR Server API for QR code generation
    const encodedText = encodeURIComponent(text.trim());
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const downloadQR = async () => {
    if (!qrCodeUrl) return;

    try {
      // 画像をfetchして、Canvasを使ってダウンロード可能な形式に変換
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();

      // Blobから画像を作成
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // Canvasを作成して画像を描画
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = size;
          canvas.height = size;

          // 白い背景を設定
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, size, size);

          // QRコード画像を描画
          ctx.drawImage(img, 0, 0, size, size);

          // Canvasからダウンロード
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `qrcode-${size}x${size}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, "image/png");
        }
      };

      img.src = URL.createObjectURL(blob);
    } catch (error) {
      console.error("ダウンロードに失敗しました:", error);
      // フォールバック: 直接ダウンロードを試行
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `qrcode-${size}x${size}.png`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyUrl = async () => {
    if (!qrCodeUrl) return;

    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const clearQR = () => {
    setText("");
    setQrCodeUrl("");
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.qrGenerator.title}
      subtitle={t.qrGenerator.subtitle}
      description={t.qrGenerator.description}
      icon={QrCode}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.qrGenerator.howToUse.title}
          steps={t.qrGenerator.howToUse.steps}
          features={{
            title: t.qrGenerator.features.title,
            items: t.qrGenerator.features.items,
          }}
        />
      </ToolSection>

      {/* レスポンシブレイアウト：モバイルは縦積み、PCは2カラム */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Left Column: Input Section */}
        <div className="lg:order-1">
          <ToolSection>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8 border border-blue-200 shadow-lg">
              <div className="space-y-6">
                <ToolInput label={t.qrGenerator.text}>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t.qrGenerator.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-colors"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-500">
                      {text.length}/500{" "}
                      {locale === "ja" ? "文字" : "characters"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {locale === "ja"
                        ? "テキスト、URL、連絡先情報など"
                        : "Text, URLs, contact info, etc."}
                    </div>
                  </div>
                </ToolInput>

                <ToolInput label={t.qrGenerator.size}>
                  <select
                    value={size}
                    onChange={(e) => setSize(Number.parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value={150}>150x150 px</option>
                    <option value={200}>200x200 px</option>
                    <option value={300}>300x300 px</option>
                    <option value={400}>400x400 px</option>
                    <option value={500}>500x500 px</option>
                  </select>
                </ToolInput>

                <ToolControls>
                  <button
                    onClick={generateQR}
                    disabled={!text.trim()}
                    className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <QrCode size={20} />
                    <span>{t.qrGenerator.generate}</span>
                  </button>
                  {qrCodeUrl && (
                    <button
                      onClick={clearQR}
                      className="button-secondary w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                      {t.common.clear}
                    </button>
                  )}
                </ToolControls>
              </div>
            </div>
          </ToolSection>
        </div>

        {/* Right Column: QR Code Display */}
        <div className="lg:order-2">
          {qrCodeUrl ? (
            <ToolSection>
              <ToolResult title={t.qrGenerator.result}>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-lg">
                  <div className="flex flex-col items-center space-y-6">
                    {/* QR Code Image */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        className="border-2 border-white rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        crossOrigin="anonymous"
                        style={{
                          width: Math.min(size, 300),
                          height: Math.min(size, 300),
                        }}
                      />
                    </div>

                    {/* QR Code Info */}
                    <div className="text-center space-y-2">
                      <div className="text-sm font-medium text-gray-700">
                        {locale === "ja"
                          ? `サイズ: ${size}x${size}px`
                          : `Size: ${size}x${size}px`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {locale === "ja"
                          ? "PNG形式でダウンロード可能"
                          : "Available for PNG download"}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={downloadQR}
                        className="button-primary flex-1 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                      >
                        <Download size={16} />
                        <span>{t.qrGenerator.download}</span>
                      </button>
                      <button
                        onClick={copyUrl}
                        className="button-secondary flex-1 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                      >
                        {copied ? (
                          <>
                            <Check size={16} className="text-green-600" />
                            <span className="text-green-600">
                              {locale === "ja" ? "コピー済み" : "Copied"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>
                              {locale === "ja" ? "URLをコピー" : "Copy URL"}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </ToolResult>
            </ToolSection>
          ) : (
            <ToolSection>
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-lg">
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                    <QrCode size={32} className="text-gray-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium text-gray-700">
                      {locale === "ja"
                        ? "QRコードを生成してください"
                        : "Generate your QR code"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {locale === "ja"
                        ? "テキストを入力して「QRコードを生成」ボタンをクリックしてください"
                        : "Enter text and click 'Generate QR Code' button"}
                    </p>
                  </div>
                </div>
              </div>
            </ToolSection>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.qrGenerator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
