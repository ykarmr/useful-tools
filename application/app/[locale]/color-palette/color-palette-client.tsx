"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette, Copy, Check, Shuffle, Download } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  luminance: number;
}

interface ColorPaletteClientProps {
  locale: Locale;
  t: Translations;
}

type PaletteType =
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "triadic"
  | "tetradic";
type ColorFormat = "hex" | "rgb" | "hsl";
type ColorBlindType = "normal" | "protanopia" | "deuteranopia" | "tritanopia";

// プリセットカラー（定数として外部化）
const PRESET_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#FFB6C1",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8C471",
  "#82E0AA",
  "#F1948A",
  "#AED6F1",
  "#F9E79F",
  "#D5A6BD",
  "#A3E4DB",
  "#FFD93D",
  "#6BCF7F",
  "#4D96FF",
  "#9B59B6",
  "#E74C3C",
  "#2ECC71",
] as const;

export default function ColorPaletteClient({
  locale,
  t,
}: ColorPaletteClientProps) {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteType, setPaletteType] = useState<PaletteType>("complementary");
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [colorBlindType, setColorBlindType] =
    useState<ColorBlindType>("normal");
  const [palette, setPalette] = useState<ColorInfo[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // 初回ロード時とベースカラー変更時に自動でパレット生成
  useEffect(() => {
    if (isValidHex(baseColor)) {
      generatePalette();
    }
  }, [baseColor, paletteType]);

  // Hexカラー値のバリデーション
  const isValidHex = (hex: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(hex);
  };

  // 数値をクランプする汎用関数
  const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, Math.round(value)));
  };

  // 色の変換ユーティリティ関数
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    if (!isValidHex(hex)) {
      console.warn(`Invalid hex color: ${hex}, using fallback color`);
      hex = "#000000"; // フォールバック色
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const clampedR = clamp(r, 0, 255);
    const clampedG = clamp(g, 0, 255);
    const clampedB = clamp(b, 0, 255);
    return (
      "#" +
      ((1 << 24) + (clampedR << 16) + (clampedG << 8) + clampedB)
        .toString(16)
        .slice(1)
    );
  };

  const calculateLuminance = (r: number, g: number, b: number): number => {
    const toLinear = (c: number): number => {
      const normalized = c / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };

  const createColorInfo = (hex: string): ColorInfo => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    return { hex, rgb, hsl, luminance };
  };

  // パレット生成のヘルパー関数
  const createColorFromHSL = (h: number, s: number, l: number): ColorInfo => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return createColorInfo(hex);
  };

  // パレット生成関数（手動実行時のみ）
  const generatePalette = useCallback(() => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const colors: ColorInfo[] = [createColorInfo(baseColor)];

    switch (paletteType) {
      case "monochromatic":
        for (let i = 1; i <= 4; i++) {
          const lightness = clamp(baseHsl.l + (i - 2) * 20, 10, 90);
          colors.push(createColorFromHSL(baseHsl.h, baseHsl.s, lightness));
        }
        break;

      case "analogous":
        [-30, -15, 15, 30].forEach((offset) => {
          const hue = (baseHsl.h + offset + 360) % 360;
          colors.push(createColorFromHSL(hue, baseHsl.s, baseHsl.l));
        });
        break;

      case "complementary":
        const compHue = (baseHsl.h + 180) % 360;
        colors.push(createColorFromHSL(compHue, baseHsl.s, baseHsl.l));
        // 類似色も追加
        [-30, 30].forEach((offset) => {
          const hue = (baseHsl.h + offset + 360) % 360;
          colors.push(createColorFromHSL(hue, baseHsl.s, baseHsl.l));
        });
        // 補色の類似色も追加
        [-30, 30].forEach((offset) => {
          const hue = (compHue + offset + 360) % 360;
          colors.push(createColorFromHSL(hue, baseHsl.s, baseHsl.l));
        });
        break;

      case "triadic":
        [120, 240].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          colors.push(createColorFromHSL(hue, baseHsl.s, baseHsl.l));
        });
        // 各色の明度バリエーション
        [60, 180].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          const lightness = clamp(baseHsl.l + 20, 20, 80);
          colors.push(createColorFromHSL(hue, baseHsl.s, lightness));
        });
        break;

      case "tetradic":
        [90, 180, 270].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          colors.push(createColorFromHSL(hue, baseHsl.s, baseHsl.l));
        });
        // 中間色も追加
        const midHue = (baseHsl.h + 45) % 360;
        colors.push(createColorFromHSL(midHue, baseHsl.s * 0.7, baseHsl.l));
        break;
    }

    setPalette(colors);
  }, [baseColor, paletteType]);

  // ランダム色生成（パレット生成状態をリセット）
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const randomHex = "#" + randomColor.toString(16).padStart(6, "0");
    setBaseColor(randomHex);
    setShowColorPicker(false);
  };

  // 色の表示形式変換
  const formatColor = (color: ColorInfo): string => {
    switch (colorFormat) {
      case "rgb":
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      case "hsl":
        return `hsl(${Math.round(color.hsl.h)}, ${Math.round(
          color.hsl.s
        )}%, ${Math.round(color.hsl.l)}%)`;
      default:
        return color.hex;
    }
  };

  // 色覚異常シミュレーション
  const simulateColorBlind = (color: ColorInfo): string => {
    if (colorBlindType === "normal") return color.hex;

    const { r: originalR, g: originalG, b: originalB } = color.rgb;
    let r: number, g: number, b: number;

    switch (colorBlindType) {
      case "protanopia": // 赤色盲
        r = 0.567 * originalR + 0.433 * originalG;
        g = 0.558 * originalR + 0.442 * originalG;
        b = 0.242 * originalG + 0.758 * originalB;
        break;
      case "deuteranopia": // 緑色盲
        r = 0.625 * originalR + 0.375 * originalG;
        g = 0.7 * originalR + 0.3 * originalG;
        b = 0.3 * originalG + 0.7 * originalB;
        break;
      case "tritanopia": // 青色盲
        r = 0.95 * originalR + 0.05 * originalG;
        g = 0.433 * originalG + 0.567 * originalB;
        b = 0.475 * originalG + 0.525 * originalB;
        break;
      default:
        return color.hex;
    }

    return rgbToHex(r, g, b);
  };

  // コピー機能
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // ファイルダウンロードヘルパー関数
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // エクスポート機能
  const exportPalette = (format: "css" | "json") => {
    if (format === "css") {
      const cssVars = palette
        .map((color, index) => `  --color-${index + 1}: ${color.hex};`)
        .join("\n");
      const cssContent = `:root {\n${cssVars}\n}`;
      downloadFile(cssContent, "palette.css", "text/css");
    } else {
      const jsonData = {
        baseColor,
        paletteType,
        colors: palette.map((color) => ({
          hex: color.hex,
          rgb: color.rgb,
          hsl: color.hsl,
          luminance: color.luminance,
        })),
      };
      downloadFile(
        JSON.stringify(jsonData, null, 2),
        "palette.json",
        "application/json"
      );
    }
  };

  // 初回ロード時とベースカラー変更時に自動でパレット生成
  useEffect(() => {
    if (isValidHex(baseColor)) {
      generatePalette();
    }
  }, [baseColor, paletteType, generatePalette]);

  // カラーピッカー外側クリック時に閉じる
  useEffect(() => {
    if (!showColorPicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".color-picker-container")) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker]);

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.colorPalette.title}
      subtitle={t.colorPalette.subTitle}
      description={t.colorPalette.description}
      icon={Palette}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.colorPalette.howToUse.title}
          steps={t.colorPalette.howToUse.steps}
          features={{
            title: t.colorPalette.features.title,
            items: t.colorPalette.features.items,
          }}
        />
      </ToolSection>

      {/* 入力・設定セクション */}
      <ToolSection>
        <ToolInput>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 space-y-8">
            {/* ベースカラー選択 */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {t.colorPalette.baseColor}
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">リアルタイム</span>
                </div>
              </label>

              {/* メインカラーディスプレイ */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-3xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 border-4 border-white dark:border-gray-600 group"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}, ${baseColor}dd)`,
                    }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    {/* ホバー効果 */}
                    <div className="absolute inset-0 rounded-3xl bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* カラーピッカーアイコン */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Palette className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  {/* グラデーション背景効果 */}
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}, ${baseColor}80)`,
                    }}
                  ></div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isValidHex(value) || value.startsWith("#")) {
                          setBaseColor(value);
                        }
                      }}
                      placeholder={t.colorPalette.baseColorPlaceholder}
                      className="w-full px-6 py-4 text-xl font-mono border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                      pattern="^#[0-9A-Fa-f]{6}$"
                      title="6桁の16進数カラーコード（例: #FF0000）"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* カラーピッカー */}
              {showColorPicker && (
                <div className="color-picker-container space-y-6 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                  {/* プリセットカラー */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      プリセットカラー
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
                      {PRESET_COLORS.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setBaseColor(color);
                            setShowColorPicker(false);
                          }}
                          className={`w-10 h-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 border-2 ${
                            baseColor === color
                              ? "border-gray-800 dark:border-white"
                              : "border-white dark:border-gray-600"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      {/* ランダムカラーボタン */}
                      <button
                        onClick={generateRandomColor}
                        className="w-10 h-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 border-2 border-dashed border-gray-400 dark:border-gray-500 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center group"
                        title="ランダムカラー"
                      >
                        <Shuffle className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>

                  {/* HSL調整スライダー */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      色相・彩度・明度調整
                    </h4>
                    {(() => {
                      const rgb = hexToRgb(baseColor);
                      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

                      return (
                        <div className="space-y-4">
                          {/* 色相 */}
                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                              色相 (Hue): {Math.round(hsl.h)}°
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="360"
                              value={hsl.h}
                              onChange={(e) => {
                                const newHue = parseInt(e.target.value);
                                const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
                                const newHex = rgbToHex(
                                  newRgb.r,
                                  newRgb.g,
                                  newRgb.b
                                );
                                setBaseColor(newHex);
                              }}
                              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background:
                                  "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                              }}
                            />
                          </div>

                          {/* 彩度 */}
                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                              彩度 (Saturation): {Math.round(hsl.s)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={hsl.s}
                              onChange={(e) => {
                                const newSaturation = parseInt(e.target.value);
                                const newRgb = hslToRgb(
                                  hsl.h,
                                  newSaturation,
                                  hsl.l
                                );
                                const newHex = rgbToHex(
                                  newRgb.r,
                                  newRgb.g,
                                  newRgb.b
                                );
                                setBaseColor(newHex);
                              }}
                              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, 
                                  ${(() => {
                                    const lowSatRgb = hslToRgb(hsl.h, 0, hsl.l);
                                    const highSatRgb = hslToRgb(
                                      hsl.h,
                                      100,
                                      hsl.l
                                    );
                                    return `${rgbToHex(
                                      lowSatRgb.r,
                                      lowSatRgb.g,
                                      lowSatRgb.b
                                    )}, ${rgbToHex(
                                      highSatRgb.r,
                                      highSatRgb.g,
                                      highSatRgb.b
                                    )}`;
                                  })()})`,
                              }}
                            />
                          </div>

                          {/* 明度 */}
                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                              明度 (Lightness): {Math.round(hsl.l)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={hsl.l}
                              onChange={(e) => {
                                const newLightness = parseInt(e.target.value);
                                const newRgb = hslToRgb(
                                  hsl.h,
                                  hsl.s,
                                  newLightness
                                );
                                const newHex = rgbToHex(
                                  newRgb.r,
                                  newRgb.g,
                                  newRgb.b
                                );
                                setBaseColor(newHex);
                              }}
                              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, 
                                  #000000, 
                                  ${(() => {
                                    const midRgb = hslToRgb(hsl.h, hsl.s, 50);
                                    return rgbToHex(
                                      midRgb.r,
                                      midRgb.g,
                                      midRgb.b
                                    );
                                  })()}, 
                                  #ffffff)`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* ネイティブカラーピッカー */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      詳細カラーピッカー
                    </h4>
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-full h-12 rounded-xl border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                  </div>

                  {/* 閉じるボタン */}
                  <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setShowColorPicker(false)}
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* パレットタイプ選択 */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t.colorPalette.paletteType}
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full text-purple-600 dark:text-purple-400 text-xs">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">自動更新</span>
                </div>
              </label>
              <div className="relative">
                <select
                  value={paletteType}
                  onChange={(e) => {
                    setPaletteType(e.target.value as PaletteType);
                  }}
                  className="w-full appearance-none px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                >
                  <option value="monochromatic">
                    {t.colorPalette.monochromatic}
                  </option>
                  <option value="analogous">{t.colorPalette.analogous}</option>
                  <option value="complementary">
                    {t.colorPalette.complementary}
                  </option>
                  <option value="triadic">{t.colorPalette.triadic}</option>
                  <option value="tetradic">{t.colorPalette.tetradic}</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ToolInput>
      </ToolSection>

      {/* パレット表示セクション */}
      {palette.length > 0 && (
        <ToolSection>
          <ToolResult>
            {/* 表示設定 */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                表示設定
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {t.colorPalette.colorFormat}
                  </label>
                  <div className="relative">
                    <select
                      value={colorFormat}
                      onChange={(e) =>
                        setColorFormat(e.target.value as ColorFormat)
                      }
                      className="w-full appearance-none px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                    >
                      <option value="hex">{t.colorPalette.hexFormat}</option>
                      <option value="rgb">{t.colorPalette.rgbFormat}</option>
                      <option value="hsl">{t.colorPalette.hslFormat}</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {t.colorPalette.colorBlindTest}
                  </label>
                  <div className="relative">
                    <select
                      value={colorBlindType}
                      onChange={(e) =>
                        setColorBlindType(e.target.value as ColorBlindType)
                      }
                      className="w-full appearance-none px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                    >
                      <option value="normal">{t.colorPalette.normal}</option>
                      <option value="protanopia">
                        {t.colorPalette.protanopia}
                      </option>
                      <option value="deuteranopia">
                        {t.colorPalette.deuteranopia}
                      </option>
                      <option value="tritanopia">
                        {t.colorPalette.tritanopia}
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* パレット表示 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center flex items-center justify-center gap-3">
                <Palette className="w-8 h-8 text-blue-500" />
                生成されたカラーパレット
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 transition-all duration-500 ease-in-out">
                {palette.map((color, index) => {
                  const displayColor = simulateColorBlind(color);
                  const formattedColor = formatColor(color);
                  const isCopied = copiedIndex === index;
                  const isBase = index === 0;

                  return (
                    <div
                      key={`${color.hex}-${index}`}
                      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:z-10 animate-in fade-in slide-in-from-bottom-4 ${
                        isBase
                          ? "ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/20"
                          : "shadow-lg hover:shadow-2xl"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* ベースカラーバッジ */}
                      {isBase && (
                        <div className="absolute top-3 left-3 z-10 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          ベース
                        </div>
                      )}

                      {/* カラー表示エリア */}
                      <div
                        className="w-full h-48 cursor-pointer relative overflow-hidden group-hover:h-52 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${displayColor}, ${displayColor}dd)`,
                        }}
                        onClick={() => copyToClipboard(formattedColor, index)}
                      >
                        {/* グラデーションオーバーレイ */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>

                        {/* ホバー時の拡大効果 */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                        {/* コピーアイコン */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
                            <Copy className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* カラー情報パネル */}
                      <div className="bg-white dark:bg-gray-800 p-4 space-y-3">
                        {/* カラーコードボタン */}
                        <button
                          onClick={() => copyToClipboard(formattedColor, index)}
                          className="w-full group/btn relative overflow-hidden font-mono text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 text-green-600 animate-in zoom-in duration-200" />
                              <span className="text-green-600 font-semibold">
                                {t.colorPalette.copied}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                              <span className="truncate font-semibold">
                                {formattedColor}
                              </span>
                            </>
                          )}
                        </button>

                        {/* 輝度情報 */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-3 px-4 border border-gray-200 dark:border-gray-600">
                          <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {t.colorPalette.luminance}:
                              </span>
                              <span className="font-mono font-bold">
                                {(color.luminance * 100).toFixed(1)}%
                              </span>
                            </div>
                            {/* 輝度バー */}
                            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                                style={{ width: `${color.luminance * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* エクスポートボタン */}
            <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => exportPalette("css")}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Download className="w-4 h-4 mr-2" />
                {t.colorPalette.downloadCSS}
              </button>
              <button
                onClick={() => exportPalette("json")}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Download className="w-4 h-4 mr-2" />
                {t.colorPalette.downloadJSON}
              </button>
            </div>
          </ToolResult>
        </ToolSection>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.colorPalette.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
