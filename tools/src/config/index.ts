// 多言語対応のテキストと設定
export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  title: string;
  subtitle: string;
  description: string;
}

// サポートする言語設定
export const LOCALES: Record<string, LocaleConfig> = {
  ja: {
    code: "ja",
    name: "日本語",
    flag: "🇯🇵",
    title: "便利ツール",
    subtitle: "日常の作業を効率化",
    description:
      "計算機、タイマー、変換ツールなど、日常の作業を効率化する便利なツール集です。",
  },
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    title: "Useful Tools",
    subtitle: "Streamline Your Daily Tasks",
    description:
      "A collection of useful tools including calculators, timers, converters, and more to streamline your daily tasks.",
  },
  zh: {
    code: "zh",
    name: "中文",
    flag: "🇨🇳",
    title: "实用工具",
    subtitle: "提高日常工作效率",
    description:
      "包含计算器、定时器、转换工具等多种实用工具，帮助您提高日常工作效率。",
  },
  es: {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    title: "Herramientas Útiles",
    subtitle: "Optimiza Tus Tareas Diarias",
    description:
      "Una colección de herramientas útiles que incluye calculadoras, temporizadores, convertidores y más para optimizar tus tareas diarias.",
  },
  ru: {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
    title: "Полезные Инструменты",
    subtitle: "Упростите Ваши Повседневные Задачи",
    description:
      "Коллекция полезных инструментов, включая калькуляторы, таймеры, конвертеры и многое другое для упрощения ваших повседневных задач.",
  },
};

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
  logo: "../public/images/logo",
  favicon: "../public/images/favicon",
  ogp: "../public/images/ogp",
};
