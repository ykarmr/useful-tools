import JsonFormatterClient from "./json-formatter-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface JsonFormatterPageProps {
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
    title: t.jsonFormatter.title,
    description: t.jsonFormatter.description,
    keywords: t.jsonFormatter.keywords || [],
    openGraph: {
      title: t.jsonFormatter.title,
      description: t.jsonFormatter.description,
      url: `${baseUrl}/${locale}/json-formatter`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/json-formatter`,
    },
  };
}

export default async function JsonFormatterPage({
  params,
}: JsonFormatterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <JsonFormatterClient locale={locale} t={t} />;
}
