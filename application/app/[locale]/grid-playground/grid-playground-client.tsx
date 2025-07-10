"use client";

import { useState, useCallback } from "react";
import {
  Grid3X3,
  Copy,
  Plus,
  Minus,
  RotateCcw,
  Check,
  Layout,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

interface GridPlaygroundClientProps {
  locale: Locale;
  t: Translations;
}

interface GridItem {
  id: number;
  gridColumn: string;
  gridRow: string;
  justifySelf: string;
  alignSelf: string;
}

interface GridContainer {
  display: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  columnGap: string;
  rowGap: string;
  justifyContent: string;
  alignContent: string;
  justifyItems: string;
  alignItems: string;
  gridAutoFlow: string;
}

export default function GridPlaygroundClient({
  locale,
  t,
}: GridPlaygroundClientProps) {
  // グリッドの列数・行数
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<string>("");

  // コンテナの初期設定
  const [container, setContainer] = useState<GridContainer>({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    columnGap: "8px",
    rowGap: "8px",
    justifyContent: "stretch",
    alignContent: "stretch",
    justifyItems: "stretch",
    alignItems: "stretch",
    gridAutoFlow: "row",
  });

  // アイテムの初期設定
  const [items, setItems] = useState<GridItem[]>([
    {
      id: 1,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "auto",
      alignSelf: "auto",
    },
    {
      id: 2,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "auto",
      alignSelf: "auto",
    },
    {
      id: 3,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "auto",
      alignSelf: "auto",
    },
  ]);

  // 列数・行数変更時の処理
  const updateColumns = (newColumns: number) => {
    setColumns(newColumns);
    setContainer((prev) => ({
      ...prev,
      gridTemplateColumns: `repeat(${newColumns}, 1fr)`,
    }));
  };

  const updateRows = (newRows: number) => {
    setRows(newRows);
    setContainer((prev) => ({
      ...prev,
      gridTemplateRows: `repeat(${newRows}, 1fr)`,
    }));
  };

  // アイテム追加
  const addItem = () => {
    const newId = Math.max(...items.map((item) => item.id)) + 1;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        gridColumn: "auto",
        gridRow: "auto",
        justifySelf: "auto",
        alignSelf: "auto",
      },
    ]);
    setSelectedItemId(newId);
  };

  // アイテム削除
  const removeItem = () => {
    if (items.length > 1) {
      setItems((prev) => prev.slice(0, -1));
      if (selectedItemId === items[items.length - 1].id) {
        setSelectedItemId(items[0].id);
      }
    }
  };

  // リセット機能
  const resetGrid = () => {
    setColumns(3);
    setRows(3);
    setContainer({
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
      columnGap: "8px",
      rowGap: "8px",
      justifyContent: "stretch",
      alignContent: "stretch",
      justifyItems: "stretch",
      alignItems: "stretch",
      gridAutoFlow: "row",
    });
    setItems([
      {
        id: 1,
        gridColumn: "auto",
        gridRow: "auto",
        justifySelf: "auto",
        alignSelf: "auto",
      },
      {
        id: 2,
        gridColumn: "auto",
        gridRow: "auto",
        justifySelf: "auto",
        alignSelf: "auto",
      },
      {
        id: 3,
        gridColumn: "auto",
        gridRow: "auto",
        justifySelf: "auto",
        alignSelf: "auto",
      },
    ]);
    setSelectedItemId(1);
  };

  // コンテナプロパティ更新
  const updateContainer = (property: keyof GridContainer, value: string) => {
    setContainer((prev) => ({ ...prev, [property]: value }));
  };

  // アイテムプロパティ更新
  const updateItem = (id: number, property: keyof GridItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  // CSS生成
  const generatePureCSS = () => {
    const containerCSS = `/* Grid Container Styles */
.grid-container {
  display: ${container.display};
  grid-template-columns: ${container.gridTemplateColumns};
  grid-template-rows: ${container.gridTemplateRows};
  column-gap: ${container.columnGap};
  row-gap: ${container.rowGap};
  justify-content: ${container.justifyContent};
  align-content: ${container.alignContent};
  justify-items: ${container.justifyItems};
  align-items: ${container.alignItems};
  grid-auto-flow: ${container.gridAutoFlow};
}

/* Grid Item Styles */
${items
  .map(
    (item) =>
      `.grid-item-${item.id} {
  grid-column: ${item.gridColumn};
  grid-row: ${item.gridRow};
  justify-self: ${item.justifySelf};
  align-self: ${item.alignSelf};
}`
  )
  .join("\n\n")}`;
    return containerCSS;
  };

  const generateTailwindCSS = () => {
    const gapClass = Math.floor(
      parseInt(container.columnGap.replace("px", "")) / 4
    );
    const containerClasses = `<!-- Grid Container Classes -->
<div class="grid grid-cols-${columns} grid-rows-${rows} gap-${gapClass}">
${items
  .map(
    (item, index) =>
      `  <div class="grid-item">
    Item ${index + 1}
  </div>`
  )
  .join("\n")}
</div>`;
    return containerClasses;
  };

  const generateSCSS = () => {
    const scssCode = `// Grid Container Variables
$grid-template-columns: ${container.gridTemplateColumns};
$grid-template-rows: ${container.gridTemplateRows};
$column-gap: ${container.columnGap};
$row-gap: ${container.rowGap};
$display: ${container.display};

// Grid Container Styles
.grid-container {
  display: $display;
  grid-template-columns: $grid-template-columns;
  grid-template-rows: $grid-template-rows;
  column-gap: $column-gap;
  row-gap: $row-gap;
  justify-content: ${container.justifyContent};
  align-content: ${container.alignContent};
  justify-items: ${container.justifyItems};
  align-items: ${container.alignItems};
  grid-auto-flow: ${container.gridAutoFlow};

  // Grid Item Styles
${items
  .map(
    (item, index) =>
      `  .item-${index + 1} {
    grid-column: ${item.gridColumn};
    grid-row: ${item.gridRow};
    justify-self: ${item.justifySelf};
    align-self: ${item.alignSelf};
  }`
  )
  .join("\n\n")}
}`;
    return scssCode;
  };

  // コピー機能
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.gridPlayground.title}
      description={t.gridPlayground.description}
      icon={Grid3X3}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.gridPlayground.howToUse.title}
          steps={t.gridPlayground.howToUse.steps}
          features={{
            title: t.gridPlayground.features.title,
            items: t.gridPlayground.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="space-y-6">
          {/* トップコントロールバー */}
          <Card className="border-2 border-indigo-100 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* グリッド基本設定 */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Grid3X3 className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-700">
                      {t.gridPlayground.sections.containerProperties}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium min-w-0">
                      {t.gridPlayground.controls.columns}:
                    </Label>
                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 border">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateColumns(Math.max(1, columns - 1))}
                        disabled={columns <= 1}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-mono min-w-[2ch] text-center">
                        {columns}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateColumns(Math.min(10, columns + 1))}
                        disabled={columns >= 10}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium min-w-0">
                      {t.gridPlayground.controls.rows}:
                    </Label>
                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 border">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateRows(Math.max(1, rows - 1))}
                        disabled={rows <= 1}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-mono min-w-[2ch] text-center">
                        {rows}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateRows(Math.min(10, rows + 1))}
                        disabled={rows >= 10}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={addItem}
                    size="sm"
                    variant="outline"
                    className="gap-1 border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {t.gridPlayground.controls.addItem}
                    </span>
                  </Button>
                  <Button
                    onClick={removeItem}
                    size="sm"
                    variant="outline"
                    disabled={items.length <= 1}
                    className="gap-1 border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {t.gridPlayground.controls.removeItem}
                    </span>
                  </Button>
                  <Button
                    onClick={resetGrid}
                    size="sm"
                    variant="outline"
                    className="gap-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {t.gridPlayground.controls.resetGrid}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左側：設定パネル */}
            <div className="lg:col-span-1 space-y-4">
              {/* アイテム選択 */}
              <Card className="border-2 border-purple-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg pb-3">
                  <CardTitle className="flex items-center justify-between text-purple-700 text-base">
                    <span className="flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4" />
                      {t.gridPlayground.controls.selectedItem}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {items.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        variant={
                          selectedItemId === item.id ? "default" : "outline"
                        }
                        size="sm"
                        className={`text-xs transition-all duration-200 ${
                          selectedItemId === item.id
                            ? "shadow-md scale-105 bg-gradient-to-r from-purple-500 to-pink-500"
                            : "hover:scale-102 hover:border-purple-300"
                        }`}
                      >
                        {item.id}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* アイテムプロパティ */}
              {selectedItem && (
                <Card className="border-2 border-purple-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg pb-3">
                    {" "}
                    <CardTitle className="flex items-center gap-2 text-purple-700 text-base">
                      <Grid3X3 className="h-4 w-4" />
                      {t.gridPlayground.preview.item} {selectedItemId}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {t.gridPlayground.properties.gridColumn}
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.properties.gridColumn}
                            </Label>
                            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              Current: {selectedItem.gridColumn}
                            </div>
                          </div>
                          <Select
                            value={selectedItem.gridColumn}
                            onValueChange={(value) =>
                              updateItem(selectedItemId, "gridColumn", value)
                            }
                          >
                            <SelectTrigger className="h-10 text-sm bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-400 transition-colors">
                              <SelectValue
                                placeholder={
                                  t.gridPlayground.properties.gridColumn
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-xl">
                              <SelectItem
                                value="auto"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                {t.gridPlayground.values.justifySelf.auto}
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                Column 1
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Column 2
                              </SelectItem>
                              <SelectItem
                                value="3"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                Column 3
                              </SelectItem>
                              <SelectItem
                                value="1 / 3"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                1 / 3 (span 2 columns)
                              </SelectItem>
                              <SelectItem
                                value="1 / -1"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                1 / -1 (full width)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.properties.gridRow}
                            </Label>
                            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              Current: {selectedItem.gridRow}
                            </div>
                          </div>
                          <Select
                            value={selectedItem.gridRow}
                            onValueChange={(value) =>
                              updateItem(selectedItemId, "gridRow", value)
                            }
                          >
                            <SelectTrigger className="h-10 text-sm bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-400 transition-colors">
                              <SelectValue
                                placeholder={
                                  t.gridPlayground.properties.gridRow
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-xl">
                              <SelectItem
                                value="auto"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                auto (default flow)
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                Row 1
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Row 2
                              </SelectItem>
                              <SelectItem
                                value="3"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                Row 3
                              </SelectItem>
                              <SelectItem
                                value="1 / 3"
                                className="flex items-center gap-2"
                              >
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                1 / 3 (span 2 rows)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {t.gridPlayground.properties.alignSelf}
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.properties.justifySelf}
                            </Label>
                            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {selectedItem.justifySelf}
                            </div>
                          </div>
                          <Select
                            value={selectedItem.justifySelf}
                            onValueChange={(value) =>
                              updateItem(selectedItemId, "justifySelf", value)
                            }
                          >
                            <SelectTrigger className="h-10 text-sm bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-400 transition-colors">
                              <SelectValue
                                placeholder={
                                  t.gridPlayground.properties.justifySelf
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-xl">
                              <SelectItem
                                value="auto"
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-2 bg-gray-300 rounded"></div>
                                {t.gridPlayground.values.justifySelf.auto}
                              </SelectItem>
                              <SelectItem
                                value="start"
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-2 bg-blue-400 rounded mr-2"></div>
                                {t.gridPlayground.values.justifySelf.start}
                              </SelectItem>
                              <SelectItem
                                value="end"
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-2 bg-green-400 rounded ml-auto"></div>
                                {t.gridPlayground.values.justifySelf.end}
                              </SelectItem>
                              <SelectItem
                                value="center"
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-2 bg-yellow-400 rounded mx-auto"></div>
                                {t.gridPlayground.values.justifySelf.center}
                              </SelectItem>
                              <SelectItem
                                value="stretch"
                                className="flex items-center gap-2"
                              >
                                <div className="w-full h-2 bg-purple-400 rounded"></div>
                                {t.gridPlayground.values.justifySelf.stretch}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="text-xs text-gray-500 italic">
                            Controls horizontal positioning within the grid cell
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.properties.alignSelf}
                            </Label>
                            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {selectedItem.alignSelf}
                            </div>
                          </div>
                          <Select
                            value={selectedItem.alignSelf}
                            onValueChange={(value) =>
                              updateItem(selectedItemId, "alignSelf", value)
                            }
                          >
                            <SelectTrigger className="h-10 text-sm bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-400 transition-colors">
                              <SelectValue placeholder="Select vertical alignment" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-xl">
                              <SelectItem
                                value="auto"
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-4 bg-gray-300 rounded"></div>
                                auto (inherit from container)
                              </SelectItem>
                              <SelectItem
                                value="start"
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-4 bg-blue-400 rounded"></div>
                                start (top align)
                              </SelectItem>
                              <SelectItem
                                value="end"
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-4 bg-green-400 rounded"></div>
                                end (bottom align)
                              </SelectItem>
                              <SelectItem
                                value="center"
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-4 bg-yellow-400 rounded"></div>
                                center (vertical center)
                              </SelectItem>
                              <SelectItem
                                value="stretch"
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-full bg-purple-400 rounded"></div>
                                stretch (fill height)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="text-xs text-gray-500 italic">
                            Controls vertical positioning within the grid cell
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* コンテナ設定 */}
              <Card className="border-2 border-green-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 text-base">
                    <Layout className="h-4 w-4" />
                    {t.gridPlayground.sections.containerProperties}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* ギャップ設定 */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      {t.gridPlayground.controls.columnGap}
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-3">
                        {" "}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.controls.columnGap}
                            </Label>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono bg-green-50 px-2 py-1 rounded border">
                              {container.columnGap}
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <Slider
                            value={[
                              parseInt(container.columnGap.replace("px", "")),
                            ]}
                            onValueChange={([value]) =>
                              updateContainer("columnGap", `${value}px`)
                            }
                            max={50}
                            min={0}
                            step={2}
                            className="w-full [&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-600 [&_[role=slider]]:shadow-lg [&_[role=slider]]:scale-110 hover:[&_[role=slider]]:scale-125 transition-transform"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0px</span>
                            <span className="text-green-600 font-medium">
                              {parseInt(
                                container.columnGap.replace("px", "")
                              ) === 0 && "No gap"}
                              {parseInt(container.columnGap.replace("px", "")) >
                                0 &&
                                parseInt(
                                  container.columnGap.replace("px", "")
                                ) <= 10 &&
                                "Tight"}
                              {parseInt(container.columnGap.replace("px", "")) >
                                10 &&
                                parseInt(
                                  container.columnGap.replace("px", "")
                                ) <= 25 &&
                                "Normal"}
                              {parseInt(container.columnGap.replace("px", "")) >
                                25 && "Spacious"}
                            </span>
                            <span>50px</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {" "}
                          <div className="flex items-center gap-2">
                            <Label className="text-xs font-medium text-gray-700">
                              {t.gridPlayground.controls.rowGap}
                            </Label>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono bg-green-50 px-2 py-1 rounded border">
                              {container.rowGap}
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <Slider
                            value={[
                              parseInt(container.rowGap.replace("px", "")),
                            ]}
                            onValueChange={([value]) =>
                              updateContainer("rowGap", `${value}px`)
                            }
                            max={50}
                            min={0}
                            step={2}
                            className="w-full [&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-600 [&_[role=slider]]:shadow-lg [&_[role=slider]]:scale-110 hover:[&_[role=slider]]:scale-125 transition-transform"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0px</span>
                            <span className="text-green-600 font-medium">
                              {parseInt(container.rowGap.replace("px", "")) ===
                                0 && "No gap"}
                              {parseInt(container.rowGap.replace("px", "")) >
                                0 &&
                                parseInt(container.rowGap.replace("px", "")) <=
                                  10 &&
                                "Tight"}
                              {parseInt(container.rowGap.replace("px", "")) >
                                10 &&
                                parseInt(container.rowGap.replace("px", "")) <=
                                  25 &&
                                "Normal"}
                              {parseInt(container.rowGap.replace("px", "")) >
                                25 && "Spacious"}
                            </span>
                            <span>50px</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* アライメント設定 */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      {t.gridPlayground.properties.alignItems}
                    </div>
                    <div className="space-y-3">
                      {" "}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs font-medium text-gray-700">
                            {t.gridPlayground.properties.justifyItems}
                          </Label>
                          <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            {container.justifyItems}
                          </div>
                        </div>
                        <Select
                          value={container.justifyItems}
                          onValueChange={(value) =>
                            updateContainer("justifyItems", value)
                          }
                        >
                          {" "}
                          <SelectTrigger className="h-10 text-sm bg-white border-2 border-green-200 hover:border-green-300 focus:border-green-400 transition-colors">
                            <SelectValue
                              placeholder={
                                t.gridPlayground.properties.justifyItems
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-xl">
                            <SelectItem
                              value="start"
                              className="flex items-center gap-2"
                            >
                              <div className="w-4 h-2 bg-blue-400 rounded"></div>
                              {t.gridPlayground.values.justifyItems.start}
                            </SelectItem>
                            <SelectItem
                              value="end"
                              className="flex items-center gap-2"
                            >
                              <div className="w-4 h-2 bg-green-400 rounded ml-auto"></div>
                              {t.gridPlayground.values.justifyItems.end}
                            </SelectItem>
                            <SelectItem
                              value="center"
                              className="flex items-center gap-2"
                            >
                              <div className="w-4 h-2 bg-yellow-400 rounded mx-auto"></div>
                              {t.gridPlayground.values.justifyItems.center}
                            </SelectItem>
                            <SelectItem
                              value="stretch"
                              className="flex items-center gap-2"
                            >
                              <div className="w-full h-2 bg-purple-400 rounded"></div>
                              {t.gridPlayground.values.justifyItems.stretch}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500 italic">
                          Default horizontal alignment for all grid items
                        </div>
                      </div>{" "}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs font-medium text-gray-700">
                            {t.gridPlayground.properties.alignItems}
                          </Label>
                          <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            {container.alignItems}
                          </div>
                        </div>
                        <Select
                          value={container.alignItems}
                          onValueChange={(value) =>
                            updateContainer("alignItems", value)
                          }
                        >
                          <SelectTrigger className="h-10 text-sm bg-white border-2 border-green-200 hover:border-green-300 focus:border-green-400 transition-colors">
                            <SelectValue placeholder="Select vertical alignment for all items" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-xl">
                            <SelectItem
                              value="start"
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-4 bg-blue-400 rounded"></div>
                              start (align top)
                            </SelectItem>
                            <SelectItem
                              value="end"
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-4 bg-green-400 rounded"></div>
                              end (align bottom)
                            </SelectItem>
                            <SelectItem
                              value="center"
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-4 bg-yellow-400 rounded"></div>
                              center (center all)
                            </SelectItem>
                            <SelectItem
                              value="stretch"
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-full bg-purple-400 rounded"></div>
                              stretch (fill height)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500 italic">
                          Default vertical alignment for all grid items
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右側：プレビューとコード */}
            <div className="lg:col-span-3 space-y-4">
              {/* プレビューセクション */}
              <Card className="border-2 border-blue-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg pb-3">
                  <CardTitle className="flex items-center justify-between text-blue-700 text-base">
                    <span className="flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      {t.gridPlayground.preview.title}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {columns}×{rows} grid
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[400px]">
                    <div
                      className="w-full h-full min-h-[350px] relative"
                      style={{
                        display: container.display,
                        gridTemplateColumns: container.gridTemplateColumns,
                        gridTemplateRows: container.gridTemplateRows,
                        columnGap: container.columnGap,
                        rowGap: container.rowGap,
                        justifyContent: container.justifyContent,
                        alignContent: container.alignContent,
                        justifyItems: container.justifyItems,
                        alignItems: container.alignItems,
                        gridAutoFlow: container.gridAutoFlow,
                      }}
                    >
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className={`
                            relative rounded-lg p-3 transition-all duration-300 cursor-pointer
                            flex items-center justify-center font-semibold text-sm
                            border-2 hover:shadow-lg hover:-translate-y-1
                            ${
                              selectedItemId === item.id
                                ? "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 ring-4 ring-purple-200 shadow-lg scale-105"
                                : "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 hover:from-blue-200 hover:to-blue-300"
                            }
                          `}
                          style={{
                            gridColumn: item.gridColumn,
                            gridRow: item.gridRow,
                            justifySelf: item.justifySelf,
                            alignSelf: item.alignSelf,
                            color:
                              selectedItemId === item.id
                                ? "#7c3aed"
                                : "#1e40af",
                          }}
                          onClick={() => setSelectedItemId(item.id)}
                        >
                          <span className="relative z-10">
                            {t.gridPlayground.preview.item} {item.id}
                          </span>
                          {selectedItemId === item.id && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 生成されたコードセクション */}
              <Card className="border-2 border-gray-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-700 text-base">
                    <Copy className="h-4 w-4" />
                    {t.gridPlayground.sections.generatedCode}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Tabs defaultValue="pureCSS" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100">
                      <TabsTrigger
                        value="pureCSS"
                        className="text-sm data-[state=active]:bg-white"
                      >
                        {t.gridPlayground.tabs.pureCSS}
                      </TabsTrigger>
                      <TabsTrigger
                        value="tailwindCSS"
                        className="text-sm data-[state=active]:bg-white"
                      >
                        {t.gridPlayground.tabs.tailwindCSS}
                      </TabsTrigger>
                      <TabsTrigger
                        value="scss"
                        className="text-sm data-[state=active]:bg-white"
                      >
                        {t.gridPlayground.tabs.scss}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pureCSS" className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {t.gridPlayground.tabs.pureCSS}
                        </Badge>
                        <Button
                          onClick={() => copyToClipboard(generatePureCSS())}
                          size="sm"
                          variant="outline"
                          className="gap-2 h-8"
                        >
                          {copiedCode === generatePureCSS() ? (
                            <>
                              <Check className="h-3 w-3" />
                              {t.gridPlayground.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              {t.gridPlayground.copy}
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={generatePureCSS()}
                        readOnly
                        className="min-h-[300px] font-mono text-sm bg-slate-50 border-2 resize-none"
                      />
                    </TabsContent>

                    <TabsContent value="tailwindCSS" className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-cyan-50 text-cyan-700"
                        >
                          {t.gridPlayground.tabs.tailwindCSS}
                        </Badge>
                        <Button
                          onClick={() => copyToClipboard(generateTailwindCSS())}
                          size="sm"
                          variant="outline"
                          className="gap-2 h-8"
                        >
                          {copiedCode === generateTailwindCSS() ? (
                            <>
                              <Check className="h-3 w-3" />
                              {t.gridPlayground.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              {t.gridPlayground.copy}
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={generateTailwindCSS()}
                        readOnly
                        className="min-h-[300px] font-mono text-sm bg-slate-50 border-2 resize-none"
                      />
                    </TabsContent>

                    <TabsContent value="scss" className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-pink-50 text-pink-700"
                        >
                          {t.gridPlayground.tabs.scss}
                        </Badge>
                        <Button
                          onClick={() => copyToClipboard(generateSCSS())}
                          size="sm"
                          variant="outline"
                          className="gap-2 h-8"
                        >
                          {copiedCode === generateSCSS() ? (
                            <>
                              <Check className="h-3 w-3" />
                              {t.gridPlayground.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              {t.gridPlayground.copy}
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={generateSCSS()}
                        readOnly
                        className="min-h-[300px] font-mono text-sm bg-slate-50 border-2 resize-none"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.gridPlayground.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
