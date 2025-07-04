"use client";

import { useState, useCallback } from "react";
import {
  Boxes,
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

interface FlexboxPlaygroundClientProps {
  locale: Locale;
  t: Translations;
}

interface FlexItem {
  id: number;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;
  alignSelf: string;
  order: string;
}

interface FlexContainer {
  display: string;
  flexDirection: string;
  flexWrap: string;
  justifyContent: string;
  alignItems: string;
  alignContent: string;
  gap: string;
}

export default function FlexboxPlaygroundClient({
  locale,
  t,
}: FlexboxPlaygroundClientProps) {
  // コンテナの初期設定
  const [container, setContainer] = useState<FlexContainer>({
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gap: "8px",
  });

  // アイテムの初期設定
  const [items, setItems] = useState<FlexItem[]>([
    {
      id: 1,
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      alignSelf: "auto",
      order: "0",
    },
    {
      id: 2,
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      alignSelf: "auto",
      order: "0",
    },
    {
      id: 3,
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      alignSelf: "auto",
      order: "0",
    },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<number>(1);

  // アイテム追加
  const addItem = () => {
    const newId = Math.max(...items.map((item) => item.id)) + 1;
    setItems([
      ...items,
      {
        id: newId,
        flexGrow: "0",
        flexShrink: "1",
        flexBasis: "auto",
        alignSelf: "auto",
        order: "0",
      },
    ]);
  };

  // アイテム削除
  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
      if (selectedItemId === id) {
        setSelectedItemId(
          items.find((item) => item.id !== id)?.id || items[0].id
        );
      }
    }
  };

  // すべてリセット
  const resetAll = () => {
    setContainer({
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "stretch",
      gap: "8px",
    });
    setItems([
      {
        id: 1,
        flexGrow: "0",
        flexShrink: "1",
        flexBasis: "auto",
        alignSelf: "auto",
        order: "0",
      },
      {
        id: 2,
        flexGrow: "0",
        flexShrink: "1",
        flexBasis: "auto",
        alignSelf: "auto",
        order: "0",
      },
      {
        id: 3,
        flexGrow: "0",
        flexShrink: "1",
        flexBasis: "auto",
        alignSelf: "auto",
        order: "0",
      },
    ]);
    setSelectedItemId(1);
  };

  // コンテナプロパティ更新
  const updateContainer = (property: keyof FlexContainer, value: string) => {
    setContainer((prev) => ({ ...prev, [property]: value }));
  };

  // アイテムプロパティ更新
  const updateItem = (id: number, property: keyof FlexItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  // CSS生成
  const generatePureCSS = () => {
    const containerCSS = `/* Container Styles */
.flex-container {
  display: ${container.display};
  flex-direction: ${container.flexDirection};
  flex-wrap: ${container.flexWrap};
  justify-content: ${container.justifyContent};
  align-items: ${container.alignItems};
  align-content: ${container.alignContent};
  gap: ${container.gap};
}

/* Item Styles */
${items
  .map(
    (item) =>
      `.flex-item-${item.id} {
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
  align-self: ${item.alignSelf};
  order: ${item.order};
}`
  )
  .join("\n\n")}`;
    return containerCSS;
  };

  // Tailwind CSS生成
  const generateTailwindCSS = () => {
    const containerClasses = [
      container.display === "flex" ? "flex" : "inline-flex",
      container.flexDirection === "row"
        ? "flex-row"
        : container.flexDirection === "row-reverse"
        ? "flex-row-reverse"
        : container.flexDirection === "column"
        ? "flex-col"
        : "flex-col-reverse",
      container.flexWrap === "nowrap"
        ? "flex-nowrap"
        : container.flexWrap === "wrap"
        ? "flex-wrap"
        : "flex-wrap-reverse",
      container.justifyContent === "flex-start"
        ? "justify-start"
        : container.justifyContent === "flex-end"
        ? "justify-end"
        : container.justifyContent === "center"
        ? "justify-center"
        : container.justifyContent === "space-between"
        ? "justify-between"
        : container.justifyContent === "space-around"
        ? "justify-around"
        : "justify-evenly",
      container.alignItems === "stretch"
        ? "items-stretch"
        : container.alignItems === "flex-start"
        ? "items-start"
        : container.alignItems === "flex-end"
        ? "items-end"
        : container.alignItems === "center"
        ? "items-center"
        : "items-baseline",
      container.alignContent === "stretch"
        ? "content-stretch"
        : container.alignContent === "flex-start"
        ? "content-start"
        : container.alignContent === "flex-end"
        ? "content-end"
        : container.alignContent === "center"
        ? "content-center"
        : container.alignContent === "space-between"
        ? "content-between"
        : container.alignContent === "space-around"
        ? "content-around"
        : "content-evenly",
      `gap-[${container.gap}]`,
    ];

    const itemsClasses = items.map((item) => {
      const classes = [];
      if (item.flexGrow !== "0") classes.push(`flex-grow-[${item.flexGrow}]`);
      if (item.flexShrink !== "1")
        classes.push(`flex-shrink-[${item.flexShrink}]`);
      if (item.flexBasis !== "auto")
        classes.push(`flex-basis-[${item.flexBasis}]`);
      if (item.alignSelf !== "auto") {
        const alignSelfClass =
          item.alignSelf === "stretch"
            ? "self-stretch"
            : item.alignSelf === "flex-start"
            ? "self-start"
            : item.alignSelf === "flex-end"
            ? "self-end"
            : item.alignSelf === "center"
            ? "self-center"
            : "self-baseline";
        classes.push(alignSelfClass);
      }
      if (item.order !== "0") classes.push(`order-[${item.order}]`);

      return `/* Item ${item.id} */
<div class="${classes.join(" ")}">Item ${item.id}</div>`;
    });

    return `<!-- Container -->
<div class="${containerClasses.join(" ")}">
${itemsClasses.join("\n")}
</div>`;
  };

  // SCSS生成
  const generateSCSS = () => {
    const containerSCSS = `// Container Styles
.flex-container {
  display: #{$display};
  flex-direction: #{$flex-direction};
  flex-wrap: #{$flex-wrap};
  justify-content: #{$justify-content};
  align-items: #{$align-items};
  align-content: #{$align-content};
  gap: #{$gap};
}

// Variables
$display: ${container.display};
$flex-direction: ${container.flexDirection};
$flex-wrap: ${container.flexWrap};
$justify-content: ${container.justifyContent};
$align-items: ${container.alignItems};
$align-content: ${container.alignContent};
$gap: ${container.gap};

// Item Styles
${items
  .map(
    (item) =>
      `.flex-item-${item.id} {
  flex: ${item.flexGrow} ${item.flexShrink} ${item.flexBasis};
  align-self: ${item.alignSelf};
  order: ${item.order};
}`
  )
  .join("\n\n")}`;
    return containerSCSS;
  };

  // コードコピー
  const copyCode = (code: string, format: string) => {
    navigator.clipboard.writeText(code);
  };

  // コンテナスタイル生成
  const getContainerStyle = (): React.CSSProperties => ({
    display: container.display,
    flexDirection: container.flexDirection as any,
    flexWrap: container.flexWrap as any,
    justifyContent: container.justifyContent as any,
    alignItems: container.alignItems as any,
    alignContent: container.alignContent as any,
    gap: container.gap,
    minHeight: "240px",
    padding: "24px",
    border: "3px dashed #e2e8f0",
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    backgroundImage: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    position: "relative",
    overflow: "auto",
  });

  // アイテムスタイル生成
  const getItemStyle = (item: FlexItem): React.CSSProperties => {
    const isSelected = selectedItemId === item.id;
    return {
      flexGrow: parseFloat(item.flexGrow),
      flexShrink: parseFloat(item.flexShrink),
      flexBasis: item.flexBasis,
      alignSelf: item.alignSelf as any,
      order: parseInt(item.order),
      minWidth: "80px",
      minHeight: "80px",
      padding: "16px",
      backgroundColor: isSelected ? "#3b82f6" : "#f1f5f9",
      backgroundImage: isSelected
        ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
        : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      color: isSelected ? "white" : "#374151",
      borderRadius: "12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: isSelected ? "2px solid #1d4ed8" : "2px solid transparent",
      boxShadow: isSelected
        ? "0 8px 25px -5px rgba(59, 130, 246, 0.5)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transform: isSelected ? "translateY(-2px)" : "translateY(0)",
    };
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.flexboxPlayground.title}
      description={t.flexboxPlayground.description}
      icon={Layout}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.flexboxPlayground.howToUse.title}
          steps={t.flexboxPlayground.howToUse.steps}
          features={{
            title: t.flexboxPlayground.features.title,
            items: t.flexboxPlayground.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 左側：設定パネル */}
          <div className="xl:col-span-1 space-y-6">
            {/* アイテム管理 */}
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-primary">
                  <span className="flex items-center gap-2">
                    <Boxes className="h-5 w-5" />
                    {t.flexboxPlayground.previewControls.selectedItem}
                  </span>
                  <Badge variant="secondary" className="text-sm">
                    {items.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      variant={
                        selectedItemId === item.id ? "default" : "outline"
                      }
                      size="sm"
                      className={`relative transition-all duration-200 ${
                        selectedItemId === item.id
                          ? "shadow-lg scale-105"
                          : "hover:scale-102"
                      }`}
                    >
                      Item {item.id}
                      {items.length > 1 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={addItem}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-dashed border-2 hover:border-primary/50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {t.flexboxPlayground.previewControls.addItem}
                  </Button>
                  <Button
                    onClick={resetAll}
                    size="sm"
                    variant="outline"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* コンテナプロパティ */}
            <Card className="border-2 border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Layout className="h-5 w-5" />
                  {t.flexboxPlayground.sections.containerProperties}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* レイアウト基本設定 */}
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Layout Basics
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display" className="text-sm font-medium">
                        {t.flexboxPlayground.properties.display}
                      </Label>{" "}
                      <Select
                        value={container.display}
                        onValueChange={(value) =>
                          updateContainer("display", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="flex"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.display.flex}
                          </SelectItem>
                          <SelectItem
                            value="inline-flex"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.display.inlineFlex}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="flexDirection"
                        className="text-sm font-medium"
                      >
                        {t.flexboxPlayground.properties.flexDirection}
                      </Label>{" "}
                      <Select
                        value={container.flexDirection}
                        onValueChange={(value) =>
                          updateContainer("flexDirection", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="row"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.flexDirection.row}
                          </SelectItem>
                          <SelectItem
                            value="row-reverse"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.flexDirection
                                .rowReverse
                            }
                          </SelectItem>
                          <SelectItem
                            value="column"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.flexDirection.column}
                          </SelectItem>
                          <SelectItem
                            value="column-reverse"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.flexDirection
                                .columnReverse
                            }
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* アライメント設定 */}
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Alignment
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="justifyContent"
                        className="text-sm font-medium"
                      >
                        {t.flexboxPlayground.properties.justifyContent}
                      </Label>
                      <Select
                        value={container.justifyContent}
                        onValueChange={(value) =>
                          updateContainer("justifyContent", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="flex-start"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.justifyContent
                                .flexStart
                            }
                          </SelectItem>
                          <SelectItem
                            value="flex-end"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.justifyContent.flexEnd}
                          </SelectItem>
                          <SelectItem
                            value="center"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.justifyContent.center}
                          </SelectItem>
                          <SelectItem
                            value="space-between"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.justifyContent
                                .spaceBetween
                            }
                          </SelectItem>
                          <SelectItem
                            value="space-around"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.justifyContent
                                .spaceAround
                            }
                          </SelectItem>
                          <SelectItem
                            value="space-evenly"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.justifyContent
                                .spaceEvenly
                            }
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="alignItems"
                        className="text-sm font-medium"
                      >
                        {t.flexboxPlayground.properties.alignItems}
                      </Label>
                      <Select
                        value={container.alignItems}
                        onValueChange={(value) =>
                          updateContainer("alignItems", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="stretch"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignItems.stretch}
                          </SelectItem>
                          <SelectItem
                            value="flex-start"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignItems.flexStart}
                          </SelectItem>
                          <SelectItem
                            value="flex-end"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignItems.flexEnd}
                          </SelectItem>
                          <SelectItem
                            value="center"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignItems.center}
                          </SelectItem>
                          <SelectItem
                            value="baseline"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignItems.baseline}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* アドバンス設定 */}
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Advanced
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="flexWrap" className="text-sm font-medium">
                        {t.flexboxPlayground.properties.flexWrap}
                      </Label>
                      <Select
                        value={container.flexWrap}
                        onValueChange={(value) =>
                          updateContainer("flexWrap", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="nowrap"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.flexWrap.nowrap}
                          </SelectItem>
                          <SelectItem
                            value="wrap"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.flexWrap.wrap}
                          </SelectItem>
                          <SelectItem
                            value="wrap-reverse"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.flexWrap.wrapReverse}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="alignContent"
                        className="text-sm font-medium"
                      >
                        {t.flexboxPlayground.properties.alignContent}
                      </Label>
                      <Select
                        value={container.alignContent}
                        onValueChange={(value) =>
                          updateContainer("alignContent", value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem
                            value="stretch"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignContent.stretch}
                          </SelectItem>
                          <SelectItem
                            value="flex-start"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignContent.flexStart}
                          </SelectItem>
                          <SelectItem
                            value="flex-end"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignContent.flexEnd}
                          </SelectItem>
                          <SelectItem
                            value="center"
                            className="bg-white hover:bg-gray-50"
                          >
                            {t.flexboxPlayground.values.alignContent.center}
                          </SelectItem>
                          <SelectItem
                            value="space-between"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.alignContent
                                .spaceBetween
                            }
                          </SelectItem>
                          <SelectItem
                            value="space-around"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.alignContent
                                .spaceAround
                            }
                          </SelectItem>
                          <SelectItem
                            value="space-evenly"
                            className="bg-white hover:bg-gray-50"
                          >
                            {
                              t.flexboxPlayground.values.alignContent
                                .spaceEvenly
                            }
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gap" className="text-sm font-medium">
                        {t.flexboxPlayground.properties.gap}
                      </Label>
                      <Input
                        id="gap"
                        value={container.gap}
                        onChange={(e) => updateContainer("gap", e.target.value)}
                        placeholder="8px"
                        className="h-11 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* アイテムプロパティ */}
            {selectedItem && (
              <Card className="border-2 border-purple-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Boxes className="h-5 w-5" />
                    {t.flexboxPlayground.sections.itemProperties}
                    <Badge variant="outline" className="ml-2">
                      Item {selectedItemId}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* フレックス設定 */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Flex Properties
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="flexGrow"
                          className="text-sm font-medium"
                        >
                          {t.flexboxPlayground.properties.flexGrow}
                        </Label>
                        <Input
                          id="flexGrow"
                          value={selectedItem.flexGrow}
                          onChange={(e) =>
                            updateItem(
                              selectedItemId,
                              "flexGrow",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="h-11 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="flexShrink"
                          className="text-sm font-medium"
                        >
                          {t.flexboxPlayground.properties.flexShrink}
                        </Label>
                        <Input
                          id="flexShrink"
                          value={selectedItem.flexShrink}
                          onChange={(e) =>
                            updateItem(
                              selectedItemId,
                              "flexShrink",
                              e.target.value
                            )
                          }
                          placeholder="1"
                          className="h-11 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="flexBasis"
                          className="text-sm font-medium"
                        >
                          {t.flexboxPlayground.properties.flexBasis}
                        </Label>
                        <Input
                          id="flexBasis"
                          value={selectedItem.flexBasis}
                          onChange={(e) =>
                            updateItem(
                              selectedItemId,
                              "flexBasis",
                              e.target.value
                            )
                          }
                          placeholder="auto"
                          className="h-11 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ポジション設定 */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Position
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="alignSelf"
                          className="text-sm font-medium"
                        >
                          {t.flexboxPlayground.properties.alignSelf}
                        </Label>
                        <Select
                          value={selectedItem.alignSelf}
                          onValueChange={(value) =>
                            updateItem(selectedItemId, "alignSelf", value)
                          }
                        >
                          <SelectTrigger className="h-11 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg">
                            <SelectItem
                              value="auto"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.auto}
                            </SelectItem>
                            <SelectItem
                              value="stretch"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.stretch}
                            </SelectItem>
                            <SelectItem
                              value="flex-start"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.flexStart}
                            </SelectItem>
                            <SelectItem
                              value="flex-end"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.flexEnd}
                            </SelectItem>
                            <SelectItem
                              value="center"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.center}
                            </SelectItem>
                            <SelectItem
                              value="baseline"
                              className="bg-white hover:bg-gray-50"
                            >
                              {t.flexboxPlayground.values.alignSelf.baseline}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="order" className="text-sm font-medium">
                          {t.flexboxPlayground.properties.order}
                        </Label>
                        <Input
                          id="order"
                          value={selectedItem.order}
                          onChange={(e) =>
                            updateItem(selectedItemId, "order", e.target.value)
                          }
                          placeholder="0"
                          className="h-11 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 中央：プレビュー */}
          <div className="xl:col-span-2 space-y-6">
            {/* プレビュー */}
            <Card className="border-2 border-indigo-100 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-indigo-700">
                  <span className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    {t.flexboxPlayground.sections.preview}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Live Preview</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div style={getContainerStyle()} className="relative">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={getItemStyle(item)}
                      onClick={() => setSelectedItemId(item.id)}
                      className="transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="text-center">
                        <div className="font-semibold">Item {item.id}</div>
                        {selectedItemId === item.id && (
                          <div className="text-xs opacity-75 mt-1">
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* プレビュー情報 */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="font-medium">Direction:</span>
                        <br />
                        <code className="text-xs bg-white px-2 py-1 rounded">
                          {container.flexDirection}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">Justify:</span>
                        <br />
                        <code className="text-xs bg-white px-2 py-1 rounded">
                          {container.justifyContent}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">Align:</span>
                        <br />
                        <code className="text-xs bg-white px-2 py-1 rounded">
                          {container.alignItems}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">Wrap:</span>
                        <br />
                        <code className="text-xs bg-white px-2 py-1 rounded">
                          {container.flexWrap}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 生成されたコード */}
            <Card className="border-2 border-amber-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Copy className="h-5 w-5" />
                  {t.flexboxPlayground.sections.generatedCode}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="css" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="css" className="text-sm">
                      {t.flexboxPlayground.codeFormat.pureCss}
                    </TabsTrigger>
                    <TabsTrigger value="tailwind" className="text-sm">
                      {t.flexboxPlayground.codeFormat.tailwindCss}
                    </TabsTrigger>
                    <TabsTrigger value="scss" className="text-sm">
                      {t.flexboxPlayground.codeFormat.scss}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="css" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Pure CSS
                      </Badge>
                      <Button
                        onClick={() => {
                          copyCode(generatePureCSS(), "Pure CSS");
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        {t.flexboxPlayground.copy}
                      </Button>
                    </div>
                    <Textarea
                      value={generatePureCSS()}
                      readOnly
                      className="min-h-[300px] font-mono text-sm bg-slate-50 border-2"
                    />
                  </TabsContent>

                  <TabsContent value="tailwind" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Tailwind CSS
                      </Badge>
                      <Button
                        onClick={() => {
                          copyCode(generateTailwindCSS(), "Tailwind CSS");
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        {t.flexboxPlayground.copy}
                      </Button>
                    </div>
                    <Textarea
                      value={generateTailwindCSS()}
                      readOnly
                      className="min-h-[300px] font-mono text-sm bg-slate-50 border-2"
                    />
                  </TabsContent>

                  <TabsContent value="scss" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        SCSS
                      </Badge>
                      <Button
                        onClick={() => {
                          copyCode(generateSCSS(), "SCSS");
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        {t.flexboxPlayground.copy}
                      </Button>
                    </div>
                    <Textarea
                      value={generateSCSS()}
                      readOnly
                      className="min-h-[300px] font-mono text-sm bg-slate-50 border-2"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.flexboxPlayground.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
