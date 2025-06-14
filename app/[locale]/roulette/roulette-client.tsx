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
  const wheelRef = useRef<HTMLDivElement>(null);

  // Winner zone configuration (30 degrees centered at top)
  const WINNER_ZONE_ANGLE = 30; // degrees
  const WINNER_ZONE_START = -WINNER_ZONE_ANGLE / 2; // -15 degrees from top
  const WINNER_ZONE_END = WINNER_ZONE_ANGLE / 2; // +15 degrees from top

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
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    return angle;
  };

  // Check if a segment is in the winner zone
  const isSegmentInWinnerZone = (segmentIndex: number): boolean => {
    if (enabledItems.length === 0) return false;

    const segmentAngle = 360 / enabledItems.length;

    // Calculate segment's current position after rotation
    // Segments start at -90 degrees (top), so we add 90 to normalize to 0 degrees = top
    const segmentStartAngle = normalizeAngle(
      segmentIndex * segmentAngle - rotation + 90
    );
    const segmentEndAngle = normalizeAngle(
      (segmentIndex + 1) * segmentAngle - rotation + 90
    );

    // Winner zone is from 345 to 15 degrees (30 degrees centered at 0/360)
    const zoneStart = 360 - 15; // 345 degrees
    const zoneEnd = 15; // 15 degrees

    // Check if segment overlaps with winner zone
    if (segmentStartAngle <= segmentEndAngle) {
      // Normal case: segment doesn't cross 0 degrees
      return (
        (segmentStartAngle <= zoneEnd && segmentEndAngle >= zoneStart) ||
        segmentStartAngle <= zoneEnd ||
        segmentEndAngle >= zoneStart
      );
    } else {
      // Segment crosses 0 degrees
      return true; // If segment crosses 0, it's likely in the zone
    }
  };

  const spinWheel = () => {
    if (enabledItems.length < 2 || isSpinning) return;

    setIsSpinning(true);

    // Calculate random rotation
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomAngle;

    setRotation(totalRotation);

    // Determine winner after animation
    setTimeout(() => {
      try {
        if (enabledItems.length > 0) {
          const segmentAngle = 360 / enabledItems.length;

          // Find which segment is at the top (0 degrees) after rotation
          // The winner zone is fixed at the top, so we need to find which segment is there
          const normalizedRotation = normalizeAngle(totalRotation);

          // Calculate which segment is at the top (accounting for the -90 degree offset)
          const topAngle = normalizeAngle(90 - normalizedRotation);
          const winnerIndex =
            Math.floor(topAngle / segmentAngle) % enabledItems.length;

          alert(
            `${t.roulette?.winner || "Winner!"}: ${
              enabledItems[winnerIndex].text
            }`
          );
        }
      } catch (error) {
        console.error("Error selecting roulette item:", error);
      } finally {
        setIsSpinning(false);
      }
    }, 1000);
  };

  // Create winner zone path (fixed at top)
  const createWinnerZonePath = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 140;

    // Winner zone from -15 to +15 degrees (30 degrees total at top)
    const startAngleRad = ((360 - 15) * Math.PI) / 180; // 345 degrees
    const endAngleRad = (15 * Math.PI) / 180; // 15 degrees

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  // Create wheel segments
  const createWheelSegments = () => {
    if (enabledItems.length === 0) return null;

    const centerX = 150;
    const centerY = 150;
    const radius = 140;
    const segmentAngle = 360 / enabledItems.length;

    return enabledItems.map((item, index) => {
      const startAngle = (index * segmentAngle - 90) * (Math.PI / 180); // Start from top (-90 degrees)
      const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
      const midAngle = (startAngle + endAngle) / 2;

      // Calculate path for segment
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      // Calculate text position
      const textRadius = radius * 0.7;
      const textX = centerX + textRadius * Math.cos(midAngle);
      const textY = centerY + textRadius * Math.sin(midAngle);
      const textRotation = (midAngle * 180) / Math.PI;

      const isInWinnerZone = isSegmentInWinnerZone(index);

      return (
        <g key={item.id}>
          {/* Segment */}
          <path
            d={pathData}
            fill={item.color}
            stroke="#ffffff"
            strokeWidth="2"
            style={{
              filter: isInWinnerZone ? "brightness(1.1)" : "none",
            }}
          />

          {/* Winner zone highlight */}
          {isInWinnerZone && (
            <path d={pathData} fill="rgba(34, 197, 94, 0.2)" />
          )}

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
      description={
        t.roulette?.description || "Add your options and let the wheel decide!"
      }
      icon={Target}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Wheel Section */}
        <ToolSection>
          <div className="relative">
            {/* Winner Zone Indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-20">
              <div className="bg-gradient-to-b from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-xs font-bold text-center">
                  {t.roulette?.winnerZone || "WINNER ZONE"}
                </div>
                <div className="text-xs text-center opacity-90">
                  {t.roulette?.landingArea || "Landing Area"}
                </div>
              </div>
              {/* Arrow pointing down */}
              <div className="flex justify-center">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-green-600"></div>
              </div>
            </div>

            {/* Wheel Container */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Fixed Winner Zone Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Winner zone background */}
                  <path
                    d={createWinnerZonePath()}
                    fill="rgba(34, 197, 94, 0.15)"
                    stroke="rgba(34, 197, 94, 0.6)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  {/* Winner zone border lines */}
                  <line
                    x1="150"
                    y1="150"
                    x2={150 + 140 * Math.cos(((360 - 15) * Math.PI) / 180)}
                    y2={150 + 140 * Math.sin(((360 - 15) * Math.PI) / 180)}
                    stroke="rgba(34, 197, 94, 0.8)"
                    strokeWidth="2"
                  />
                  <line
                    x1="150"
                    y1="150"
                    x2={150 + 140 * Math.cos((15 * Math.PI) / 180)}
                    y2={150 + 140 * Math.sin((15 * Math.PI) / 180)}
                    stroke="rgba(34, 197, 94, 0.8)"
                    strokeWidth="2"
                  />
                  {/* Center marker for winner zone */}
                  <line
                    x1="150"
                    y1="150"
                    x2="150"
                    y2="10"
                    stroke="rgba(34, 197, 94, 1)"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              <div
                ref={wheelRef}
                className="w-full h-full transition-transform duration-3000 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {enabledItems.length === 0 ? (
                  <div className="w-full h-full bg-gray-100 rounded-full border-4 border-gray-300 flex items-center justify-center">
                    <p className="text-gray-500 text-center px-4">
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

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {t.roulette?.segmentsLandInZone ||
                  "Segments landing in the green zone win"}
              </p>
            </div>
            <ToolControls className="mt-2">
              <button
                onClick={spinWheel}
                disabled={enabledItems.length < 2 || isSpinning}
                className="button-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={20} />
                <span>
                  {isSpinning
                    ? t.roulette?.spinning || "Spinning..."
                    : t.roulette?.spinWheel || "Spin Wheel"}
                </span>
              </button>
            </ToolControls>

            {enabledItems.length < 2 && items.length > 0 && (
              <p className="text-amber-600 text-sm mt-4 text-center">
                {t.roulette?.needMoreItems ||
                  "At least 2 enabled items are required to spin the wheel"}
              </p>
            )}
          </div>
        </ToolSection>

        {/* Add New Item */}
        <ToolSection title={t.roulette?.addItems || "Add Items"}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder={t.roulette?.enterOption || "Enter an option..."}
              className="flex-1 input-field"
              maxLength={20}
            />
            <button
              onClick={addItem}
              disabled={!newItem.trim() || items.length >= 20}
              className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={t.common?.add || "Add item"}
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-3">
            <span>
              {interpolate(t.roulette?.itemsCount || "{count}/20 items", {
                count: items.length.toString(),
              })}
            </span>
            <span>
              {interpolate(t.roulette?.enabledCount || "{count} enabled", {
                count: enabledItems.length.toString(),
              })}
            </span>
          </div>
          {/* Items List */}
          <ToolSection title={t.roulette?.currentItems || "Current Items"}>
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">
                  {t.roulette?.noItemsAdded || "No items added yet"}
                </p>
                <p className="text-sm text-gray-400">
                  {t.roulette?.addItemsInstruction ||
                    "Add items using the field above"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      item.enabled
                        ? "bg-white border border-gray-200 shadow-sm"
                        : "bg-gray-50 border border-gray-100 opacity-60"
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{
                          backgroundColor: item.enabled
                            ? item.color
                            : "#9CA3AF",
                        }}
                      ></div>

                      {editingItem === item.id ? (
                        // 編集モード
                        <div className="flex items-center space-x-2 flex-1">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            onBlur={saveEdit}
                            className="flex-1 px-3 py-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={20}
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            aria-label={
                              t.roulette?.saveChanges || "Save changes"
                            }
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                            aria-label={t.roulette?.cancel || "Cancel"}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        // 表示モード
                        <div className="flex items-center space-x-2 flex-1">
                          <span
                            className={`font-medium cursor-pointer hover:text-blue-600 transition-colors ${
                              item.enabled
                                ? "text-gray-900"
                                : "text-gray-500 line-through"
                            }`}
                            onClick={() => startEditing(item.id, item.text)}
                            title={t.roulette?.clickToEdit || "Click to edit"}
                          >
                            {item.text}
                          </span>
                          {!item.enabled && (
                            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                              {t.roulette?.disabled || "Disabled"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {editingItem !== item.id && (
                        <button
                          onClick={() => startEditing(item.id, item.text)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
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
                        className={`p-2 rounded-lg transition-colors ${
                          item.enabled
                            ? "text-gray-400 hover:text-orange-500 hover:bg-orange-50"
                            : "text-gray-400 hover:text-green-500 hover:bg-green-50"
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
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          </ToolSection>
        </ToolSection>
      </div>
      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.roulette.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
