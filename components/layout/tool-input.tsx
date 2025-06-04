import type React from "react";

interface ToolInputProps {
  label?: string;
  children: React.ReactNode;
  description?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function ToolInput({
  label,
  children,
  description,
  required = false,
  error,
  className = "",
}: ToolInputProps) {
  return (
    <div className={`space-y-2 lg:space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm lg:text-base font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p
          className="text-sm lg:text-base text-red-600 mt-2"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
