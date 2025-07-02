"use client";

import { useState } from "react";
import { Type } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface RandomStringClientProps {
  locale: Locale;
  t: Translations;
}

export default function RandomStringClient({
  locale,
  t,
}: RandomStringClientProps) {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [result, setResult] = useState<string>("");

  const generateString = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResult(result);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.randomString.title}
      subtitle={t.randomString.subTitle}
      description={t.randomString.description}
      icon={Type}
    >
      {/* How To Use Section */}
      <ToolSection>
        <ToolHowToUse
          title={t.randomString.howToUse.title}
          steps={t.randomString.howToUse.steps}
          features={{
            title: t.randomString.features.title,
            items: t.randomString.features.items,
          }}
        />
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <div className=" mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Length Control */}
              <ToolInput label={t.randomString.length}>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        ((length - 4) / 46) * 100
                      }%, #e5e7eb ${((length - 4) / 46) * 100}%, #e5e7eb 100%)`,
                    }}
                    aria-describedby="length-display"
                  />
                  <div
                    id="length-display"
                    className="text-center py-2 px-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl font-bold text-blue-600">
                      {length}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      {locale === "ja"
                        ? "文字"
                        : locale === "zh"
                        ? "字符"
                        : locale === "ru"
                        ? "символов"
                        : locale === "es"
                        ? "caracteres"
                        : "characters"}
                    </span>
                  </div>
                </div>
              </ToolInput>

              {/* Options */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="group relative flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">🔢</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {t.randomString.includeNumbers}
                        </span>
                        <p className="text-xs text-gray-500">0-9</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </label>

                  <label className="group relative flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">🔣</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {t.randomString.includeSymbols}
                        </span>
                        <p className="text-xs text-gray-500">!@#$%^&*</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <ToolControls>
                <button
                  onClick={generateString}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  <span className="text-lg">{t.randomString.generate}</span>
                </button>
              </ToolControls>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* Result Display */}
      {result && (
        <ToolSection>
          <ToolResult copyable copyText={result} title={t.randomString.result}>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="font-mono text-xl font-medium break-all text-gray-900 tracking-wide leading-relaxed">
                {result}
              </div>
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.randomString.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
