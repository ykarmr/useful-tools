import type { Translations, Locale } from "@/locales";
import { baseUrl } from "./const";

// SEO強化のための構造化データ生成ユーティリティ
export function generateToolStructuredData(
  locale: Locale,
  toolKey: string,
  toolTranslations: any,
  siteTranslations: Translations["common"]
) {
  const toolUrl = `${baseUrl}/${locale}/${toolKey}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // メインのWebApplicationエンティティ
      {
        "@type": "WebApplication",
        "@id": `${toolUrl}#webapp`,
        name: toolTranslations.title,
        description: toolTranslations.description,
        url: toolUrl,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "HTML5, JavaScript",
        isAccessibleForFree: true,
        author: {
          "@type": "Organization",
          "@id": `${baseUrl}#organization`,
          name: siteTranslations.seo.structuredData.organizationName,
          url: baseUrl,
        },
      },
      // SoftwareApplicationエンティティ（より具体的）
      {
        "@type": "SoftwareApplication",
        "@id": `${toolUrl}#software`,
        name: toolTranslations.title,
        description: toolTranslations.description,
        url: toolUrl,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web Browser",
        softwareVersion: "1.0",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        author: {
          "@id": `${baseUrl}#organization`,
        },
        isAccessibleForFree: true,
        featureList: Array.isArray(toolTranslations.keywords)
          ? toolTranslations.keywords.slice(0, 5)
          : [],
      },
      // パンくずリスト
      {
        "@type": "BreadcrumbList",
        "@id": `${toolUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteTranslations.seo.siteTitle,
            item: `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${baseUrl}/${locale}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: toolTranslations.title,
            item: toolUrl,
          },
        ],
      },
      // WebPageエンティティ
      {
        "@type": "WebPage",
        "@id": `${toolUrl}#webpage`,
        url: toolUrl,
        name: toolTranslations.title,
        description: toolTranslations.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          name: siteTranslations.seo.siteTitle,
          url: baseUrl,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/tools/${toolKey}-og.jpg`,
          width: 1200,
          height: 630,
        },
        breadcrumb: {
          "@id": `${toolUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${toolUrl}#webapp`,
        },
      },
    ],
  };
}

// HowToガイド用の構造化データ
export function generateHowToStructuredData(
  locale: Locale,
  toolKey: string,
  toolTranslations: any,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${toolTranslations.title}`,
    description: `Step-by-step guide on how to use ${toolTranslations.title}`,
    image: `${baseUrl}/images/tools/${toolKey}-guide.jpg`,
    supply: [
      {
        "@type": "HowToSupply",
        name: "Web Browser",
      },
    ],
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// FAQ用の構造化データ
export function generateFAQStructuredData(
  faqList: Array<{ q: string; a: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// 組織の構造化データ
export function generateOrganizationStructuredData(
  siteTranslations: Translations["common"]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: siteTranslations.seo.structuredData.organizationName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: siteTranslations.seo.siteDescription,
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${baseUrl}/contact`,
    },
  };
}

// ホームページ用の包括的な構造化データ
export function generateHomePageStructuredData(
  locale: Locale,
  homeTranslations: any,
  siteTranslations: Translations["common"]
) {
  const siteUrl = `${baseUrl}/${locale}`;

  return [
    // 組織データ
    generateOrganizationStructuredData(siteTranslations),

    // WebSiteエンティティ
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      name: siteTranslations.siteTitle,
      description: homeTranslations.subtitle,
      url: baseUrl,
      inLanguage: locale,
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        "@id": `${baseUrl}#organization`,
      },
      publisher: {
        "@id": `${baseUrl}#organization`,
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/${locale}/services?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
      mainEntity: {
        "@id": `${siteUrl}#webpage`,
      },
    },

    // メインWebPageエンティティ
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: homeTranslations.title,
      description: homeTranslations.subtitle,
      isPartOf: {
        "@id": `${baseUrl}#website`,
      },
      about: {
        "@id": `${baseUrl}#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${siteUrl}#primaryimage`,
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        caption: homeTranslations.title,
      },
      breadcrumb: {
        "@id": `${siteUrl}#breadcrumb`,
      },
      mainContentOfPage: {
        "@type": "CollectionPage",
        name: "Useful Tools Collection",
        description: "Collection of free online utility tools",
      },
    },

    // パンくずリスト
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeTranslations.title,
          item: siteUrl,
        },
      ],
    },

    // ItemListエンティティ（ツールカテゴリ用）
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteUrl}#toolslist`,
      name: "Online Utility Tools",
      description:
        "Comprehensive collection of free online tools for productivity, calculations, and utilities",
      numberOfItems: 29, // 現在のツール数に基づく
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          position: 1,
          name: "Calculator",
          url: `${baseUrl}/${locale}/calculator`,
          applicationCategory: "UtilityApplication",
        },
        {
          "@type": "SoftwareApplication",
          position: 2,
          name: "QR Code Generator",
          url: `${baseUrl}/${locale}/qr-generator`,
          applicationCategory: "UtilityApplication",
        },
        {
          "@type": "SoftwareApplication",
          position: 3,
          name: "Timer",
          url: `${baseUrl}/${locale}/timer`,
          applicationCategory: "UtilityApplication",
        },
        // 主要なツールのみを含める（SEO的に重要な上位ツール）
      ],
    },
  ];
}
