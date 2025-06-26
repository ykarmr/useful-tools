"use client";

import { useState } from "react";
import { Code, Copy, RotateCcw, ChevronRight } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolInput from "@/components/layout/tool-input";
import ToolControls from "@/components/layout/tool-controls";
import ToolStats from "@/components/layout/tool-stats";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface HtmlEscapeClientProps {
  locale: Locale;
  t: Translations;
}

export default function HtmlEscapeClient({ locale, t }: HtmlEscapeClientProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [charactersEscaped, setCharactersEscaped] = useState(0);
  const { toast } = useToast();

  // HTMLエスケープ関数
  const escapeHtml = (text: string): string => {
    let escapedCount = 0;

    // &は最初に処理する必要がある（既にエスケープされた文字列を再度エスケープしないため）
    const escaped = text
      .replace(/&/g, () => {
        escapedCount++;
        return "&amp;";
      })
      .replace(/</g, () => {
        escapedCount++;
        return "&lt;";
      })
      .replace(/>/g, () => {
        escapedCount++;
        return "&gt;";
      })
      .replace(/"/g, () => {
        escapedCount++;
        return "&quot;";
      })
      .replace(/'/g, () => {
        escapedCount++;
        return "&#x27;";
      })
      .replace(/\//g, () => {
        escapedCount++;
        return "&#x2F;";
      })
      // 制御文字と非ASCII文字の処理
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, (match) => {
        escapedCount++;
        return `&#${match.charCodeAt(0)};`;
      });

    setCharactersEscaped(escapedCount);
    return escaped;
  };

  // HTMLアンエスケープ関数
  const unescapeHtml = (text: string): string => {
    let unescapedCount = 0;

    const unescaped = text
      // 名前付きエンティティの変換（順序重要：ampは最後に処理）
      .replace(/&lt;/g, () => {
        unescapedCount++;
        return "<";
      })
      .replace(/&gt;/g, () => {
        unescapedCount++;
        return ">";
      })
      .replace(/&quot;/g, () => {
        unescapedCount++;
        return '"';
      })
      .replace(/&#x27;/g, () => {
        unescapedCount++;
        return "'";
      })
      .replace(/&#39;/g, () => {
        unescapedCount++;
        return "'";
      })
      .replace(/&#x2F;/g, () => {
        unescapedCount++;
        return "/";
      })
      .replace(/&#x2f;/g, () => {
        unescapedCount++;
        return "/";
      })
      .replace(/&apos;/g, () => {
        unescapedCount++;
        return "'";
      })
      .replace(/&nbsp;/g, () => {
        unescapedCount++;
        return "\u00A0";
      })
      // その他の一般的なHTML実体
      .replace(/&copy;/g, () => {
        unescapedCount++;
        return "©";
      })
      .replace(/&reg;/g, () => {
        unescapedCount++;
        return "®";
      })
      .replace(/&trade;/g, () => {
        unescapedCount++;
        return "™";
      })
      .replace(/&euro;/g, () => {
        unescapedCount++;
        return "€";
      })
      .replace(/&pound;/g, () => {
        unescapedCount++;
        return "£";
      })
      .replace(/&yen;/g, () => {
        unescapedCount++;
        return "¥";
      })
      // 数値文字参照（10進数）の変換
      .replace(/&#(\d+);/g, (match, num) => {
        const code = parseInt(num, 10);
        if (code >= 0 && code <= 0x10ffff) {
          unescapedCount++;
          try {
            return String.fromCodePoint(code);
          } catch {
            return String.fromCharCode(code);
          }
        }
        return match; // 無効な場合はそのまま
      })
      // 数値文字参照（16進数）の変換
      .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
        const code = parseInt(hex, 16);
        if (code >= 0 && code <= 0x10ffff) {
          unescapedCount++;
          try {
            return String.fromCodePoint(code);
          } catch {
            return String.fromCharCode(code);
          }
        }
        return match; // 無効な場合はそのまま
      })
      // &amp;は最後に処理（他のエンティティを壊さないため）
      .replace(/&amp;/g, () => {
        unescapedCount++;
        return "&";
      });

    setCharactersEscaped(unescapedCount);
    return unescaped;
  };

  // エスケープ処理
  const handleEscape = () => {
    if (!inputText.trim()) {
      toast({
        description: t.htmlEscape.messages.inputRequired,
        variant: "destructive",
      });
      return;
    }

    const escaped = escapeHtml(inputText);
    setOutputText(escaped);

    if (charactersEscaped > 0) {
      toast({
        description: `${charactersEscaped}${t.htmlEscape.messages.charactersEscaped}`,
      });
    }
  };

  // アンエスケープ処理
  const handleUnescape = () => {
    if (!inputText.trim()) {
      toast({
        description: t.htmlEscape.messages.inputRequired,
        variant: "destructive",
      });
      return;
    }

    const unescaped = unescapeHtml(inputText);
    setOutputText(unescaped);

    if (charactersEscaped > 0) {
      toast({
        description: `${charactersEscaped}${t.htmlEscape.messages.charactersUnescaped}`,
      });
    }
  };

  // クリア処理
  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCharactersEscaped(0);
  };

  // コピー処理
  const handleCopy = async () => {
    if (!outputText) {
      toast({
        description: t.htmlEscape.messages.noContentToCopy,
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        description: t.htmlEscape.copiedMessage,
      });
    } catch (err) {
      // フォールバック: テキストエリアを使った古い方法
      try {
        const textArea = document.createElement("textarea");
        textArea.value = outputText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast({
          description: t.htmlEscape.copiedMessage,
        });
      } catch (fallbackErr) {
        toast({
          description: t.htmlEscape.messages.copyFailed,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.htmlEscape.title}
      subtitle={t.htmlEscape.subtitle}
      description={t.htmlEscape.description}
      icon={Code}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.htmlEscape.howToUse.title}
          steps={t.htmlEscape.howToUse.steps}
          features={{
            title: t.htmlEscape.features.title,
            items: t.htmlEscape.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 border border-blue-100 dark:border-gray-700 shadow-lg">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* 入力エリア */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <Label
                  htmlFor="input"
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  {t.htmlEscape.inputLabel}
                </Label>
              </div>
              <div className="relative">
                <Textarea
                  id="input"
                  placeholder={t.htmlEscape.inputPlaceholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="h-[220px] sm:h-[260px] lg:h-[300px] font-mono text-sm resize-none border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-xl bg-white dark:bg-gray-800 shadow-inner"
                />
                <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-700 px-2 py-1 rounded-md text-xs text-gray-500 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-600">
                  {inputText.length} {t.htmlEscape.ui.characters}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>
                    {inputText.length} {t.htmlEscape.ui.characters}
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>
                    {inputText.split("\n").length} {t.htmlEscape.ui.lines}
                  </span>
                </span>
              </div>
            </div>

            {/* 出力エリア */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
                <Label
                  htmlFor="output"
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  {t.htmlEscape.outputLabel}
                </Label>
              </div>
              <div className="relative">
                <Textarea
                  id="output"
                  placeholder={t.htmlEscape.outputPlaceholder}
                  value={outputText}
                  readOnly
                  className="h-[220px] sm:h-[260px] lg:h-[300px] font-mono text-sm resize-none bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-600 cursor-default rounded-xl shadow-inner"
                />
                <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-700 px-2 py-1 rounded-md text-xs text-gray-500 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-600">
                  {outputText.length} {t.htmlEscape.ui.characters}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>
                    {outputText.length} {t.htmlEscape.ui.characters}
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>
                    {outputText.split("\n").length} {t.htmlEscape.ui.lines}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* コントロールボタン */}
          <div className="mt-8 space-y-4">
            {/* メインアクションボタン（エスケープ・アンエスケープ） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleEscape}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold"
                size="lg"
              >
                <ChevronRight className="mr-3 h-5 w-5" />
                {t.htmlEscape.escapeButton}
              </Button>
              <Button
                onClick={handleUnescape}
                variant="outline"
                className="w-full h-12 border-2 border-indigo-200 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold"
                size="lg"
              >
                <RotateCcw className="mr-3 h-5 w-5" />
                {t.htmlEscape.unescapeButton}
              </Button>
            </div>

            {/* サブアクションボタン（コピー・クリア） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="lg"
                className="w-full h-12 border-2 border-green-200 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold"
                disabled={!outputText}
              >
                <Copy className="mr-3 h-5 w-5" />
                {t.htmlEscape.copyButton}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="lg"
                className="w-full h-12 border-2 border-red-200 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold"
                disabled={!inputText && !outputText}
              >
                <RotateCcw className="mr-3 h-5 w-5" />
                {t.htmlEscape.clearButton}
              </Button>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* 統計情報セクション */}
      <ToolSection>
        <ToolStats
          title={t.htmlEscape.stats.title}
          stats={[
            {
              label: t.htmlEscape.stats.originalLength,
              value: inputText.length,
              color: "primary",
            },
            {
              label: t.htmlEscape.stats.escapedLength,
              value: outputText.length,
              color: "success",
            },
            {
              label: t.htmlEscape.stats.charactersEscaped,
              value: charactersEscaped,
              color: "warning",
            },
          ]}
        />
      </ToolSection>

      {/* 使用例セクション */}
      <ToolSection>
        <ToolResult>
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.htmlEscape.examples.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              実際の使用例を確認して、ツールの動作を理解しましょう
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {Object.entries(t.htmlEscape.examples).map(([key, example]) => {
              if (key === "title") return null;
              const exampleData = example as {
                title: string;
                input: string;
                output: string;
              };

              return (
                <Card
                  key={key}
                  className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                        {exampleData.title}
                      </h4>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          </div>
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {t.htmlEscape.ui.inputExample}
                          </Label>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl font-mono text-sm break-all border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                          {exampleData.input}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          </div>
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {t.htmlEscape.ui.outputExample}
                          </Label>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl font-mono text-sm break-all border-2 border-blue-200 dark:border-blue-700 shadow-inner">
                          {exampleData.output}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ToolResult>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.htmlEscape.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
