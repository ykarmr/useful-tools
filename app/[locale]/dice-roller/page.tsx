import DiceRollerClient from "./dice-roller-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface DiceRollerPageProps {
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
    title: t.diceRoller.title,
    description: t.diceRoller.description,
    keywords: t.diceRoller.keywords || [],
    openGraph: {
      title: t.diceRoller.title,
      description: t.diceRoller.description,
      url: `${baseUrl}/${locale}/dice-roller`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/dice-roller`,
    },
  };
}

export default async function DiceRollerPage({ params }: DiceRollerPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <DiceRollerClient locale={locale} t={t} />;
}
