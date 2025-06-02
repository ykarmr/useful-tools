import enTranslations from "@/locales/en"
import jaTranslations from "@/locales/ja"
import zhTranslations from "@/locales/zh"
import esTranslations from "@/locales/es"
import type { Translations } from "@/locales/types"

const translations = {
  en: enTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
  es: esTranslations,
} as const

export type SupportedLocale = keyof typeof translations

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(translations) as SupportedLocale[]
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return locale in translations
}

export function getTranslations(locale: SupportedLocale): Translations {
  return translations[locale]
}

export function getDefaultLocale(): SupportedLocale {
  return "en"
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment
  }

  return getDefaultLocale()
}
