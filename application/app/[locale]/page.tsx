import {
  RotateCcw,
  CheckSquare,
  Sparkles,
  Calculator,
  Dice1,
  Coins,
  Hash,
  Type,
  Clock,
  Timer,
  Globe,
  QrCode,
  Monitor,
  MapPin,
  FileText,
  LinkIcon,
} from "lucide-react";
import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateHomePageMetadata } from "@/lib/metadata";
import { generateHomePageStructuredData } from "@/lib/structured-data";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return {
    ...generateHomePageMetadata(locale, t.home, t.common),
    other: {
      "structured-data": JSON.stringify(
        generateHomePageStructuredData(locale, t.home, t.common)
      ),
      "google-site-verification": "",
      "application-name": t.common.siteTitle,
      "msapplication-TileColor": "#3B82F6",
      "msapplication-config": "/browserconfig.xml",
      "theme-color": "#3B82F6",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": t.common.siteTitle,
      "apple-touch-icon": "/images/logo/logo.png",
      "mask-icon": "/images/logo/logo.svg",
      "msapplication-TileImage": "/images/logo/logo.png",
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  const featuredTools = [
    {
      icon: RotateCcw,
      title: t.roulette.title,
      description: t.home.rouletteDescription,
      href: `/${locale}/roulette`,
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: CheckSquare,
      title: t.todo.title,
      description: t.home.todoDescription,
      href: `/${locale}/todo`,
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Calculator,
      title: t.calculator.title,
      description: t.calculator.description,
      href: `/${locale}/calculator`,
      color: "from-gray-500 to-slate-600",
    },
  ];

  const popularTools = [
    {
      icon: Dice1,
      title: t.diceRoller.title,
      href: `/${locale}/dice-roller`,
      color: "text-red-600",
    },
    {
      icon: Coins,
      title: t.coinFlip.title,
      href: `/${locale}/coin-flip`,
      color: "text-yellow-600",
    },
    {
      icon: Hash,
      title: t.randomNumber.title,
      href: `/${locale}/random-number`,
      color: "text-indigo-600",
    },
    {
      icon: Type,
      title: t.randomString.title,
      href: `/${locale}/random-string`,
      color: "text-teal-600",
    },
    {
      icon: Clock,
      title: t.timer.title,
      href: `/${locale}/timer`,
      color: "text-gray-600",
    },
    {
      icon: Timer,
      title: t.pomodoroTimer.title,
      href: `/${locale}/pomodoro-timer`,
      color: "text-rose-600",
    },
  ];

  const utilityTools = [
    {
      icon: QrCode,
      title: t.qrGenerator.title,
      href: `/${locale}/qr-generator`,
      color: "text-slate-600",
    },
    {
      icon: FileText,
      title: t.jsonFormatter.title,
      href: `/${locale}/json-formatter`,
      color: "text-purple-600",
    },
    {
      icon: LinkIcon,
      title: t.urlEncoder.title,
      href: `/${locale}/url-encoder`,
      color: "text-lime-600",
    },
    {
      icon: Monitor,
      title: t.userAgent.title,
      href: `/${locale}/user-agent`,
      color: "text-cyan-600",
    },
    {
      icon: MapPin,
      title: t.ipAddress.title,
      href: `/${locale}/ip-address`,
      color: "text-orange-600",
    },
    {
      icon: Globe,
      title: t.worldClock.title,
      href: `/${locale}/world-clock`,
      color: "text-sky-600",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section
        className="relative text-center py-28 lg:py-40 overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Enhanced background with sophisticated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(168,85,247,0.04),transparent_45deg)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Refined logo with elegant glow */}
          <div className="flex justify-center mb-16">
            <div className="relative group cursor-default">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-[2rem] blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-700 animate-pulse" />
              <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/70 ring-1 ring-black/5">
                <img
                  src={`/images/logo/logo.png`}
                  alt={t.header.logo}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          </div>

          {/* Enhanced title with better typography */}
          <h1
            id="hero-title"
            className="text-5xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-[0.9] tracking-tight"
          >
            {t.home.title}
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            {t.home.subtitle}
          </p>

          {/* Enhanced action buttons */}
          <nav
            aria-label="Primary actions"
            className="flex flex-col sm:flex-row gap-8 justify-center"
          >
            <a
              href={`/${locale}/services`}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
              aria-describedby="all-tools-desc"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                {t.home.allTools}
                <svg
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </span>
            </a>
            <span id="all-tools-desc" className="sr-only">
              {t.common.seo.structuredData.searchActionDescription}
            </span>

            <a
              href={`/${locale}/roulette`}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-gray-700 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 overflow-hidden"
              aria-describedby="roulette-desc"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                {t.home.tryRoulette}
                <Sparkles className="ml-3 w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
              </span>
            </a>
            <span id="roulette-desc" className="sr-only">
              {t.roulette.description}
            </span>
          </nav>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section
        className="py-20 lg:py-28"
        aria-labelledby="featured-tools-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2
              id="featured-tools-title"
              className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t.home.featuredTools}
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              {t.home.chooseToolDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 xl:gap-12" role="list">
            {featuredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <article
                  key={tool.title}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-100/50 hover:border-gray-200/70 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="listitem"
                >
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div
                      className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                      role="img"
                      aria-label={`${tool.title} icon`}
                    >
                      <Icon
                        className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {tool.title}
                    </h3>

                    <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8 font-light">
                      {tool.description}
                    </p>

                    <a
                      href={tool.href}
                      className="group/link inline-flex items-center text-blue-600 font-semibold text-lg group-hover:translate-x-2 transition-all duration-300 hover:text-purple-600"
                      aria-label={`${t.home.getStarted} ${tool.title}`}
                    >
                      {t.home.getStarted}
                      <svg
                        className="w-5 h-5 ml-3 group-hover/link:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5-5 5M6 12h12"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section
        className="py-20 lg:py-28 relative"
        aria-labelledby="popular-tools-title"
      >
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              id="popular-tools-title"
              className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t.home.popularTools}
            </h2>
          </div>

          <nav
            aria-label="Popular tools"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6"
          >
            {popularTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group relative flex flex-col items-center p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-blue-200/70 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={`${tool.title} - ${t.common.openTool}`}
                >
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div
                    className="relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-300"
                    role="img"
                    aria-hidden="true"
                  >
                    <Icon
                      className={`w-8 h-8 lg:w-10 lg:h-10 ${tool.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                  <span className="relative text-sm lg:text-base font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors leading-snug">
                    {tool.title}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Utility Tools Section */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="utility-tools-title"
      >
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-gray-50/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              id="utility-tools-title"
              className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t.home.utilityTools}
            </h2>
          </div>

          <nav
            aria-label="Utility tools"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-16"
          >
            {utilityTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group relative flex flex-col items-center p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-blue-200/70 hover:shadow-2xl transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={`${tool.title} - ${t.common.openTool}`}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div
                    className="relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-400"
                    role="img"
                    aria-hidden="true"
                  >
                    <Icon
                      className={`w-8 h-8 lg:w-10 lg:h-10 ${tool.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                  <span className="relative text-sm lg:text-base font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors leading-snug">
                    {tool.title}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="text-center">
            <a
              href={`/${locale}/services`}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
              aria-label={t.common.viewAllTools}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                {t.common.viewAll}
                <svg
                  className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
