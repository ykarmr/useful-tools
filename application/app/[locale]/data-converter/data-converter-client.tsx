"use client";

import { useState } from "react";
import { RefreshCw, Copy, Trash2, Code } from "lucide-react";
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
import * as xml2js from "xml2js";

interface DataConverterClientProps {
  locale: Locale;
  t: Translations;
}

type DataFormat = "json" | "yaml" | "toml" | "xml";

export default function DataConverterClient({
  locale,
  t,
}: DataConverterClientProps) {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [outputFormat, setOutputFormat] = useState<DataFormat>("json");
  const [inputFormat, setInputFormat] = useState<DataFormat | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  // 入力データの形式を自動検出
  const detectFormat = (data: string): DataFormat | null => {
    if (!data.trim()) return null;

    try {
      // JSONの検出
      JSON.parse(data);
      return "json";
    } catch {}

    try {
      // YAMLの検出
      yaml.load(data);
      if (data.includes(":") && !data.includes("=") && !data.includes("<")) {
        return "yaml";
      }
    } catch {}

    try {
      // TOMLの検出
      toml.parse(data);
      return "toml";
    } catch {}

    // XMLの検出
    if (data.trim().startsWith("<?xml") || data.trim().startsWith("<")) {
      try {
        // XMLの基本的な構文チェック
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length === 0) {
          return "xml";
        }
      } catch {}
    }

    return null;
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
      const detectedFormat = detectFormat(inputData);
      if (!detectedFormat) {
        toast({
          title: t.dataConverter.messages.invalidFormat,
          variant: "destructive",
        });
        setIsConverting(false);
        return;
      }

      setInputFormat(detectedFormat);

      // 入力データをJavaScriptオブジェクトに変換
      let parsedData: any;

      switch (detectedFormat) {
        case "json":
          parsedData = JSON.parse(inputData);
          break;
        case "yaml":
          parsedData = yaml.load(inputData);
          break;
        case "toml":
          parsedData = toml.parse(inputData);
          break;
        case "xml":
          const parser = new xml2js.Parser({
            explicitArray: false,
            mergeAttrs: true,
            trim: true,
          });
          parsedData = await new Promise((resolve, reject) => {
            parser.parseString(inputData, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });
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
        case "xml":
          const builder = new xml2js.Builder({
            headless: false,
            renderOpts: { pretty: true, indent: "  " },
          });
          convertedData = builder.buildObject(parsedData);
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
    setInputFormat(null);
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
        <div className="max-w-sm mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* 入力エリア */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input-data" className="text-base font-semibold">
                {t.dataConverter.inputLabel}
              </Label>
              {inputFormat && (
                <Badge variant="secondary" className="uppercase">
                  {inputFormat}
                </Badge>
              )}
            </div>
            <Textarea
              id="input-data"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={t.dataConverter.placeholders.json}
              className="h-48 sm:h-64 lg:h-72 font-mono text-sm resize-y"
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {t.dataConverter.sampleDataLabel}:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {(["json", "yaml", "toml", "xml"] as const).map((format) => (
                  <Button
                    key={format}
                    variant="outline"
                    size="sm"
                    onClick={() => setSampleData(format)}
                    className="uppercase text-xs h-8"
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 出力エリア */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <Label
                htmlFor="output-format"
                className="text-base font-semibold"
              >
                {t.dataConverter.outputLabel}
              </Label>
            </div>
            <Textarea
              value={outputData}
              readOnly
              placeholder={t.dataConverter.outputPlaceholder}
              className="h-48 sm:h-64 lg:h-72 font-mono text-sm bg-muted/50 resize-y"
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {t.dataConverter.formatLabel}:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {(["json", "yaml", "toml", "xml"] as const).map((format) => (
                  <Button
                    key={format}
                    variant={outputFormat === format ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutputFormat(format)}
                    className={`uppercase text-xs h-8 ${
                      outputFormat === format
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                        : ""
                    }`}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* コントロールボタン */}
        <ToolControls>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={convertData}
              disabled={isConverting || !inputData.trim()}
              className="w-full sm:w-auto min-w-32"
              size="lg"
            >
              {isConverting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Code className="h-4 w-4 mr-2" />
              )}
              {t.dataConverter.convertButton}
            </Button>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!outputData}
                className="flex-1 sm:flex-none min-w-32"
                size="lg"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t.dataConverter.copyButton}
              </Button>

              <Button
                variant="outline"
                onClick={clearAll}
                className="flex-1 sm:flex-none min-w-32"
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
            <CardTitle>{t.dataConverter.features.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {t.dataConverter.features.list.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
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
