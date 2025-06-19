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
  // 安全なプロパティアクセス
  const services = t?.services || {};

  return (
    <div className="animate-fade-in">
      {/* Tool Categories */}
      <div className="space-y-12">
        {toolCategories.map((category) => (
          <div key={category.key} className="card">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {/* @ts-ignore */}
                {services.categories?.[category.key]?.title || category.key}
              </h2>
              <p className="text-gray-600">
                {/* @ts-ignore */}
                {services.categories?.[category.key]?.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.key}
                    href={`/${locale}${tool.href}`}
                    className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                        <Icon size={24} className="text-primary-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {(t as any)[tool.key]?.title || tool.key}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {(t as any)[tool.key]?.description || ""}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
