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
    const escapeMap: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };

    let escapedCount = 0;
    const escaped = text.replace(/[&<>"'\/]/g, (match) => {
      escapedCount++;
      return escapeMap[match];
    });

    setCharactersEscaped(escapedCount);
    return escaped;
  };

  // HTMLアンエスケープ関数
  const unescapeHtml = (text: string): string => {
    const unescapeMap: { [key: string]: string } = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#x27;": "'",
      "&#x2F;": "/",
      "&#39;": "'",
    };

    let unescapedCount = 0;
    const unescaped = text.replace(
      /&(amp|lt|gt|quot|#x27|#x2F|#39);/g,
      (match) => {
        unescapedCount++;
        return unescapeMap[match];
      }
    );

    setCharactersEscaped(unescapedCount);
    return unescaped;
  };

  // エスケープ処理
  const handleEscape = () => {
    if (!inputText.trim()) {
      toast({
        description: "エスケープする文字列を入力してください",
        variant: "destructive",
      });
      return;
    }

    const escaped = escapeHtml(inputText);
    setOutputText(escaped);
  };

  // アンエスケープ処理
  const handleUnescape = () => {
    if (!inputText.trim()) {
      toast({
        description: "アンエスケープする文字列を入力してください",
        variant: "destructive",
      });
      return;
    }

    const unescaped = unescapeHtml(inputText);
    setOutputText(unescaped);
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
        description: "コピーする内容がありません",
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
      toast({
        description: "コピーに失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.htmlEscape.title}
      description={t.htmlEscape.description}
      icon={Code}
    >
      {/* メイン機能セクション */}
      <ToolSection>
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* 入力エリア */}
          <div className="space-y-3">
            <Label
              htmlFor="input"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t.htmlEscape.inputLabel}
            </Label>
            <Textarea
              id="input"
              placeholder={t.htmlEscape.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-[200px] sm:h-[240px] lg:h-[280px] font-mono text-sm resize-none border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{inputText.length} 文字</span>
              <span>{inputText.split("\n").length} 行</span>
            </div>
          </div>

          {/* 出力エリア */}
          <div className="space-y-3">
            <Label
              htmlFor="output"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t.htmlEscape.outputLabel}
            </Label>
            <Textarea
              id="output"
              placeholder={t.htmlEscape.outputPlaceholder}
              value={outputText}
              readOnly
              className="h-[200px] sm:h-[240px] lg:h-[280px] font-mono text-sm resize-none bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 cursor-default"
            />
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{outputText.length} 文字</span>
              <span>{outputText.split("\n").length} 行</span>
            </div>
          </div>
        </div>

        {/* コントロールボタン */}
        <div className="mt-6 space-y-3">
          {/* メインアクションボタン（エスケープ・アンエスケープ） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleEscape}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <ChevronRight className="mr-2 h-4 w-4" />
              {t.htmlEscape.escapeButton}
            </Button>
            <Button
              onClick={handleUnescape}
              variant="outline"
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
              size="lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.htmlEscape.unescapeButton}
            </Button>
          </div>

          {/* サブアクションボタン（コピー・クリア） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="lg"
              className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
              disabled={!outputText}
            >
              <Copy className="mr-2 h-4 w-4" />
              {t.htmlEscape.copyButton}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              size="lg"
              className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
              disabled={!inputText && !outputText}
            >
              {t.htmlEscape.clearButton}
            </Button>
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
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            {t.htmlEscape.examples.title}
          </h3>
          <div className="space-y-4 lg:space-y-6  lg:gap-6">
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
                  className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 sm:p-6">
                    <h4 className="font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                      {exampleData.title}
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <Label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                          入力:
                        </Label>
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-lg font-mono text-xs sm:text-sm break-all border border-gray-200 dark:border-gray-700">
                          {exampleData.input}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                          出力:
                        </Label>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg font-mono text-xs sm:text-sm break-all border border-blue-200 dark:border-blue-700">
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
