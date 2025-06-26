"use client";

import { useState, useMemo } from "react";
import {
  BarChart3,
  Copy,
  Check,
  Download,
  FileText,
  Sparkles,
  Activity,
  Clock,
  Globe,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import ToolFaq from "@/components/layout/tool-faq";
import { Locale, Translations } from "@/locales";

interface TextStatistics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number;
  avgWordsPerSentence: number;
  avgSentencesPerParagraph: number;
  mostCommonWords: { word: string; frequency: number }[];
  complexity: "simple" | "moderate" | "complex";
  detectedLanguage: string;
}

interface TextStatisticsClientProps {
  locale: Locale;
  t: Translations;
}

export default function TextStatisticsClient({
  locale,
  t,
}: TextStatisticsClientProps) {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  // テキスト統計の計算
  const statistics = useMemo((): TextStatistics => {
    if (!inputText.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        avgWordsPerSentence: 0,
        avgSentencesPerParagraph: 0,
        mostCommonWords: [],
        complexity: "simple",
        detectedLanguage: "unknown",
      };
    }

    const text = inputText.trim();

    // 基本統計
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const lines = text.split("\n").length;
    // 段落数の計算：空行で区切られた段落と、単独行も段落として扱う
    const paragraphsByEmptyLines = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim()).length;
    const totalLines = text.split("\n").filter((line) => line.trim()).length;
    const paragraphs = Math.max(paragraphsByEmptyLines, totalLines > 0 ? 1 : 0);

    // 日本語・中国語・韓国語など文字ベースの言語判定
    const hasAsianChars =
      /[\u3400-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/.test(text);

    let words: string[];
    let sentences: string[];

    if (hasAsianChars) {
      // 日本語・中国語の場合、簡易的な単語分割
      // ひらがな・カタカナ・漢字のまとまりと、英数字のまとまりを単語として扱う
      words =
        text.match(
          /[\u3040-\u309F]+|[\u30A0-\u30FF]+|[\u4e00-\u9fff]+|[a-zA-Z]+|\d+/g
        ) || [];
      sentences = text.split(/[。！？]/).filter((s) => s.trim());
    } else {
      // 英語など単語ベースの言語
      words = text.match(/\b\w+\b/g) || [];
      sentences = text.split(/[.!?]+/).filter((s) => s.trim());
    }

    const wordCount = words.length;
    const sentenceCount = sentences.length;

    // 読書時間計算（言語別）
    const readingSpeed = hasAsianChars ? 400 : 250; // 日本語: 400文字/分, 英語: 250語/分
    const readingTime = hasAsianChars
      ? charactersNoSpaces / readingSpeed
      : wordCount / readingSpeed;

    // 平均値計算（ゼロ除算を防ぐ）
    const avgWordsPerSentence =
      sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
    const avgSentencesPerParagraph =
      paragraphs > 0 ? Math.round((sentenceCount / paragraphs) * 10) / 10 : 0;

    // 最頻出単語（英語のみ）
    const mostCommonWords: { word: string; frequency: number }[] = [];
    if (!hasAsianChars && words.length > 0) {
      const wordFreq: { [key: string]: number } = {};
      const commonWords = new Set([
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "could",
        "should",
      ]);

      words.forEach((word) => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
        if (cleanWord.length > 2 && !commonWords.has(cleanWord)) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });

      mostCommonWords.push(
        ...Object.entries(wordFreq)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([word, frequency]) => ({ word, frequency }))
      );
    }

    // テキスト複雑度判定
    let complexity: "simple" | "moderate" | "complex" = "simple";
    if (hasAsianChars) {
      // 日本語・中国語の場合、文字数ベースで判定
      if (avgWordsPerSentence > 25) {
        complexity = "complex";
      } else if (avgWordsPerSentence > 15) {
        complexity = "moderate";
      }
    } else {
      // 英語の場合、単語数ベースで判定
      if (avgWordsPerSentence > 20) {
        complexity = "complex";
      } else if (avgWordsPerSentence > 12) {
        complexity = "moderate";
      }
    }

    // 言語検出（簡易版）
    let detectedLanguage = "unknown";
    if (hasAsianChars) {
      if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
        detectedLanguage = "Japanese";
      } else if (/[\uAC00-\uD7AF]/.test(text)) {
        detectedLanguage = "Korean";
      } else if (/[\u4e00-\u9fff]/.test(text)) {
        detectedLanguage = "Chinese";
      }
    } else if (/[a-zA-Z]/.test(text)) {
      // より詳細な言語検出（簡易的）
      if (/[àáâãäåçèéêëìíîïñòóôõöùúûüý]/i.test(text)) {
        if (/[ñ]/i.test(text)) {
          detectedLanguage = "Spanish";
        } else if (/[àçéèêë]/i.test(text)) {
          detectedLanguage = "French";
        } else {
          detectedLanguage = "European Language";
        }
      } else {
        detectedLanguage = "English";
      }
    } else if (/[а-яё]/i.test(text)) {
      detectedLanguage = "Russian";
    }

    return {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs,
      lines,
      readingTime,
      avgWordsPerSentence,
      avgSentencesPerParagraph,
      mostCommonWords,
      complexity,
      detectedLanguage,
    };
  }, [inputText]);

  // クリア機能
  const clearText = () => {
    setInputText("");
  };

  // 統計コピー機能
  const copyStatistics = async () => {
    const statsText = `
${t.textStatistics.statistics}:
${t.textStatistics.characters}: ${statistics.characters}
${t.textStatistics.charactersNoSpaces}: ${statistics.charactersNoSpaces}
${t.textStatistics.words}: ${statistics.words}
${t.textStatistics.sentences}: ${statistics.sentences}
${t.textStatistics.paragraphs}: ${statistics.paragraphs}
${t.textStatistics.lines}: ${statistics.lines}
${t.textStatistics.readingTime}: ${statistics.readingTime.toFixed(1)} ${
      t.textStatistics.minutes
    }
${
  t.textStatistics.avgWordsPerSentence
}: ${statistics.avgWordsPerSentence.toFixed(1)}
${
  t.textStatistics.avgSentencesPerParagraph
}: ${statistics.avgSentencesPerParagraph.toFixed(1)}
${t.textStatistics.textComplexity}: ${t.textStatistics[statistics.complexity]}
${t.textStatistics.detected}: ${statistics.detectedLanguage}
    `.trim();

    try {
      await navigator.clipboard.writeText(statsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // エクスポート機能
  const exportData = (format: "txt" | "json") => {
    if (format === "txt") {
      const content = `Text Analysis Results
========================

Text: "${inputText.substring(0, 100)}${inputText.length > 100 ? "..." : ""}"

Statistics:
- Characters (with spaces): ${statistics.characters}
- Characters (without spaces): ${statistics.charactersNoSpaces}
- Words: ${statistics.words}
- Sentences: ${statistics.sentences}
- Paragraphs: ${statistics.paragraphs}
- Lines: ${statistics.lines}
- Reading time: ${statistics.readingTime.toFixed(1)} minutes
- Average words per sentence: ${statistics.avgWordsPerSentence.toFixed(1)}
- Average sentences per paragraph: ${statistics.avgSentencesPerParagraph.toFixed(
        1
      )}
- Text complexity: ${statistics.complexity}
- Detected language: ${statistics.detectedLanguage}

${
  statistics.mostCommonWords.length > 0
    ? `Most Common Words:
${statistics.mostCommonWords
  .map(({ word, frequency }) => `- ${word}: ${frequency}`)
  .join("\n")}`
    : ""
}
`;
      downloadFile(content, "text-statistics.txt", "text/plain");
    } else {
      const jsonData = {
        text: inputText,
        statistics,
        analysis_date: new Date().toISOString(),
      };
      downloadFile(
        JSON.stringify(jsonData, null, 2),
        "text-statistics.json",
        "application/json"
      );
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.textStatistics.title}
      subtitle={t.textStatistics.subtitle}
      description={t.textStatistics.description}
      icon={BarChart3}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.textStatistics.howToUse.title}
          steps={t.textStatistics.howToUse.steps}
          features={{
            title: t.textStatistics.features.title,
            items: t.textStatistics.features.items,
          }}
        />
      </ToolSection>

      {/* テキスト入力セクション */}
      <ToolSection>
        <div className="bg-gradient-to-br from-white to-blue-50/50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <label
              htmlFor="text-input"
              className="flex items-center text-lg font-semibold text-gray-900 mb-3"
            >
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              {t.textStatistics.inputLabel}
            </label>
            <div className="relative">
              <textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.textStatistics.inputPlaceholder}
                className="w-full h-64 px-4 py-4 bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-inner"
                aria-describedby="text-input-description"
                aria-label={t.textStatistics.inputAriaLabel}
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-3">
                {inputText.length > 0 && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                    {t.textStatistics.inputCharacterCount.replace(
                      "{count}",
                      inputText.length.toLocaleString()
                    )}
                  </div>
                )}
                <button
                  onClick={clearText}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputText.trim()}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t.textStatistics.clear}
                </button>
              </div>
            </div>
            <div id="text-input-description" className="sr-only">
              {t.textStatistics.inputDescription}
            </div>
          </div>
        </div>
      </ToolSection>

      {/* 統計表示セクション */}
      {inputText.trim() && (
        <ToolSection>
          <div className="space-y-8">
            {/* 基本統計 */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                {t.textStatistics.statistics}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.characters.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.characters}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.charactersNoSpaces.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.charactersNoSpaces}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.words.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.words}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.sentences}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.paragraphs}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.lines.toLocaleString()}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.lines}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.readingTime.toFixed(1)}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.readingTime} ({t.textStatistics.minutes})
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold">
                    {statistics.avgWordsPerSentence.toFixed(1)}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    {t.textStatistics.avgWordsPerSentence}
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-green-50/50 border border-green-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <div className="bg-green-500 p-2 rounded-lg mr-3">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  {t.textStatistics.textComplexity}
                </h4>
                <div
                  className={`inline-flex px-6 py-3 rounded-full text-base font-semibold shadow-md ${
                    statistics.complexity === "simple"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : statistics.complexity === "moderate"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  }`}
                >
                  {t.textStatistics[statistics.complexity]}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  {t.textStatistics.languageDetection}
                </h4>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md">
                  {statistics.detectedLanguage}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-purple-50/50 border border-purple-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <div className="bg-purple-500 p-2 rounded-lg mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  {t.textStatistics.avgSentencesPerParagraph}
                </h4>
                <div className="text-3xl font-bold text-purple-600">
                  {statistics.avgSentencesPerParagraph.toFixed(1)}
                </div>
              </div>
            </div>

            {/* 最頻出単語 */}
            {statistics.mostCommonWords.length > 0 && (
              <div className="bg-gradient-to-br from-white to-amber-50/50 border border-amber-200 rounded-xl p-8 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center text-xl">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg mr-3">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  {t.textStatistics.mostCommonWords}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {statistics.mostCommonWords
                    .slice(0, 10)
                    .map(({ word, frequency }, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-amber-100 to-yellow-200 border-2 border-amber-300 p-4 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                      >
                        <div className="font-bold text-amber-900 truncate text-lg group-hover:text-amber-700">
                          {word}
                        </div>
                        <div className="text-sm text-amber-700 mt-2 font-medium">
                          {t.textStatistics.frequencyCount.replace(
                            "{count}",
                            frequency.toString()
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-200 rounded-xl p-8 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-6 text-xl text-center flex items-center justify-center">
                <Download className="w-6 h-6 mr-3 text-gray-600" />
                {t.textStatistics.exportOptions}
              </h4>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={copyStatistics}
                  className="flex items-center px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-200 text-base font-semibold text-gray-700 transform hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-green-600" />
                      <span className="text-green-600">
                        {t.textStatistics.copied}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2 text-gray-500" />
                      {t.textStatistics.copyStats}
                    </>
                  )}
                </button>
                <button
                  onClick={() => exportData("txt")}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-base font-semibold shadow-md transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.textStatistics.downloadTXT}
                </button>
                <button
                  onClick={() => exportData("json")}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-base font-semibold shadow-md transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.textStatistics.downloadJSON}
                </button>
              </div>
            </div>
          </div>
        </ToolSection>
      )}

      {/* テキストが空の場合の表示 */}
      {!inputText.trim() && (
        <ToolSection>
          <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-blue-200 shadow-inner">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t.textStatistics.emptyStateTitle}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {t.textStatistics.noText}
              </p>
              <div className="text-base text-gray-500 bg-white/50 px-6 py-4 rounded-xl border border-blue-200 backdrop-blur-sm">
                {t.textStatistics.emptyStateDescription}
              </div>
            </div>
          </div>
        </ToolSection>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.textStatistics.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
