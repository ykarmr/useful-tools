import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateToolStructuredData } from "@/lib/structured-data";
import { generateToolMetadata } from "@/lib/metadata";
import GridPlaygroundClient from "./grid-playground-client";

interface GridPlaygroundPageProps {
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

  return {
    ...generateToolMetadata(
      locale,
      "grid-playground",
      t.gridPlayground,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "grid-playground",
          t.gridPlayground,
          t.common
        ),
      ]),
    },
  };
}

export default async function GridPlaygroundPage({
  params,
}: GridPlaygroundPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <GridPlaygroundClient locale={locale} t={t} />;
}
