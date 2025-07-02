import enTranslations from "@/locales/en";
import jaTranslations from "@/locales/ja";
import zhTranslations from "@/locales/zh";
import esTranslations from "@/locales/es";
import ruTranslations from "@/locales/ru";

import type { Translations } from "@/locales/types";
import { Locale } from "@/locales";
import { baseUrl } from "./const";

const translations = {
  en: enTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
  es: esTranslations,
  ru: ruTranslations,
} as const;

export type SupportedLocale = keyof typeof translations;

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(translations) as SupportedLocale[];
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return locale in translations;
}

export function getTranslations(locale: SupportedLocale): Translations {
  return translations[locale];
}

export function getDefaultLocale(): SupportedLocale {
  return "en";
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return getDefaultLocale();
}

export const locales = getSupportedLocales();

export const localeMapping: Record<SupportedLocale, string> = {
  ja: "ja-JP",
  zh: "zh-CN",
  en: "en-US",
  es: "es-ES",
  ru: "ru-RU",
};

export const getLocaleMapping = (locale: SupportedLocale) => {
  return localeMapping[locale] || "en-US";
};

export const getAlternates = (locale: SupportedLocale, path: string = "") => {
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    const langCode = getLocaleMapping(loc);
    languages[langCode] = `${baseUrl}/${loc}${path}`;
  });

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      ...languages,
      "x-default": `${baseUrl}/en/${path}`,
    },
  };
};

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  es: "Español",
  zh: "中文",
  ru: "Русский",
};

export const localeIcons: Record<Locale, string> = {
  ja: "🇯🇵",
  en: "🇺🇸",
  es: "🇪🇸",
  zh: "🇨🇳",
  ru: "🇷🇺",
};
