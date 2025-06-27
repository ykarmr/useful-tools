"use client";

import {
  RotateCcw,
  CheckSquare,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Heart,
  Gift,
  Dice6,
  Coins,
  Hash,
  Key,
  Timer,
  Clock,
  Clock3,
  Trophy,
  Users,
  QrCode,
  Calculator,
  Monitor,
  MapPin,
  FileText,
  LinkIcon,
  FileJson,
  Network,
  PawPrint,
  Image,
  Palette,
  BarChart3,
  Activity,
  Code,
  Binary,
} from "lucide-react";
import AdBanner from "@/components/layout/ad-banner";
import { Locale, Translations } from "@/locales";

interface ServicesClientProps {
  locale: Locale;
  t: Translations;
}

const toolCategories = [
  {
    key: "productivity",
    tools: [
      { key: "todo", icon: CheckSquare, href: "/todo" },
      { key: "calculator", icon: Calculator, href: "/calculator" },
      { key: "timer", icon: Timer, href: "/timer" },
      { key: "pomodoroTimer", icon: Clock, href: "/pomodoro-timer" },
      { key: "qrGenerator", icon: QrCode, href: "/qr-generator" },
      { key: "scoreboard", icon: Trophy, href: "/scoreboard" },
    ],
  },
  {
    key: "random",
    tools: [
      { key: "roulette", icon: RotateCcw, href: "/roulette" },
      { key: "diceRoller", icon: Dice6, href: "/dice-roller" },
      { key: "coinFlip", icon: Coins, href: "/coin-flip" },
      { key: "randomNumber", icon: Hash, href: "/random-number" },
      { key: "randomString", icon: Key, href: "/random-string" },
      { key: "teamGenerator", icon: Users, href: "/team-generator" },
    ],
  },
  {
    key: "time",
    tools: [
      { key: "digitalClock", icon: Clock3, href: "/digital-clock" },
      { key: "worldClock", icon: Globe, href: "/world-clock" },
    ],
  },
  {
    key: "network",
    tools: [
      { key: "userAgent", icon: Monitor, href: "/user-agent" },
      { key: "ipAddress", icon: MapPin, href: "/ip-address" },
      { key: "urlAnalyzer", icon: LinkIcon, href: "/url-analyzer" },
      { key: "subnetCalculator", icon: Network, href: "/subnet-calculator" },
    ],
  },
  {
    key: "textContent",
    tools: [
      { key: "jsonFormatter", icon: FileJson, href: "/json-formatter" },
      { key: "urlEncoder", icon: LinkIcon, href: "/url-encoder" },
      { key: "markdownPreview", icon: FileText, href: "/markdown-preview" },
      { key: "textStatistics", icon: BarChart3, href: "/text-statistics" },
      { key: "idGenerator", icon: Hash, href: "/id-generator" },
    ],
  },
  {
    key: "converter",
    tools: [
      { key: "imageConverter", icon: Image, href: "/image-converter" },
      { key: "unitConversion", icon: Zap, href: "/unit-conversion" },
      { key: "petAgeConversion", icon: PawPrint, href: "/pet-age-conversion" },
      { key: "colorPalette", icon: Palette, href: "/color-palette" },
      { key: "pixelArtEditor", icon: Palette, href: "/pixel-art-editor" },
      { key: "dataConverter", icon: Code, href: "/data-converter" },
    ],
  },
  {
    key: "health",
    tools: [{ key: "bmiCalculator", icon: Activity, href: "/bmi-calculator" }],
  },
  {
    key: "code",
    tools: [
      { key: "htmlEscape", icon: Code, href: "/html-escape" },
      { key: "baseConverter", icon: Binary, href: "/base-converter" },
    ],
  },
];

export default function ServicesClient({ locale, t }: ServicesClientProps) {
  return (
    <div className="animate-fade-in">
      {/* ヒーローセクション */}
      <div className="text-center mb-16 relative">
        {/* 背景装飾 */}
        <div className="absolute inset-0 -top-8 -bottom-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl -z-10"></div>
        <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl -z-10"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl -z-10"></div>

        <div className="relative py-12 px-4">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            <Gift className="w-4 h-4 mr-2" />
            30以上の無料ツール
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            {t.services.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>

          {/* 統計情報 */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">30+</div>
              <div className="text-sm text-gray-600">無料ツール</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">カテゴリ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">無料</div>
            </div>
          </div>
        </div>
      </div>

      {/* ツールカテゴリ */}
      <div className="space-y-16">
        {toolCategories.map((category, categoryIndex) => (
          <div key={category.key} className="relative">
            {/* カテゴリヘッダー */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm font-medium text-gray-700 mb-4">
                {categoryIndex + 1}. カテゴリ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.services.categories[
                  category.key as keyof typeof t.services.categories
                ]?.title || category.key}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.services.categories[
                  category.key as keyof typeof t.services.categories
                ]?.description || ""}
              </p>
            </div>

            {/* ツールグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.tools.map((tool, toolIndex) => {
                const Icon = tool.icon;
                const gradients = [
                  "from-blue-500 to-purple-600",
                  "from-purple-500 to-pink-600",
                  "from-green-500 to-blue-600",
                  "from-orange-500 to-red-600",
                  "from-teal-500 to-green-600",
                  "from-indigo-500 to-purple-600",
                ];
                const gradient = gradients[toolIndex % gradients.length];

                return (
                  <a
                    key={tool.key}
                    href={`/${locale}${tool.href}`}
                    className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* 背景グラデーション */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}
                    ></div>

                    <div className="p-6">
                      {/* アイコン */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}
                        >
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          #{toolIndex + 1}
                        </div>
                      </div>

                      {/* コンテンツ */}
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors text-lg">
                        {(t as any)[tool.key]?.title || tool.key}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {(t as any)[tool.key]?.description || ""}
                      </p>

                      {/* ホバー効果 */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* セクション区切り */}
            {categoryIndex < toolCategories.length - 1 && (
              <div className="flex items-center justify-center mt-16">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="px-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* コールトゥアクション */}
      <div className="text-center mt-20 py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          すべてのツールを無料でご利用いただけます
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          登録不要、インストール不要。今すぐブラウザで使い始めることができます。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center px-4 py-2 bg-white/80 rounded-full text-sm">
            <Shield className="w-4 h-4 mr-2 text-green-600" />
            セキュア
          </div>
          <div className="flex items-center px-4 py-2 bg-white/80 rounded-full text-sm">
            <Zap className="w-4 h-4 mr-2 text-blue-600" />
            高速
          </div>
          <div className="flex items-center px-4 py-2 bg-white/80 rounded-full text-sm">
            <Heart className="w-4 h-4 mr-2 text-red-600" />
            使いやすい
          </div>
        </div>
      </div>
    </div>
  );
}
