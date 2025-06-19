const path = require("path");
const fs = require("fs");

// applicationディレクトリのパス
const APPLICATION_DIR = path.join(__dirname, "../../../application");

/**
 * application/lib/i18n.tsの機能をJavaScriptで再実装
 */

// 翻訳ファイルのキャッシュ
const translationsCache = {};

// サポートする言語
const SUPPORTED_LOCALES = ["ja", "en", "es", "zh", "ru"];

/**
 * 言語コードが有効かチェック
 */
function isValidLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

/**
 * 翻訳ファイルを動的に読み込む
 */
function loadTranslations(locale) {
  if (!isValidLocale(locale)) {
    return null;
  }

  // キャッシュから取得
  if (translationsCache[locale]) {
    return translationsCache[locale];
  }

  try {
    // 各翻訳ファイルを個別に読み込み（TypeScriptファイルをrequireするとエラーが発生するため）
    const localeDir = path.join(APPLICATION_DIR, "locales", locale);

    // メインの翻訳ファイルパス
    const mainTranslationPath = path.join(localeDir, "index.ts");

    if (fs.existsSync(mainTranslationPath)) {
      // require.cacheをクリアして最新の内容を取得
      delete require.cache[require.resolve(mainTranslationPath)];
      const translationModule = require(mainTranslationPath);
      const translations = translationModule.default || translationModule;

      // キャッシュに保存
      translationsCache[locale] = translations;
      return translations;
    }

    console.warn(`Translation file not found: ${mainTranslationPath}`);
    return null;
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}:`, error.message);
    return null;
  }
}

/**
 * application/lib/i18n.tsのgetTranslations関数と同等の機能
 */
function getTranslations(locale) {
  return loadTranslations(locale);
}

/**
 * サポートされている言語リストを取得
 */
function getSupportedLocales() {
  return SUPPORTED_LOCALES;
}

module.exports = {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
  SUPPORTED_LOCALES,
};
