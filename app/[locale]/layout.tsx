import type React from "react";
import type { Metadata, Viewport } from "next";
import MainLayout from "@/components/layout/main-layout";
import {
  getTranslations,
  getSupportedLocales,
  isValidLocale,
  localeMapping,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import { baseUrl } from "@/lib/const";
import { Inter } from "next/font/google";
import { getAlternates, getLocaleMapping } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  const lang = getLocaleMapping(locale);
  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7007912278084791" />

        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
        {/* <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}

        <meta
          name="apple-mobile-web-app-title"
          content={t.common.seo.siteTitle}
        />

        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        /> */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: t.common.seo.siteTitle,
              description: t.common.seo.siteDescription,
              url: `${baseUrl}/${locale}`,
              applicationCategory:
                t.common.seo.structuredData.applicationCategory,
              operatingSystem: t.common.seo.structuredData.operatingSystem,
              author: {
                "@type": "Organization",
                name: t.common.seo.structuredData.organizationName,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${baseUrl}/${locale}/services`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* GA */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MLK1NVZVNG"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-MLK1NVZVNG');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-surface-light text-gray-900`}
      >
        <MainLayout locale={locale} t={t}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
