// applicationのi18n機能を使用するためのインポート
import * as path from "path";

// JavaScript版のapplication i18n機能を読み込み
const applicationI18n = require("../utils/application-i18n.js");

// applicationのlocaleIcons設定
export const LOCALE_ICONS: Record<string, string> = {
  ja: "🇯🇵",
  en: "🇺🇸",
  es: "🇪🇸",
  zh: "🇨🇳",
  ru: "🇷🇺",
};

// applicationのlocaleLabels設定
export const LOCALE_LABELS: Record<string, string> = {
  ja: "日本語",
  en: "English",
  es: "Español",
  zh: "中文",
  ru: "Русский",
};

// サポートする言語
export const SUPPORTED_LOCALES = ["ja", "en", "es", "zh", "ru"];

// 翻訳データを取得する関数（application/lib/i18n.tsのgetTranslationsを使用）
export function getTranslations(locale: string) {
  try {
    return applicationI18n.getTranslations(locale);
  } catch (error) {
    console.warn(`翻訳データを取得できませんでした: ${locale}`, error);
    return null;
  }
}

// フォールバック用のロケールキー一覧
export const FALLBACK_LOCALES = ["ja", "en", "es", "zh", "ru"];

// 互換性のために既存のLOCALESも保持
export const LOCALES = FALLBACK_LOCALES;

// ツール名の一覧（key名のみ）
export const TOOL_NAMES = [
  "calculator",
  "coin-flip",
  "dice-roller",
  "digital-clock",
  "image-converter",
  "ip-address",
  "json-formatter",
  "markdown-preview",
  "pet-age-conversion",
  "pomodoro-timer",
  "qr-generator",
  "random-number",
  "random-string",
  "roulette",
  "scoreboard",
  "subnet-calculator",
  "team-generator",
  "timer",
  "todo",
  "unit-conversion",
  "url-analyzer",
  "url-encoder",
  "user-agent",
  "world-clock",
  "bmi-calculator",
  "color-palette",
  "html-escape",
  "data-converter",
  "text-statistics",
  "pixel-art-editor",
  "services",
  "contact",
  "terms",
  "privacy",
  "base-converter",
  "id-generator",
];

// カラーパレット
export const COLORS = {
  primary: "#3B82F6", // Blue-500
  primaryDark: "#1D4ED8", // Blue-700
  secondary: "#8B5CF6", // Violet-500
  accent: "#06D6A0", // Green-400
  background: "#FFFFFF", // White
  surface: "#F8FAFC", // Slate-50
  text: "#1E293B", // Slate-800
  textSecondary: "#64748B", // Slate-500
  border: "#E2E8F0", // Slate-200
  error: "#EF4444", // Red-500
  warning: "#F59E0B", // Amber-500
  success: "#10B981", // Emerald-500
};

// フォント設定
export const FONTS = {
  primary:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  secondary:
    'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", monospace',
  japanese:
    '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
  chinese: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
  korean: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
};

// サイズ設定
export const SIZES = {
  logo: {
    width: 512,
    height: 512,
  },
  favicon: {
    sizes: [16, 32, 48, 64, 96, 128, 192, 256, 512],
  },
  ogp: {
    width: 1200,
    height: 630,
  },
};

// 出力ディレクトリ設定
export const OUTPUT_DIRS = {
  logo: "../application/public/images/logo",
  favicon: "../application/public/images/favicon",
  ogp: "../application/public/images/ogp",
};
