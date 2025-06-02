import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getTranslations } from "@/lib/i18n";
import "./globals.css";

export const dynamic = "force-static";

const inter = Inter({ subsets: ["latin"] });

// Use English as default for root layout
const t = getTranslations("en");

export const metadata: Metadata = {
  metadataBase: new URL("https://useful-tools.vercel.app"),
  title: {
    template: t.common.seo.titleTemplate,
    default: t.common.seo.defaultTitle,
  },
  description: t.common.seo.siteDescription,
  keywords: t.common.seo.keywords,
  authors: [{ name: t.common.seo.structuredData.organizationName }],
  creator: t.common.seo.structuredData.organizationName,
  publisher: t.common.seo.structuredData.organizationName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://useful-tools.vercel.app",
    siteName: t.common.seo.siteTitle,
    title: t.common.seo.siteTitle,
    description: t.common.seo.siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: t.common.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t.common.seo.siteTitle,
    description: t.common.seo.siteDescription,
    images: ["/og-image.png"],
    creator: t.common.seo.twitterCreator,
  },
  verification: {
    google: t.common.seo.verification.google,
    yandex: t.common.seo.verification.yandex,
    yahoo: t.common.seo.verification.yahoo,
  },
  alternates: {
    canonical: "https://useful-tools.vercel.app",
    languages: {
      "en-US": "https://useful-tools.vercel.app/en",
      "ja-JP": "https://useful-tools.vercel.app/ja",
    },
  },
  category: "technology",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://useful-tools.vercel.app" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://useful-tools.vercel.app/en"
        />
        <link
          rel="alternate"
          hrefLang="ja"
          href="https://useful-tools.vercel.app/ja"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://useful-tools.vercel.app/en"
        />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content={t.common.seo.siteTitle}
        />
        <link
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
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: t.common.seo.siteTitle,
              description: t.common.seo.siteDescription,
              url: "https://useful-tools.vercel.app",
              applicationCategory:
                t.common.seo.structuredData.applicationCategory,
              operatingSystem: t.common.seo.structuredData.operatingSystem,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: t.common.seo.structuredData.organizationName,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: t.common.seo.structuredData.ratingValue,
                reviewCount: t.common.seo.structuredData.reviewCount,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-surface-light text-gray-900`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
