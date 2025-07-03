"use client";

import { useState, useEffect } from "react";
import { Calendar, Calculator, RotateCcw } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface AgeCalculatorClientProps {
  locale: Locale;
  t: Translations;
}

interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  nextBirthdayAge: number;
}

export default function AgeCalculatorClient({
  locale,
  t,
}: AgeCalculatorClientProps) {
  const [birthdate, setBirthdate] = useState("");
  const [targetDate, setTargetDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [result, setResult] = useState<AgeResult | null>(null);

  // 年齢計算関数
  const calculateAge = (
    birthdateStr: string,
    targetDateStr: string
  ): AgeResult | null => {
    if (!birthdateStr || !targetDateStr) return null;

    const birth = new Date(birthdateStr);
    const target = new Date(targetDateStr);

    // 生年月日が未来の場合はnullを返す
    if (birth > target) return null;

    // 年、月、日の計算
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(
        target.getFullYear(),
        target.getMonth(),
        0
      );
      days += lastDayOfPrevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 総日数の計算
    const totalMilliseconds = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

    // 週、時間、分、秒の計算
    const weeks = Math.floor(totalDays / 7);
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(totalMilliseconds / (1000 * 60));
    const seconds = Math.floor(totalMilliseconds / 1000);

    // 次の誕生日の計算
    const currentYear = target.getFullYear();
    let nextBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());

    // 今年の誕生日が過ぎている場合は来年
    if (nextBirthday <= target) {
      nextBirthday = new Date(
        currentYear + 1,
        birth.getMonth(),
        birth.getDate()
      );
    }

    // 2月29日生まれで来年がうるう年でない場合は2月28日に調整
    if (birth.getMonth() === 1 && birth.getDate() === 29) {
      const nextYear = nextBirthday.getFullYear();
      if (!isLeapYear(nextYear)) {
        nextBirthday.setDate(28);
      }
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    const nextBirthdayAge =
      years + (nextBirthday.getFullYear() > currentYear ? 1 : 0);

    return {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      totalDays,
      nextBirthday,
      daysUntilBirthday,
      nextBirthdayAge,
    };
  };

  // うるう年判定
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // 計算実行
  const handleCalculate = () => {
    const calculatedResult = calculateAge(birthdate, targetDate);
    setResult(calculatedResult);
  };

  // クリア
  const handleClear = () => {
    setBirthdate("");
    setTargetDate(new Date().toISOString().split("T")[0]);
    setResult(null);
  };

  // 数値フォーマット（3桁区切り）
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.ageCalculator.title}
      subtitle={t.ageCalculator.subtitle}
      description={t.ageCalculator.description}
      icon={Calendar}
    >
      {/* 使い方セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.ageCalculator.howToUse.title}
          steps={t.ageCalculator.howToUse.steps}
          features={{
            title: t.ageCalculator.features.title,
            items: t.ageCalculator.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
          {/* 入力フォーム */}
          <div className="space-y-6">
            {/* 生年月日入力 */}
            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="birthdate-input"
              >
                <Calendar className="w-5 h-5 text-blue-500" />
                {t.ageCalculator.birthdateLabel}
              </label>
              <input
                id="birthdate-input"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full bg-white rounded-2xl px-6 py-4 text-lg font-medium border-2 border-blue-200 shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* 基準日入力 */}
            <div className="flex flex-col gap-3">
              <label
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="target-date-input"
              >
                <Calendar className="w-5 h-5 text-green-500" />
                {t.ageCalculator.targetDateLabel}
              </label>
              <input
                id="target-date-input"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-white rounded-2xl px-6 py-4 text-lg font-medium border-2 border-green-200 shadow-sm focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200"
              />
            </div>

            {/* ボタン */}
            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                disabled={!birthdate || !targetDate}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5" />
                {t.ageCalculator.calculateButton}
              </button>
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-2 bg-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                {t.ageCalculator.clearButton}
              </button>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* 結果表示セクション */}
      <ToolSection>
        <ToolDisplay>
          {!result ? (
            <div className="text-center text-gray-500 text-lg py-12">
              {t.ageCalculator.resultPlaceholder}
            </div>
          ) : (
            <div className="space-y-8">
              {/* メイン年齢表示 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t.ageCalculator.currentAge}
                </h3>
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {result.years}
                </div>
                <div className="text-xl text-gray-600">
                  {result.years} {t.ageCalculator.yearsOld}
                  {result.months > 0 && (
                    <>
                      {" "}
                      {result.months} {t.ageCalculator.monthsOld}
                    </>
                  )}
                  {result.days > 0 && (
                    <>
                      {" "}
                      {result.days} {t.ageCalculator.daysOld}
                    </>
                  )}
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatNumber(result.weeks)}
                  </div>
                  <div className="text-sm text-purple-500 font-medium mt-1">
                    {t.ageCalculator.weeksOld}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {formatNumber(result.totalDays)}
                  </div>
                  <div className="text-sm text-green-500 font-medium mt-1">
                    {t.ageCalculator.daysOld}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {formatNumber(result.hours)}
                  </div>
                  <div className="text-sm text-orange-500 font-medium mt-1">
                    {t.ageCalculator.hoursOld}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-pink-600">
                    {formatNumber(result.minutes)}
                  </div>
                  <div className="text-sm text-pink-500 font-medium mt-1">
                    {t.ageCalculator.minutesOld}
                  </div>
                </div>
              </div>

              {/* 次の誕生日情報 */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 text-center">
                <h4 className="text-xl font-bold text-yellow-800 mb-4">
                  🎉 {t.ageCalculator.nextBirthday}
                </h4>
                <div className="text-lg text-yellow-700">
                  {t.ageCalculator.daysUntilBirthday}:{" "}
                  {result.daysUntilBirthday} {t.ageCalculator.daysOld}
                </div>
                <div className="text-lg text-yellow-700 mt-2">
                  {result.nextBirthdayAge} {t.ageCalculator.nextBirthdayAge}
                </div>
              </div>
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.ageCalculator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
