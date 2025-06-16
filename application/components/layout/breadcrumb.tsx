"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  generateBreadcrumbs,
  BreadcrumbItem as BreadcrumbItemType,
} from "@/lib/breadcrumb";
import { SupportedLocale } from "@/lib/i18n";
import { Translations } from "@/locales";

interface BreadcrumbNavigationProps {
  locale: SupportedLocale;
  t: Translations;
  className?: string;
}

/**
 * パンクズリストナビゲーションコンポーネント
 * 現在のページパスに基づいて自動的にパンクズリストを生成・表示する
 */
export default function BreadcrumbNavigation({
  locale,
  t,
  className,
}: BreadcrumbNavigationProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(locale, t, pathname);

  // ホームページの場合はパンクズリストを表示しない
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item: BreadcrumbItemType, index: number) => (
            <div key={index} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.isCurrentPage ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
