"use client";

import { useState } from "react";
import { Hash } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import { Locale, Translations } from "@/locales";

interface RandomNumberClientProps {
  locale: Locale;
  t: Translations;
}

export default function RandomNumberClient({
  locale,
  t,
}: RandomNumberClientProps) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumber = () => {
    if (min >= max) return;

    setIsGenerating(true);
    setResult(null);

    setTimeout(() => {
      const newResult = Math.floor(Math.random() * (max - min + 1)) + min;
      setResult(newResult);
      setIsGenerating(false);
    }, 500);
  };

  const hasError = min >= max;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.randomNumber.title}
      description={t.randomNumber.description}
      icon={Hash}
    >
      {/* Result Display */}
      <ToolSection>
        <ToolDisplay size="large">
          {result !== null && !isGenerating && (
            <div className="text-6xl font-bold text-primary-600 animate-slide-up mb-4">
              {result}
            </div>
          )}
          {isGenerating && (
            <div className="text-4xl font-bold text-gray-400 animate-pulse">
              ???
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ToolInput label={t.randomNumber.min}>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number.parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                aria-describedby={hasError ? "range-error" : undefined}
              />
            </ToolInput>
            <ToolInput label={t.randomNumber.max}>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number.parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                aria-describedby={hasError ? "range-error" : undefined}
              />
            </ToolInput>
          </div>

          <ToolControls>
            <button
              onClick={generateNumber}
              disabled={isGenerating || hasError}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={
                isGenerating ? "Generating number" : "Generate random number"
              }
            >
              {isGenerating ? "Generating..." : t.randomNumber.generate}
            </button>
          </ToolControls>

          {hasError && (
            <p
              id="range-error"
              className="text-red-500 text-sm text-center"
              role="alert"
            >
              Minimum must be less than maximum
            </p>
          )}
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
