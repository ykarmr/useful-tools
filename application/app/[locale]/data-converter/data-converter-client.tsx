"use client";

import { useState } from "react";
import { RefreshCw, Copy, Trash2, Code, Wand2 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolInput from "@/components/layout/tool-input";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolFaq from "@/components/layout/tool-faq";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Locale, Translations } from "@/locales";
import { useToast } from "@/hooks/use-toast";
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
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [outputFormat, setOutputFormat] = useState<DataFormat>("json");
  const [inputFormat, setInputFormat] = useState<DataFormat>("json");
  const [isConverting, setIsConverting] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const { toast } = useToast();

  // 入力データの整形処理
  const formatInputData = async () => {
    if (!inputData.trim()) {
      toast({
        title: t.dataConverter.messages.emptyInput,
        variant: "destructive",
      });
      return;
    }

    setIsFormatting(true);
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
      toast({
        title: t.dataConverter.messages.conversionSuccess,
      });
    } catch (error) {
      console.error("Format error:", error);
      toast({
        title: t.dataConverter.messages.invalidFormat,
        variant: "destructive",
      });
    } finally {
      setIsFormatting(false);
    }
  };

  // データ変換処理
  const convertData = async () => {
    if (!inputData.trim()) {
      toast({
        title: t.dataConverter.messages.emptyInput,
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
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
      toast({
        title: t.dataConverter.messages.conversionSuccess,
      });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: t.dataConverter.messages.invalidFormat,
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // クリップボードにコピー
  const copyToClipboard = async () => {
    if (!outputData) return;

    try {
      await navigator.clipboard.writeText(outputData);
      toast({
        title: t.dataConverter.messages.copied,
      });
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  // クリア処理
  const clearAll = () => {
    setInputData("");
    setOutputData("");
    setInputFormat("json");
    setOutputFormat("json");
  };

  // プレースホルダーサンプルデータの設定
  const setSampleData = (format: DataFormat) => {
    setInputData(t.dataConverter.placeholders[format]);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.dataConverter.title}
      description={t.dataConverter.description}
      icon={Code}
    >
      {/* メイン変換セクション */}
      <ToolSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* 入力エリア */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="input-data" className="text-base font-semibold">
                {t.dataConverter.inputLabel}
              </Label>
            </div>

            {/* 入力フォーマット選択 */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {t.dataConverter.formatLabel}:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    key: "json" as const,
                    label: "JSON",
                    color: "blue",
                  },
                  {
                    key: "yaml" as const,
                    label: "YAML",
                    color: "green",
                  },
                  {
                    key: "toml" as const,
                    label: "TOML",
                    color: "purple",
                  },
                ].map((format) => (
                  <Button
                    key={format.key}
                    variant={inputFormat === format.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setInputFormat(format.key)}
                    className={`h-12 flex flex-col items-center gap-1 transition-all duration-200 ${
                      inputFormat === format.key
                        ? `bg-${format.color}-600 hover:bg-${format.color}-700 text-white shadow-md`
                        : `hover:bg-${format.color}-50 hover:border-${format.color}-300`
                    }`}
                  >
                    <span className="font-semibold text-sm">
                      {format.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              id="input-data"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={t.dataConverter.placeholders[inputFormat]}
              className="h-64 lg:h-80 font-mono text-sm resize-y"
            />

            <div className="flex flex-col gap-3">
              {/* 整形ボタン */}
              <Button
                variant="outline"
                onClick={formatInputData}
                disabled={isFormatting || !inputData.trim()}
                className="w-full sm:w-auto"
              >
                {isFormatting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4 mr-2" />
                )}
                {t.dataConverter.formatButton}
              </Button>

              {/* サンプルデータボタン */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.dataConverter.sampleDataLabel}:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["json", "yaml", "toml"] as const).map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSampleData(format);
                        setInputFormat(format);
                      }}
                      className="uppercase text-xs h-9"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 出力エリア */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">
                {t.dataConverter.outputLabel}
              </Label>
            </div>

            {/* 出力フォーマット選択 */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {t.dataConverter.formatLabel}:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    key: "json" as const,
                    label: "JSON",
                    color: "blue",
                  },
                  {
                    key: "yaml" as const,
                    label: "YAML",
                    color: "green",
                  },
                  {
                    key: "toml" as const,
                    label: "TOML",
                    color: "purple",
                  },
                ].map((format) => (
                  <Button
                    key={format.key}
                    variant={
                      outputFormat === format.key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setOutputFormat(format.key)}
                    className={`h-12 flex flex-col items-center gap-1 transition-all duration-200 ${
                      outputFormat === format.key
                        ? `bg-${format.color}-600 hover:bg-${format.color}-700 text-white shadow-md`
                        : `hover:bg-${format.color}-50 hover:border-${format.color}-300`
                    }`}
                  >
                    <span className="font-semibold text-sm">
                      {format.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              value={outputData}
              readOnly
              placeholder={t.dataConverter.outputPlaceholder}
              className="h-64 lg:h-80 font-mono text-sm bg-muted/50 resize-y"
            />
          </div>
        </div>

        {/* コントロールボタン */}
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

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!outputData}
                className="flex-1 sm:flex-none min-w-32 h-12"
                size="lg"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t.dataConverter.copyButton}
              </Button>

              <Button
                variant="outline"
                onClick={clearAll}
                className="flex-1 sm:flex-none min-w-32 h-12"
                size="lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t.dataConverter.clearButton}
              </Button>
            </div>
          </div>
        </ToolControls>
      </ToolSection>

      {/* 機能説明セクション */}
      <ToolSection>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {t.dataConverter.features.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.dataConverter.features.list.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.dataConverter.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
