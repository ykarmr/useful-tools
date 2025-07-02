// 長さの単位変換コンポーネント
"use client";

import { useState } from "react";
import { Calculator, ArrowRightLeft, Zap, Settings } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
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
      subtitle={t.unitConversion.subtitle}
      description={t.unitConversion.description}
      icon={Calculator}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.unitConversion.howToUse.title}
          steps={t.unitConversion.howToUse.steps}
          features={{
            title: t.unitConversion.features.title,
            items: t.unitConversion.features.items,
          }}
        />
      </ToolSection>
      {/* メイン変換機能 */}
      <ToolSection>
        <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100/50 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-500 rounded-xl">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {t.unitConversion?.categoryLabel ?? "カテゴリ"}
            </h3>
          </div>

          <div className="grid gap-6 w-full max-w-2xl mx-auto">
            {/* カテゴリ選択 */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="category-select"
                id="category-select-label"
              >
                {t.unitConversion?.categoryLabel ?? "カテゴリ"}
              </label>
              <select
                id="category-select"
                aria-labelledby="category-select-label"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 bg-white/70 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium text-gray-800 shadow-sm"
                aria-live="polite"
              >
                {unitCategories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {categoryLabels[cat.key] ?? cat.labelKey}
                  </option>
                ))}
              </select>
            </div>

            {/* 入力フィールド */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                htmlFor="unit-input"
                id="unit-input-label"
              >
                <Zap className="w-4 h-4 text-blue-500" />
                {t.unitConversion?.inputLabel ?? "変換する数値"}
              </label>
              <input
                id="unit-input"
                aria-labelledby="unit-input-label"
                type="number"
                inputMode="decimal"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.unitConversion?.placeholder ?? "数値"}
                className="w-full px-4 py-4 text-lg rounded-xl border-2 border-blue-200 bg-white/70 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium text-gray-800 shadow-sm placeholder:text-gray-400"
              />
            </div>

            {/* 単位選択 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-gray-700"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-white/70 backdrop-blur-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 font-medium text-gray-800 shadow-sm"
                  aria-live="polite"
                >
                  {currentCategory.units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {unitLabels[u.labelKey] ?? u.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center items-center py-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
                  <ArrowRightLeft className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-gray-700"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-white/70 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium text-gray-800 shadow-sm"
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
        </div>
      </ToolSection>{" "}
      {/* 結果表示 */}
      <ToolSection>
        <ToolDisplay background="glass" variant="elevated" size="large">
          <div className="text-center space-y-4">
            {input === "" ? (
              <div className="py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-gray-500 text-lg">
                  {t.unitConversion?.resultPlaceholder ??
                    "変換結果がここに表示されます"}
                </p>
              </div>
            ) : (
              <div className="py-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <div className="text-lg text-gray-600 mb-2">
                    {input}{" "}
                    <span className="font-semibold text-green-600">
                      {
                        unitLabels[
                          currentCategory.units.find(
                            (u) => u.value === fromUnit
                          )?.labelKey ?? fromUnit
                        ]
                      }
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">↓</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {converted}
                  </div>
                  <div className="text-lg text-gray-600 mt-2">
                    <span className="font-semibold text-purple-600">
                      {
                        unitLabels[
                          currentCategory.units.find((u) => u.value === toUnit)
                            ?.labelKey ?? toUnit
                        ]
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ToolDisplay>
      </ToolSection>
      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.unitConversion.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
