"use client";

import { useState, useMemo } from "react";
import { BarChart3, Copy, Check, Download, FileText } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolInput from "@/components/layout/tool-input";
import ToolControls from "@/components/layout/tool-controls";
import ToolStats from "@/components/layout/tool-stats";
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
      description={t.textStatistics.description}
      icon={BarChart3}
    >
      {/* テキスト入力セクション */}
      <ToolSection>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              分析するテキストを入力してください
            </label>
            <textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.textStatistics.inputPlaceholder}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="text-sm text-gray-500">
              {inputText.length > 0 && (
                <span>入力済み: {inputText.length.toLocaleString()} 文字</span>
              )}
            </div>
            <button
              onClick={clearText}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
              disabled={!inputText.trim()}
            >
              <FileText className="w-4 h-4 mr-2" />
              {t.textStatistics.clear}
            </button>
          </div>
        </div>
      </ToolSection>

      {/* 統計表示セクション */}
      {inputText.trim() && (
        <ToolSection>
          <div className="space-y-6">
            {/* 基本統計 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                {t.textStatistics.statistics}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {statistics.characters.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {t.textStatistics.characters}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {statistics.charactersNoSpaces.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    {t.textStatistics.charactersNoSpaces}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {statistics.words.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700 mt-1">
                    {t.textStatistics.words}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {statistics.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm text-orange-700 mt-1">
                    {t.textStatistics.sentences}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {statistics.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm text-indigo-700 mt-1">
                    {t.textStatistics.paragraphs}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {statistics.lines.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {t.textStatistics.lines}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {statistics.readingTime.toFixed(1)}
                  </div>
                  <div className="text-sm text-emerald-700 mt-1">
                    {t.textStatistics.readingTime} ({t.textStatistics.minutes})
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg">
                  <div className="text-2xl font-bold text-rose-600">
                    {statistics.avgWordsPerSentence.toFixed(1)}
                  </div>
                  <div className="text-sm text-rose-700 mt-1">
                    {t.textStatistics.avgWordsPerSentence}
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {t.textStatistics.textComplexity}
                </h4>
                <div
                  className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                    statistics.complexity === "simple"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : statistics.complexity === "moderate"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {t.textStatistics[statistics.complexity]}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {t.textStatistics.languageDetection}
                </h4>
                <div className="text-gray-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  {statistics.detectedLanguage}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  {t.textStatistics.avgSentencesPerParagraph}
                </h4>
                <div className="text-2xl font-bold text-purple-600">
                  {statistics.avgSentencesPerParagraph.toFixed(1)}
                </div>
              </div>
            </div>

            {/* 最頻出単語 */}
            {statistics.mostCommonWords.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  {t.textStatistics.mostCommonWords}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {statistics.mostCommonWords
                    .slice(0, 10)
                    .map(({ word, frequency }, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 p-3 rounded-lg text-center hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="font-semibold text-amber-800 truncate">
                          {word}
                        </div>
                        <div className="text-sm text-amber-600 mt-1">
                          {frequency}回
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">
                エクスポートオプション
              </h4>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={copyStatistics}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      {t.textStatistics.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2 text-gray-500" />
                      {t.textStatistics.copyStats}
                    </>
                  )}
                </button>
                <button
                  onClick={() => exportData("txt")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.textStatistics.downloadTXT}
                </button>
                <button
                  onClick={() => exportData("json")}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
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
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                テキストを入力してください
              </h3>
              <p className="text-gray-600 mb-4">{t.textStatistics.noText}</p>
              <div className="text-sm text-gray-500">
                文字数、単語数、読書時間などの詳細な統計情報を表示します
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
