import TodoClient from "./todo-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface TodoPageProps {
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
    title: `${t.todo.title} | ${t.common.siteTitle}`,
    description: t.todo.description,
    keywords: t.todo.keywords || [],
    openGraph: {
      title: t.todo.title,
      description: t.todo.description,
      url: `${baseUrl}/${locale}/todo`,
    },
    alternates: getAlternates(locale, "/todo"),
  };
}

export default async function TodoPage({ params }: TodoPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <TodoClient locale={locale} t={t} />;
}
