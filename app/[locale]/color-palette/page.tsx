import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
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
    ...generateToolMetadata(locale, "color-palette", t.colorPalette, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "color-palette",
          t.colorPalette,
          t.common
        ),
      ]),
    },
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
