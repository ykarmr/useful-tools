"use client";

import { useState, useCallback } from "react";
import {
  Binary,
  Copy,
  Trash2,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Hash,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BaseConverterClientProps {
  locale: Locale;
  t: Translations;
}

type BitOperation = "and" | "or" | "xor" | "not" | "leftShift" | "rightShift";

export default function BaseConverterClient({
  locale,
  t,
}: BaseConverterClientProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputBase, setInputBase] = useState<string>("10");
  const [operand1, setOperand1] = useState<string>("");
  const [operand2, setOperand2] = useState<string>("");
  const [operandBase, setOperandBase] = useState<string>("10");
  const [operation, setOperation] = useState<BitOperation>("and");
  const [operationResult, setOperationResult] = useState<string>("");
  const [isAsciiOpen, setIsAsciiOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [operationError, setOperationError] = useState<string>("");
  const [convertedValues, setConvertedValues] = useState({
    decimal: "",
    binary: "",
    octal: "",
    hexadecimal: "",
  });

  // 進数変換関数
  const convertNumber = useCallback(
    (value: string, fromBase: number) => {
      if (!value.trim()) {
        return {
          decimal: "",
          binary: "",
          octal: "",
          hexadecimal: "",
        };
      }

      try {
        // 入力値のバリデーション
        const cleanValue = value.trim().toLowerCase();

        // 各進数に応じた文字チェック
        const validChars = {
          2: /^[01]+$/,
          8: /^[0-7]+$/,
          10: /^[0-9]+$/,
          16: /^[0-9a-f]+$/,
        };

        if (
          validChars[fromBase as keyof typeof validChars] &&
          !validChars[fromBase as keyof typeof validChars].test(cleanValue)
        ) {
          throw new Error("Invalid character for base");
        }

        // 入力値を10進数に変換
        const decimalValue = parseInt(cleanValue, fromBase);

        if (isNaN(decimalValue) || decimalValue < 0) {
          throw new Error("Invalid input or negative value");
        }

        // 安全な範囲内かチェック（JavaScript の Number.MAX_SAFE_INTEGER まで）
        if (decimalValue > Number.MAX_SAFE_INTEGER) {
          throw new Error("Value too large");
        }

        return {
          decimal: decimalValue.toString(10),
          binary: decimalValue.toString(2),
          octal: decimalValue.toString(8),
          hexadecimal: decimalValue.toString(16).toUpperCase(),
        };
      } catch {
        return {
          decimal: t.baseConverter.invalidInput,
          binary: t.baseConverter.invalidInput,
          octal: t.baseConverter.invalidInput,
          hexadecimal: t.baseConverter.invalidInput,
        };
      }
    },
    [t.baseConverter.invalidInput]
  );

  // 進数変換の実行
  const handleConvert = () => {
    setInputError(""); // エラーメッセージをリセット

    if (!inputValue.trim()) {
      setInputError(t.baseConverter.invalidInput);
      setConvertedValues({
        decimal: "",
        binary: "",
        octal: "",
        hexadecimal: "",
      });
      return;
    }

    const result = convertNumber(inputValue, parseInt(inputBase));

    if (result.decimal === t.baseConverter.invalidInput) {
      setInputError(t.baseConverter.invalidInput);
      setConvertedValues({
        decimal: "",
        binary: "",
        octal: "",
        hexadecimal: "",
      });
    } else {
      setConvertedValues(result);
    }
  };

  // クリア機能
  const handleClear = () => {
    setInputValue("");
    setOperand1("");
    setOperand2("");
    setOperationResult("");
    setCopyMessage("");
    setInputError("");
    setOperationError("");
    setConvertedValues({
      decimal: "",
      binary: "",
      octal: "",
      hexadecimal: "",
    });
  };

  // コピー機能
  const handleCopy = async (value: string) => {
    if (!value || value === t.baseConverter.invalidInput) {
      setCopyMessage(t.baseConverter.enterValueFirst);
      setTimeout(() => setCopyMessage(""), 3000);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(t.baseConverter.copied);
      // 3秒後にメッセージを消去
      setTimeout(() => setCopyMessage(""), 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopyMessage(t.baseConverter.copyFailed);
      setTimeout(() => setCopyMessage(""), 3000);
    }
  };

  // ビット演算の実行
  const performBitOperation = () => {
    setOperationError(""); // エラーメッセージをリセット

    try {
      // 入力値のバリデーション
      if (!operand1.trim()) {
        setOperationError(t.baseConverter.invalidInput);
        setOperationResult("");
        return;
      }

      // オペランド1を10進数に変換
      const num1 = parseInt(
        operand1.trim().toLowerCase(),
        parseInt(operandBase)
      );

      if (isNaN(num1) || num1 < 0) {
        setOperationError(t.baseConverter.invalidInput);
        setOperationResult("");
        return;
      }

      let num2 = 0;

      // NOT演算以外は第二オペランドが必要
      if (operation !== "not") {
        if (!operand2.trim()) {
          setOperationError(t.baseConverter.invalidInput);
          setOperationResult("");
          return;
        }

        num2 = parseInt(operand2.trim().toLowerCase(), parseInt(operandBase));

        if (isNaN(num2) || num2 < 0) {
          setOperationError(t.baseConverter.invalidInput);
          setOperationResult("");
          return;
        }

        // シフト演算の場合、シフト量の妥当性をチェック
        if (operation === "leftShift" || operation === "rightShift") {
          if (num2 > 32) {
            // 32ビットを超えるシフトは実用的でない
            setOperationError(t.baseConverter.invalidInput);
            setOperationResult("");
            return;
          }
        }
      }

      let result: number;

      switch (operation) {
        case "and":
          result = num1 & num2;
          break;
        case "or":
          result = num1 | num2;
          break;
        case "xor":
          result = num1 ^ num2;
          break;
        case "not":
          // 32ビットNOT演算として扱う
          result = ~num1 >>> 0; // 符号なし32ビットとして扱う
          break;
        case "leftShift":
          // 左シフトの結果をチェック
          const shiftedValue = num1 << num2;
          result = shiftedValue >>> 0; // 符号なし32ビットとして扱う

          // オーバーフローのチェック（元の値が復元できるかどうか）
          if (result >> num2 !== num1 && num2 > 0) {
            setOperationError(t.baseConverter.invalidInput);
            setOperationResult("");
            return;
          }
          break;
        case "rightShift":
          result = num1 >> num2;
          break;
        default:
          result = 0;
      }

      // 結果の表示
      if (operation === "not" || operation === "leftShift") {
        // NOT演算と左シフトは符号なし32ビットとして表示
        const converted = convertNumber(result.toString(), 10);
        setOperationResult(
          `Dec: ${result}, Bin: ${converted.binary}, Oct: ${converted.octal}, Hex: ${converted.hexadecimal}`
        );
      } else {
        // その他の演算
        if (result >= 0) {
          const converted = convertNumber(result.toString(), 10);
          setOperationResult(
            `Dec: ${result}, Bin: ${converted.binary}, Oct: ${converted.octal}, Hex: ${converted.hexadecimal}`
          );
        } else {
          // 負数の場合は10進数のみ表示
          setOperationResult(
            `Dec: ${result}, Bin: ${t.baseConverter.negativeValueNote}, Oct: ${t.baseConverter.negativeValueNote}, Hex: ${t.baseConverter.negativeValueNote}`
          );
        }
      }

      setOperationError(""); // 成功時はエラーメッセージをクリア
    } catch {
      setOperationError(t.baseConverter.invalidInput);
      setOperationResult("");
    }
  };

  // ASCII文字コード表（表示用の一部）
  const asciiTable = Array.from({ length: 95 }, (_, i) => ({
    char: String.fromCharCode(32 + i),
    decimal: 32 + i,
    binary: (32 + i).toString(2).padStart(8, "0"),
    hex: (32 + i).toString(16).toUpperCase(),
  }));

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.baseConverter.title}
      subtitle={t.baseConverter.subtitle}
      description={t.baseConverter.description}
      icon={Binary}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.baseConverter.howToUse.title}
          steps={t.baseConverter.howToUse.steps}
          features={{
            title: t.baseConverter.features.title,
            items: t.baseConverter.features.items,
          }}
        />
      </ToolSection>

      {/* 進数変換セクション */}
      <ToolSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-primary" />
              <CardTitle>{t.baseConverter.conversionTitle}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t.baseConverter.description}
            </p>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-6">
                {/* 入力エリア */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                  <div className="lg:col-span-5">
                    <Label htmlFor="inputValue" className="text-sm font-medium">
                      {t.baseConverter.inputLabel}
                    </Label>
                    <Input
                      id="inputValue"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t.baseConverter.inputPlaceholder}
                      className="mt-1 font-mono text-lg h-12 bg-white border-2 focus:border-primary/50 shadow-sm"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-1">
                      <Label
                        htmlFor="inputBase"
                        className="text-sm font-medium"
                      >
                        {t.baseConverter.inputBaseLabel}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {t.baseConverter.inputBaseDescription}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={inputBase} onValueChange={setInputBase}>
                      <SelectTrigger className="mt-1 h-12 bg-white shadow-lg border-2 hover:border-primary/50 transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-2xl border-2 border-gray-200 rounded-lg">
                        <SelectItem
                          value="2"
                          className="font-mono hover:bg-green-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">2</span>
                            <span>{t.baseConverter.binaryBase}</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="8"
                          className="font-mono hover:bg-yellow-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-bold">8</span>
                            <span>{t.baseConverter.octalBase}</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="10"
                          className="font-mono hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold">10</span>
                            <span>{t.baseConverter.decimalBase}</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="16"
                          className="font-mono hover:bg-purple-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-purple-600 font-bold">
                              16
                            </span>
                            <span>{t.baseConverter.hexBase}</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-4 flex gap-2">
                    <Button
                      onClick={handleConvert}
                      className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      size="lg"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      {t.baseConverter.convertButton}
                    </Button>
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      size="lg"
                      className="h-12 px-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 hover:from-red-100 hover:to-pink-100 hover:border-red-300 text-red-700 font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* エラーメッセージとコピー成功メッセージ */}
                {inputError && (
                  <Alert
                    variant="destructive"
                    className="mt-4 border-2 border-red-300 shadow-lg"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium">
                      {inputError}
                    </AlertDescription>
                  </Alert>
                )}
                {copyMessage && (
                  <Alert className="mt-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 text-emerald-800 shadow-lg">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="font-medium">
                      {copyMessage}
                    </AlertDescription>
                  </Alert>
                )}{" "}
                {/* 結果表示エリア */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: t.baseConverter.decimalLabel,
                      value: convertedValues.decimal,
                      prefix: "",
                      color: "bg-blue-50 border-blue-200",
                      iconColor: "text-blue-600",
                    },
                    {
                      label: t.baseConverter.binaryLabel,
                      value: convertedValues.binary,
                      prefix: "0b",
                      color: "bg-green-50 border-green-200",
                      iconColor: "text-green-600",
                    },
                    {
                      label: t.baseConverter.octalLabel,
                      value: convertedValues.octal,
                      prefix: "0o",
                      color: "bg-yellow-50 border-yellow-200",
                      iconColor: "text-yellow-600",
                    },
                    {
                      label: t.baseConverter.hexadecimalLabel,
                      value: convertedValues.hexadecimal,
                      prefix: "0x",
                      color: "bg-purple-50 border-purple-200",
                      iconColor: "text-purple-600",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg ${item.color} transition-all hover:shadow-lg transform hover:scale-102 duration-200`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">
                          {item.label}
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() =>
                                handleCopy(item.prefix + item.value)
                              }
                              variant="ghost"
                              size="sm"
                              disabled={
                                !item.value ||
                                item.value === t.baseConverter.invalidInput
                              }
                              className="h-8 w-8 p-0 hover:bg-white/70 transition-all duration-200 transform hover:scale-110"
                            >
                              <Copy className={`h-4 w-4 ${item.iconColor}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t.baseConverter.copyTooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="bg-white p-3 rounded border-2 border-gray-200 font-mono text-lg break-all select-all min-h-[3rem] flex items-center shadow-inner">
                        {item.value ? (
                          `${item.prefix}${item.value}`
                        ) : (
                          <span className="text-gray-400">---</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </ToolSection>

      {/* ビット演算セクション */}
      <ToolSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Binary className="h-5 w-5 text-primary" />
              <CardTitle>{t.baseConverter.bitOperationsTitle}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t.baseConverter.bitOperationsDescription}
            </p>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-4">
                {/* オペランド進数選択 */}
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Label
                      htmlFor="operandBase"
                      className="text-sm font-medium"
                    >
                      {t.baseConverter.operandBaseLabel}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {t.baseConverter.operandBaseDescription}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={operandBase} onValueChange={setOperandBase}>
                    <SelectTrigger className="w-48 h-10 bg-white shadow-lg border-2 hover:border-primary/50 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-2xl border-2 border-gray-200 rounded-lg">
                      <SelectItem
                        value="2"
                        className="font-mono hover:bg-green-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">2</span>
                          <span>{t.baseConverter.binaryBase}</span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="8"
                        className="font-mono hover:bg-yellow-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600 font-bold">8</span>
                          <span>{t.baseConverter.octalBase}</span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="10"
                        className="font-mono hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-bold">10</span>
                          <span>{t.baseConverter.decimalBase}</span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="16"
                        className="font-mono hover:bg-purple-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-purple-600 font-bold">16</span>
                          <span>{t.baseConverter.hexBase}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                  <div className="lg:col-span-3">
                    <Label htmlFor="operand1" className="text-sm font-medium">
                      {t.baseConverter.operand1Label}
                    </Label>
                    <Input
                      id="operand1"
                      value={operand1}
                      onChange={(e) => setOperand1(e.target.value)}
                      placeholder={
                        operandBase === "2"
                          ? "1010"
                          : operandBase === "8"
                          ? "755"
                          : operandBase === "16"
                          ? "FF"
                          : "123"
                      }
                      className="mt-1 h-12 font-mono bg-white border-2 focus:border-primary/50 shadow-sm"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-1">
                      <Label
                        htmlFor="operation"
                        className="text-sm font-medium"
                      >
                        {t.baseConverter.operationLabel}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {t.baseConverter.operationDescription}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={operation}
                      onValueChange={(value) =>
                        setOperation(value as BitOperation)
                      }
                    >
                      <SelectTrigger className="mt-1 h-12 bg-white shadow-lg border-2 hover:border-primary/50 transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-2xl border-2 border-gray-200 rounded-lg">
                        <SelectItem
                          value="and"
                          className="font-mono hover:bg-blue-50 transition-colors"
                        >
                          {t.baseConverter.andOperation}
                        </SelectItem>
                        <SelectItem
                          value="or"
                          className="font-mono hover:bg-green-50 transition-colors"
                        >
                          {t.baseConverter.orOperation}
                        </SelectItem>
                        <SelectItem
                          value="xor"
                          className="font-mono hover:bg-purple-50 transition-colors"
                        >
                          {t.baseConverter.xorOperation}
                        </SelectItem>
                        <SelectItem
                          value="not"
                          className="font-mono hover:bg-red-50 transition-colors"
                        >
                          {t.baseConverter.notOperation}
                        </SelectItem>
                        <SelectItem
                          value="leftShift"
                          className="font-mono hover:bg-yellow-50 transition-colors"
                        >
                          {t.baseConverter.leftShift}
                        </SelectItem>
                        <SelectItem
                          value="rightShift"
                          className="font-mono hover:bg-orange-50 transition-colors"
                        >
                          {t.baseConverter.rightShift}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="operand2" className="text-sm font-medium">
                        {t.baseConverter.operand2Label}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {t.baseConverter.operand2Description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="operand2"
                      value={operand2}
                      onChange={(e) => setOperand2(e.target.value)}
                      placeholder={
                        operation === "not"
                          ? "---"
                          : operandBase === "2"
                          ? "1100"
                          : operandBase === "8"
                          ? "644"
                          : operandBase === "16"
                          ? "AA"
                          : "456"
                      }
                      disabled={operation === "not"}
                      className="mt-1 h-12 font-mono bg-white border-2 focus:border-primary/50 shadow-sm disabled:bg-gray-100 disabled:opacity-50"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <Button
                      onClick={performBitOperation}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      size="lg"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      {t.baseConverter.performOperation}
                    </Button>
                  </div>
                </div>{" "}
                {/* ビット演算のエラーメッセージ */}
                {operationError && (
                  <Alert
                    variant="destructive"
                    className="border-2 border-red-300 shadow-lg"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium">
                      {operationError}
                    </AlertDescription>
                  </Alert>
                )}
                {operationResult && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg border-2 border-emerald-200 shadow-lg">
                    <p className="text-sm text-emerald-700 mb-2 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      {t.baseConverter.operationResult}:
                    </p>
                    <p className="font-mono text-sm bg-white p-3 rounded border-2 border-emerald-100 shadow-inner">
                      {operationResult}
                    </p>
                  </div>
                )}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </ToolSection>

      {/* ASCII文字コード表セクション */}
      <ToolSection>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                <CardTitle>{t.baseConverter.asciiTableTitle}</CardTitle>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAsciiOpen(!isAsciiOpen)}
                      className="h-8 w-8 p-0 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                    >
                      {isAsciiOpen ? (
                        <EyeOff className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-600" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isAsciiOpen
                        ? t.baseConverter.hideTable
                        : t.baseConverter.showTable}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t.baseConverter.asciiTableDescription}
            </p>
          </CardHeader>
          {isAsciiOpen && (
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-medium">
                        {t.baseConverter.asciiCharacter}
                      </th>
                      <th className="text-left p-3 font-medium">
                        {t.baseConverter.asciiDecimal}
                      </th>
                      <th className="text-left p-3 font-medium">
                        {t.baseConverter.asciiBinary}
                      </th>
                      <th className="text-left p-3 font-medium">
                        {t.baseConverter.asciiHex}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {asciiTable.slice(0, 30).map((item, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3 font-mono text-center bg-blue-50">
                          {item.decimal === 32 ? (
                            <span className="bg-yellow-200 px-2 py-1 rounded text-xs font-bold text-gray-700 border border-yellow-300">
                              SPACE
                            </span>
                          ) : (
                            <span className="text-lg">{item.char}</span>
                          )}
                        </td>
                        <td className="p-3 font-mono font-medium">
                          {item.decimal}
                        </td>
                        <td className="p-3 font-mono text-green-600">
                          {item.binary}
                        </td>
                        <td className="p-3 font-mono text-purple-600">
                          0x{item.hex}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      {t.baseConverter.asciiTableNote}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.baseConverter.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
