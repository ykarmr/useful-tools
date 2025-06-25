"use client";

import { useState } from "react";
import { RefreshCw, Copy, Trash2, Code, Wand2 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolInput from "@/components/layout/tool-input";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Locale, Translations } from "@/locales";
import * as yaml from "js-yaml";
import * as toml from "@iarna/toml";

interface DataConverterClientProps {
  locale: Locale;
  t: Translations;
}

type DataFormat = "json" | "yaml" | "toml";

export default function DataConverterClient({
  locale,
  t,
}: DataConverterClientProps) {
  // ステート管理
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [outputFormat, setOutputFormat] = useState<DataFormat>("json");
  const [inputFormat, setInputFormat] = useState<DataFormat>("json");
  const [isConverting, setIsConverting] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // 入力データの整形処理
  const formatInputData = async () => {
    if (!inputData.trim()) {
      setError(t.dataConverter.messages.emptyInput);
      setSuccess("");
      return;
    }

    setIsFormatting(true);
    setError("");
    setSuccess("");
    try {
      let formattedData: string;

      switch (inputFormat) {
        case "json":
          const parsedJson = JSON.parse(inputData);
          formattedData = JSON.stringify(parsedJson, null, 2);
          break;
        case "yaml":
          const parsedYaml = yaml.load(inputData);
          formattedData = yaml.dump(parsedYaml, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
          });
          break;
        case "toml":
          const parsedToml = toml.parse(inputData);
          formattedData = toml.stringify(parsedToml);
          break;
        default:
          throw new Error("Unsupported format");
      }

      setInputData(formattedData);
      setSuccess(t.dataConverter.messages.formatSuccess);
    } catch (error) {
      console.error("Format error:", error);
      setError(t.dataConverter.messages.invalidFormat);
    } finally {
      setIsFormatting(false);
    }
  };

  // データ変換処理
  const convertData = async () => {
    if (!inputData.trim()) {
      setError(t.dataConverter.messages.emptyInput);
      setSuccess("");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");
    try {
      // 入力データをJavaScriptオブジェクトに変換
      let parsedData: any;

      switch (inputFormat) {
        case "json":
          parsedData = JSON.parse(inputData);
          break;
        case "yaml":
          parsedData = yaml.load(inputData);
          break;
        case "toml":
          parsedData = toml.parse(inputData);
          break;
        default:
          throw new Error("Unsupported format");
      }

      // 出力形式に変換
      let convertedData: string;

      switch (outputFormat) {
        case "json":
          convertedData = JSON.stringify(parsedData, null, 2);
          break;
        case "yaml":
          convertedData = yaml.dump(parsedData, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
          });
          break;
        case "toml":
          convertedData = toml.stringify(parsedData);
          break;
        default:
          throw new Error("Unsupported output format");
      }

      setOutputData(convertedData);
      setSuccess(t.dataConverter.messages.conversionSuccess);
    } catch (error) {
      console.error("Conversion error:", error);
      setError(t.dataConverter.messages.invalidFormat);
    } finally {
      setIsConverting(false);
    }
  };

  // クリップボードにコピー
  const copyToClipboard = async () => {
    if (!outputData) return;

    try {
      await navigator.clipboard.writeText(outputData);
      setSuccess(t.dataConverter.messages.copied);
      setError("");
    } catch (error) {
      console.error("Copy error:", error);
      setError(t.dataConverter.messages.copyError);
    }
  };

  // クリア処理
  const clearAll = () => {
    setInputData("");
    setOutputData("");
    setInputFormat("json");
    setOutputFormat("json");
    setError("");
    setSuccess("");
  };

  // プレースホルダーサンプルデータの設定
  const setSampleData = (format: DataFormat) => {
    setInputData(t.dataConverter.placeholders[format]);
    setInputFormat(format);
    setError("");
    setSuccess("");
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.dataConverter.title}
      subtitle={t.dataConverter.subTitle}
      description={t.dataConverter.description}
      icon={Code}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.dataConverter.howToUse.title}
          steps={t.dataConverter.howToUse.steps}
          features={{
            title: t.dataConverter.features.title,
            items: t.dataConverter.features.list,
          }}
        />
      </ToolSection>

      {/* メイン変換セクション */}
      <ToolSection>
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* 入力ブロック */}
          <div className="space-y-6 order-1 lg:order-1">
            {/* 入力フォーマット選択 */}
            <div className="space-y-4">
              <div className="text-center">
                <Label className="text-lg font-semibold text-primary">
                  {t.dataConverter.inputLabel}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.dataConverter.formatLabel}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {[
                    { key: "json" as const, label: "JSON" },
                    { key: "yaml" as const, label: "YAML" },
                    { key: "toml" as const, label: "TOML" },
                  ].map((format) => (
                    <Button
                      key={format.key}
                      variant={
                        inputFormat === format.key ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setInputFormat(format.key)}
                      className="h-10 font-medium"
                    >
                      {format.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 入力エリア */}
            <div className="border rounded-lg bg-card">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm font-medium">
                      {inputFormat.toUpperCase()} Input
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={formatInputData}
                      disabled={isFormatting || !inputData.trim()}
                      className="h-8 px-3"
                    >
                      {isFormatting ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <Wand2 className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">
                        {t.dataConverter.formatButton}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Textarea
                  id="input-data"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder={t.dataConverter.inputPlaceholder}
                  className="min-h-[300px] lg:min-h-[400px] font-mono text-sm border-0 focus-visible:ring-0 resize-none p-0"
                />
              </div>
            </div>

            {/* サンプルデータボタン */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-center">
                {t.dataConverter.sampleDataLabel}
              </p>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {(["json", "yaml", "toml"] as const).map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      onClick={() => setSampleData(format)}
                      className="h-8 text-xs uppercase font-medium"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 変換ボタン - モバイルでは入力と出力の間に配置 */}
          <div className="order-2 lg:hidden">
            <ToolControls>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button
                  onClick={convertData}
                  disabled={isConverting || !inputData.trim()}
                  className="w-full min-w-48 h-12 text-base font-semibold"
                  size="lg"
                >
                  {isConverting ? (
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Code className="h-5 w-5 mr-2" />
                  )}
                  {t.dataConverter.convertButton}
                </Button>

                <Button
                  variant="outline"
                  onClick={clearAll}
                  className="w-full min-w-32 h-12"
                  size="lg"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t.dataConverter.clearButton}
                </Button>
              </div>
            </ToolControls>
          </div>

          {/* 出力ブロック */}
          <div className="space-y-6 order-3 lg:order-2">
            {/* 出力フォーマット選択 */}
            <div className="space-y-4">
              <div className="text-center">
                <Label className="text-lg font-semibold text-primary">
                  {t.dataConverter.outputLabel}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.dataConverter.formatLabel}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {[
                    { key: "json" as const, label: "JSON" },
                    { key: "yaml" as const, label: "YAML" },
                    { key: "toml" as const, label: "TOML" },
                  ].map((format) => (
                    <Button
                      key={format.key}
                      variant={
                        outputFormat === format.key ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setOutputFormat(format.key)}
                      className="h-10 font-medium"
                    >
                      {format.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 出力エリア */}
            <div className="border rounded-lg bg-card">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm font-medium">
                      {outputFormat.toUpperCase()} Output
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={!outputData}
                      className="h-8 px-3"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="ml-1 text-xs">
                        {t.dataConverter.copyButton}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Textarea
                  value={outputData}
                  readOnly
                  placeholder={t.dataConverter.outputPlaceholder}
                  className="min-h-[300px] lg:min-h-[400px] font-mono text-sm bg-muted/20 border-0 focus-visible:ring-0 resize-none p-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* エラー・成功メッセージの表示 */}
        {(error || success) && (
          <div className="mt-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* コントロールボタン - デスクトップ表示 */}
        <div className="hidden lg:block">
          <ToolControls className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={convertData}
                disabled={isConverting || !inputData.trim()}
                className="w-full sm:w-auto min-w-48 h-12 text-base font-semibold"
                size="lg"
              >
                {isConverting ? (
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Code className="h-5 w-5 mr-2" />
                )}
                {t.dataConverter.convertButton}
              </Button>

              <Button
                variant="outline"
                onClick={clearAll}
                className="w-full sm:w-auto min-w-32 h-12"
                size="lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t.dataConverter.clearButton}
              </Button>
            </div>
          </ToolControls>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.dataConverter.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
