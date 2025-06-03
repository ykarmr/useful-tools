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
import AdBanner from "@/components/layout/ad-banner";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface HomePageProps {
  params: Promise<{ locale: string }>;
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
    title: t.common.seo.homeTitle,
    description: t.common.seo.homeDescription,
    keywords: t.common.seo.homeKeywords,
    openGraph: {
      title: t.home.title,
      description: t.home.subtitle,
      url: `${baseUrl}/${locale}`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en-US": `${baseUrl}/en`,
        "ja-JP": `${baseUrl}/ja`,
        "zh-CN": `${baseUrl}/zh`,
        "es-ES": `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t.common.seo.siteTitle,
    description: t.home.subtitle,
    url: `https://useful-tools.vercel.app/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://useful-tools.vercel.app/${locale}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        ...featuredTools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: tool.title,
            description: tool.description,
            url: `https://useful-tools.vercel.app${tool.href}`,
            applicationCategory:
              t.common.seo.structuredData.applicationCategory,
            operatingSystem: t.common.seo.structuredData.operatingSystem,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        })),
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="animate-fade-in">
        {/* Hero Section */}
        <section
          className="text-center py-16 lg:py-24"
          aria-labelledby="hero-title"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <div
                className="p-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl"
                role="img"
                aria-label="USEFUL TOOLS logo"
              >
                <Sparkles className="w-12 h-12 text-white" aria-hidden="true" />
              </div>
            </div>

            <h1
              id="hero-title"
              className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {t.home.title}
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t.home.subtitle}
            </p>

            <nav
              aria-label="Primary actions"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`/${locale}/services`}
                className="button-primary text-lg px-8 py-4"
                aria-describedby="all-tools-desc"
              >
                {t.home.allTools}
              </a>
              <span id="all-tools-desc" className="sr-only">
                {t.common.seo.structuredData.searchActionDescription}
              </span>

              <a
                href={`/${locale}/roulette`}
                className="button-secondary text-lg px-8 py-4"
                aria-describedby="roulette-desc"
              >
                {t.home.tryRoulette}
              </a>
              <span id="roulette-desc" className="sr-only">
                {t.roulette.description}
              </span>
            </nav>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-16" aria-labelledby="featured-tools-title">
          <div className="text-center mb-16">
            <h2
              id="featured-tools-title"
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.home.featuredTools}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.chooseToolDescription}
            </p>
          </div>

          <div className="grid  gap-8 max-w-7xl mx-auto mb-12" role="list">
            {featuredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <article
                  key={tool.title}
                  className="group card hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="listitem"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    role="img"
                    aria-label={`${tool.title} icon`}
                  >
                    <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <a
                    href={tool.href}
                    className="inline-flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300"
                    aria-label={`${t.home.getStarted} ${tool.title}`}
                  >
                    {t.home.getStarted}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* Inline Ad */}
        <section className="py-8" aria-label="Advertisement">
          <AdBanner position="inline" t={t} />
        </section>

        {/* Popular Tools Section */}
        <section className="py-16" aria-labelledby="popular-tools-title">
          <div className="text-center mb-12">
            <h2
              id="popular-tools-title"
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.home.popularTools}
            </h2>
          </div>

          <nav
            aria-label="Popular tools"
            className="grid grid-cols-2 gap-6 max-w-7xl mx-auto"
          >
            {popularTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={`${tool.title} - ${t.common.openTool}`}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
                    role="img"
                    aria-hidden="true"
                  >
                    <Icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </span>
                </a>
              );
            })}
          </nav>
        </section>

        {/* Utility Tools Section */}
        <section
          className="py-16 bg-gray-50 rounded-3xl"
          aria-labelledby="utility-tools-title"
        >
          <div className="text-center mb-12">
            <h2
              id="utility-tools-title"
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.home.utilityTools}
            </h2>
          </div>

          <nav
            aria-label="Utility tools"
            className="grid grid-cols-2 gap-6 max-w-7xl mx-auto"
          >
            {utilityTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={`${tool.title} - ${t.common.openTool}`}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
                    role="img"
                    aria-hidden="true"
                  >
                    <Icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="text-center mt-12">
            <a
              href={`/${locale}/services`}
              className="button-primary text-lg px-8 py-4"
              aria-label={t.common.viewAllTools}
            >
              {t.common.viewAll}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
