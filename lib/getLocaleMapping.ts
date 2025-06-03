export const getLocaleMapping = (locale: string) => {
  const localeMapping: Record<string, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    es: "es-ES",
  };

  return localeMapping[locale] || "en-US";
};
