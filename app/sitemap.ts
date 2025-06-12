import { baseUrl } from "@/lib/const";
import { getAlternates, locales } from "@/lib/i18n";
import { Locale } from "@/locales";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export async function generateSitemaps() {
  return locales.map((locale) => ({
    id: locale,
  }));
}

export default async function sitemap({
  id,
}: {
  id: Locale;
}): Promise<MetadataRoute.Sitemap> {
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
    "/unit-conversion",
    "/subnet-calculator",
    "/pet-age-conversion",
    "/image-converter",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // 各ロケールのルートを追加
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}/${id}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 0.8 : 1,
      alternates: getAlternates(id, route),
    });
  });

  return sitemap;
}
