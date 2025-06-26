"use client";

import { useState } from "react";
import { Link, ArrowUpDown, Trash2, Copy } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface URLEncoderClientProps {
  locale: Locale;
  t: Translations;
}

export default function URLEncoderClient({ locale, t }: URLEncoderClientProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const switchEncode = () => {
    setMode("encode");
    setInput("");
    setOutput("");
  };

  const switchDecode = () => {
    setMode("decode");
    setInput("");
    setOutput("");
  };

  const switchMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(value));
      } else {
        setOutput(decodeURIComponent(value));
      }
    } catch (error) {
      setOutput(t.urlEncoder?.invalidInput || "Error: Invalid input");
    }
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.urlEncoder.title}
      subtitle={t.urlEncoder.subtitle}
      description={t.urlEncoder.description}
      icon={Link}
    >
      {/* How to Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.urlEncoder.howToUse.title}
          steps={t.urlEncoder.howToUse.steps}
          features={{
            title: t.urlEncoder.features.title,
            items: t.urlEncoder.features.items,
          }}
        />
      </ToolSection>

      {/* Mode Selection */}
      <ToolSection>
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-1.5 flex shadow-sm border border-blue-100">
            <button
              onClick={switchEncode}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                mode === "encode"
                  ? "bg-white text-blue-700 shadow-md transform scale-105"
                  : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              }`}
            >
              🔐 {t.urlEncoder.encode}
            </button>
            <button
              onClick={switchDecode}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                mode === "decode"
                  ? "bg-white text-blue-700 shadow-md transform scale-105"
                  : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              }`}
            >
              🔓 {t.urlEncoder.decode}
            </button>
          </div>
        </div>
      </ToolSection>

      {/* Input Section */}
      <ToolSection>
        <ToolInput
          label={
            mode === "encode"
              ? t.urlEncoder.originalUrl
              : t.urlEncoder.encodedUrl
          }
        >
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === "encode"
                  ? t.urlEncoder.enterUrl
                  : t.urlEncoder.enterEncodedUrl
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all duration-200 text-sm"
              rows={4}
            />
            {input && (
              <button
                onClick={() => {
                  setInput("");
                  setOutput("");
                }}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title={t.common.clear}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </ToolInput>
      </ToolSection>

      {/* Output Section */}
      {output && (
        <ToolSection>
          <ToolResult
            copyable
            copyText={output}
            title={
              mode === "encode"
                ? t.urlEncoder.encodedUrl
                : t.urlEncoder.decodedUrl
            }
          >
            <div className="relative">
              <div className="font-mono text-sm break-all text-gray-900 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                {output}
              </div>
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={switchMode}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ArrowUpDown size={16} />
            <span>{t.urlEncoder.switch}</span>
          </button>
          {(input || output) && (
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 size={16} />
              <span>{t.common.clear}</span>
            </button>
          )}
        </ToolControls>
      </ToolSection>

      {/* Examples */}
      <ToolSection title={t.urlEncoder?.examples || "Examples"}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="font-semibold text-blue-800 mb-2 flex items-center">
                📝 {t.urlEncoder?.encodingExample || "Encoding example:"}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 min-w-0">
                    {t.urlEncoder?.inputLabel || "Input:"}
                  </span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all">
                    https://example.com/search?q=hello world&lang=ja
                  </code>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 min-w-0">
                    {t.urlEncoder?.outputLabel || "Output:"}
                  </span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all">
                    https%3A//example.com/search%3Fq%3Dhello%20world%26lang%3Dja
                  </code>
                </div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="font-semibold text-blue-800 mb-2 flex items-center">
                🔤 {t.urlEncoder?.specialCharacters || "Special characters:"}
              </div>
              <div className="text-sm text-gray-700 font-mono">
                {t.urlEncoder?.spaceToPercent ||
                  "Space → %20, & → %26, = → %3D, ? → %3F"}
              </div>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.urlEncoder.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
