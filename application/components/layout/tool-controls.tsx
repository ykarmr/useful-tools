import type React from "react";

interface ToolControlsProps {
  children: React.ReactNode;
  className?: string;
  layout?: "horizontal" | "vertical" | "grid" | "stack";
  align?: "left" | "center" | "right" | "stretch";
  spacing?: "tight" | "normal" | "loose";
  variant?: "default" | "elevated" | "minimal" | "bordered";
}

export default function ToolControls({
  children,
  className = "",
  layout = "horizontal",
  align = "center",
  spacing = "normal",
  variant = "default",
}: ToolControlsProps) {
  // レイアウトクラス
  const layoutClasses = {
    horizontal: "flex flex-wrap",
    vertical: "flex flex-col",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    stack: "flex flex-col sm:flex-row sm:flex-wrap",
  };

  // 配置クラス
  const alignClasses = {
    left: "justify-start items-start",
    center: "justify-center items-center",
    right: "justify-end items-end",
    stretch: "justify-stretch items-stretch",
  };

  // スペーシングクラス
  const spacingClasses = {
    tight: "gap-2 lg:gap-3",
    normal: "gap-3 lg:gap-4",
    loose: "gap-4 lg:gap-6",
  };

  // バリアントクラス
  const variantClasses = {
    default: "",
    elevated:
      "p-4 lg:p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20",
    minimal: "p-2",
    bordered:
      "p-4 lg:p-6 border-2 border-gray-200/80 rounded-2xl bg-gray-50/50",
  };

  // 基本クラスの組み合わせ
  const baseClasses = [
    layoutClasses[layout],
    layout === "horizontal" || layout === "stack" ? alignClasses[align] : "",
    spacingClasses[spacing],
    variantClasses[variant],
    "transition-all duration-200",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={baseClasses} role="group" aria-label="Tool controls">
      {children}
    </div>
  );
}
