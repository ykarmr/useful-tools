import type React from "react";
import Header from "./header";
import Footer from "./footer";
import AdBanner from "./ad-banner";
import { Locale, Translations } from "@/locales";

interface MainLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  t: Translations;
  showSidebarAds?: boolean;
}

export default function MainLayout({ children, locale, t }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header locale={locale} t={t} />

      <div className="flex-1 pt-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8">
          <div className="flex gap-6 lg:gap-8">
            {/* Left Sidebar Ad */}
            <aside className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-28 space-y-1">
                <AdBanner position="sidebar" t={t} />
                <AdBanner position="sidebar" t={t} />
                <AdBanner position="sidebar" t={t} />
                <AdBanner position="sidebar" t={t} />
                <AdBanner position="sidebar" t={t} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0" role="main">
              <div className="max-w-none">{children}</div>
            </main>
          </div>
        </div>
      </div>

      <Footer locale={locale} t={t} />

      {/* Floating Ad for Mobile */}
      <AdBanner position="floating" className="xl:hidden" t={t} />
    </div>
  );
}
