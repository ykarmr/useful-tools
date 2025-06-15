import TeamGeneratorClient from "./team-generator-client";
import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";

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
    ...generateToolMetadata(
      locale,
      "team-generator",
      t.teamGenerator,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "team-generator",
          t.teamGenerator,
          t.common
        ),
      ]),
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
