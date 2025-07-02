"use client";

import { useState } from "react";
import { Network } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface SubnetCalculatorClientProps {
  locale: Locale;
  t: Translations;
}

function calculateSubnet(ip: string, maskLength: number) {
  const ipParts = ip.split(".").map(Number);
  if (
    ipParts.length !== 4 ||
    ipParts.some((n) => isNaN(n) || n < 0 || n > 255)
  ) {
    return null;
  }
  if (maskLength < 0 || maskLength > 32) return null;

  const ipNum = ipParts.reduce((acc, n) => (acc << 8) | n, 0);
  const mask = maskLength === 0 ? 0 : (0xffffffff << (32 - maskLength)) >>> 0;
  const network = ipNum & mask;
  const broadcast = network | (~mask >>> 0);
  const firstHost = maskLength === 32 ? network : network + 1;
  const lastHost = maskLength === 32 ? network : broadcast - 1;
  const hosts = maskLength >= 31 ? 0 : broadcast - network - 1;

  function numToIp(num: number) {
    return [24, 16, 8, 0].map((shift) => (num >> shift) & 255).join(".");
  }

  return {
    network: numToIp(network),
    broadcast: numToIp(broadcast),
    firstHost: numToIp(firstHost),
    lastHost: numToIp(lastHost),
    mask: numToIp(mask),
    hosts,
  };
}

function formatIp(ip: string, base: "bin" | "oct" | "dec" | "hex") {
  if (!ip) return "";
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => isNaN(n) || n < 0 || n > 255))
    return ip;
  switch (base) {
    case "bin":
      return parts.map((n) => n.toString(2).padStart(8, "0")).join(".");
    case "oct":
      return parts.map((n) => n.toString(8).padStart(3, "0")).join(".");
    case "hex":
      return parts
        .map((n) => n.toString(16).toUpperCase().padStart(2, "0"))
        .join(".");
    case "dec":
    default:
      return ip;
  }
}

export default function SubnetCalculatorClient({
  locale,
  t,
}: SubnetCalculatorClientProps) {
  const [ip, setIp] = useState("192.168.1.1");
  const [maskLength, setMaskLength] = useState(24);
  const [displayBase, setDisplayBase] = useState<"bin" | "oct" | "dec" | "hex">(
    "dec"
  );
  const [result, setResult] = useState<ReturnType<
    typeof calculateSubnet
  > | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleCalculate = () => {
    const ipParts = ip.split(".").map(Number);
    let err = "";
    if (ip.trim() === "") {
      err = t.subnetCalculator.errorEmptyIp ?? "IPアドレスを入力してください。";
    } else if (
      ipParts.length !== 4 ||
      ipParts.some((n) => isNaN(n) || n < 0 || n > 255)
    ) {
      err =
        t.subnetCalculator.errorInvalidIp ??
        "IPアドレスの形式が正しくありません。";
    } else if (maskLength === null || isNaN(maskLength)) {
      err =
        t.subnetCalculator.errorEmptyMask ??
        "サブネットマスク長を入力してください。";
    } else if (maskLength < 0 || maskLength > 32) {
      err =
        t.subnetCalculator.errorInvalidMask ??
        "サブネットマスク長は0〜32の範囲で入力してください。";
    }
    if (err) {
      setErrorMsg(err);
      setResult(null);
      return;
    }
    const calc = calculateSubnet(ip, maskLength);
    if (!calc) {
      setErrorMsg(t.subnetCalculator.invalidInput);
      setResult(null);
    } else {
      setErrorMsg("");
      setResult(calc);
    }
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.subnetCalculator.title}
      subtitle={t.subnetCalculator.subtitle}
      description={t.subnetCalculator.description}
      icon={Network}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.subnetCalculator.howToUse.title}
          steps={t.subnetCalculator.howToUse.steps}
          features={{
            title: t.subnetCalculator.features.title,
            items: t.subnetCalculator.features.items,
          }}
        />
      </ToolSection>

      {/* 入力セクション */}
      <ToolSection>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10">
            {/* 背景装飾 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-4 translate-x-4 sm:-translate-y-8 sm:translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full translate-y-3 -translate-x-3 sm:translate-y-6 sm:-translate-x-6"></div>

            <div className="relative p-4 sm:p-8">
              <form
                className="space-y-6 sm:space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCalculate();
                }}
                aria-describedby={errorMsg ? "subnet-error-msg" : undefined}
              >
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  {/* IP アドレス入力 */}
                  <div className="space-y-3">
                    <label
                      htmlFor="ip-input"
                      className="block text-sm sm:text-base font-bold text-gray-800 tracking-wide"
                    >
                      {t.subnetCalculator.ipAddress}
                    </label>
                    <div className="relative">
                      <input
                        id="ip-input"
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-mono bg-white/90 backdrop-blur-sm border-2 border-gray-200/80 rounded-xl sm:rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400"
                        placeholder="192.168.1.1"
                        aria-label={t.subnetCalculator.ipAddress}
                        aria-invalid={!!errorMsg}
                        aria-describedby={
                          errorMsg ? "subnet-error-msg" : undefined
                        }
                        autoComplete="off"
                        inputMode="decimal"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* サブネットマスク長入力 */}
                  <div className="space-y-3">
                    <label
                      htmlFor="mask-input"
                      className="block text-sm sm:text-base font-bold text-gray-800 tracking-wide"
                    >
                      {t.subnetCalculator.subnetMaskLength}
                    </label>
                    <div className="relative">
                      <input
                        id="mask-input"
                        type="number"
                        min={0}
                        max={32}
                        value={maskLength}
                        onChange={(e) => setMaskLength(Number(e.target.value))}
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-mono bg-white/90 backdrop-blur-sm border-2 border-gray-200/80 rounded-xl sm:rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 hover:border-gray-300"
                        aria-label={t.subnetCalculator.subnetMaskLength}
                        aria-invalid={!!errorMsg}
                        aria-describedby={
                          errorMsg ? "subnet-error-msg" : undefined
                        }
                        inputMode="numeric"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                        <span className="text-xs sm:text-sm text-gray-400 font-medium">
                          /32
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="group relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <Network className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t.subnetCalculator.calculate}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </button>
                </div>
              </form>

              {/* エラー表示 */}
              {errorMsg && (
                <div
                  id="subnet-error-msg"
                  className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200/60 rounded-xl sm:rounded-2xl text-red-700 text-center backdrop-blur-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-lg font-semibold">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    {errorMsg}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ToolSection>

      {/* 結果表示セクション */}
      {result && (
        <ToolSection>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-green-50/70 to-teal-50/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-emerald-200/30 shadow-2xl shadow-emerald-500/10">
              {/* 背景装飾 */}
              <div className="absolute top-0 left-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full -translate-y-6 -translate-x-6 sm:-translate-y-12 sm:-translate-x-12"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tl from-teal-200/20 to-transparent rounded-full translate-y-4 translate-x-4 sm:translate-y-8 sm:translate-x-8"></div>

              <div className="relative p-4 sm:p-8">
                {/* 表示形式選択 */}
                <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6 items-start">
                  <label
                    htmlFor="displayBaseSelect"
                    className="text-sm sm:text-base font-bold text-gray-800 tracking-wide"
                  >
                    {t.subnetCalculator.displayBase}
                  </label>
                  <div className="relative w-full sm:w-auto">
                    <select
                      id="displayBaseSelect"
                      className="w-full sm:min-w-[180px] px-4 py-3 sm:px-6 sm:py-3 text-base sm:text-lg bg-white/90 backdrop-blur-sm border-2 border-emerald-200/80 rounded-xl sm:rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 transition-all duration-300 hover:border-emerald-300 appearance-none cursor-pointer"
                      value={displayBase}
                      onChange={(e) =>
                        setDisplayBase(
                          e.target.value as "bin" | "oct" | "dec" | "hex"
                        )
                      }
                      aria-label={t.subnetCalculator.displayBase}
                    >
                      <option value="dec">{t.subnetCalculator.decimal}</option>
                      <option value="bin">{t.subnetCalculator.binary}</option>
                      <option value="oct">{t.subnetCalculator.octal}</option>
                      <option value="hex">
                        {t.subnetCalculator.hexadecimal}
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"
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

                {/* 結果グリッド */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  {/* ネットワーク情報カード */}
                  <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/30"></div>
                    <div className="relative p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2 sm:mr-3"></div>
                        {t.subnetCalculator.labels.networkInfo}
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100/60 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.networkAddress}
                          </span>
                          <span className="font-mono text-gray-900 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base break-all">
                            {formatIp(result.network, displayBase)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100/60 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.subnetMask}
                          </span>
                          <span className="font-mono text-gray-900 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base break-all">
                            {formatIp(result.mask, displayBase)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.broadcastAddress}
                          </span>
                          <span className="font-mono text-gray-900 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base break-all">
                            {formatIp(result.broadcast, displayBase)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ホスト情報カード */}
                  <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                    <div className="relative p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2 sm:mr-3"></div>
                        {t.subnetCalculator.labels.hostInfo}
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100/60 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.firstHost}
                          </span>
                          <span className="font-mono text-gray-900 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base break-all">
                            {formatIp(result.firstHost, displayBase)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100/60 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.lastHost}
                          </span>
                          <span className="font-mono text-gray-900 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base break-all">
                            {formatIp(result.lastHost, displayBase)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            {t.subnetCalculator.hosts}
                          </span>
                          <span className="font-mono text-gray-900 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg">
                            {result.hosts.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ToolSection>
      )}

      {/* エラー表示セクション削除（入力セクションに統合済み） */}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.subnetCalculator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
