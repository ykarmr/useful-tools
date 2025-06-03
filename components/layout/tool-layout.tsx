import type React from "react";
import AdBanner from "./ad-banner";
import { Locale, Translations } from "@/locales";

interface ToolLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  t: Translations;
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  showSidebar?: boolean;
  showInlineAd?: boolean;
  className?: string;
}

export default function ToolLayout({
  children,
  locale,
  t,
  title,
  description,
  icon: Icon,
  showSidebar = true,
  showInlineAd = true,
  className = "",
}: ToolLayoutProps) {
  return (
    <div className={`animate-fade-in ${className}`}>
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className={showSidebar ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="bg-white rounded-2xl shadow-apple p-6 lg:p-8">
            {/* Tool Header */}
            <header className="text-center mb-8 lg:mb-10">
              {Icon && (
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon size={32} className="text-white lg:w-10 lg:h-10" />
                  </div>
                </div>
              )}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                {title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </header>

            {/* Tool Content */}
            <main role="main" className="space-y-6 lg:space-y-8">
              {children}
            </main>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="lg:col-span-1" aria-label="Sidebar">
            <div className="sticky top-28">
              <AdBanner position="sidebar" t={t} />
            </div>
          </aside>
        )}
      </div>

      {/* Inline Ad */}
      {showInlineAd && (
        <section className="mt-8 lg:mt-12" aria-label="Advertisement">
          <AdBanner position="inline" t={t} />
        </section>
      )}
    </div>
  );
}
