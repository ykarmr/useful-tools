import { baseUrl } from "@/lib/const";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ja", "zh", "es"];

  // 共通ルート
  const routes = [
    "",
    "/services",
    "/roulette",
    "/todo",
    "/calculator",
    "/dice-roller",
    "/coin-flip",
    "/random-number",
    "/random-string",
    "/timer",
    "/pomodoro-timer",
    "/digital-clock",
    "/scoreboard",
    "/world-clock",
    "/team-generator",
    "/qr-generator",
    "/user-agent",
    "/ip-address",
    "/json-formatter",
    "/url-encoder",
    "/markdown-preview",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  const alternatesLanguages = {
    "en-US": `${baseUrl}/en`,
    "ja-JP": `${baseUrl}/ja`,
    "zh-CN": `${baseUrl}/zh`,
    "es-ES": `${baseUrl}/es`,
  };
  // 各ロケールのルートを追加
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(alternatesLanguages).map(([lang, url]) => [
              lang,
              locale === lang.split("-")[0] ? `${url}/${locale}` : url,
            ])
          ),
        },
      });
    });
  });

  return sitemap;
}
