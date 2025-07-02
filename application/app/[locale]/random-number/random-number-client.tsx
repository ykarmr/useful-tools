"use client";

import { useState } from "react";
import { Hash, Shuffle, TrendingUp } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
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
  const [history, setHistory] = useState<number[]>([]);

  const generateNumber = () => {
    if (min >= max) return;

    setIsGenerating(true);
    setResult(null);

    // アニメーション効果のための遅延
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * (max - min + 1)) + min;
      setResult(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 4)]); // 最新5件を保持
      setIsGenerating(false);
    }, 800);
  };

  const hasError = min >= max;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.randomNumber.title}
      subtitle={t.randomNumber.subtitle}
      description={t.randomNumber.description}
      icon={Hash}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.randomNumber.howToUse.title}
          steps={t.randomNumber.howToUse.steps}
          features={{
            title: t.randomNumber.features.title,
            items: t.randomNumber.features.items,
          }}
        />
      </ToolSection>

      {/* コントロールセクション */}
      <ToolSection>
        <div className="mx-auto space-y-6">
          {/* 範囲設定 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              乱数の範囲設定
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ToolInput label={t.randomNumber.min}>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(Number.parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-lg font-semibold bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  aria-describedby={hasError ? "range-error" : undefined}
                />
              </ToolInput>
              <ToolInput label={t.randomNumber.max}>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(Number.parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-lg font-semibold bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  aria-describedby={hasError ? "range-error" : undefined}
                />
              </ToolInput>
            </div>

            {hasError && (
              <p
                id="range-error"
                className="text-red-500 text-sm text-center mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                role="alert"
              >
                ⚠️ 最小値は最大値より小さい値を入力してください
              </p>
            )}
          </div>

          {/* 生成ボタン */}
          <ToolControls>
            <button
              onClick={generateNumber}
              disabled={isGenerating || hasError}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                isGenerating || hasError
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              } focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
              aria-label={
                isGenerating ? "Generating number" : "Generate random number"
              }
            >
              <div className="flex items-center justify-center space-x-2">
                {isGenerating ? (
                  <>
                    <Shuffle className="w-5 h-5 animate-spin" />
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" />
                    <span>{t.randomNumber.generate}</span>
                  </>
                )}
              </div>
            </button>
          </ToolControls>

          {/* ショートカットボタン */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "1-10", min: 1, max: 10 },
              { label: "1-100", min: 1, max: 100 },
              { label: "1-1000", min: 1, max: 1000 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setMin(preset.min);
                  setMax(preset.max);
                }}
                className="py-2 px-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </ToolSection>

      {/* メイン結果表示 */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="text-center space-y-6">
            {/* 結果表示エリア */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 border-2 border-blue-200 dark:border-gray-600 shadow-lg">
                {result !== null && !isGenerating && (
                  <div className="space-y-4">
                    <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 animate-slide-up">
                      {result.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        範囲: {min.toLocaleString()} ～ {max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
                {isGenerating && (
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-gray-400 animate-pulse">
                      <Shuffle className="w-16 h-16 mx-auto animate-spin" />
                    </div>
                    <div className="text-lg text-gray-500 dark:text-gray-400">
                      生成中...
                    </div>
                  </div>
                )}
                {result === null && !isGenerating && (
                  <div className="space-y-4">
                    <Hash className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
                    <div className="text-lg text-gray-500 dark:text-gray-400">
                      範囲を設定して乱数を生成してください
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 履歴表示 */}
            {history.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  最近の生成履歴
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {history.map((num, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        index === 0
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-2 border-blue-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {num.toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ToolDisplay>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.randomNumber.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
