"use client";

import { useState } from "react";
import { PawPrint } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface PetAgeConversionProps {
  locale: Locale;
  t: Translations;
}

function convertPetAge(pet: string, age: number): number | "" {
  if (isNaN(age) || age < 0) return "";
  // 代表的な換算式
  if (pet === "dog") {
    if (age <= 0) return 0;
    if (age === 1) return 15;
    if (age === 2) return 24;
    if (age > 2) return 24 + (age - 2) * 4;
  }
  if (pet === "cat") {
    if (age <= 0) return 0;
    if (age === 1) return 15;
    if (age === 2) return 24;
    if (age > 2) return 24 + (age - 2) * 4;
  }
  // 以下、追加動物の換算式（例: 参考値や一般的な式を使用）
  if (pet === "rabbit") {
    // 1年目: 12歳, 2年目: 20歳, 以降1年ごとに6歳加算
    if (age <= 0) return 0;
    if (age === 1) return 12;
    if (age === 2) return 20;
    if (age > 2) return 20 + (age - 2) * 6;
  }
  if (pet === "hamster") {
    // 1年目: 20歳, 2年目: 40歳, 以降1年ごとに10歳加算
    if (age <= 0) return 0;
    if (age === 1) return 20;
    if (age === 2) return 40;
    if (age > 2) return 40 + (age - 2) * 10;
  }
  if (pet === "ferret") {
    // 1年目: 15歳, 2年目: 24歳, 以降1年ごとに7歳加算
    if (age <= 0) return 0;
    if (age === 1) return 15;
    if (age === 2) return 24;
    if (age > 2) return 24 + (age - 2) * 7;
  }
  if (pet === "horse") {
    // 1年目: 6.5歳, 2年目: 13歳, 以降1年ごとに2.5歳加算
    if (age <= 0) return 0;
    if (age === 1) return 6.5;
    if (age === 2) return 13;
    if (age > 2) return 13 + (age - 2) * 2.5;
  }
  if (pet === "cow") {
    // 1年目: 14歳, 2年目: 22歳, 以降1年ごとに4歳加算
    if (age <= 0) return 0;
    if (age === 1) return 14;
    if (age === 2) return 22;
    if (age > 2) return 22 + (age - 2) * 4;
  }
  if (pet === "pig") {
    // 1年目: 18歳, 2年目: 28歳, 以降1年ごとに5歳加算
    if (age <= 0) return 0;
    if (age === 1) return 18;
    if (age === 2) return 28;
    if (age > 2) return 28 + (age - 2) * 5;
  }
  if (pet === "sheep") {
    // 1年目: 12歳, 2年目: 20歳, 以降1年ごとに4歳加算
    if (age <= 0) return 0;
    if (age === 1) return 12;
    if (age === 2) return 20;
    if (age > 2) return 20 + (age - 2) * 4;
  }
  if (pet === "goat") {
    // 1年目: 12歳, 2年目: 20歳, 以降1年ごとに4歳加算
    if (age <= 0) return 0;
    if (age === 1) return 12;
    if (age === 2) return 20;
    if (age > 2) return 20 + (age - 2) * 4;
  }
  if (pet === "turtle") {
    // 1年目: 5歳, 2年目: 10歳, 以降1年ごとに2歳加算
    if (age <= 0) return 0;
    if (age === 1) return 5;
    if (age === 2) return 10;
    if (age > 2) return 10 + (age - 2) * 2;
  }
  if (pet === "parakeet") {
    // 1年目: 12歳, 2年目: 20歳, 以降1年ごとに4歳加算
    if (age <= 0) return 0;
    if (age === 1) return 12;
    if (age === 2) return 20;
    if (age > 2) return 20 + (age - 2) * 4;
  }
  return "";
}

export default function PetAgeConversionClient({
  locale,
  t,
}: PetAgeConversionProps) {
  const [pet, setPet] = useState("dog");
  const [age, setAge] = useState("");
  const humanAge =
    age === ""
      ? ""
      : convertPetAge(pet, Number(age)).toLocaleString(locale, {
          maximumFractionDigits: 1,
        });

  const petTypes = [
    { key: "dog", labelKey: t.petAgeConversion.dog, icon: "🐕" },
    { key: "cat", labelKey: t.petAgeConversion.cat, icon: "🐈" },
    { key: "rabbit", labelKey: t.petAgeConversion.rabbit, icon: "🐇" },
    { key: "hamster", labelKey: t.petAgeConversion.hamster, icon: "🐹" },
    { key: "ferret", labelKey: t.petAgeConversion.ferret, icon: "🦦" },
    { key: "horse", labelKey: t.petAgeConversion.horse, icon: "🐎" },
    { key: "cow", labelKey: t.petAgeConversion.cow, icon: "🐄" },
    { key: "pig", labelKey: t.petAgeConversion.pig, icon: "🐖" },
    { key: "sheep", labelKey: t.petAgeConversion.sheep, icon: "🐏" },
    { key: "goat", labelKey: t.petAgeConversion.goat, icon: "🐐" },
    { key: "turtle", labelKey: t.petAgeConversion.turtle, icon: "🐢" },
    { key: "parakeet", labelKey: t.petAgeConversion.parakeet, icon: "🦜" },
  ];

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.petAgeConversion.title}
      subtitle={t.petAgeConversion.subtitle}
      description={t.petAgeConversion.description}
      icon={PawPrint}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.petAgeConversion.howToUse.title}
          steps={t.petAgeConversion.howToUse.steps}
          features={{
            title: t.petAgeConversion.features.title,
            items: t.petAgeConversion.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-orange-100">
          <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            {/* ペット選択 */}
            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="pet-select"
              >
                <span className="text-2xl">🐾</span>
                {t.petAgeConversion.petTypeLabel}
              </label>
              <div className="relative">
                <select
                  id="pet-select"
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                  className="w-full appearance-none bg-white rounded-2xl px-6 py-4 text-lg font-medium border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 cursor-pointer"
                >
                  {petTypes.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.icon} {p.labelKey}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 年齢入力 */}
            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="pet-age-input"
              >
                <span className="text-2xl">📅</span>
                {t.petAgeConversion.petAgeLabel}
              </label>
              <input
                id="pet-age-input"
                type="number"
                inputMode="decimal"
                autoComplete="off"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={t.petAgeConversion.petAgePlaceholder}
                className="w-full bg-white rounded-2xl px-6 py-4 text-lg font-medium border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                min={0}
                step="0.1"
              />
            </div>
          </div>
        </div>
      </ToolSection>

      {/* 結果表示セクション */}
      <ToolSection>
        <div className="flex justify-center w-full max-w-2xl mx-auto">
          <div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-3xl px-8 py-10 border-2 border-blue-100 text-center w-full relative overflow-hidden"
            role="status"
            aria-live="polite"
          >
            {/* 背景装飾 */}
            <div className="absolute top-4 right-4 text-6xl opacity-10">🎯</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-10">
              ✨
            </div>

            <div className="relative z-10">
              <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wider">
                {age === "" ? "結果" : "換算結果"}
              </div>
              {age === "" ? (
                <div className="text-gray-400 text-lg">
                  {t.petAgeConversion.resultPlaceholder}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-gray-800 leading-tight">
                    {t.petAgeConversion.petAgeResult
                      .replace("{petAge}", age)
                      .replace(
                        "{petType}",
                        petTypes.find((p) => p.key === pet)?.labelKey || ""
                      )
                      .replace("{humanAge}", humanAge)}
                  </div>
                  <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl">
                        {petTypes.find((p) => p.key === pet)?.icon}
                      </span>
                      <span>{age}歳</span>
                    </div>
                    <span className="text-blue-400">→</span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl">👤</span>
                      <span>{humanAge}歳</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.petAgeConversion.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
