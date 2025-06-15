import { baseUrl } from "@/lib/const";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/", "*.json", "/private/", "/.well-known/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: [
      // 各言語のサイトマップを個別に指定
      `${baseUrl}/sitemap/ja.xml`,
      `${baseUrl}/sitemap/en.xml`,
      `${baseUrl}/sitemap/es.xml`,
      `${baseUrl}/sitemap/ru.xml`,
      `${baseUrl}/sitemap/zh.xml`,
    ],
    host: baseUrl,
  };
}
