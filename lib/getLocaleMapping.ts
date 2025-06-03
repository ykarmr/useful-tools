import { baseUrl } from "./const";

type Locales = "en" | "es" | "ja" | "zh";

export const locales: Locales[] = ["en", "es", "ja", "zh"];

export const getLocaleMapping = (locale: Locales) => {
  const localeMapping: Record<Locales, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    es: "es-ES",
  };

  return localeMapping[locale] || "en-US";
};

export const getAlternates = (locale: Locales, path: string = "") => {
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
