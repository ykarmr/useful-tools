import type { Translations } from "./types";
import en from "./en";
import ja from "./ja";
import es from "./es";
import zh from "./zh";

export type Locale = "en" | "ja" | "es" | "zh";

const translations: Record<Locale, Translations> = {
  en,
  ja,
  es,
  zh,
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}

export function getSupportedLocales(): Locale[] {
  return Object.keys(translations) as Locale[];
}

export function isValidLocale(locale: string): locale is Locale {
  return getSupportedLocales().includes(locale as Locale);
}

// Helper function to interpolate variables in translation strings
export function interpolate(
  template: string,
  variables: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// Export types for external use
export type { Translations } from "./types";
