import TeamGeneratorClient from "./team-generator-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface TeamGeneratorPageProps {
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
    title: t.teamGenerator.title,
    description: t.teamGenerator.description,
    keywords: t.teamGenerator.keywords || [],
    openGraph: {
      title: t.teamGenerator.title,
      description: t.teamGenerator.description,
      url: `${baseUrl}/${locale}/team-generator`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/team-generator`,
    },
  };
}

export default async function TeamGeneratorPage({
  params,
}: TeamGeneratorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <TeamGeneratorClient locale={locale} t={t} />;
}
