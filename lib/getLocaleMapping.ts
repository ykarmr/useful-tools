import { Locale } from "@/locales";
import { baseUrl } from "./const";

export const locales: Locale[] = ["en", "es", "ja", "zh"];

export const getLocaleMapping = (locale: Locale) => {
  const localeMapping: Record<Locale, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    es: "es-ES",
  };

  return localeMapping[locale] || "en-US";
};

export const getAlternates = (locale: Locale, path: string = "") => {
  let languages: Record<string, string> = {};
  locales.forEach((loc) => {
    const langCode = getLocaleMapping(loc);
    languages[langCode] = `${baseUrl}/${loc}${path}`;
  });

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages,
  };
};
