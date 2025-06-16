"use client";

import { useState, useRef, useCallback } from "react";
import {
  Grid3X3,
  Palette,
  Download,
  Trash2,
  RefreshCw,
  Plus,
  Minus,
  Square,
  Pipette,
  Paintbrush,
  Eraser,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PixelArtEditorClientProps {
  locale: Locale;
  t: Translations;
}

// デフォルトのカラーパレット
const DEFAULT_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
  "#FF6666",
  "#66FF66",
  "#6666FF",
  "#FFFF66",
  "#FF66FF",
  "#66FFFF",
  "#FFB366",
  "#B366FF",
];

type Tool = "brush" | "eraser" | "eyedropper" | "fill";

export default function PixelArtEditorClient({
  locale,
  t,
}: PixelArtEditorClientProps) {
  const [gridSize, setGridSize] = useState(16);
  const [pixels, setPixels] = useState<string[][]>(() =>
    Array(16)
      .fill(null)
      .map(() => Array(16).fill("#FFFFFF"))
  );
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedTool, setSelectedTool] = useState<Tool>("brush");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // グリッドサイズの変更
  const handleGridSizeChange = useCallback(
    (newSize: number) => {
      const size = Math.max(8, Math.min(32, newSize));
      setGridSize(size);

      // 既存のピクセルデータを新しいサイズに合わせて調整
      const newPixels = Array(size)
        .fill(null)
        .map((_, row) =>
          Array(size)
            .fill(null)
            .map((_, col) => {
              if (row < pixels.length && col < pixels[0].length) {
                return pixels[row][col];
              }
              return "#FFFFFF";
            })
        );
      setPixels(newPixels);
    },
    [pixels]
  );

  // ピクセルの描画
  const drawPixel = useCallback(
    (row: number, col: number) => {
      if (selectedTool === "brush") {
        setPixels((prev) => {
          const newPixels = [...prev];
          newPixels[row] = [...newPixels[row]];
          newPixels[row][col] = selectedColor;
          return newPixels;
        });
      } else if (selectedTool === "eraser") {
        setPixels((prev) => {
          const newPixels = [...prev];
          newPixels[row] = [...newPixels[row]];
          newPixels[row][col] = "#FFFFFF";
          return newPixels;
        });
      } else if (selectedTool === "eyedropper") {
        setSelectedColor(pixels[row][col]);
      }
    },
    [selectedColor, selectedTool, pixels]
  );

  // マウスイベント
  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      setIsDrawing(true);
      drawPixel(row, col);
    },
    [drawPixel]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (
        isDrawing &&
        (selectedTool === "brush" || selectedTool === "eraser")
      ) {
        drawPixel(row, col);
      }
    },
    [isDrawing, selectedTool, drawPixel]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // キャンバスのクリア
  const clearCanvas = useCallback(() => {
    setPixels(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill("#FFFFFF"))
    );
  }, [gridSize]);

  // PNG形式でダウンロード
  const downloadAsPNG = useCallback(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelSize = 20;
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    // ピクセルを描画
    pixels.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(
          colIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      });
    });

    // ダウンロード
    const link = document.createElement("a");
    link.download = `pixel-art-${gridSize}x${gridSize}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [pixels, gridSize]);

  // ツールの選択
  const tools = [
    {
      id: "brush" as Tool,
      icon: Paintbrush,
      label: t.pixelArtEditor.tools.brush,
    },
    {
      id: "eraser" as Tool,
      icon: Eraser,
      label: t.pixelArtEditor.tools.eraser,
    },
    {
      id: "eyedropper" as Tool,
      icon: Pipette,
      label: t.pixelArtEditor.tools.eyedropper,
    },
  ];

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.pixelArtEditor.title}
      description={t.pixelArtEditor.description}
      icon={Grid3X3}
    >
      {/* 使い方ガイド */}
      <ToolSection>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              {t.pixelArtEditor.howToUse.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t.pixelArtEditor.howToUse.basic}
                </h4>
                <ul className="space-y-1">
                  <li>• {t.pixelArtEditor.howToUse.step1}</li>
                  <li>• {t.pixelArtEditor.howToUse.step2}</li>
                  <li>• {t.pixelArtEditor.howToUse.step3}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t.pixelArtEditor.howToUse.advanced}
                </h4>
                <ul className="space-y-1">
                  <li>• {t.pixelArtEditor.howToUse.tip1}</li>
                  <li>• {t.pixelArtEditor.howToUse.tip2}</li>
                  <li>• {t.pixelArtEditor.howToUse.tip3}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </ToolSection>

      {/* メインエディター */}
      <ToolSection>
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          {/* ツールパネル（左側） */}
          <div className="xl:w-80 space-y-4">
            {/* ツール選択 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Paintbrush className="h-4 w-4" />
                  {t.pixelArtEditor.toolPanel.tools}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool(tool.id)}
                      className="flex items-center gap-2 justify-center"
                    >
                      <tool.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tool.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* カラーパレット */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  {t.pixelArtEditor.toolPanel.colors}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* 選択中の色 */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 border-2 border-border rounded flex-shrink-0"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-12 h-8 border border-border rounded cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-mono truncate">
                      {selectedColor}
                    </span>
                  </div>

                  {/* デフォルトカラー */}
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
                    {DEFAULT_COLORS.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 border border-border rounded transition-transform hover:scale-110 active:scale-95",
                          selectedColor === color &&
                            "ring-2 ring-primary ring-offset-1"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* キャンバス設定 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  {t.pixelArtEditor.toolPanel.canvasSettings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {t.pixelArtEditor.toolPanel.gridSize}
                    </span>
                    <Badge variant="secondary">
                      {gridSize}×{gridSize}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGridSizeChange(gridSize - 2)}
                      disabled={gridSize <= 8}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center text-sm font-mono bg-muted py-1 rounded">
                      {gridSize}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGridSizeChange(gridSize + 2)}
                      disabled={gridSize >= 32}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* アクション */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  {t.pixelArtEditor.toolPanel.actions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCanvas}
                    className="w-full flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t.pixelArtEditor.actions.clear}
                  </Button>
                  <Button
                    onClick={downloadAsPNG}
                    className="w-full flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t.pixelArtEditor.actions.download}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* キャンバス（右側） */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  {t.pixelArtEditor.canvas.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  {/* キャンバス */}
                  <div
                    ref={canvasRef}
                    className="border-2 border-border rounded-lg p-1 sm:p-2 bg-white overflow-auto max-w-full"
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <div
                      className="grid gap-0 border border-border mx-auto"
                      style={{
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        width: "fit-content",
                        maxWidth: "100%",
                      }}
                    >
                      {pixels.map((row, rowIndex) =>
                        row.map((color, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border border-gray-200 hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: color }}
                            onMouseDown={() =>
                              handleMouseDown(rowIndex, colIndex)
                            }
                            onMouseEnter={() =>
                              handleMouseEnter(rowIndex, colIndex)
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* キャンバス情報 */}
                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      {t.pixelArtEditor.canvas.size}: {gridSize}×{gridSize}{" "}
                      {t.pixelArtEditor.canvas.pixels}
                    </p>
                    <p className="mt-1">
                      {t.pixelArtEditor.canvas.instruction}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.pixelArtEditor.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
