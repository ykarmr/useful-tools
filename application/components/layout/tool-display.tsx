import type React from "react";

interface ToolDisplayProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "extra-large";
  centered?: boolean;
  background?:
    | "none"
    | "light"
    | "dark"
    | "gradient"
    | "glass"
    | "primary"
    | "success"
    | "warning"
    | "info";
  variant?: "default" | "elevated" | "outlined" | "minimal";
  fullHeight?: boolean;
}

export default function ToolDisplay({
  children,
  className = "",
  size = "medium",
  centered = true,
  background = "none",
  variant = "default",
  fullHeight = false,
}: ToolDisplayProps) {
  // サイズクラス
  const sizeClasses = {
    small: "p-4 lg:p-6",
    medium: "p-6 lg:p-8",
    large: "p-8 lg:p-12",
    "extra-large": "p-10 lg:p-16",
  };

  // 背景クラス
  const backgroundClasses = {
    none: "",
    light: "bg-gradient-to-br from-gray-50 to-slate-100",
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 text-white",
    gradient: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    glass: "bg-white/90 backdrop-blur-md border border-white/30",
    primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white",
    success:
      "bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200",
    warning:
      "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200",
    info: "bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200",
  };

  // バリアントクラス
  const variantClasses = {
    default: "rounded-2xl lg:rounded-3xl",
    elevated:
      "rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl shadow-black/10",
    outlined:
      "rounded-2xl lg:rounded-3xl border-2 border-gray-200/80 shadow-sm",
    minimal: "rounded-xl",
  };

  // 高さクラス
  const heightClass = fullHeight ? "min-h-full" : "";

  // ベースクラスの組み合わせ
  const baseClasses = [
    sizeClasses[size],
    backgroundClasses[background],
    variantClasses[variant],
    heightClass,
    centered ? "text-center" : "",
    "transition-all duration-300 ease-in-out",
    "hover:shadow-lg hover:shadow-black/5",
    "relative overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={baseClasses} role="region" aria-label="Tool display area">
      {/* 微細なテクスチャ効果 */}
      {background !== "none" && background !== "dark" && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      )}

      {/* コンテンツ */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
