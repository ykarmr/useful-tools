import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import PixelArtEditorClient from "./pixel-art-editor-client";

interface PixelArtEditorPageProps {
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
    title: `${t.pixelArtEditor.title} | ${t.common.siteTitle}`,
    description: t.pixelArtEditor.description,
    keywords: t.pixelArtEditor.keywords || [],
    openGraph: {
      title: t.pixelArtEditor.title,
      description: t.pixelArtEditor.description,
      url: `${baseUrl}/${locale}/pixel-art-editor`,
      images: [
        {
          url: `${baseUrl}/images/ogp/pages/ogp-pixel-art-editor-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t.pixelArtEditor.title,
        },
      ],
    },
    alternates: getAlternates(locale, "pixel-art-editor"),
  };
}

export default async function PixelArtEditorPage({
  params,
}: PixelArtEditorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <PixelArtEditorClient locale={locale} t={t} />;
}
