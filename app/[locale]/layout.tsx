import type React from "react";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/main-layout";
import {
  getTranslations,
  getSupportedLocales,
  isValidLocale,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import { baseUrl } from "@/lib/const";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  const openGraphLocale = {
    "en-US": "en_US",
    "ja-JP": "ja_JP",
    "zh-CN": "zh_CN",
    "es-ES": "es_ES",
  };
  return {
    title: {
      template: t.common.seo.titleTemplate,
      default: t.common.seo.defaultTitle,
    },
    description: t.common.seo.siteDescription,
    keywords: t.common.seo.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en-US": `${baseUrl}/en`,
        "ja-JP": `${baseUrl}/ja`,
        "zh-CN": `${baseUrl}/zh`,
        "es-ES": `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t.common.seo.siteTitle,
      description: t.footer.description,
      type: "website",
      locale:
        openGraphLocale[locale as keyof typeof openGraphLocale] || "en_US",
      url: `${baseUrl}/${locale}`,
      siteName: t.common.seo.siteTitle,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.common.seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.common.seo.siteTitle,
      description: t.footer.description,
      images: ["/og-image.png"],
      creator: t.common.seo.twitterCreator,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <div lang={locale}>
      <MainLayout locale={locale} t={t}>
        {children}
      </MainLayout>
    </div>
  );
}
