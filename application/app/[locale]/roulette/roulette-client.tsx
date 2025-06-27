"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Trash2,
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  Target,
  Edit2,
  Check,
  X,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { SupportedLocale } from "@/lib/i18n";
import { interpolate, Translations } from "@/locales";

interface RouletteItem {
  id: string;
  text: string;
  color: string;
  enabled: boolean;
}

const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Purple
  "#98D8C8", // Mint
  "#F7DC6F", // Gold
  "#BB8FCE", // Lavender
  "#85C1E9", // Sky Blue
];

interface RouletteClientProps {
  locale: SupportedLocale;
  t: Translations;
}

export default function RouletteClient({ locale, t }: RouletteClientProps) {
  const [items, setItems] = useState<RouletteItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [winner, setWinner] = useState<RouletteItem | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Arrow pointer configuration (fixed at top - 0 degrees)
  const ARROW_ANGLE = 0; // degrees - points to top

  // Load items from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(`roulette-items-${locale}`);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      } else {
        // デフォルトアイテムをi18nから取得
        const defaultItems = [
          {
            id: "1",
            text: t.roulette?.defaultItems?.item1 || "Pizza",
            color: COLORS[0],
            enabled: true,
          },
          {
            id: "2",
            text: t.roulette?.defaultItems?.item2 || "Sushi",
            color: COLORS[1],
            enabled: true,
          },
          {
            id: "3",
            text: t.roulette?.defaultItems?.item3 || "Burger",
            color: COLORS[2],
            enabled: true,
          },
          {
            id: "4",
            text: t.roulette?.defaultItems?.item4 || "Pasta",
            color: COLORS[3],
            enabled: true,
          },
        ];
        setItems(defaultItems);
      }
    } catch (error) {
      console.error("Error loading roulette items:", error);
    }
  }, [locale, t]);

  // Save items to localStorage whenever items change
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem(`roulette-items-${locale}`, JSON.stringify(items));
      }
    } catch (error) {
      console.error("Error saving roulette items:", error);
    }
  }, [items, locale]);

  const enabledItems = items.filter((item) => item.enabled);

  const addItem = () => {
    if (newItem.trim() && items.length < 20) {
      const newRouletteItem: RouletteItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        color: COLORS[items.length % COLORS.length],
        enabled: true,
      };
      setItems([...items, newRouletteItem]);
      setNewItem("");
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItemEnabled = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  // 編集モードを開始
  const startEditing = (id: string, currentText: string) => {
    setEditingItem(id);
    setEditText(currentText);
  };

  // 編集をキャンセル
  const cancelEditing = () => {
    setEditingItem(null);
    setEditText("");
  };

  // 編集を保存
  const saveEdit = () => {
    if (editingItem && editText.trim()) {
      setItems(
        items.map((item) =>
          item.id === editingItem ? { ...item, text: editText.trim() } : item
        )
      );
      setEditingItem(null);
      setEditText("");
    }
  };

  // Enterキーで保存、Escapeキーでキャンセル
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  // Normalize angle to 0-360 range
  const normalizeAngle = (angle: number): number => {
    return ((angle % 360) + 360) % 360;
  };

  // 当選ロジック：上部（0度位置）にあるセグメントを特定する関数（完全再実装）
  const getPointedSegment = (currentRotation: number): number => {
    if (enabledItems.length === 0) return -1;

    // セグメント1つあたりの角度
    const segmentAngle = 360 / enabledItems.length;

    // 回転角度を正規化
    const normalizedRotation = normalizeAngle(currentRotation);

    // ホイールは時計回りに回転する
    // セグメントは上部（0度）から時計回りに0, 1, 2...の順で配置されている
    // 回転後に上部（0度）位置にあるセグメントのインデックスを計算

    // 回転により、元々上部にあったセグメント0が現在どの位置にあるかを計算
    // そして、現在上部（0度）にあるのは元々どのセグメントかを逆算する
    const segmentIndex =
      Math.floor((360 - normalizedRotation) / segmentAngle) %
      enabledItems.length;

    return segmentIndex;
  };

  // Check if a segment is pointed by the arrow
  const isSegmentPointed = (segmentIndex: number): boolean => {
    if (enabledItems.length === 0) return false;
    return getPointedSegment(rotation) === segmentIndex;
  };

  const spinWheel = () => {
    if (enabledItems.length < 2 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // より自然なランダム回転を計算
    const minSpins = 5;
    const maxSpins = 10;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomFinalAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomFinalAngle;
    const spinDuration = 3500 + Math.random() * 1500;

    setRotation(totalRotation);

    // 当選者決定
    setTimeout(() => {
      try {
        if (enabledItems.length > 0) {
          const winnerIndex = getPointedSegment(totalRotation);

          setWinner(enabledItems[winnerIndex]);
        }
      } catch (error) {
        console.error("Error selecting roulette item:", error);
      } finally {
        setIsSpinning(false);
      }
    }, spinDuration);
  };

  const resetGame = () => {
    setWinner(null);
    setRotation(0);
  };

  // Create winner zone path - arrow pointer pointing down at top position
  const createArrowPointerPath = () => {
    const centerX = 150;
    const centerY = 150;
    const arrowLength = 50;
    const arrowWidth = 35;

    // Arrow pointing down from top center (0 degrees position)
    const tipX = centerX;
    const tipY = centerY - 125; // Just outside the wheel at top
    const baseY = tipY - arrowLength;
    const leftX = centerX - arrowWidth / 2;
    const rightX = centerX + arrowWidth / 2;

    return `M ${tipX} ${tipY} L ${leftX} ${baseY} L ${rightX} ${baseY} Z`;
  };

  // Create wheel segments
  const createWheelSegments = () => {
    if (enabledItems.length === 0) return null;

    const centerX = 150;
    const centerY = 150;
    const radius = 140;
    const segmentAngle = 360 / enabledItems.length;

    return enabledItems.map((item, index) => {
      // セグメントは上部（0度）から時計回りに配置
      const startAngle = index * segmentAngle * (Math.PI / 180);
      const endAngle = (index + 1) * segmentAngle * (Math.PI / 180);
      const midAngle = (startAngle + endAngle) / 2;

      // Calculate path for segment
      const x1 = centerX + radius * Math.cos(startAngle - Math.PI / 2); // -90度オフセット（上部から開始）
      const y1 = centerY + radius * Math.sin(startAngle - Math.PI / 2);
      const x2 = centerX + radius * Math.cos(endAngle - Math.PI / 2);
      const y2 = centerY + radius * Math.sin(endAngle - Math.PI / 2);

      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      // Calculate text position
      const textRadius = radius * 0.7;
      const textX = centerX + textRadius * Math.cos(midAngle - Math.PI / 2);
      const textY = centerY + textRadius * Math.sin(midAngle - Math.PI / 2);
      const textRotation = ((midAngle - Math.PI / 2) * 180) / Math.PI;

      const isPointed = isSegmentPointed(index);

      return (
        <g key={item.id}>
          {/* Segment */}
          <path
            d={pathData}
            fill={item.color}
            stroke="#ffffff"
            strokeWidth="2"
            style={{
              filter: isPointed
                ? "brightness(1.2) drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
                : "none",
            }}
          />

          {/* Arrow pointer highlight */}
          {isPointed && <path d={pathData} fill="rgba(34, 197, 94, 0.3)" />}

          {/* Text */}
          <text
            x={textX}
            y={textY}
            fill="white"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${
              textRotation > 90 && textRotation < 270
                ? textRotation + 180
                : textRotation
            }, ${textX}, ${textY})`}
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              pointerEvents: "none",
            }}
          >
            {item.text.length > 8
              ? `${item.text.substring(0, 8)}...`
              : item.text}
          </text>
        </g>
      );
    });
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.roulette?.title || "Decision Roulette"}
      subtitle={t.roulette?.subtitle || "Let the wheel decide your choice"}
      description={
        t.roulette?.description || "Add your options and let the wheel decide!"
      }
      icon={Target}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.roulette?.howToUse?.title || "How to Use the Roulette"}
          steps={t.roulette?.howToUse?.steps || []}
          features={{
            title: t.roulette?.features?.title || "Key Features",
            items: t.roulette?.features?.items || [],
          }}
        />
      </ToolSection>

      {/* レスポンシブレイアウト：モバイルは縦積み、PCは2カラム */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Left Column: Wheel Section */}
        <div className="lg:order-1">
          <ToolSection>
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-lg">
              <div className="relative mt-6">
                {/* Arrow Pointer Indicator - モバイル対応 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 md:-translate-y-8 z-20">
                  <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-lg backdrop-blur-sm border border-green-300">
                    <div className="text-xs font-bold text-center tracking-wide">
                      {t.roulette?.winnerPointer || "WINNER POINTER"}
                    </div>
                    <div className="text-xs text-center opacity-90 hidden md:block">
                      {t.roulette?.arrowPoints || "Arrow Points Here"}
                    </div>
                  </div>
                </div>

                {/* Wheel Container - レスポンシブサイズ */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
                  {/* Fixed Arrow Pointer Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {/* Arrow pointer */}
                      <path
                        d={createArrowPointerPath()}
                        fill="rgba(34, 197, 94, 0.9)"
                        stroke="rgba(34, 197, 94, 1)"
                        strokeWidth="2"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                      />
                      {/* Arrow shadow for better visibility */}
                      <path
                        d={createArrowPointerPath()}
                        fill="none"
                        stroke="rgba(0, 0, 0, 0.2)"
                        strokeWidth="1"
                        transform="translate(1, 1)"
                      />
                    </svg>
                  </div>

                  <div
                    ref={wheelRef}
                    className="w-full h-full transition-transform ease-out"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transitionDuration: isSpinning ? "4s" : "0s",
                    }}
                  >
                    {enabledItems.length === 0 || enabledItems.length === 1 ? (
                      <div className="w-full h-full bg-gray-100 rounded-full border-4 border-gray-300 flex items-center justify-center">
                        <p className="text-gray-500 text-center px-4 text-sm">
                          {t.roulette?.addItemsToStart ||
                            "Add items to start spinning"}
                        </p>
                      </div>
                    ) : (
                      <svg viewBox="0 0 300 300" className="drop-shadow-lg">
                        {/* Background circle */}
                        <circle
                          cx="150"
                          cy="150"
                          r="140"
                          fill="#f8fafc"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />

                        {/* Wheel segments */}
                        {createWheelSegments()}

                        {/* Center circle */}
                        <circle
                          cx="150"
                          cy="150"
                          r="20"
                          fill="#1f2937"
                          stroke="#ffffff"
                          strokeWidth="3"
                        />
                        <circle cx="150" cy="150" r="8" fill="#ffffff" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Instructions - モバイル対応 */}
                <div className="mt-4 text-center px-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t.roulette?.segmentsLandInZone ||
                      "The segment at the top (arrow position) wins"}
                  </p>
                </div>

                {/* Control Buttons - 改善版 */}
                <ToolControls className="mt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={spinWheel}
                      disabled={enabledItems.length < 2 || isSpinning}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all w-full sm:w-auto flex items-center justify-center space-x-3"
                    >
                      <Play size={24} />
                      <span className="text-lg">
                        {isSpinning
                          ? t.roulette?.spinning || "Spinning..."
                          : t.roulette?.spinWheel || "Spin Wheel"}
                      </span>
                    </button>

                    {(winner || rotation > 0) && (
                      <button
                        onClick={resetGame}
                        disabled={isSpinning}
                        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all w-full sm:w-auto flex items-center justify-center space-x-2"
                      >
                        <RotateCcw size={20} />
                        <span>{t.roulette?.resetGame || "Reset"}</span>
                      </button>
                    )}
                  </div>
                </ToolControls>

                {enabledItems.length < 2 && items.length > 0 && (
                  <div className="mt-4 px-2">
                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-amber-800 p-3 rounded-xl text-center">
                      <p className="text-sm font-medium">
                        {t.roulette?.needMoreItems ||
                          "At least 2 enabled items are required to spin the wheel"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Winner Display - モバイル対応 */}
                {winner && (
                  <div className="mt-6 px-2">
                    <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white p-6 md:p-8 rounded-2xl shadow-2xl text-center transform scale-105 animate-pulse border-4 border-white">
                      <div className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center space-x-2">
                        <span className="text-2xl">🎉</span>
                        <span>{t.roulette?.winner || "Winner!"}</span>
                        <span className="text-2xl">🎉</span>
                      </div>
                      <div
                        className="text-2xl md:text-3xl font-bold px-4 py-3 md:px-6 md:py-4 bg-white bg-opacity-25 rounded-xl inline-block break-words max-w-full backdrop-blur-sm border border-white border-opacity-30"
                        style={{
                          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                          minHeight: "3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {winner.text}
                      </div>
                      <div className="mt-4 text-sm opacity-90">
                        ✨ {t.roulette?.landedInZone || "Congratulations!"} ✨
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ToolSection>
        </div>

        {/* Right Column: Add New Item & Items List */}
        <div className="lg:order-2 space-y-6">
          {/* Add New Item - モバイル対応 */}
          <ToolSection>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 lg:p-8 border border-indigo-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Plus size={18} className="text-white" />
                </div>
                {t.roulette?.addItems || "Add Items"}
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  placeholder={t.roulette?.enterOption || "Enter an option..."}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-sm"
                  maxLength={20}
                />
                <button
                  onClick={addItem}
                  disabled={!newItem.trim() || items.length >= 20}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  aria-label={t.common?.add || "Add item"}
                >
                  <Plus size={20} className="sm:mr-0 mr-2" />
                  <span className="sm:hidden font-medium">
                    {t.roulette?.addItems || "Add Item"}
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm text-gray-600 mt-4 px-1">
                <span className="font-medium">
                  {interpolate(t.roulette?.itemsCount || "{count}/20 items", {
                    count: items.length.toString(),
                  })}
                </span>
                <span className="font-medium text-indigo-600">
                  {interpolate(t.roulette?.enabledCount || "{count} enabled", {
                    count: enabledItems.length.toString(),
                  })}
                </span>
              </div>
            </div>
          </ToolSection>

          {/* Items List - モバイル対応 */}
          <ToolSection>
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Target size={18} className="text-white" />
                </div>
                {t.roulette?.currentItems || "Current Items"}
              </h3>

              {items.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2 font-medium">
                    {t.roulette?.noItemsAdded || "No items added yet"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t.roulette?.addItemsInstruction ||
                      "Add items using the field above"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all border-2 hover:scale-[1.02] ${
                        item.enabled
                          ? "bg-gradient-to-r from-white to-gray-50 border-gray-200 shadow-md hover:shadow-lg"
                          : "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 opacity-70"
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div
                          className="w-5 h-5 rounded-full border-3 border-white shadow-lg flex-shrink-0"
                          style={{
                            backgroundColor: item.enabled
                              ? item.color
                              : "#9CA3AF",
                            boxShadow: item.enabled
                              ? `0 0 0 2px ${item.color}40`
                              : "none",
                          }}
                        ></div>

                        {editingItem === item.id ? (
                          // 編集モード - モバイル対応
                          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              onBlur={saveEdit}
                              className="flex-1 px-2 py-1 sm:px-3 sm:py-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-0"
                              maxLength={20}
                              autoFocus
                            />
                            <button
                              onClick={saveEdit}
                              className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0"
                              aria-label={
                                t.roulette?.saveChanges || "Save changes"
                              }
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0"
                              aria-label={t.roulette?.cancel || "Cancel"}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          // 表示モード - モバイル対応
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <span
                              className={`font-semibold cursor-pointer hover:text-indigo-600 transition-all text-base truncate ${
                                item.enabled
                                  ? "text-gray-900"
                                  : "text-gray-500 line-through"
                              }`}
                              onClick={() => startEditing(item.id, item.text)}
                              title={`${item.text} - ${
                                t.roulette?.clickToEdit || "Click to edit"
                              }`}
                            >
                              {item.text}
                            </span>
                            {!item.enabled && (
                              <span className="text-xs text-white bg-gray-400 px-2 py-1 rounded-full flex-shrink-0 font-medium">
                                {t.roulette?.disabled || "Disabled"}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {editingItem !== item.id && (
                          <button
                            onClick={() => startEditing(item.id, item.text)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shadow-sm hover:shadow-md"
                            aria-label={interpolate(
                              t.roulette?.editItem || "Edit {item}",
                              { item: item.text }
                            )}
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => toggleItemEnabled(item.id)}
                          className={`p-2 rounded-lg transition-all shadow-sm hover:shadow-md ${
                            item.enabled
                              ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-orange-25"
                              : "text-green-500 hover:text-green-600 hover:bg-green-50 bg-green-25"
                          }`}
                          aria-label={
                            item.enabled
                              ? interpolate(
                                  t.roulette?.disableItem || "Disable {item}",
                                  { item: item.text }
                                )
                              : interpolate(
                                  t.roulette?.enableItem || "Enable {item}",
                                  { item: item.text }
                                )
                          }
                        >
                          {item.enabled ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 bg-red-25 rounded-lg transition-all shadow-sm hover:shadow-md"
                          aria-label={interpolate(
                            t.roulette?.removeItem || "Remove {item}",
                            { item: item.text }
                          )}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ToolSection>
        </div>
      </div>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.roulette.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
