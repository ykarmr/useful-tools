"use client";

import { useState, useCallback } from "react";
import { v1 as uuidv1, v4 as uuidv4, v6 as uuidv6, v7 as uuidv7 } from "uuid";
import { ulid } from "ulid";
import {
  Hash,
  Copy,
  RefreshCw,
  Trash2,
  Settings,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Locale, Translations } from "@/locales";

interface IdGeneratorClientProps {
  locale: Locale;
  t: Translations;
}

type IdType = "uuid" | "ulid" | "guid";
type UuidVersion = "v1" | "v4" | "v6" | "v7";

interface GeneratedId {
  id: string;
  type: IdType;
  version?: UuidVersion;
  timestamp: Date;
}

interface Stats {
  totalGenerated: number;
  totalCopied: number;
  lastGenerated: Date | null;
  averageLength: number;
}

export default function IdGeneratorClient({
  locale,
  t,
}: IdGeneratorClientProps) {
  // エラー・成功メッセージ状態
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // 設定状態
  const [idType, setIdType] = useState<IdType>("uuid");
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState<number>(1);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);

  // 生成結果
  const [generatedIds, setGeneratedIds] = useState<GeneratedId[]>([]);

  // 統計
  const [stats, setStats] = useState<Stats>({
    totalGenerated: 0,
    totalCopied: 0,
    lastGenerated: null,
    averageLength: 0,
  });

  // メッセージ補間ヘルパー
  const interpolateMessage = (
    template: string,
    values: Record<string, any>
  ) => {
    return template.replace(/\{(\w+)\}/g, (match, key) => values[key] || match);
  };

  // メッセージ表示ヘルパー
  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setSuccessMessage("");
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
    setErrorMessage("");
  }, []);

  // UUID生成関数
  const generateUuid = useCallback((version: UuidVersion): string => {
    switch (version) {
      case "v1":
        return uuidv1();
      case "v4":
        return uuidv4();
      case "v6":
        return uuidv6();
      case "v7":
        return uuidv7();
      default:
        return uuidv4();
    }
  }, []);

  // ULID生成関数
  const generateUlid = useCallback((): string => {
    return ulid();
  }, []);

  // ULIDにハイフンを追加する関数
  const addHyphensToUlid = useCallback((ulidString: string): string => {
    // ULIDフォーマット: 26文字 -> 01ARYZ6S-41TS-V4RR-FFQ6-9G5FAV
    if (ulidString.length !== 26) return ulidString;
    return `${ulidString.slice(0, 8)}-${ulidString.slice(
      8,
      12
    )}-${ulidString.slice(12, 16)}-${ulidString.slice(
      16,
      20
    )}-${ulidString.slice(20)}`;
  }, []);

  // GUID生成関数
  const generateGuid = useCallback((): string => {
    const uuid = uuidv4();
    return `{${uuid.toUpperCase()}}`;
  }, []);

  // ID生成関数
  const generateId = useCallback(
    (type: IdType, version?: UuidVersion): string => {
      let id: string;

      switch (type) {
        case "uuid":
          id = generateUuid(version || "v4");
          break;
        case "ulid":
          id = generateUlid();
          // ULIDのハイフン処理
          if (hyphens) {
            id = addHyphensToUlid(id);
          }
          break;
        case "guid":
          id = generateGuid();
          break;
        default:
          id = generateUuid("v4");
      }

      // 形式オプションを適用（UUIDとGUIDのみ）
      if (type === "uuid") {
        if (!hyphens && id.includes("-")) {
          id = id.replace(/-/g, "");
        }
        if (uppercase) {
          id = id.toUpperCase();
        } else {
          id = id.toLowerCase();
        }
      } else if (type === "ulid") {
        // ULIDの大文字小文字処理
        if (uppercase) {
          id = id.toUpperCase();
        } else {
          id = id.toLowerCase();
        }
      }
      // GUIDは元々{}で囲まれて大文字のため処理しない

      return id;
    },
    [
      generateUuid,
      generateUlid,
      addHyphensToUlid,
      generateGuid,
      uppercase,
      hyphens,
    ]
  );

  // ID生成ハンドラー
  const handleGenerate = useCallback(() => {
    if (count < 1 || count > 100) {
      showError(t.idGenerator.messages.invalidRange);
      return;
    }

    const newIds: GeneratedId[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const id = generateId(idType, uuidVersion);
      newIds.push({
        id,
        type: idType,
        version: idType === "uuid" ? uuidVersion : undefined,
        timestamp: now,
      });
    }

    setGeneratedIds(newIds);

    // 統計を更新
    const totalLength = newIds.reduce((sum, item) => sum + item.id.length, 0);
    const avgLength = Math.round(totalLength / newIds.length);

    setStats((prev) => ({
      totalGenerated: prev.totalGenerated + newIds.length,
      totalCopied: prev.totalCopied,
      lastGenerated: now,
      averageLength: avgLength,
    }));

    showSuccess(
      interpolateMessage(t.idGenerator.messages.generateSuccess, {
        count: newIds.length,
      })
    );
  }, [
    count,
    idType,
    uuidVersion,
    generateId,
    showError,
    showSuccess,
    interpolateMessage,
    t,
  ]);

  // 個別コピー
  const handleCopy = useCallback(
    async (id: string) => {
      try {
        await navigator.clipboard.writeText(id);
        setStats((prev) => ({
          ...prev,
          totalCopied: prev.totalCopied + 1,
        }));
        showSuccess(t.idGenerator.messages.copySuccess);
      } catch (error) {
        showError(t.idGenerator.messages.copyError);
      }
    },
    [showSuccess, showError, t]
  );

  // 全てコピー
  const handleCopyAll = useCallback(async () => {
    if (generatedIds.length === 0) return;

    try {
      const allIds = generatedIds.map((item) => item.id).join("\n");
      await navigator.clipboard.writeText(allIds);
      setStats((prev) => ({
        ...prev,
        totalCopied: prev.totalCopied + generatedIds.length,
      }));
      showSuccess(
        interpolateMessage(t.idGenerator.messages.copyAllSuccess, {
          count: generatedIds.length,
        })
      );
    } catch (error) {
      showError(t.idGenerator.messages.copyError);
    }
  }, [generatedIds, showSuccess, showError, interpolateMessage, t]);

  // クリア
  const handleClear = useCallback(() => {
    setGeneratedIds([]);
  }, []);

  // フォーマット済みID表示
  const formatIdForDisplay = (id: string) => {
    return id;
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.idGenerator.title}
      description={t.idGenerator.description}
      icon={Hash}
    >
      {/* How to Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.idGenerator.howToUse.title}
          steps={t.idGenerator.howToUse.steps}
          features={{
            title: t.idGenerator.features.title,
            items: t.idGenerator.features.items,
          }}
        />
      </ToolSection>

      {/* ID形式の説明セクション */}
      <ToolSection>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          {t.idGenerator.formats.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* UUID */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700 text-sm sm:text-base">
                <Target className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {t.idGenerator.formats.uuid.title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {t.idGenerator.formats.uuid.description}
              </p>
              <div className="p-2 bg-white/70 rounded-lg border border-purple-100 overflow-hidden">
                <code className="text-xs text-purple-800 font-mono block break-all">
                  {t.idGenerator.formats.uuid.example}
                </code>
              </div>
              <div className="space-y-1">
                {Object.entries(t.idGenerator.formats.uuid.versions).map(
                  ([version, description]) => (
                    <div
                      key={version}
                      className="flex items-start gap-2 min-w-0"
                    >
                      <Badge
                        variant="outline"
                        className="text-xs border-purple-300 text-purple-700 flex-shrink-0"
                      >
                        {version.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-600 flex-1 leading-relaxed break-words min-w-0">
                        {description}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* ULID */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-700 text-sm sm:text-base">
                <Sparkles className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {t.idGenerator.formats.ulid.title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {t.idGenerator.formats.ulid.description}
              </p>
              <div className="p-2 bg-white/70 rounded-lg border border-orange-100 overflow-hidden">
                <code className="text-xs text-orange-800 font-mono block break-all">
                  {t.idGenerator.formats.ulid.example}
                </code>
              </div>
              <div className="space-y-1">
                {t.idGenerator.formats.ulid.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 min-w-0">
                    <div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                    <span className="text-xs text-gray-600 leading-relaxed break-words min-w-0">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GUID */}
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 md:col-span-2 lg:col-span-1 min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-cyan-700 text-sm sm:text-base">
                <Hash className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {t.idGenerator.formats.guid.title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {t.idGenerator.formats.guid.description}
              </p>
              <div className="p-2 bg-white/70 rounded-lg border border-cyan-100 overflow-hidden">
                <code className="text-xs text-cyan-800 font-mono block break-all">
                  {t.idGenerator.formats.guid.example}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolSection>

      {/* メイン設定・生成セクション */}
      <ToolSection>
        {/* エラー・成功メッセージ */}
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert className="mb-4 border-green-200 text-green-800 bg-green-50">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 lg:grid-cols-3">
          {/* 設定パネル */}
          <div className="lg:col-span-1 order-1">
            <Card className="lg:sticky lg:top-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Settings className="h-4 w-4" />
                  {t.idGenerator.generateSection.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-3 sm:px-6">
                {/* ID種別選択 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    {t.idGenerator.types.label}
                  </Label>
                  <RadioGroup
                    value={idType}
                    onValueChange={(value) => setIdType(value as IdType)}
                  >
                    <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem
                        value="uuid"
                        id="uuid"
                        className="mt-1 flex-shrink-0"
                      />
                      <Label
                        htmlFor="uuid"
                        className="cursor-pointer flex-1 min-w-0"
                      >
                        <div className="font-medium text-blue-700">
                          {t.idGenerator.types.uuid.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 break-words">
                          {t.idGenerator.types.uuid.description}
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem
                        value="ulid"
                        id="ulid"
                        className="mt-1 flex-shrink-0"
                      />
                      <Label
                        htmlFor="ulid"
                        className="cursor-pointer flex-1 min-w-0"
                      >
                        <div className="font-medium text-orange-700">
                          {t.idGenerator.types.ulid.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 break-words">
                          {t.idGenerator.types.ulid.description}
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem
                        value="guid"
                        id="guid"
                        className="mt-1 flex-shrink-0"
                      />
                      <Label
                        htmlFor="guid"
                        className="cursor-pointer flex-1 min-w-0"
                      >
                        <div className="font-medium text-cyan-700">
                          {t.idGenerator.types.guid.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 break-words">
                          {t.idGenerator.types.guid.description}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* UUIDバージョン選択 */}
                {idType === "uuid" && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      {t.idGenerator.settings.version.label}
                    </Label>
                    <RadioGroup
                      value={uuidVersion}
                      onValueChange={(value) =>
                        setUuidVersion(value as UuidVersion)
                      }
                    >
                      {[
                        {
                          value: "v1",
                          label: t.idGenerator.settings.version.v1,
                        },
                        {
                          value: "v4",
                          label: t.idGenerator.settings.version.v4,
                        },
                        {
                          value: "v6",
                          label: t.idGenerator.settings.version.v6,
                        },
                        {
                          value: "v7",
                          label: t.idGenerator.settings.version.v7,
                        },
                      ].map((version) => (
                        <div
                          key={version.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={version.value}
                            id={version.value}
                          />
                          <Label
                            htmlFor={version.value}
                            className="cursor-pointer text-sm"
                          >
                            {version.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <Separator />

                {/* 生成個数 */}
                <div className="space-y-3">
                  <Label
                    htmlFor="count"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t.idGenerator.settings.count.label}
                  </Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    placeholder={t.idGenerator.settings.count.placeholder}
                    className="w-full"
                  />
                </div>

                {/* 表示形式オプション */}
                {idType !== "guid" && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      {t.idGenerator.settings.formatLabel}
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="uppercase"
                          checked={uppercase}
                          onCheckedChange={(checked) =>
                            setUppercase(checked as boolean)
                          }
                          className="mt-1 flex-shrink-0"
                        />
                        <Label
                          htmlFor="uppercase"
                          className="cursor-pointer flex-1 min-w-0"
                        >
                          <div className="font-medium text-sm">
                            {t.idGenerator.settings.uppercase.label}
                          </div>
                          <div className="text-xs text-gray-600 mt-1 break-words">
                            {t.idGenerator.settings.uppercase.description}
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="hyphens"
                          checked={hyphens}
                          onCheckedChange={(checked) =>
                            setHyphens(checked as boolean)
                          }
                          className="mt-1 flex-shrink-0"
                        />
                        <Label
                          htmlFor="hyphens"
                          className="cursor-pointer flex-1 min-w-0"
                        >
                          <div className="font-medium text-sm">
                            {t.idGenerator.settings.hyphens.label}
                          </div>
                          <div className="text-xs text-gray-600 mt-1 break-words">
                            {t.idGenerator.settings.hyphens.description}
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* 生成ボタン */}
                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t.idGenerator.buttons.generate}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 結果表示エリア */}
          <div className="lg:col-span-2 order-2">
            {generatedIds.length === 0 ? (
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                  <Hash className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-500 mb-2 text-center">
                    {t.idGenerator.result.empty}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 text-center max-w-md">
                    {t.idGenerator.result.emptyDescription}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                      {t.idGenerator.result.title}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {generatedIds.length} {t.idGenerator.result.generated}
                      </Badge>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 md:gap-2">
                      <Button
                        onClick={handleCopyAll}
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 flex-1 min-w-0 md:flex-initial"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {t.idGenerator.buttons.copyAll}
                        </span>
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 flex-1 min-w-0 md:flex-initial"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {t.idGenerator.buttons.regenerate}
                        </span>
                      </Button>
                      <Button
                        onClick={handleClear}
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 flex-1 min-w-0 md:flex-initial"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {t.idGenerator.buttons.clear}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {generatedIds.map((item, index) => (
                      <div
                        key={index}
                        className="group p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={`text-xs flex-shrink-0 ${
                                  item.type === "uuid"
                                    ? "border-blue-300 text-blue-700 bg-blue-50"
                                    : item.type === "ulid"
                                    ? "border-orange-300 text-orange-700 bg-orange-50"
                                    : "border-cyan-300 text-cyan-700 bg-cyan-50"
                                }`}
                              >
                                {item.type.toUpperCase()}
                                {item.version && ` ${item.version}`}
                              </Badge>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {item.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="relative mb-3">
                              <code className="block text-xs font-mono bg-gray-50 p-2 rounded border break-all select-all w-full overflow-hidden">
                                {formatIdForDisplay(item.id)}
                              </code>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              onClick={() => handleCopy(item.id)}
                              variant="outline"
                              size="sm"
                              className="text-xs px-3 py-1 w-full sm:w-auto"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              {t.idGenerator.buttons.copy}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.idGenerator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
