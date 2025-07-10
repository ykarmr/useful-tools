import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import MermaidGeneratorClient from "./mermaid-generator-client";

interface MermaidGeneratorPageProps {
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
    title: `${t.mermaidGenerator.title} | ${t.common.siteTitle}`,
    description: t.mermaidGenerator.description,
    keywords: t.mermaidGenerator.keywords || [],
    openGraph: {
      title: t.mermaidGenerator.title,
      description: t.mermaidGenerator.description,
      url: `${baseUrl}/${locale}/mermaid-generator`,
    },
    alternates: getAlternates(locale, "mermaid-generator"),
  };
}

export default async function MermaidGeneratorPage({
  params,
}: MermaidGeneratorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <MermaidGeneratorClient locale={locale} t={t} />;
}
