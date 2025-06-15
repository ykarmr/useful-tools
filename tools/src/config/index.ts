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

// ツール名の多言語対応辞書
export const TOOL_NAMES: Record<string, Record<string, string>> = {
  calculator: {
    ja: "電卓",
    en: "Calculator",
    es: "Calculadora",
    ru: "Калькулятор",
    zh: "计算器",
  },
  "coin-flip": {
    ja: "コイン投げ",
    en: "Coin Flip",
    es: "Lanzar Moneda",
    ru: "Подбрасывание Монеты",
    zh: "抛硬币",
  },
  "dice-roller": {
    ja: "サイコロ",
    en: "Dice Roller",
    es: "Dados",
    ru: "Кости",
    zh: "骰子",
  },
  "digital-clock": {
    ja: "デジタル時計",
    en: "Digital Clock",
    es: "Reloj Digital",
    ru: "Цифровые Часы",
    zh: "数字时钟",
  },
  "image-converter": {
    ja: "画像変換",
    en: "Image Converter",
    es: "Convertidor de Imágenes",
    ru: "Конвертер Изображений",
    zh: "图像转换器",
  },
  "ip-address": {
    ja: "IPアドレス取得",
    en: "IP Address",
    es: "Dirección IP",
    ru: "IP-адрес",
    zh: "IP地址",
  },
  "json-formatter": {
    ja: "JSON整形",
    en: "JSON Formatter",
    es: "Formateador JSON",
    ru: "JSON Форматтер",
    zh: "JSON格式化",
  },
  "markdown-preview": {
    ja: "Markdownプレビュー",
    en: "Markdown Preview",
    es: "Vista Previa Markdown",
    ru: "Предварительный Просмотр Markdown",
    zh: "Markdown预览",
  },
  "pet-age-conversion": {
    ja: "ペット年齢変換",
    en: "Pet Age Converter",
    es: "Convertidor de Edad de Mascotas",
    ru: "Конвертер Возраста Питомцев",
    zh: "宠物年龄转换",
  },
  "pomodoro-timer": {
    ja: "ポモドーロタイマー",
    en: "Pomodoro Timer",
    es: "Temporizador Pomodoro",
    ru: "Помидорный Таймер",
    zh: "番茄工作法计时器",
  },
  "qr-generator": {
    ja: "QRコード生成",
    en: "QR Generator",
    es: "Generador QR",
    ru: "QR Генератор",
    zh: "二维码生成器",
  },
  "random-number": {
    ja: "乱数生成",
    en: "Random Number",
    es: "Número Aleatorio",
    ru: "Случайное Число",
    zh: "随机数生成",
  },
  "random-string": {
    ja: "ランダム文字列",
    en: "Random String",
    es: "Cadena Aleatoria",
    ru: "Случайная Строка",
    zh: "随机字符串",
  },
  roulette: {
    ja: "ルーレット",
    en: "Roulette",
    es: "Ruleta",
    ru: "Рулетка",
    zh: "轮盘",
  },
  scoreboard: {
    ja: "スコアボード",
    en: "Scoreboard",
    es: "Marcador",
    ru: "Табло",
    zh: "计分板",
  },
  "subnet-calculator": {
    ja: "サブネット計算",
    en: "Subnet Calculator",
    es: "Calculadora de Subred",
    ru: "Калькулятор Подсети",
    zh: "子网计算器",
  },
  "team-generator": {
    ja: "チーム生成",
    en: "Team Generator",
    es: "Generador de Equipos",
    ru: "Генератор Команд",
    zh: "团队生成器",
  },
  timer: {
    ja: "タイマー",
    en: "Timer",
    es: "Temporizador",
    ru: "Таймер",
    zh: "计时器",
  },
  todo: {
    ja: "TODOリスト",
    en: "TODO List",
    es: "Lista de Tareas",
    ru: "Список Дел",
    zh: "待办事项",
  },
  "unit-conversion": {
    ja: "単位変換",
    en: "Unit Converter",
    es: "Convertidor de Unidades",
    ru: "Конвертер Единиц",
    zh: "单位转换",
  },
  "url-analyzer": {
    ja: "URL解析",
    en: "URL Analyzer",
    es: "Analizador de URL",
    ru: "Анализатор URL",
    zh: "URL分析器",
  },
  "url-encoder": {
    ja: "URLエンコーダー",
    en: "URL Encoder",
    es: "Codificador URL",
    ru: "URL Кодировщик",
    zh: "URL编码器",
  },
  "user-agent": {
    ja: "User-Agent取得",
    en: "User Agent",
    es: "Agente de Usuario",
    ru: "User-Agent",
    zh: "用户代理",
  },
  "world-clock": {
    ja: "世界時計",
    en: "World Clock",
    es: "Reloj Mundial",
    ru: "Мировые Часы",
    zh: "世界时钟",
  },
  "bmi-calculator": {
    ja: "BMI計算",
    en: "BMI Calculator",
    es: "Calculadora BMI",
    ru: "Калькулятор ИМТ",
    zh: "BMI计算器",
  },
  "color-palette": {
    ja: "カラーパレット",
    en: "Color Palette",
    es: "Paleta de Colores",
    ru: "Цветовая Палитра",
    zh: "调色板",
  },
  "html-escape": {
    ja: "HTMLエスケープ",
    en: "HTML Escape",
    es: "Escape HTML",
    ru: "HTML Экранирование",
    zh: "HTML转义",
  },
  "text-statistics": {
    ja: "テキスト統計",
    en: "Text Statistics",
    es: "Estadísticas de Texto",
    ru: "Статистика Текста",
    zh: "文本统计",
  },
  services: {
    ja: "サービス一覧",
    en: "Services",
    es: "Servicios",
    ru: "Сервисы",
    zh: "服务",
  },
  contact: {
    ja: "お問い合わせ",
    en: "Contact",
    es: "Contacto",
    ru: "Контакты",
    zh: "联系我们",
  },
  terms: {
    ja: "利用規約",
    en: "Terms of Service",
    es: "Términos de Servicio",
    ru: "Условия Использования",
    zh: "服务条款",
  },
  privacy: {
    ja: "プライバシーポリシー",
    en: "Privacy Policy",
    es: "Política de Privacidad",
    ru: "Политика Конфиденциальности",
    zh: "隐私政策",
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
