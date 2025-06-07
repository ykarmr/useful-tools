import { Locale } from "@/locales";
import { baseUrl } from "./const";
import { SupportedLocale } from "./i18n";

export const locales: SupportedLocale[] = ["en", "es", "ja", "zh"];

export const getLocaleMapping = (locale: SupportedLocale) => {
  const localeMapping: Record<Locale, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    es: "es-ES",
  };

  return localeMapping[locale] || "en-US";
};

export const getAlternates = (locale: SupportedLocale, path: string = "") => {
  let languages: Record<string, string> = {};
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
};
