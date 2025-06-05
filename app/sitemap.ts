import { baseUrl } from "@/lib/const";
import { getAlternates, locales } from "@/lib/getLocaleMapping";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // 共通ルート
  const routes = [
    "",
    "/calculator",
    "/coin-flip",
    "/contact",
    "/dice-roller",
    "/digital-clock",
    "/ip-address",
    "/json-formatter",
    "/markdown-preview",
    "/pomodoro-timer",
    "/privacy",
    "/qr-generator",
    "/random-number",
    "/random-string",
    "/roulette",
    "/scoreboard",
    "/services",
    "/team-generator",
    "/terms",
    "/timer",
    "/todo",
    "/url-encoder",
    "/user-agent",
    "/world-clock",
    "/url-analyzer",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // 各ロケールのルートを追加
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 0.8 : 1,
        alternates: getAlternates(locale, route),
      });
    });
  });

  return sitemap;
}
