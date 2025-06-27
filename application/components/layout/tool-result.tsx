"use client";

import type React from "react";
import {
  Copy,
  Check,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ToolResultProps {
  children: React.ReactNode;
  title?: string;
  copyable?: boolean;
  copyText?: string;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
}

export default function ToolResult({
  children,
  title,
  copyable = false,
  copyText,
  className = "",
  variant = "default",
  size = "medium",
  showIcon = true,
}: ToolResultProps) {
  const [copied, setCopied] = useState(false);

  // バリアント別のスタイル
  const variantClasses = {
    default:
      "bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200/80 text-gray-900",
    success:
      "bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200/80 text-emerald-900",
    warning:
      "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200/80 text-amber-900",
    error:
      "bg-gradient-to-br from-red-50 to-rose-100 border-red-200/80 text-red-900",
    info: "bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200/80 text-blue-900",
  };

  // アイコンの選択
  const variantIcons = {
    default: AlertCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: AlertCircle,
  };

  // サイズクラス
  const sizeClasses = {
    small: "p-4 text-sm",
    medium: "p-6 lg:p-8 text-base",
    large: "p-8 lg:p-12 text-lg",
  };

  // アイコンサイズ
  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  };

  const Icon = variantIcons[variant];

  const copyToClipboard = async () => {
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        border-2 rounded-2xl lg:rounded-3xl 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
        shadow-lg shadow-black/5
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/10
        backdrop-blur-sm
      `}
      role="region"
    >
      {/* 微細な光沢効果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      {/* ヘッダー部分 */}
      {(title || copyable || showIcon) && (
        <div className="flex items-center justify-between mb-4 lg:mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            {/* アイコン表示 */}
            {showIcon && (
              <div
                className={`
                w-10 h-10 lg:w-12 lg:h-12 
                rounded-xl lg:rounded-2xl 
                flex items-center justify-center
                bg-white/50 backdrop-blur-sm
                border border-white/30
                shadow-md
              `}
              >
                <Icon
                  size={iconSizes[size]}
                  className="text-current opacity-80"
                />
              </div>
            )}

            {/* タイトル */}
            {title && (
              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-current leading-tight">
                {title}
              </h3>
            )}
          </div>

          {/* コピーボタン */}
          {copyable && copyText && (
            <button
              onClick={copyToClipboard}
              className={`
                flex items-center space-x-2 
                px-4 py-2 lg:px-5 lg:py-3 
                text-sm lg:text-base font-semibold
                bg-white/80 backdrop-blur-md
                border border-white/50
                rounded-xl lg:rounded-2xl 
                transition-all duration-300 
                hover:bg-white/90 hover:shadow-lg
                transform hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2
                ${copied ? "text-emerald-600" : "text-current"}
              `}
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          )}
        </div>
      )}

      {/* コンテンツ */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
