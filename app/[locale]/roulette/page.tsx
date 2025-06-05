import RouletteClient from "./roulette-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAlternates } from "@/lib/getLocaleMapping";
import { baseUrl } from "@/lib/const";

interface RoulettePageProps {
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
    title: `${t.roulette.title} | ${t.common.siteTitle}`,
    description: t.roulette.description,
    keywords: t.roulette.keywords || [],
    openGraph: {
      title: t.roulette.title,
      description: t.roulette.description,
      url: `${baseUrl}/${locale}/roulette`,
    },
    alternates: getAlternates(locale, "/roulette"),
  };
}

export default async function RoulettePage({ params }: RoulettePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <RouletteClient locale={locale} t={t} />;
}
