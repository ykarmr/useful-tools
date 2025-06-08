"use client";

import { useState } from "react";
import { PawPrint } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
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
      description={t.petAgeConversion.description}
      icon={PawPrint}
    >
      <ToolSection>
        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto px-2 sm:px-0">
          <div className="flex flex-col w-full gap-1">
            <label
              className="text-sm text-gray-600 font-medium mb-1"
              htmlFor="pet-select"
            >
              {t.petAgeConversion.petTypeLabel}
            </label>
            <select
              id="pet-select"
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              className="select-field rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition font-semibold w-full sm:w-auto"
            >
              {petTypes.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.icon}:{" "}
                  {t.petAgeConversion[p.key as keyof typeof t.petAgeConversion]}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              className="text-sm text-gray-600 font-medium mb-1"
              htmlFor="pet-age-input"
            >
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
              className="input-field w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition"
              min={0}
            />
          </div>
        </div>
      </ToolSection>
      <ToolSection>
        <div className="flex justify-center w-full max-w-xl mx-auto px-2 sm:px-0">
          <div
            className="bg-white/90 shadow-xl rounded-2xl px-4 sm:px-8 py-6 border border-gray-100 text-center w-full"
            role="status"
            aria-live="polite"
          >
            {age === "" ? (
              <span className="text-gray-400">
                {t.petAgeConversion.resultPlaceholder}
              </span>
            ) : (
              <span className="text-lg font-medium text-gray-700">
                {t.petAgeConversion.petAgeResult
                  .replace("{petAge}", age)
                  .replace(
                    "{petType}",
                    petTypes.find((p) => p.key === pet)?.labelKey || ""
                  )
                  .replace("{humanAge}", humanAge)}
              </span>
            )}
          </div>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
