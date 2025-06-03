import type { Metadata } from "next";
import { getTranslations, interpolate, isValidLocale } from "@/locales";
import { baseUrl } from "@/lib/const";
import { notFound } from "next/navigation";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return {
    title: `${t.terms.title} | ${t.common.siteTitle}`,
    description: t.terms.introduction,
    keywords: t.terms.keywords || [],
    openGraph: {
      title: t.qrGenerator.title,
      description: t.qrGenerator.description,
      url: `${baseUrl}/${locale}/terms`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  const currentDate = new Date().toLocaleDateString(
    locale === "ja"
      ? "ja-JP"
      : locale === "zh"
      ? "zh-CN"
      : locale === "es"
      ? "es-ES"
      : "en-US"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.terms.title}
          </h1>

          <p className="text-sm text-gray-600 mb-8">
            {interpolate(t.terms.lastUpdated, { date: currentDate })}
          </p>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t.terms.introduction}
            </p>

            <div className="space-y-8">
              {Object.entries(t.terms.sections).map(([key, section]) => (
                <section key={key}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
