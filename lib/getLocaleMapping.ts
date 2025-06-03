import { baseUrl } from "./const";

type locales = "en" | "es" | "ja" | "zh";

const locales: locales[] = ["en", "es", "ja", "zh"];

export const getLocaleMapping = (locale: locales) => {
  const localeMapping: Record<locales, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    es: "es-ES",
  };

  return localeMapping[locale] || "en-US";
};

export const getAlternates = (locale: locales, path: string = "") => {
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
