"use client";

import { useState } from "react";
import { Type } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
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
      description={t.randomString.description}
      icon={Type}
    >
      {/* Result Display */}
      {result && (
        <ToolSection>
          <ToolResult copyable copyText={result} title={t.randomString.result}>
            <div className="font-mono text-lg break-all text-gray-900">
              {result}
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Controls */}
      <ToolSection>
        <div className="max-w-md mx-auto space-y-6">
          <ToolInput label={t.randomString.length}>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(Number.parseInt(e.target.value))}
              className="w-full"
              aria-describedby="length-display"
            />
            <div
              id="length-display"
              className="text-center text-sm text-gray-600 mt-1"
            >
              {length} characters
            </div>
          </ToolInput>

          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t.randomString.includeNumbers}
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t.randomString.includeSymbols}
              </span>
            </label>
          </div>

          <ToolControls>
            <button
              onClick={generateString}
              className="button-primary w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t.randomString.generate}
            </button>
          </ToolControls>
        </div>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.randomString.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
