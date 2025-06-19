import * as path from "path";
import * as fs from "fs";

/**
 * applicationディレクトリの翻訳ファイルを動的に読み込む
 */
export function loadApplicationTranslations(locale: string) {
  try {
    // まず、ビルド済みのJSファイルを探す
    const builtPath = path.join(
      __dirname,
      "../../../application/.next/static/chunks/pages/_app-"
      // Next.jsのビルド後のファイル構造に依存するため、
      // より確実な方法として直接TypeScriptファイルを読み込む
    );

    // TypeScriptファイルを直接読み込む方法
    const tsPath = path.join(
      __dirname,
      "../../../application/locales",
      locale,
      "index.ts"
    );

    if (fs.existsSync(tsPath)) {
      // require.cacheをクリアして最新の内容を取得
      delete require.cache[require.resolve(tsPath)];
      const translationModule = require(tsPath);
      return translationModule.default || translationModule;
    }

    // JSファイルも試す
    const jsPath = path.join(
      __dirname,
      "../../../application/locales",
      locale,
      "index.js"
    );

    if (fs.existsSync(jsPath)) {
      delete require.cache[require.resolve(jsPath)];
      const translationModule = require(jsPath);
      return translationModule.default || translationModule;
    }

    console.warn(`Translation file not found for locale: ${locale}`);
    return null;
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}:`, error);
    return null;
  }
}

/**
 * 翻訳データから必要な情報を抽出
 */
export function extractTranslationData(translations: any, locale: string) {
  if (!translations) {
    return null;
  }

  return {
    siteTitle:
      translations.common?.seo?.siteTitle ||
      translations.common?.siteTitle ||
      "USEFUL TOOLS",
    siteDescription:
      translations.common?.seo?.siteDescription ||
      "A collection of useful tools",
    homeDescription:
      translations.common?.seo?.homeDescription ||
      translations.common?.seo?.siteDescription ||
      "A collection of useful tools to streamline your daily tasks",
    subtitle:
      translations.common?.seo?.siteDescription?.substring(0, 50) ||
      "Streamline Your Daily Tasks",
  };
}
