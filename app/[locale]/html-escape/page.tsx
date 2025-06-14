import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import HtmlEscapeClient from "./html-escape-client";

interface HtmlEscapePageProps {
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
    title: `${t.htmlEscape.title} | ${t.common.siteTitle}`,
    description: t.htmlEscape.description,
    keywords: t.htmlEscape.keywords || [],
    openGraph: {
      title: t.htmlEscape.title,
      description: t.htmlEscape.description,
      url: `${baseUrl}/${locale}/html-escape`,
    },
    alternates: getAlternates(locale, "html-escape"),
  };
}

export default async function HtmlEscapePage({ params }: HtmlEscapePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <HtmlEscapeClient locale={locale} t={t} />;
}
