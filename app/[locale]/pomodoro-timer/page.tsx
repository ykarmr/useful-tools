import PomodoroTimerClient from "./pomodoro-timer-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

interface PomodoroTimerPageProps {
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
    title: t.pomodoroTimer.title,
    description: t.pomodoroTimer.description,
    keywords: t.pomodoroTimer.keywords || [],
    openGraph: {
      title: t.pomodoroTimer.title,
      description: t.pomodoroTimer.description,
      url: `${baseUrl}/${locale}/pomodoro-timer`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/pomodoro-timer`,
    },
  };
}

export default async function PomodoroTimerPage({
  params,
}: PomodoroTimerPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <PomodoroTimerClient locale={locale} t={t} />;
}
