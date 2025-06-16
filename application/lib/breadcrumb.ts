import { Translations } from "@/locales";
import { SupportedLocale } from "./i18n";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

/**
 * パンクズリストを生成する関数
 * @param locale - 現在のロケール
 * @param t - 翻訳オブジェクト
 * @param pathname - 現在のパス名
 * @returns パンクズリストアイテムの配列
 */
export function generateBreadcrumbs(
  locale: SupportedLocale,
  t: Translations,
  pathname: string
): BreadcrumbItem[] {
  // パス名からロケールを除去して正規化
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const segments = pathWithoutLocale.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: t.common.breadcrumb.home,
      href: `/${locale}`,
    },
  ];

  // サービス一覧ページの場合
  if (segments.length === 1 && segments[0] === "services") {
    breadcrumbs.push({
      label: t.common.breadcrumb.services,
      isCurrentPage: true,
    });
    return breadcrumbs;
  }

  // 静的ページの場合（contact, terms, privacy）
  if (segments.length === 1) {
    const pageKey = segments[0];
    const pageTranslation = getPageTranslation(t, pageKey);
    if (pageTranslation) {
      // 静的ページはhomeから直接派生
      breadcrumbs.push({
        label: pageTranslation.title,
        isCurrentPage: true,
      });
      return breadcrumbs;
    }
  }

  // 各ツールページの場合
  if (segments.length === 1) {
    const toolKey = segments[0];
    const toolTranslation = getToolTranslation(t, toolKey);

    if (toolTranslation) {
      // サービス一覧へのリンクを追加
      breadcrumbs.push({
        label: t.common.breadcrumb.services,
        href: `/${locale}/services`,
      });

      // 現在のツールページ
      breadcrumbs.push({
        label: toolTranslation.title,
        isCurrentPage: true,
      });
    }
  }

  return breadcrumbs;
}

/**
 * ツールの翻訳を取得する関数
 */
function getToolTranslation(
  t: Translations,
  toolKey: string
): { title: string } | null {
  // ツールキーに対応する翻訳を取得
  const toolKeys = [
    "calculator",
    "coinFlip",
    "diceRoller",
    "randomNumber",
    "randomString",
    "roulette",
    "teamGenerator",
    "digitalClock",
    "pomodoroTimer",
    "timer",
    "worldClock",
    "ipAddress",
    "subnetCalculator",
    "urlAnalyzer",
    "urlEncoder",
    "userAgent",
    "htmlEscape",
    "jsonFormatter",
    "markdownPreview",
    "textStatistics",
    "imageConverter",
    "qrGenerator",
    "unitConversion",
    "bmiCalculator",
    "petAgeConversion",
    "colorPalette",
    "todo",
    "scoreboard",
  ];

  // ケバブケースをキャメルケースに変換
  const camelCaseKey = toolKey
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  if (toolKeys.includes(camelCaseKey)) {
    return (t as any)[camelCaseKey] || null;
  }

  return null;
}

/**
 * 静的ページの翻訳を取得する関数
 */
function getPageTranslation(
  t: Translations,
  pageKey: string
): { title: string } | null {
  const pageKeys = ["contact", "terms", "privacy"];

  if (pageKeys.includes(pageKey)) {
    return (t as any)[pageKey] || null;
  }

  return null;
}
