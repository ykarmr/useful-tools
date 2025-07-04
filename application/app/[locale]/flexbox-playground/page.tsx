import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FlexboxPlaygroundClient from "./flexbox-playground-client";
import { generateToolStructuredData } from "@/lib/structured-data";
import { generateToolMetadata } from "@/lib/metadata";

interface FlexboxPlaygroundPageProps {
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
      "flexbox-playground",
      t.flexboxPlayground,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "flexbox-playground",
          t.flexboxPlayground,
          t.common
        ),
      ]),
    },
  };
}

export default async function FlexboxPlaygroundPage({
  params,
}: FlexboxPlaygroundPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <FlexboxPlaygroundClient locale={locale} t={t} />;
}
