import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import ColorPaletteClient from "./color-palette-client";

interface ColorPalettePageProps {
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
    title: `${t.colorPalette.title} | ${t.common.siteTitle}`,
    description: t.colorPalette.description,
    keywords: t.colorPalette.keywords || [],
    openGraph: {
      title: t.colorPalette.title,
      description: t.colorPalette.description,
      url: `${baseUrl}/${locale}/color-palette`,
    },
    alternates: getAlternates(locale, "/color-palette"),
  };
}

export default async function ColorPalettePage({
  params,
}: ColorPalettePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ColorPaletteClient locale={locale} t={t} />;
}
