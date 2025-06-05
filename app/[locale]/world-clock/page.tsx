import WorldClockClient from "./world-clock-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface WorldClockPageProps {
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
    title: `${t.worldClock.title} | ${t.common.siteTitle}`,
    description: t.worldClock.description,
    keywords: t.worldClock.keywords || [],
    openGraph: {
      title: t.worldClock.title,
      description: t.worldClock.description,
      url: `${baseUrl}/${locale}/world-clock`,
    },
    alternates: getAlternates(locale, "/world-clock"),
  };
}

export default async function WorldClockPage({ params }: WorldClockPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <WorldClockClient locale={locale} t={t} />;
}
