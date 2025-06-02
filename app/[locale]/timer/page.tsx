import TimerClient from "./timer-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface TimerPageProps {
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
    title: t.timer.title,
    description: t.timer.description,
    keywords: t.timer.keywords || [],
    openGraph: {
      title: t.timer.title,
      description: t.timer.description,
      url: `${baseUrl}/${locale}/timer`,
      images: [
        {
          url: "/og-timer.png",
          width: 1200,
          height: 630,
          alt: t.timer.title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/timer`,
    },
  };
}

export default async function TimerPage({ params }: TimerPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <TimerClient locale={locale} t={t} />;
}
