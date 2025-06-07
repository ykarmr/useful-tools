"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home, Grid3X3 } from "lucide-react";
import { Locale, Translations } from "@/locales";
import { getSupportedLocales } from "@/locales";
import { localeLabels } from "@/lib/getLocaleMapping";

interface HeaderProps {
  locale: Locale;
  t: Translations;
}

export default function Header({ locale, t }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: t.common.home, href: `/${locale}`, icon: Home },
    { name: t.common.services, href: `/${locale}/services`, icon: Grid3X3 },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // 言語切り替え用
  const supportedLocales = getSupportedLocales();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200/20"
      role="banner"
    >
      <nav
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12"
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href={`/${locale}`}
            className="flex items-center space-x-2 font-bold text-xl text-gray-900 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
            aria-label={`${t.header.logo} - ${
              locale === "ja" ? "ホームページに戻る" : "Go to homepage"
            }`}
          >
            <div
              className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center"
              role="img"
              aria-hidden="true"
            >
              <span className="text-white font-bold text-sm">UT</span>
            </div>
            <span>{t.header.logo}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  role="menuitem"
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* 言語切り替え（デスクトップ） */}
          <div className="hidden md:flex items-center ml-4">
            <label
              htmlFor="desktop-lang-switcher"
              className="mr-2 text-sm text-gray-600"
            >
              {t.header?.changeLanguage || "Language"}
            </label>
            <select
              id="desktop-lang-switcher"
              className="px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const path = window.location.pathname.replace(
                  /^\/[a-z]{2}(\/|$)/,
                  `/${newLocale}/`
                );
                window.location.pathname = path;
              }}
              aria-label={t.header?.changeLanguage || "言語を変更"}
            >
              {supportedLocales.map((l) => (
                <option key={l} value={l}>
                  {localeLabels[l] || l}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t.header.toggleMenu}
          >
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200/20"
            role="menu"
          >
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      isActive(item.href)
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    role="menuitem"
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
            {/* 言語切り替え（モバイル） */}
            <div className="mt-4 px-4 flex items-center">
              <label
                htmlFor="mobile-lang-switcher"
                className="mr-2 text-base text-gray-600"
              >
                {t.header?.changeLanguage || "Language"}
              </label>
              <select
                id="mobile-lang-switcher"
                className="flex-1 px-2 py-2 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                value={locale}
                onChange={(e) => {
                  const newLocale = e.target.value;
                  const path = window.location.pathname.replace(
                    /^\/[a-z]{2}(\/|$)/,
                    `/${newLocale}/`
                  );
                  window.location.pathname = path;
                }}
                aria-label={t.header?.changeLanguage || "言語を変更"}
              >
                {supportedLocales.map((l) => (
                  <option key={l} value={l}>
                    {localeLabels[l] || l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
