"use client";

import { useState } from "react";
import { Heart, Calculator as CalculatorIcon, RotateCcw } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolInput from "@/components/layout/tool-input";
import ToolControls from "@/components/layout/tool-controls";
import ToolResult from "@/components/layout/tool-result";
import ToolStats from "@/components/layout/tool-stats";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface BmiCalculatorClientProps {
  locale: Locale;
  t: Translations;
}

interface BmiResult {
  bmi: number;
  category: string;
  idealWeightMin: number;
  idealWeightMax: number;
  advice: string;
}

type UnitSystem = "metric" | "imperial";

export default function BmiCalculatorClient({
  locale,
  t,
}: BmiCalculatorClientProps) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState("");

  // BMI計算関数
  const calculateBMI = (heightCm: number, weightKg: number): BmiResult => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // BMIカテゴリの判定
    let category: string;
    let advice: string;

    if (bmi < 18.5) {
      category = t.bmiCalculator.categories.underweight;
      advice = t.bmiCalculator.advice.underweight;
    } else if (bmi < 25) {
      category = t.bmiCalculator.categories.normal;
      advice = t.bmiCalculator.advice.normal;
    } else if (bmi < 30) {
      category = t.bmiCalculator.categories.overweight;
      advice = t.bmiCalculator.advice.overweight;
    } else {
      category = t.bmiCalculator.categories.obese;
      advice = t.bmiCalculator.advice.obese;
    }

    // 適正体重範囲の計算（BMI 18.5-25）
    const idealWeightMin = heightM * heightM * 18.5;
    const idealWeightMax = heightM * heightM * 25;

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      idealWeightMin: Math.round(idealWeightMin * 10) / 10,
      idealWeightMax: Math.round(idealWeightMax * 10) / 10,
      advice,
    };
  };

  // 入力値の検証
  const validateInputs = (): { heightCm: number; weightKg: number } | null => {
    let heightCm: number;
    let weightKg: number;

    if (unitSystem === "metric") {
      heightCm = parseFloat(height);
      weightKg = parseFloat(weight);

      if (isNaN(heightCm) || heightCm <= 0) {
        setError(t.bmiCalculator.errors.invalidHeight);
        return null;
      }
      if (isNaN(weightKg) || weightKg <= 0) {
        setError(t.bmiCalculator.errors.invalidWeight);
        return null;
      }
      if (heightCm < 50 || heightCm > 300) {
        setError(t.bmiCalculator.errors.heightRange);
        return null;
      }
      if (weightKg < 1 || weightKg > 500) {
        setError(t.bmiCalculator.errors.weightRange);
        return null;
      }
    } else {
      // インペリアル単位の変換
      const feetNum = parseFloat(feet);
      const inchesNum = parseFloat(inches);
      const weightLbs = parseFloat(weight);

      if (isNaN(feetNum) || feetNum < 0 || isNaN(inchesNum) || inchesNum < 0) {
        setError(t.bmiCalculator.errors.invalidHeight);
        return null;
      }

      // フィートが0の場合は最低12インチ（1フィート）必要
      if (feetNum === 0 && inchesNum < 12) {
        setError(t.bmiCalculator.errors.invalidHeight);
        return null;
      }

      // インチは11以下でなければならない（12インチ = 1フィート）
      if (inchesNum >= 12) {
        setError(t.bmiCalculator.errors.invalidHeight);
        return null;
      }

      if (isNaN(weightLbs) || weightLbs <= 0) {
        setError(t.bmiCalculator.errors.invalidWeight);
        return null;
      }

      // フィート・インチからセンチメートルに変換
      heightCm = (feetNum * 12 + inchesNum) * 2.54;
      // ポンドからキログラムに変換
      weightKg = weightLbs * 0.453592;

      if (heightCm < 50 || heightCm > 300) {
        setError(t.bmiCalculator.errors.heightRange);
        return null;
      }
      if (weightKg < 1 || weightKg > 500) {
        setError(t.bmiCalculator.errors.weightRange);
        return null;
      }
    }

    return { heightCm, weightKg };
  };

  // BMI計算実行
  const handleCalculate = () => {
    setError("");
    const validated = validateInputs();
    if (!validated) return;

    const bmiResult = calculateBMI(validated.heightCm, validated.weightKg);
    setResult(bmiResult);
  };

  // リセット
  const handleReset = () => {
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
    setResult(null);
    setError("");
  };

  // 単位システム変更
  const handleUnitSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
    setResult(null);
    setError("");
  };

  // BMIに基づく色の取得
  const getBmiColor = (bmi: number): string => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.bmiCalculator.title}
      description={t.bmiCalculator.description}
      icon={Heart}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.bmiCalculator.howToUse.title}
          steps={t.bmiCalculator.howToUse.steps}
          features={{
            title: t.bmiCalculator.features.title,
            items: t.bmiCalculator.features.items,
          }}
        />
      </ToolSection>

      {/* BMI結果表示 */}
      {result && (
        <ToolSection>
          <ToolDisplay size="large" centered>
            <div className="flex justify-center text-primary-600 mb-4">
              <Heart size={48} />
            </div>
            <div
              className={`text-4xl font-bold mb-2 ${getBmiColor(result.bmi)}`}
            >
              {result.bmi}
            </div>
            <div className="text-lg text-gray-600 mb-2">
              {t.bmiCalculator.bmiValue}
            </div>
            <div className={`text-xl font-semibold ${getBmiColor(result.bmi)}`}>
              {result.category}
            </div>
          </ToolDisplay>
        </ToolSection>
      )}

      {/* 入力セクション */}
      <ToolSection title={t.bmiCalculator.inputSection}>
        <div className="space-y-6">
          {/* 単位系選択 */}
          <ToolInput label={t.bmiCalculator.unitSystem}>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="metric"
                  checked={unitSystem === "metric"}
                  onChange={(e) =>
                    handleUnitSystemChange(e.target.value as UnitSystem)
                  }
                  className="mr-2"
                />
                {t.bmiCalculator.metric}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="imperial"
                  checked={unitSystem === "imperial"}
                  onChange={(e) =>
                    handleUnitSystemChange(e.target.value as UnitSystem)
                  }
                  className="mr-2"
                />
                {t.bmiCalculator.imperial}
              </label>
            </div>
          </ToolInput>

          {/* 身長入力 */}
          {unitSystem === "metric" ? (
            <ToolInput
              label={`${t.bmiCalculator.heightLabel} (${t.bmiCalculator.units.cm})`}
            >
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={t.bmiCalculator.heightPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                min="50"
                max="300"
                step="0.1"
              />
              <div className="text-xs text-gray-500 mt-1">
                {locale === "ja" && "範囲: 50-300cm"}
                {locale === "en" && "Range: 50-300cm"}
                {locale === "es" && "Rango: 50-300cm"}
                {locale === "ru" && "Диапазон: 50-300см"}
                {locale === "zh" && "范围: 50-300厘米"}
              </div>
            </ToolInput>
          ) : (
            <ToolInput label={t.bmiCalculator.heightLabel}>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    min="0"
                    max="8"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {t.bmiCalculator.units.ft}
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="9"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    min="0"
                    max="11"
                    step="0.1"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {t.bmiCalculator.units.in}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {locale === "ja" && "例: 5フィート9インチ = 175cm"}
                {locale === "en" && "Example: 5 feet 9 inches = 175cm"}
                {locale === "es" && "Ejemplo: 5 pies 9 pulgadas = 175cm"}
                {locale === "ru" && "Пример: 5 футов 9 дюймов = 175см"}
                {locale === "zh" && "例如: 5英尺9英寸 = 175厘米"}
              </div>
            </ToolInput>
          )}

          {/* 体重入力 */}
          <ToolInput
            label={`${t.bmiCalculator.weightLabel} (${
              unitSystem === "metric"
                ? t.bmiCalculator.units.kg
                : t.bmiCalculator.units.lbs
            })`}
          >
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={
                unitSystem === "metric"
                  ? t.bmiCalculator.weightPlaceholder
                  : "150"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              min="1"
              max={unitSystem === "metric" ? "500" : "1100"}
              step="0.1"
            />
          </ToolInput>

          {/* エラー表示 */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
        </div>
      </ToolSection>

      {/* 操作ボタン */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={handleCalculate}
            disabled={
              unitSystem === "metric"
                ? !height.trim() || !weight.trim()
                : !feet.trim() || !inches.trim() || !weight.trim()
            }
            className="button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <CalculatorIcon size={20} />
            <span>{t.bmiCalculator.calculate}</span>
          </button>
          {(height || weight || feet || inches || result) && (
            <button
              onClick={handleReset}
              className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <RotateCcw size={20} />
              <span>{t.bmiCalculator.reset}</span>
            </button>
          )}
        </ToolControls>
      </ToolSection>

      {/* 結果詳細 */}
      {result && (
        <>
          {/* 適正体重範囲 */}
          <ToolSection title={t.bmiCalculator.idealWeightRange}>
            <ToolResult>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-600">
                  {unitSystem === "metric"
                    ? `${result.idealWeightMin} - ${result.idealWeightMax} ${t.bmiCalculator.units.kg}`
                    : `${
                        Math.round(result.idealWeightMin * 2.205 * 10) / 10
                      } - ${
                        Math.round(result.idealWeightMax * 2.205 * 10) / 10
                      } ${t.bmiCalculator.units.lbs}`}
                </span>
                <div className="text-sm text-gray-600 mt-2">
                  {t.bmiCalculator.idealWeightDescription}
                </div>
              </div>
            </ToolResult>
          </ToolSection>

          {/* 統計情報 */}
          <ToolSection title={t.bmiCalculator.statistics}>
            <ToolStats
              stats={[
                {
                  label: t.bmiCalculator.statsLabels.height,
                  value:
                    unitSystem === "metric"
                      ? `${height} ${t.bmiCalculator.units.cm}`
                      : `${feet}' ${inches}"`,
                },
                {
                  label: t.bmiCalculator.statsLabels.weight,
                  value: `${weight} ${
                    unitSystem === "metric"
                      ? t.bmiCalculator.units.kg
                      : t.bmiCalculator.units.lbs
                  }`,
                },
                {
                  label: t.bmiCalculator.statsLabels.bmi,
                  value: result.bmi.toString(),
                },
                {
                  label: t.bmiCalculator.statsLabels.category,
                  value: result.category,
                },
                {
                  label: t.bmiCalculator.statsLabels.idealMin,
                  value:
                    unitSystem === "metric"
                      ? `${result.idealWeightMin} ${t.bmiCalculator.units.kg}`
                      : `${
                          Math.round(result.idealWeightMin * 2.205 * 10) / 10
                        } ${t.bmiCalculator.units.lbs}`,
                },
                {
                  label: t.bmiCalculator.statsLabels.idealMax,
                  value:
                    unitSystem === "metric"
                      ? `${result.idealWeightMax} ${t.bmiCalculator.units.kg}`
                      : `${
                          Math.round(result.idealWeightMax * 2.205 * 10) / 10
                        } ${t.bmiCalculator.units.lbs}`,
                },
              ]}
            />
          </ToolSection>

          {/* 健康アドバイス */}
          <ToolSection title={t.bmiCalculator.healthAdvice}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-1">
                    {t.bmiCalculator.recommendation}
                  </div>
                  <div>{result.advice}</div>
                </div>
              </div>
            </div>
          </ToolSection>
        </>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.bmiCalculator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
