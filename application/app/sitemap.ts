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
  // ページタイプを判定するヘルパー関数
  const isPopularTool = (route: string) => {
    return [
      "/calculator",
      "/coin-flip",
      "/dice-roller",
      "/digital-clock",
      "/json-formatter",
      "/markdown-preview",
      "/pomodoro-timer",
      "/qr-generator",
      "/random-number",
      "/timer",
      "/todo",
      "/world-clock",
      "/color-palette",
      "/bmi-calculator",
      "/unit-conversion",
      "/image-converter",
      "/text-statistics",
    ].includes(route);
  };

  const isSpecializedTool = (route: string) => {
    return [
      "/random-string",
      "/roulette",
      "/scoreboard",
      "/team-generator",
      "/url-encoder",
      "/user-agent",
      "/url-analyzer",
      "/subnet-calculator",
      "/pet-age-conversion",
      "/age-calculator",
      "/html-escape",
      "/pixel-art-editor",
      "/data-converter",
      "/base-converter",
      "/id-generator",
      "/flexbox-playground",
      "/grid-playground",
      "/mermaid-generator",
      "/chart-generator",
      "/ip-address",
    ].includes(route);
  };

  const isStaticPage = (route: string) => {
    return ["/contact", "/terms", "/privacy"].includes(route);
  };

  // 共通ルート
  const routes = [
    "",
    "/about",
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
    "/color-palette",
    "/text-statistics",
    "/bmi-calculator",
    "/age-calculator",
    "/html-escape",
    "/pixel-art-editor",
    "/data-converter",
    "/base-converter",
    "/id-generator",
    "/flexbox-playground",
    "/grid-playground",
    "/mermaid-generator",
    "/chart-generator",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // 各ロケールのルートを追加
  routes.forEach((route) => {
    // SEOに配慮したpriorityとchangeFrequencyの設定
    let priority = 0.5;
    let changeFrequency: "daily" | "weekly" | "monthly" = "weekly";

    // ページの種類に応じて優先度と更新頻度を設定
    if (route === "") {
      // ホームページ - 最も重要、頻繁に更新
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/services") {
      // サービス一覧ページ - 2番目に重要、定期的に更新
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (isPopularTool(route)) {
      // 人気の高い主要ツール - 高優先度
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (isSpecializedTool(route)) {
      // 特化型ツール - 中優先度
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (route === "/about") {
      // 企業情報ページ - 中優先度、たまに更新
      priority = 0.6;
      changeFrequency = "monthly";
    } else if (isStaticPage(route)) {
      // 法的・サポートページ - 低優先度、稀に更新
      priority = 0.4;
      changeFrequency = "monthly";
    }

    sitemap.push({
      url: `${baseUrl}/${id}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: getAlternates(id, route),
    });
  });

  return sitemap;
}
