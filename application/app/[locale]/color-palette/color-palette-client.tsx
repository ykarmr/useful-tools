"use client";

import { useState } from "react";
import { Palette, Copy, Check, Shuffle, Download } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
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

  // Hexカラー値のバリデーション
  const isValidHex = (hex: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(hex);
  };

  // 色の変換ユーティリティ関数
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    // バリデーションを追加
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
    // RGB値を0-255の範囲にクランプ
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const calculateLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const createColorInfo = (hex: string): ColorInfo => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    return { hex, rgb, hsl, luminance };
  };

  // パレット生成関数（手動実行時のみ）
  const generatePalette = () => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const colors: ColorInfo[] = [createColorInfo(baseColor)];

    switch (paletteType) {
      case "monochromatic":
        for (let i = 1; i <= 4; i++) {
          const lightness = Math.max(
            10,
            Math.min(90, baseHsl.l + (i - 2) * 20)
          );
          const rgb = hslToRgb(baseHsl.h, baseHsl.s, lightness);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          colors.push(createColorInfo(hex));
        }
        break;

      case "analogous":
        [-30, -15, 15, 30].forEach((offset) => {
          const hue = (baseHsl.h + offset + 360) % 360;
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          colors.push(createColorInfo(hex));
        });
        break;

      case "complementary":
        const compHue = (baseHsl.h + 180) % 360;
        colors.push(
          createColorInfo(
            (() => {
              const { r, g, b } = hslToRgb(compHue, baseHsl.s, baseHsl.l);
              return rgbToHex(r, g, b);
            })()
          )
        );
        // 類似色も追加
        [-30, 30].forEach((offset) => {
          const hue = (baseHsl.h + offset + 360) % 360;
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
          colors.push(createColorInfo(rgbToHex(rgb.r, rgb.g, rgb.b)));
        });
        // 補色の類似色も追加
        [-30, 30].forEach((offset) => {
          const hue = (compHue + offset + 360) % 360;
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
          colors.push(createColorInfo(rgbToHex(rgb.r, rgb.g, rgb.b)));
        });
        break;

      case "triadic":
        [120, 240].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
          colors.push(createColorInfo(rgbToHex(rgb.r, rgb.g, rgb.b)));
        });
        // 各色の明度バリエーション
        [60, 180].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          const lightness = Math.max(20, Math.min(80, baseHsl.l + 20));
          const rgb = hslToRgb(hue, baseHsl.s, lightness);
          colors.push(createColorInfo(rgbToHex(rgb.r, rgb.g, rgb.b)));
        });
        break;

      case "tetradic":
        [90, 180, 270].forEach((offset) => {
          const hue = (baseHsl.h + offset) % 360;
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
          colors.push(createColorInfo(rgbToHex(rgb.r, rgb.g, rgb.b)));
        });
        // 中間色も追加
        const midHue = (baseHsl.h + 45) % 360;
        const midRgb = hslToRgb(midHue, baseHsl.s * 0.7, baseHsl.l);
        colors.push(createColorInfo(rgbToHex(midRgb.r, midRgb.g, midRgb.b)));
        break;
    }

    setPalette(colors);
  };

  // ランダム色生成（パレット生成状態をリセット）
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const randomHex = "#" + randomColor.toString(16).padStart(6, "0");
    setBaseColor(randomHex);
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

    let { r, g, b } = color.rgb;
    // 元の値を保存して循環参照を防ぐ
    const originalR = r;
    const originalG = g;
    const originalB = b;

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
    }

    return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
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

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.colorPalette.title}
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t.colorPalette.baseColor}
              </label>
              <div className="flex gap-3">
                <div className="relative">
                  {" "}
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => {
                      setBaseColor(e.target.value);
                    }}
                    className="w-14 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-white dark:bg-gray-800"
                  />
                </div>
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBaseColor(value);
                    // 無効な値の場合のフィードバック（必要に応じて）
                    if (value && !isValidHex(value)) {
                      console.warn("Invalid hex color format");
                    }
                  }}
                  placeholder={t.colorPalette.baseColorPlaceholder}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  title="6桁の16進数カラーコード（例: #FF0000）"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t.colorPalette.paletteType}
              </label>
              <select
                value={paletteType}
                onChange={(e) => {
                  setPaletteType(e.target.value as PaletteType);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
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
            </div>
          </div>
        </ToolInput>

        <ToolControls>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button
              onClick={generatePalette}
              className="button-primary px-6 py-3 text-base font-medium flex items-center"
            >
              <Palette className="w-5 h-5 mr-3" />
              {t.colorPalette.generatePalette}
            </button>
            <button
              onClick={generateRandomColor}
              className="button-secondary px-6 py-3 text-base font-medium flex items-center"
            >
              <Shuffle className="w-5 h-5 mr-3" />
              {t.colorPalette.randomColor}
            </button>
          </div>
        </ToolControls>
      </ToolSection>

      {/* パレット表示セクション */}
      {palette.length > 0 && (
        <ToolSection>
          <ToolResult>
            {/* 表示設定 */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t.colorPalette.colorFormat}
                  </label>
                  <select
                    value={colorFormat}
                    onChange={(e) =>
                      setColorFormat(e.target.value as ColorFormat)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="hex">{t.colorPalette.hexFormat}</option>
                    <option value="rgb">{t.colorPalette.rgbFormat}</option>
                    <option value="hsl">{t.colorPalette.hslFormat}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t.colorPalette.colorBlindTest}
                  </label>
                  <select
                    value={colorBlindType}
                    onChange={(e) =>
                      setColorBlindType(e.target.value as ColorBlindType)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
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
                </div>
              </div>
            </div>

            {/* パレット表示 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {palette.map((color, index) => {
                const displayColor = simulateColorBlind(color);
                const formattedColor = formatColor(color);
                const isCopied = copiedIndex === index;

                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className="w-full h-32 rounded-t-lg cursor-pointer transition-transform hover:scale-[1.02] mb-4"
                      style={{ backgroundColor: displayColor }}
                      onClick={() => copyToClipboard(formattedColor, index)}
                    />
                    <div className="px-4 pb-4 space-y-3">
                      <button
                        onClick={() => copyToClipboard(formattedColor, index)}
                        className="w-full text-sm font-mono hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">
                              {t.colorPalette.copied}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="truncate">{formattedColor}</span>
                          </>
                        )}
                      </button>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-3 px-4">
                          {t.colorPalette.luminance}:{" "}
                          <span className="font-mono">
                            {(color.luminance * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => exportPalette("css")}
                className="button-secondary px-5 py-2.5 text-sm font-medium flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.colorPalette.downloadCSS}
              </button>
              <button
                onClick={() => exportPalette("json")}
                className="button-secondary px-5 py-2.5 text-sm font-medium flex items-center"
              >
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
