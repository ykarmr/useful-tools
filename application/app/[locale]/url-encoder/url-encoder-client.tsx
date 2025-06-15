"use client";

import { useState } from "react";
import { Link, ArrowUpDown } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
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
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(value.trim()));
      } else {
        setOutput(decodeURIComponent(value.trim()));
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
      description={t.urlEncoder.description}
      icon={Link}
    >
      {/* Mode Selection */}
      <ToolSection>
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={switchEncode}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                mode === "encode"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.urlEncoder.encode}
            </button>
            <button
              onClick={switchDecode}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                mode === "decode"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.urlEncoder.decode}
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
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              mode === "encode"
                ? t.urlEncoder.enterUrl
                : t.urlEncoder.enterEncodedUrl
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            rows={4}
          />
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
            <div className="font-mono text-sm break-all text-gray-900 bg-gray-50 p-4 rounded-lg">
              {output}
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={switchMode}
            className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ArrowUpDown size={16} />
            <span>{t.urlEncoder.switch}</span>
          </button>
          {(input || output) && (
            <button
              onClick={clearAll}
              className="button-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t.common.clear}
            </button>
          )}
        </ToolControls>
      </ToolSection>

      {/* Examples */}
      <ToolSection title={t.urlEncoder?.examples || "Examples"}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3 text-sm whitespace-pre-wrap break-all">
            <div>
              <div className="font-medium text-gray-700 mb-1">
                {t.urlEncoder?.encodingExample || "Encoding example:"}
              </div>
              <div className="text-gray-600">
                <div className="mb-1">
                  {t.urlEncoder?.inputLabel || "Input:"}{" "}
                  https://example.com/search?q=hello world
                </div>
                <div>
                  {t.urlEncoder?.outputLabel || "Output:"}{" "}
                  https%3A//example.com/search%3Fq%3Dhello%20world
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">
                {t.urlEncoder?.specialCharacters || "Special characters:"}
              </div>
              <div className="text-gray-600">
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
