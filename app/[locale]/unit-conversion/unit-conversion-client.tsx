// 長さの単位変換コンポーネント
"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolFaq from "@/components/layout/tool-faq";
import { Locale, Translations } from "@/locales";

interface UnitConversionProps {
  locale: Locale;
  t: Translations;
}

// カテゴリと単位定義
const unitCategories = [
  {
    key: "length",
    labelKey: "length",
    units: [
      { value: "m", labelKey: "meter" },
      { value: "cm", labelKey: "centimeter" },
      { value: "mm", labelKey: "millimeter" },
      { value: "in", labelKey: "inch" },
      { value: "ft", labelKey: "foot" },
      { value: "km", labelKey: "kilometer" },
      { value: "mi", labelKey: "mile" },
      { value: "yd", labelKey: "yard" },
    ],
    toBase: {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048,
      km: 1000,
      mi: 1609.344,
      yd: 0.9144,
    },
  },
  {
    key: "weight",
    labelKey: "weight",
    units: [
      { value: "kg", labelKey: "kilogram" },
      { value: "g", labelKey: "gram" },
      { value: "mg", labelKey: "milligram" },
      { value: "lb", labelKey: "pound" },
      { value: "oz", labelKey: "ounce" },
      { value: "t", labelKey: "ton" },
    ],
    toBase: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.45359237,
      oz: 0.0283495231,
      t: 1000,
    },
  },
  {
    key: "area",
    labelKey: "area",
    units: [
      { value: "m2", labelKey: "squareMeter" },
      { value: "cm2", labelKey: "squareCentimeter" },
      { value: "mm2", labelKey: "squareMillimeter" },
      { value: "km2", labelKey: "squareKilometer" },
      { value: "a", labelKey: "are" },
      { value: "ha", labelKey: "hectare" },
      { value: "ft2", labelKey: "squareFoot" },
      { value: "in2", labelKey: "squareInch" },
      { value: "yd2", labelKey: "squareYard" },
      { value: "mi2", labelKey: "squareMile" },
    ],
    toBase: {
      m2: 1,
      cm2: 0.0001,
      mm2: 0.000001,
      km2: 1_000_000,
      a: 100,
      ha: 10_000,
      ft2: 0.09290304,
      in2: 0.00064516,
      yd2: 0.83612736,
      mi2: 2_589_988.110336,
    },
  },
  // 体積
  {
    key: "volume",
    labelKey: "volume",
    units: [
      { value: "l", labelKey: "liter" },
      { value: "ml", labelKey: "milliliter" },
      { value: "m3", labelKey: "cubicMeter" },
      { value: "cm3", labelKey: "cubicCentimeter" },
      { value: "ft3", labelKey: "cubicFoot" },
      { value: "in3", labelKey: "cubicInch" },
      { value: "gal", labelKey: "gallon" },
      { value: "pt", labelKey: "pint" },
    ],
    toBase: {
      l: 1,
      ml: 0.001,
      m3: 1000,
      cm3: 0.001,
      ft3: 28.3168466,
      in3: 0.016387064,
      gal: 3.785411784,
      pt: 0.473176473,
    },
  },
  // 温度
  {
    key: "temperature",
    labelKey: "temperature",
    units: [
      { value: "c", labelKey: "celsius" },
      { value: "f", labelKey: "fahrenheit" },
      { value: "k", labelKey: "kelvin" },
    ],
    toBase: {
      c: 1,
      f: 1,
      k: 1,
    },
  },
  // 速度
  {
    key: "speed",
    labelKey: "speed",
    units: [
      { value: "mps", labelKey: "meterPerSecond" },
      { value: "kmph", labelKey: "kilometerPerHour" },
      { value: "mph", labelKey: "milePerHour" },
      { value: "knot", labelKey: "knot" },
      { value: "fps", labelKey: "footPerSecond" },
    ],
    toBase: {
      mps: 1,
      kmph: 0.277777778,
      mph: 0.44704,
      knot: 0.514444,
      fps: 0.3048,
    },
  },
  // 時間
  {
    key: "time",
    labelKey: "time",
    units: [
      { value: "s", labelKey: "second" },
      { value: "min", labelKey: "minute" },
      { value: "h", labelKey: "hour" },
      { value: "day", labelKey: "day" },
      { value: "week", labelKey: "week" },
      { value: "month", labelKey: "month" },
      { value: "year", labelKey: "year" },
    ],
    toBase: {
      s: 1,
      min: 60,
      h: 3600,
      day: 86400,
      week: 604800,
      month: 2_629_746, // 平均値
      year: 31_556_952, // 平均値
    },
  },
  // 圧力
  {
    key: "pressure",
    labelKey: "pressure",
    units: [
      { value: "pa", labelKey: "pascal" },
      { value: "kpa", labelKey: "kilopascal" },
      { value: "mpa", labelKey: "megapascal" },
      { value: "bar", labelKey: "bar" },
      { value: "atm", labelKey: "atmosphere" },
      { value: "psi", labelKey: "psi" },
      { value: "mmhg", labelKey: "mmHg" },
      { value: "torr", labelKey: "torr" },
    ],
    toBase: {
      pa: 1,
      kpa: 1000,
      mpa: 1_000_000,
      bar: 100_000,
      atm: 101_325,
      psi: 6_894.75729,
      mmhg: 133.322368,
      torr: 133.322368,
    },
  },
  // エネルギー
  {
    key: "energy",
    labelKey: "energy",
    units: [
      { value: "j", labelKey: "joule" },
      { value: "kj", labelKey: "kilojoule" },
      { value: "mj", labelKey: "megajoule" },
      { value: "cal", labelKey: "calorie" },
      { value: "kcal", labelKey: "kilocalorie" },
      { value: "wh", labelKey: "wattHour" },
      { value: "kwh", labelKey: "kilowattHour" },
      { value: "btu", labelKey: "btu" },
    ],
    toBase: {
      j: 1,
      kj: 1000,
      mj: 1_000_000,
      cal: 4.184,
      kcal: 4184,
      wh: 3600,
      kwh: 3_600_000,
      btu: 1055.05585,
    },
  },
  // データ量
  {
    key: "data",
    labelKey: "data",
    units: [
      { value: "b", labelKey: "bit" },
      { value: "B", labelKey: "byte" },
      { value: "KB", labelKey: "kilobyte" },
      { value: "MB", labelKey: "megabyte" },
      { value: "GB", labelKey: "gigabyte" },
      { value: "TB", labelKey: "terabyte" },
      { value: "PB", labelKey: "petabyte" },
    ],
    toBase: {
      b: 1,
      B: 8,
      KB: 8 * 1024,
      MB: 8 * 1024 * 1024,
      GB: 8 * 1024 * 1024 * 1024,
      TB: 8 * 1024 * 1024 * 1024 * 1024,
      PB: 8 * 1024 * 1024 * 1024 * 1024 * 1024,
    },
  },
  // ...必要に応じてカテゴリ追加...
];

function convert(value: number, from: string, to: string, categoryKey: string) {
  if (isNaN(value)) return "";
  const category = unitCategories.find((c) => c.key === categoryKey);
  if (!category) return "";
  // 温度変換は特別処理
  if (categoryKey === "temperature") {
    if (from === to) return value;
    // まずCelsiusに変換
    let celsius: number;
    if (from === "c") celsius = value;
    else if (from === "f") celsius = (value - 32) * (5 / 9);
    else if (from === "k") celsius = value - 273.15;
    else return "";
    // Celsiusから目的単位へ
    if (to === "c") return celsius;
    if (to === "f") return celsius * (9 / 5) + 32;
    if (to === "k") return celsius + 273.15;
    return "";
  }
  // 通常変換
  const fromBase = category.toBase[from as keyof typeof category.toBase];
  const toBase = category.toBase[to as keyof typeof category.toBase];
  if (!fromBase || !toBase) return "";
  const baseValue = value * fromBase;
  const result = baseValue / toBase;
  return result;
}

export default function UnitConversionClient({
  locale,
  t,
}: UnitConversionProps) {
  const [category, setCategory] = useState(unitCategories[0].key);
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState(unitCategories[0].units[0].value);
  const [toUnit, setToUnit] = useState(unitCategories[0].units[1].value);

  // カテゴリ変更時に単位もリセット
  function handleCategoryChange(newCategory: string) {
    const cat = unitCategories.find((c) => c.key === newCategory);
    setCategory(newCategory);
    setFromUnit(cat?.units[0].value ?? "");
    setToUnit(cat?.units[1]?.value ?? "");
    setInput("");
  }

  const currentCategory = unitCategories.find((c) => c.key === category)!;
  const converted =
    input === ""
      ? ""
      : convert(Number(input), fromUnit, toUnit, category).toLocaleString(
          locale,
          { maximumFractionDigits: 8 }
        );

  // 単位ラベル（多言語対応はtで対応）
  // 単位ラベル（多言語対応: t.unitConversion でなければ fallback）
  const unitLabels: Record<string, string> = {
    meter: "m",
    centimeter: "cm",
    millimeter: "mm",
    inch: "in",
    foot: "ft",
    kilometer: "km",
    mile: "mi",
    yard: "yd",
    kilogram: "kg",
    gram: "g",
    milligram: "mg",
    pound: "lb",
    ounce: "oz",
    ton: "t",
    squareMeter: "m²",
    squareCentimeter: "cm²",
    squareMillimeter: "mm²",
    squareKilometer: "km²",
    are: "a",
    hectare: "ha",
    squareFoot: "ft²",
    squareInch: "in²",
    squareYard: "yd²",
    squareMile: "mi²",
    // 体積
    liter: "L",
    milliliter: "mL",
    cubicMeter: "m³",
    cubicCentimeter: "cm³",
    cubicFoot: "ft³",
    cubicInch: "in³",
    gallon: "gal",
    pint: "pt",
    // 温度
    celsius: "℃",
    fahrenheit: "℉",
    kelvin: "K",
    // 速度
    meterPerSecond: "m/s",
    kilometerPerHour: "km/h",
    milePerHour: "mph",
    knot: "kt",
    footPerSecond: "ft/s",
    // 時間
    second: "s",
    minute: "min",
    hour: "h",
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    // 圧力
    pascal: "Pa",
    kilopascal: "kPa",
    megapascal: "MPa",
    bar: "bar",
    atmosphere: "atm",
    psi: "psi",
    mmHg: "mmHg",
    torr: "Torr",
    // エネルギー
    joule: "J",
    kilojoule: "kJ",
    megajoule: "MJ",
    calorie: "cal",
    kilocalorie: "kcal",
    wattHour: "Wh",
    kilowattHour: "kWh",
    btu: "BTU",
    // データ量
    bit: "bit",
    byte: "B",
    kilobyte: "KB",
    megabyte: "MB",
    gigabyte: "GB",
    terabyte: "TB",
    petabyte: "PB",
    // ...必要に応じて追加...
  };

  const categoryLabels: Record<string, string> = {
    length: t.unitConversion?.length ?? "Length",
    weight: t.unitConversion?.weight ?? "Weight",
    area: t.unitConversion?.area ?? "Area",
    volume: t.unitConversion?.volume ?? "Volume",
    temperature: t.unitConversion?.temperature ?? "Temperature",
    speed: t.unitConversion?.speed ?? "Speed",
    time: t.unitConversion?.time ?? "Time",
    pressure: t.unitConversion?.pressure ?? "Pressure",
    energy: t.unitConversion?.energy ?? "Energy",
    data: t.unitConversion?.data ?? "Data",
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.unitConversion.title}
      description={t.unitConversion.description}
      icon={Calculator}
    >
      <ToolSection>
        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto px-2 sm:px-0">
          {/* カテゴリ選択（セレクトボックスに変更） */}
          <div className="flex flex-col w-full gap-1">
            <label
              className="text-sm text-gray-600 font-medium mb-1"
              htmlFor="category-select"
              id="category-select-label"
            >
              {t.unitConversion?.categoryLabel ?? "カテゴリ"}
            </label>
            <select
              id="category-select"
              aria-labelledby="category-select-label"
              aria-describedby="category-select-desc"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="select-field rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition font-semibold w-full sm:w-auto"
              style={{ minWidth: 0 }}
              aria-live="polite"
            >
              {unitCategories.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {categoryLabels[cat.key] ?? cat.labelKey}
                </option>
              ))}
            </select>
          </div>
          {/* 入力・単位選択 */}
          <div className="w-full flex flex-col gap-1">
            <label
              className="text-sm text-gray-600 font-medium mb-1"
              htmlFor="unit-input"
              id="unit-input-label"
            >
              {t.unitConversion?.inputLabel ?? "変換する数値"}
            </label>
            <input
              id="unit-input"
              aria-labelledby="unit-input-label"
              aria-describedby="unit-input-desc"
              type="number"
              inputMode="decimal"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.unitConversion?.placeholder ?? "数値"}
              className="input-field w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label
                className="text-xs text-gray-500 mb-1"
                htmlFor="from-unit"
                id="from-unit-label"
              >
                {t.unitConversion?.fromLabel ?? "変換元単位"}
              </label>
              <select
                id="from-unit"
                aria-labelledby="from-unit-label"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="select-field w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition"
                aria-live="polite"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {unitLabels[u.labelKey] ?? u.value}
                  </option>
                ))}
              </select>
            </div>
            <span
              className="mx-2 text-2xl font-bold text-primary-500 flex items-center justify-center h-full sm:mt-[1.7em]"
              aria-hidden="true"
            >
              →
            </span>
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label
                className="text-xs text-gray-500 mb-1"
                htmlFor="to-unit"
                id="to-unit-label"
              >
                {t.unitConversion?.toLabel ?? "変換先単位"}
              </label>
              <select
                id="to-unit"
                aria-labelledby="to-unit-label"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="select-field w-full sm:max-w-[120px] rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-200 transition"
                aria-live="polite"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {unitLabels[u.labelKey] ?? u.value}
                  </option>
                ))}
              </select>
            </div>
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
            {input === "" ? (
              <span className="text-gray-400">
                {t.unitConversion?.resultPlaceholder}
              </span>
            ) : (
              <span className="text-lg font-medium text-gray-700">
                {input}{" "}
                {
                  unitLabels[
                    currentCategory.units.find((u) => u.value === fromUnit)
                      ?.labelKey ?? fromUnit
                  ]
                }{" "}
                = <b className="text-primary-700 text-2xl">{converted}</b>{" "}
                {
                  unitLabels[
                    currentCategory.units.find((u) => u.value === toUnit)
                      ?.labelKey ?? toUnit
                  ]
                }
              </span>
            )}
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.unitConversion.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
