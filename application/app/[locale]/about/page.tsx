import type { Metadata } from "next";
import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";
import AboutClient from "./about-client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  // 一旦日本語で作成するため、jaの翻訳を使用
  const t = getTranslations("ja");

  return {
    title: `サイト運用者について | ${t.common.siteTitle}`,
    description:
      "USEFUL TOOLSの開発者・運用者についてご紹介します。このサイトの目的やビジョン、開発の経緯などをお伝えします。",
    keywords: ["サイト運用者", "開発者", "USEFUL TOOLS", "運営者情報"],
    openGraph: {
      title: "サイト運用者について",
      description: "USEFUL TOOLSの開発者・運用者についてご紹介します。",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <AboutClient locale={locale} t={t} />;
}
