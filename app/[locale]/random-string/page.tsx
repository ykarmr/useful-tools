import RandomStringClient from "./random-string-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface RandomStringPageProps {
  params: Promise<{ locale: string }>;
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

  return {
    title: `${t.randomString.title} | ${t.common.siteTitle}`,
    description: t.randomString.description,
    keywords: t.randomString.keywords || [],
    openGraph: {
      title: t.randomString.title,
      description: t.randomString.description,
      url: `${baseUrl}/${locale}/random-string`,
    },
    alternates: getAlternates(locale, "/random-string"),
  };
}

export default async function RandomStringPage({
  params,
}: RandomStringPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <RandomStringClient locale={locale} t={t} />;
}
