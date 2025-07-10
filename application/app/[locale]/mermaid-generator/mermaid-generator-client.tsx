"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Network,
  Copy,
  Download,
  FileImage,
  Code2,
  Play,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  GitBranch,
  Database,
  User,
  Workflow,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Locale, Translations } from "@/locales";

interface MermaidGeneratorClientProps {
  locale: Locale;
  t: Translations;
}

// Mermaidテンプレート（パフォーマンス最適化のため外部に定義）
const templates = {
  flowchartBasic: `graph TD
    A[開始] --> B{条件分岐}
    B -->|Yes| C[処理A]
    B -->|No| D[処理B]
    C --> E[終了]
    D --> E`,
  sequenceBasic: `sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob, how are you?
    B-->>A: Great!
    A-)B: See you later!`,
  ganttBasic: `gantt
    title プロジェクトスケジュール
    dateFormat YYYY-MM-DD
    section 設計
    要件定義    :a1, 2024-01-01, 30d
    基本設計    :after a1, 20d
    section 開発
    実装        :2024-02-20, 45d
    テスト      :30d`,
  classBasic: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog`,
};

export default function MermaidGeneratorClient({
  locale,
  t,
}: MermaidGeneratorClientProps) {
  const [code, setCode] = useState<string>(templates.flowchartBasic);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("flowchartBasic");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState(0);
  const [touchStartZoom, setTouchStartZoom] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mermaidRef = useRef<any>(null);
  const { toast } = useToast();

  // Mermaidライブラリの初期化を最適化
  const initializeMermaid = useCallback(async () => {
    if (mermaidRef.current) return mermaidRef.current;

    try {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
        logLevel: "error",
        // パフォーマンス最適化設定
        suppressErrorRendering: true,
        deterministicIds: true,
      });
      mermaidRef.current = mermaid;
      return mermaid;
    } catch (error) {
      console.error("Failed to initialize Mermaid:", error);
      throw error;
    }
  }, []);

  // エラーメッセージの生成を最適化
  const generateErrorMessage = useCallback(
    (error: any): string => {
      if (!error?.message) return t.mermaidGenerator.preview.error;

      const errorMessage = error.message.toLowerCase();

      if (
        errorMessage.includes("syntax error") ||
        errorMessage.includes("parse error")
      ) {
        return "構文エラー: コードの書式を確認してください";
      }
      if (errorMessage.includes("expected")) {
        return "構文エラー: 期待される要素が見つかりません";
      }
      if (
        errorMessage.includes("undefined") ||
        errorMessage.includes("not defined")
      ) {
        return "未定義の要素が含まれています";
      }
      if (
        errorMessage.includes("duplicate") ||
        errorMessage.includes("already defined")
      ) {
        return "重複する定義があります";
      }
      if (
        errorMessage.includes("invalid character") ||
        errorMessage.includes("unexpected character")
      ) {
        return "無効な文字が含まれています";
      }
      if (errorMessage.includes("flowchart")) {
        return "フローチャートの構文に問題があります";
      }
      if (errorMessage.includes("sequence")) {
        return "シーケンス図の構文に問題があります";
      }
      if (errorMessage.includes("gantt")) {
        return "ガントチャートの構文に問題があります";
      }

      return `エラー: ${error.message}`;
    },
    [t.mermaidGenerator.preview.error]
  );

  // 図表レンダリングを最適化
  const renderDiagram = useCallback(async () => {
    if (!code.trim()) {
      if (previewRef.current) {
        previewRef.current.innerHTML = `<div class="flex items-center justify-center h-40 text-gray-500">${t.mermaidGenerator.preview.noContent}</div>`;
      }
      setPreviewError(null);
      return;
    }

    setIsPreviewLoading(true);
    setPreviewError(null);

    try {
      const mermaid = await initializeMermaid();

      if (previewRef.current) {
        previewRef.current.innerHTML = "";
        const element = document.createElement("div");
        element.className =
          "mermaid-diagram flex justify-center items-center min-h-[200px]";

        try {
          const { svg } = await mermaid.render("mermaid-preview", code);
          element.innerHTML = svg;
          previewRef.current.appendChild(element);
          setPreviewError(null);
        } catch (error: any) {
          console.error("Mermaid rendering error:", error);
          const errorMessage = generateErrorMessage(error);
          setPreviewError(errorMessage);

          element.innerHTML = `
            <div class="flex flex-col items-center justify-center h-40 text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 w-full">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-semibold">構文エラー</span>
              </div>
              <div class="text-sm text-center max-w-md">${errorMessage}</div>
              <div class="text-xs text-gray-500 mt-2 text-center">
                コードを確認してください。テンプレートを参考にすることをお勧めします。
              </div>
            </div>
          `;
          previewRef.current.appendChild(element);
        }
      }
    } catch (error: any) {
      console.error("Failed to load Mermaid:", error);
      const errorMessage = `ライブラリエラー: ${
        error?.message || "Mermaidライブラリの読み込みに失敗しました"
      }`;
      setPreviewError(errorMessage);

      if (previewRef.current) {
        previewRef.current.innerHTML = `
          <div class="flex flex-col items-center justify-center h-40 text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 w-full">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span class="font-semibold">読み込みエラー</span>
            </div>
            <div class="text-sm text-center">${errorMessage}</div>
            <div class="text-xs text-gray-500 mt-2">ページを再読み込みしてお試しください。</div>
          </div>
        `;
      }
    } finally {
      setIsPreviewLoading(false);
    }
  }, [
    code,
    initializeMermaid,
    generateErrorMessage,
    t.mermaidGenerator.preview.noContent,
  ]);

  // デバウンス処理を最適化
  useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    renderTimeoutRef.current = setTimeout(renderDiagram, 300); // 500ms から 300ms に短縮

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [renderDiagram]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, []);

  // テンプレート適用を最適化
  const applyTemplate = useCallback((templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates];
    if (template) {
      setCode(template);
      setSelectedTemplate(templateKey);
      setPreviewError(null);
    }
  }, []);

  // コードコピーを最適化
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: t.mermaidGenerator.export.copySuccess,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: t.mermaidGenerator.export.exportError,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [
    code,
    t.mermaidGenerator.export.copySuccess,
    t.mermaidGenerator.export.exportError,
    toast,
  ]);

  // SVGダウンロードを最適化
  const downloadSvg = useCallback(() => {
    try {
      const svgElement = previewRef.current?.querySelector("svg");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "mermaid-diagram.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);

        toast({
          title: t.mermaidGenerator.export.downloadSuccess,
          duration: 2000,
        });
      } else {
        toast({
          title: "エクスポートできる図表がありません",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: t.mermaidGenerator.export.exportError,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [
    t.mermaidGenerator.export.downloadSuccess,
    t.mermaidGenerator.export.exportError,
    toast,
  ]);

  // PNGダウンロードを最適化
  const downloadPng = useCallback(() => {
    try {
      const svgElement = previewRef.current?.querySelector("svg");
      if (!svgElement) {
        toast({
          title: "エクスポートできる図表がありません",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      const svgRect = svgElement.getBoundingClientRect();
      const svgWidth = svgRect.width || 800;
      const svgHeight = svgRect.height || 600;
      const svgData = new XMLSerializer().serializeToString(svgElement);

      let processedSvgData = svgData;
      if (!svgData.includes("viewBox")) {
        processedSvgData = svgData.replace(
          "<svg",
          `<svg viewBox="0 0 ${svgWidth} ${svgHeight}"`
        );
      }

      const svgDataUri = `data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(processedSvgData))
      )}`;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context could not be created");
      }

      const scale = 2;
      canvas.width = svgWidth * scale;
      canvas.height = svgHeight * scale;
      ctx.scale(scale, scale);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, svgWidth, svgHeight);

      const img = new Image();
      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const pngUrl = URL.createObjectURL(blob);
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = "mermaid-diagram.png";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(pngUrl);

                toast({
                  title: t.mermaidGenerator.export.downloadSuccess,
                  duration: 2000,
                });
              } else {
                throw new Error("Failed to create PNG blob");
              }
            },
            "image/png",
            0.95
          );
        } catch (error) {
          console.error("PNG conversion error:", error);
          toast({
            title: t.mermaidGenerator.export.exportError,
            variant: "destructive",
            duration: 2000,
          });
        }
      };

      img.onerror = () => {
        toast({
          title: "画像の読み込みに失敗しました",
          variant: "destructive",
          duration: 2000,
        });
      };

      img.crossOrigin = "anonymous";
      img.src = svgDataUri;
    } catch (error) {
      console.error("PNG download error:", error);
      toast({
        title: t.mermaidGenerator.export.exportError,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [
    t.mermaidGenerator.export.downloadSuccess,
    t.mermaidGenerator.export.exportError,
    toast,
  ]);

  // コード入力ハンドラーを最適化
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      if (previewError) {
        setPreviewError(null);
      }
    },
    [previewError]
  );

  // ズーム機能
  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.25));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  // パン機能（ドラッグ）
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        // 左クリックのみ
        setIsDragging(true);
        setDragStart({
          x: e.clientX - panPosition.x,
          y: e.clientY - panPosition.y,
        });
      }
    },
    [panPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPanPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // タッチイベントのヘルパー関数
  const getTouchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const getTouchCenter = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return { x: 0, y: 0 };
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  }, []);

  // タッチ開始イベント
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        // 単一タッチ - パン操作
        setIsTouch(true);
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({
          x: touch.clientX - panPosition.x,
          y: touch.clientY - panPosition.y,
        });
      } else if (e.touches.length === 2) {
        // マルチタッチ - ピンチズーム
        setIsTouch(true);
        setIsDragging(false);
        const distance = getTouchDistance(e.touches);
        setTouchStartDistance(distance);
        setTouchStartZoom(zoomLevel);
      }
    },
    [panPosition, zoomLevel, getTouchDistance]
  );

  // タッチ移動イベント
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // スクロールを防止

      if (e.touches.length === 1 && isDragging && isTouch) {
        // 単一タッチ - パン操作
        const touch = e.touches[0];
        setPanPosition({
          x: touch.clientX - dragStart.x,
          y: touch.clientY - dragStart.y,
        });
      } else if (e.touches.length === 2 && touchStartDistance > 0) {
        // マルチタッチ - ピンチズーム
        const currentDistance = getTouchDistance(e.touches);
        const scale = currentDistance / touchStartDistance;
        const newZoom = Math.max(0.25, Math.min(3, touchStartZoom * scale));
        setZoomLevel(newZoom);
      }
    },
    [
      isDragging,
      isTouch,
      touchStartDistance,
      touchStartZoom,
      dragStart,
      getTouchDistance,
    ]
  );

  // タッチ終了イベント
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 0) {
        // 全てのタッチが終了
        setIsTouch(false);
        setIsDragging(false);
        setTouchStartDistance(0);
        setTouchStartZoom(1);
      } else if (e.touches.length === 1) {
        // マルチタッチから単一タッチに変更
        setTouchStartDistance(0);
        setTouchStartZoom(1);
        if (isDragging) {
          const touch = e.touches[0];
          setDragStart({
            x: touch.clientX - panPosition.x,
            y: touch.clientY - panPosition.y,
          });
        }
      }
    },
    [isDragging, panPosition]
  );

  // 図表タイプのアイコンマッピングをメモ化
  const diagramIcons = useMemo(
    () => ({
      flowchart: Workflow,
      sequence: Users,
      gantt: Calendar,
      classDiagram: Code2,
      stateDiagram: GitBranch,
      erDiagram: Database,
      userJourney: User,
      gitgraph: GitBranch,
    }),
    []
  );

  // テンプレート一覧をメモ化
  const templateList = useMemo(
    () =>
      Object.entries({
        flowchartBasic: t.mermaidGenerator.templates.flowchartBasic,
        sequenceBasic: t.mermaidGenerator.templates.sequenceBasic,
        ganttBasic: t.mermaidGenerator.templates.ganttBasic,
        classBasic: t.mermaidGenerator.templates.classBasic,
      }),
    [t.mermaidGenerator.templates]
  );

  // 図表タイプ一覧をメモ化
  const diagramTypeList = useMemo(
    () =>
      Object.entries(t.mermaidGenerator.diagramTypes)
        .slice(1)
        .map(([key, label]) => ({
          key,
          label,
          icon: diagramIcons[key as keyof typeof diagramIcons] || Network,
        })),
    [t.mermaidGenerator.diagramTypes, diagramIcons]
  );

  // プレビュー無効化判定をメモ化
  const isPreviewDisabled = useMemo(() => {
    return !!previewError || isPreviewLoading || !code.trim();
  }, [previewError, isPreviewLoading, code]);

  // 文字数カウントをメモ化
  const codeLength = useMemo(() => code.length, [code]);

  // フルスクリーンモードの切り替え
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // ESCキーでフルスクリーンを終了
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  return (
    <>
      <ToolLayout
        locale={locale}
        t={t}
        title={t.mermaidGenerator.title}
        description={t.mermaidGenerator.description}
        icon={Network}
      >
        {/* How To Use セクション */}
        <ToolSection>
          <ToolHowToUse
            title={t.mermaidGenerator.howToUse.title}
            steps={t.mermaidGenerator.howToUse.steps}
            features={{
              title: t.mermaidGenerator.howToUse.features.title,
              items: t.mermaidGenerator.howToUse.features.items,
            }}
          />
        </ToolSection>

        {/* テンプレートセクション */}
        <ToolSection>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t.mermaidGenerator.templates.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {templateList.map(([key, template]) => (
                  <Button
                    key={key}
                    variant={selectedTemplate === key ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-start gap-2 text-left"
                    onClick={() => applyTemplate(key)}
                  >
                    <div className="font-semibold text-sm leading-tight">
                      {template.name}
                    </div>
                    <div className="text-xs text-left opacity-80 leading-tight">
                      {template.description}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </ToolSection>

        {/* 図表タイプ説明 */}
        <ToolSection>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                {t.mermaidGenerator.diagramTypes.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {diagramTypeList.map(({ key, label, icon: IconComponent }) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="p-2 sm:p-3 flex items-center gap-1 sm:gap-2 justify-start text-left"
                  >
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs leading-tight truncate">
                      {label}
                    </span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </ToolSection>

        {/* エディターとプレビュー */}
        <ToolSection>
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* コード入力エリア */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    <span className="text-sm sm:text-base">
                      {t.mermaidGenerator.input.title}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Textarea
                    value={code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className={`min-h-[300px] sm:min-h-[400px] font-mono text-sm resize-none transition-colors ${
                      previewError
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />

                  {/* 入力ヘルプとエラー表示 */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                    <div className="text-xs text-gray-500 flex-1">
                      {t.mermaidGenerator.input.syntaxHelp}
                    </div>

                    {/* 文字数カウンター */}
                    <div className="text-xs text-gray-400">
                      {codeLength} 文字
                    </div>
                  </div>

                  {/* 構文エラーの簡易表示 */}
                  {previewError && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        構文エラーが検出されました -
                        右側のプレビューで詳細を確認
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* プレビューエリア */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    <span className="text-sm sm:text-base">
                      {t.mermaidGenerator.preview.title}
                    </span>
                    {isPreviewLoading && (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* ズームコントロール */}
                    <div className="flex items-center gap-1 border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.25}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                      >
                        <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <div className="px-1 sm:px-2 text-xs sm:text-sm font-mono min-w-[40px] sm:min-w-[60px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                      >
                        <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleZoomReset}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                      >
                        <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
                      disabled={isPreviewDisabled}
                    >
                      <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">全画面表示</span>
                      <span className="sm:hidden">全画面</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={previewContainerRef}
                  className="min-h-[300px] sm:min-h-[400px] border border-gray-200 rounded-lg bg-white overflow-hidden relative"
                  style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    touchAction: "none", // タッチイベントによるスクロール防止
                  }}
                >
                  {isPreviewLoading && !previewRef.current?.innerHTML && (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        {t.mermaidGenerator.preview.loading}
                      </div>
                    </div>
                  )}
                  <div
                    ref={previewRef}
                    className="mermaid-container w-full h-full flex items-center justify-center"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                      transformOrigin: "center",
                      transition: isDragging
                        ? "none"
                        : "transform 0.2s ease-out",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />

                  {/* ズーム・パン操作のヒント */}
                  {!previewError && previewRef.current?.innerHTML && (
                    <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                      <div className="flex items-center gap-1">
                        <Move className="w-3 h-3" />
                        <span className="hidden sm:inline">
                          ドラッグで移動 | ボタンでズーム
                        </span>
                        <span className="sm:hidden">ドラッグ/ピンチで操作</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* エラー状態の詳細説明 */}
                {previewError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-700 mb-2">
                          構文エラーの詳細
                        </h4>
                        <p className="text-sm text-red-600 mb-3">
                          {previewError}
                        </p>
                        <div className="text-xs text-red-500 space-y-1">
                          <p>
                            • Mermaidの構文ルールに従っているか確認してください
                          </p>
                          <p>
                            • テンプレートを参考にしてコードを修正してください
                          </p>
                          <p>
                            • スペルミスや不正な文字がないかチェックしてください
                          </p>
                          <p>• 括弧やクォートの対応関係を確認してください</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </ToolSection>

        {/* エクスポートセクション */}
        <ToolSection>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                {t.mermaidGenerator.export.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button
                  onClick={copyCode}
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
                  size="sm"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {t.mermaidGenerator.export.copyCode}
                  </span>
                </Button>
                <Button
                  onClick={downloadSvg}
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
                  size="sm"
                  disabled={isPreviewDisabled}
                >
                  <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {t.mermaidGenerator.export.downloadSvg}
                  </span>
                </Button>
                <Button
                  onClick={downloadPng}
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
                  size="sm"
                  disabled={isPreviewDisabled}
                >
                  <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {t.mermaidGenerator.export.downloadPng}
                  </span>
                </Button>
              </div>
              {isPreviewDisabled && (
                <p className="text-xs text-gray-500 mt-2">
                  * 図表が正常に生成されている場合のみダウンロード可能です
                </p>
              )}
            </CardContent>
          </Card>
        </ToolSection>

        {/* FAQ セクション */}
        <ToolSection>
          <ToolFaq faqList={t.mermaidGenerator.faqList} t={t} />
        </ToolSection>
      </ToolLayout>

      {/* フルスクリーンモーダル */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          {/* フルスクリーンヘッダー */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white border-b gap-2">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              <h2 className="text-base sm:text-lg font-semibold">
                {t.mermaidGenerator.preview.title}
              </h2>
              {isPreviewLoading && (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
              {/* フルスクリーンズームコントロール */}
              <div className="flex items-center gap-1 border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.25}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <div className="px-1 sm:px-2 text-xs sm:text-sm font-mono min-w-[40px] sm:min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomReset}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">通常表示</span>
                <span className="sm:hidden">通常</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">閉じる</span>
                <span className="sm:hidden">×</span>
              </Button>
            </div>
          </div>

          {/* フルスクリーンコンテンツ */}
          <div
            className="flex-1 bg-white overflow-hidden relative"
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "none", // タッチイベントによるスクロール防止
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full h-full flex items-center justify-center">
              {isPreviewLoading && !previewRef.current?.innerHTML && (
                <div className="flex items-center justify-center text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-lg">
                      {t.mermaidGenerator.preview.loading}
                    </span>
                  </div>
                </div>
              )}
              <div
                className="mermaid-container w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                  transformOrigin: "center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {previewRef.current?.innerHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: previewRef.current.innerHTML,
                    }}
                    className="w-full h-full flex items-center justify-center"
                  />
                )}
              </div>
            </div>

            {/* フルスクリーンズーム・パン操作のヒント */}
            {!previewError && previewRef.current?.innerHTML && (
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-xs sm:text-sm text-gray-600 bg-white/90 px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Move className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">
                    ドラッグで移動 | ボタンでズーム | ESCで終了
                  </span>
                  <span className="sm:hidden">
                    ドラッグ/ピンチで操作 | ESCで終了
                  </span>
                </div>
              </div>
            )}

            {/* フルスクリーンエラー表示 */}
            {previewError && (
              <div className="absolute inset-3 sm:inset-6 flex items-center justify-center">
                <div className="max-w-sm sm:max-w-md p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-700 mb-2 text-base sm:text-lg">
                        構文エラー
                      </h4>
                      <p className="text-sm text-red-600 mb-3">
                        {previewError}
                      </p>
                      <div className="text-xs text-red-500 space-y-1">
                        <p>コードを修正してから再度お試しください</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* フルスクリーンフッター */}
          <div className="p-3 sm:p-4 bg-white border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="text-xs sm:text-sm text-gray-500">
                ESCキーまたは「閉じる」ボタンで通常表示に戻ります
              </div>
              <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
                <Button
                  onClick={downloadSvg}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 flex-1 sm:flex-none"
                  disabled={isPreviewDisabled}
                >
                  <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
                  SVG
                </Button>
                <Button
                  onClick={downloadPng}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 flex-1 sm:flex-none"
                  disabled={isPreviewDisabled}
                >
                  <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
                  PNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
