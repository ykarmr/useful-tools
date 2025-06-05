import ScoreboardClient from "./scoreboard-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface ScoreboardPageProps {
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
    title: `${t.scoreboard.title} | ${t.common.siteTitle}`,
    description: t.scoreboard.description,
    keywords: t.scoreboard.keywords || [],
    openGraph: {
      title: t.scoreboard.title,
      description: t.scoreboard.description,
      url: `${baseUrl}/${locale}/scoreboard`,
    },
    alternates: getAlternates(locale, "/scoreboard"),
  };
}

export default async function ScoreboardPage({ params }: ScoreboardPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ScoreboardClient locale={locale} t={t} />;
}
