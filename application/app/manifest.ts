import type { MetadataRoute } from "next";
import enTranslations from "@/locales/en";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  // デフォルトは英語を使用
  const t = enTranslations;

  return {
    name: t.common.seo.manifest.name,
    short_name: t.common.seo.manifest.shortName,
    description: t.common.seo.manifest.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B82F6",
    orientation: "portrait-primary",
    categories: t.common.seo.manifest.categories,
    lang: "en",
    icons: [
      {
        src: "/images/favicon/pwa/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/favicon/pwa/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/pwa/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    // screenshots: [
    //   {
    //     src: "/screenshot-wide.png",
    //     sizes: "1280x720",
    //     type: "image/png",
    //     form_factor: "wide",
    //   },
    //   {
    //     src: "/screenshot-narrow.png",
    //     sizes: "750x1334",
    //     type: "image/png",
    //     form_factor: "narrow",
    //   },
    // ],
  };
}
