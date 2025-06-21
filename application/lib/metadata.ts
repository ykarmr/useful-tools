import type { Metadata } from "next";
import type { Translations, Locale } from "@/locales";
import { baseUrl } from "./const";
import { getAlternates, localeMapping } from "./i18n";

// 全ツールページで使用される標準化されたメタデータ生成
export function generateToolMetadata(
  locale: Locale,
  toolKey: string,
  toolTranslations: any,
  siteTranslations: Translations["common"]
): Metadata {
  // subtitle がある場合は「title - subtitle」の形式にする
  const baseTitle = toolTranslations.subtitle
    ? `${toolTranslations.title} - ${toolTranslations.subtitle}`
    : toolTranslations.title;
  const title = `${baseTitle} | ${siteTranslations.siteTitle}`;
  const description = toolTranslations.description;
  const keywords = toolTranslations.keywords || [];
  const toolUrl = `${baseUrl}/${locale}/${toolKey}`;
  const ogImageUrl = `${baseUrl}/images/ogp/pages/ogp-${toolKey}-${locale}.png`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteTranslations.seo.structuredData.organizationName }],
    creator: siteTranslations.seo.structuredData.organizationName,
    publisher: siteTranslations.seo.structuredData.organizationName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: baseTitle,
      description,
      url: toolUrl,
      type: "website",
      locale: localeMapping[locale],
      siteName: siteTranslations.siteTitle,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: toolTranslations.title,
      description,
      creator: siteTranslations.seo.twitterCreator,
      images: [ogImageUrl],
    },
    alternates: getAlternates(locale, `/${toolKey}`),
    // カノニカルURL
    metadataBase: new URL(baseUrl),
    // 追加のSEOタグ
    other: {
      "application-name": siteTranslations.siteTitle,
      "msapplication-TileColor": "#3B82F6",
      "theme-color": "#3B82F6",
    },
  };
}

// ページレベルの標準化されたメタデータ生成
export function generatePageMetadata(
  locale: Locale,
  pageKey: string,
  pageTranslations: any,
  siteTranslations: Translations["common"]
): Metadata {
  const title = `${pageTranslations.title} | ${siteTranslations.siteTitle}`;
  const description =
    pageTranslations.description || pageTranslations.introduction;
  const keywords = pageTranslations.keywords || [];
  const pageUrl = `${baseUrl}/${locale}/${pageKey}`;
  const ogImageUrl = `${baseUrl}/images/ogp/pages/ogp-${pageKey}-${locale}.png`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteTranslations.seo.structuredData.organizationName }],
    creator: siteTranslations.seo.structuredData.organizationName,
    publisher: siteTranslations.seo.structuredData.organizationName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTranslations.title,
      description,
      url: pageUrl,
      type: "website",
      locale: localeMapping[locale],
      siteName: siteTranslations.siteTitle,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTranslations.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTranslations.title,
      description,
      creator: siteTranslations.seo.twitterCreator,
      images: [ogImageUrl],
    },
    alternates: getAlternates(locale, `/${pageKey}`),
    metadataBase: new URL(baseUrl),
  };
}

// ホームページ用の最適化されたメタデータ生成
export function generateHomePageMetadata(
  locale: Locale,
  homeTranslations: any,
  siteTranslations: Translations["common"]
): Metadata {
  const siteUrl = `${baseUrl}/${locale}`;
  const title = siteTranslations.seo.homeTitle || homeTranslations.title;
  const description =
    siteTranslations.seo.homeDescription || homeTranslations.subtitle;
  const keywords = siteTranslations.seo.homeKeywords || [];

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteTranslations.seo.structuredData.organizationName }],
    creator: siteTranslations.seo.structuredData.organizationName,
    publisher: siteTranslations.seo.structuredData.organizationName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMapping[locale],
      url: siteUrl,
      title,
      description,
      siteName: siteTranslations.siteTitle,
      images: [
        {
          url: `${baseUrl}/images/ogp/ogp-${locale}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/ogp/ogp-${locale}.png`],
      creator: siteTranslations.seo.twitterCreator,
    },
    alternates: getAlternates(locale),
    metadataBase: new URL(baseUrl),
    // Additional SEO enhancements
    category: "Technology",
    classification: "Utility Tools",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      // Add Google Site Verification if available
      // google: "your-google-site-verification-code",
    },
  };
}
