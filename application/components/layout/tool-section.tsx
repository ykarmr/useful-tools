import type React from "react";

interface ToolSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: "default" | "highlighted" | "minimal";
  spacing?: "tight" | "normal" | "loose";
}

export default function ToolSection({
  children,
  title,
  description,
  icon: Icon,
  className = "",
  headerClassName = "",
  contentClassName = "",
  variant = "default",
  spacing = "normal",
}: ToolSectionProps) {
  // スペーシングクラス
  const spacingClasses = {
    tight: "mb-4 lg:mb-5",
    normal: "mb-6 lg:mb-8",
    loose: "mb-8 lg:mb-12",
  };

  // バリアントクラス
  const variantClasses = {
    default: "",
    highlighted: "relative",
    minimal: "",
  };

  // ヘッダースタイル
  const headerSpacing = {
    tight: "mb-3 lg:mb-4",
    normal: "mb-4 lg:mb-6",
    loose: "mb-6 lg:mb-8",
  };

  return (
    <section
      className={`${spacingClasses[spacing]} ${variantClasses[variant]} ${className}`}
    >
      {/* ハイライトバリアント用の装飾 */}
      {variant === "highlighted" && (
        <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl -z-10" />
      )}

      {(title || description || Icon) && (
        <header className={`${headerSpacing[spacing]} ${headerClassName}`}>
          {Icon && title && (
            <div className="flex items-start space-x-4 mb-3">
              {/* アイコンコンテナ */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25 flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                  <Icon size={24} className="text-white" />
                </div>
              </div>

              {/* タイトルと説明 */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {title}
                </h2>
                {description && (
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* アイコンなしの場合 */}
          {!Icon && title && (
            <div className="mb-3">
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight mb-2">
                {title}
              </h2>
              {description && (
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* 説明のみの場合 */}
          {!title && description && (
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              {description}
            </p>
          )}
        </header>
      )}

      <div className={`relative ${contentClassName}`}>{children}</div>
    </section>
  );
}
