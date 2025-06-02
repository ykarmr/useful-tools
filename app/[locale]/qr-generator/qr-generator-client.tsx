"use client";

import { useState } from "react";
import { QrCode, Download } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
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

  const generateQR = () => {
    if (!text.trim()) return;

    // Using QR Server API for QR code generation
    const encodedText = encodeURIComponent(text.trim());
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      description={t.qrGenerator.description}
      icon={QrCode}
    >
      {/* QR Code Display */}
      {qrCodeUrl && (
        <ToolSection>
          <ToolResult title={t.qrGenerator.result}>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={qrCodeUrl || "/placeholder.svg"}
                alt="Generated QR Code"
                className="border border-gray-200 rounded-lg shadow-sm"
                crossOrigin="anonymous"
              />
              <button
                onClick={downloadQR}
                className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Download size={16} />
                <span>{t.qrGenerator.download}</span>
              </button>
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Input Section */}
      <ToolSection>
        <div className="max-w-md mx-auto space-y-6">
          <ToolInput label={t.qrGenerator.text}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.qrGenerator.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="text-sm text-gray-500 mt-1">
              {text.length}/500 {locale === "ja" ? "文字" : "characters"}
            </div>
          </ToolInput>

          <ToolInput label={t.qrGenerator.size}>
            <select
              value={size}
              onChange={(e) => setSize(Number.parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value={150}>150x150</option>
              <option value={200}>200x200</option>
              <option value={300}>300x300</option>
              <option value={400}>400x400</option>
              <option value={500}>500x500</option>
            </select>
          </ToolInput>

          <ToolControls>
            <button
              onClick={generateQR}
              disabled={!text.trim()}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t.qrGenerator.generate}
            </button>
            {qrCodeUrl && (
              <button
                onClick={clearQR}
                className="button-secondary w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {t.common.clear}
              </button>
            )}
          </ToolControls>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
