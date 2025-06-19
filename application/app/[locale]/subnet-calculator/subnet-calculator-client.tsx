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

      {/* 入力欄カード */}
      <ToolSection>
        <div className="card w-full">
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleCalculate();
            }}
            aria-describedby={errorMsg ? "subnet-error-msg" : undefined}
          >
            <label
              className="flex flex-col gap-1 font-medium text-gray-700"
              htmlFor="ip-input"
            >
              {t.subnetCalculator.ipAddress}
              <input
                id="ip-input"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="input-field mt-1"
                placeholder="192.168.1.1"
                aria-label={t.subnetCalculator.ipAddress}
                aria-invalid={!!errorMsg}
                aria-describedby={errorMsg ? "subnet-error-msg" : undefined}
                autoComplete="off"
                inputMode="decimal"
              />
            </label>
            <label
              className="flex flex-col gap-1 font-medium text-gray-700"
              htmlFor="mask-input"
            >
              {t.subnetCalculator.subnetMaskLength}
              <input
                id="mask-input"
                type="number"
                min={0}
                max={32}
                value={maskLength}
                onChange={(e) => setMaskLength(Number(e.target.value))}
                className="input-field mt-1"
                aria-label={t.subnetCalculator.subnetMaskLength}
                aria-invalid={!!errorMsg}
                aria-describedby={errorMsg ? "subnet-error-msg" : undefined}
                inputMode="numeric"
              />
            </label>
            {/* 計算ボタン追加 */}
            <button type="submit" className="btn btn-primary">
              {t.subnetCalculator.calculate ?? "計算"}
            </button>
          </form>
        </div>
      </ToolSection>

      {/* 出力欄カード */}
      {result && (
        <ToolSection>
          <div className="card w-full">
            {/* 表示形式セレクトボックスに変更 */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center mb-4">
              <label
                className="font-medium text-gray-700"
                htmlFor="displayBaseSelect"
              >
                {t.subnetCalculator.displayBase ?? "表示形式"}
              </label>
              <select
                id="displayBaseSelect"
                className="input-field w-full sm:w-auto"
                value={displayBase}
                onChange={(e) =>
                  setDisplayBase(
                    e.target.value as "bin" | "oct" | "dec" | "hex"
                  )
                }
                aria-label={t.subnetCalculator.displayBase ?? "表示形式"}
              >
                <option value="bin">
                  {t.subnetCalculator.binary ?? "2進数"}
                </option>
                <option value="oct">
                  {t.subnetCalculator.octal ?? "8進数"}
                </option>
                <option value="dec">
                  {t.subnetCalculator.decimal ?? "10進数"}
                </option>
                <option value="hex">
                  {t.subnetCalculator.hexadecimal ?? "16進数"}
                </option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-gray-800">
              <div className="font-semibold">
                {t.subnetCalculator.networkAddress}:
              </div>
              <div className="truncate font-mono">
                {formatIp(result.network, displayBase)}
              </div>
              <div className="font-semibold">
                {t.subnetCalculator.subnetMask}:
              </div>
              <div className="truncate font-mono">
                {formatIp(result.mask, displayBase)}
              </div>
              <div className="font-semibold">
                {t.subnetCalculator.broadcastAddress}:
              </div>
              <div className="truncate font-mono">
                {formatIp(result.broadcast, displayBase)}
              </div>
              <div className="font-semibold">
                {t.subnetCalculator.firstHost}:
              </div>
              <div className="truncate font-mono">
                {formatIp(result.firstHost, displayBase)}
              </div>
              <div className="font-semibold">
                {t.subnetCalculator.lastHost}:
              </div>
              <div className="truncate font-mono">
                {formatIp(result.lastHost, displayBase)}
              </div>
              <div className="font-semibold">{t.subnetCalculator.hosts}:</div>
              <div className="truncate font-mono">{result.hosts}</div>
            </div>
          </div>
        </ToolSection>
      )}

      {errorMsg && (
        <ToolSection>
          <div className="card w-full">
            <div
              id="subnet-error-msg"
              className="text-red-600 text-center py-2"
              role="alert"
              aria-live="assertive"
            >
              {errorMsg || t.subnetCalculator.invalidInput}
            </div>
          </div>
        </ToolSection>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.subnetCalculator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
