import type React from "react";
import AdBanner from "./ad-banner";
import { Locale, Translations } from "@/locales";

interface ToolLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  t: Translations;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  showSidebar?: boolean;
  showInlineAd?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "hero";
}

export default function ToolLayout({
  children,
  locale,
  t,
  title,
  subtitle,
  description,
  icon: Icon,
  showSidebar = true,
  showInlineAd = true,
  className = "",
  variant = "default",
}: ToolLayoutProps) {
  return (
    <div className={`animate-fade-in ${className}`}>
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className={showSidebar ? "lg:col-span-3" : "lg:col-span-4"}>
          {/* ヒーローセクション */}
          {variant === "hero" ? (
            <div className="relative overflow-hidden rounded-3xl lg:rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 lg:p-12 xl:p-16 mb-8 shadow-2xl shadow-purple-500/25">
              {/* 背景の装飾 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-white/10 to-transparent rounded-full transform rotate-12" />

              <header className="relative text-center text-white">
                {Icon && (
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 shadow-xl">
                      <Icon size={40} className="text-white" />
                    </div>
                  </div>
                )}
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-6 text-white/90">
                    {subtitle}
                  </h2>
                )}
                <p className="text-lg lg:text-xl xl:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  {description}
                </p>
              </header>
            </div>
          ) : (
            /* 通常のヘッダー */
            <div className="bg-white/80 backdrop-blur-md rounded-3xl lg:rounded-[2rem] shadow-xl shadow-black/5 border border-white/20 p-8 lg:p-12 mb-8">
              <header
                className={variant === "minimal" ? "text-left" : "text-center"}
              >
                {Icon && (
                  <div
                    className={`flex ${
                      variant === "minimal" ? "justify-start" : "justify-center"
                    } mb-8`}
                  >
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-primary-500/25 transform hover:scale-105 transition-all duration-300">
                      <Icon size={32} className="text-white lg:w-10 lg:h-10" />
                    </div>
                  </div>
                )}
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-primary-600 mb-6 leading-relaxed">
                    {subtitle}
                  </h2>
                )}
                <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  {description}
                </p>
              </header>
            </div>
          )}

          {/* Tool Content */}
          <div className="space-y-8 lg:space-y-12">{children}</div>
        </div>

        {/* Sidebar */}
        {/* {showSidebar && (
          <aside className="lg:col-span-1" aria-label="Sidebar">
            <div className="sticky top-28">
              <AdBanner position="sidebar" t={t} />
            </div>
          </aside>
        )} */}
      </div>

      {/* Inline Ad */}
      {/* {showInlineAd && (
        <section className="mt-12 lg:mt-16" aria-label="Advertisement">
          <AdBanner position="inline" t={t} />
        </section>
      )} */}
    </div>
  );
}
