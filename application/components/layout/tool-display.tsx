import type React from "react"

interface ToolDisplayProps {
  children: React.ReactNode
  className?: string
  size?: "small" | "medium" | "large"
  centered?: boolean
  background?: "none" | "light" | "dark" | "gradient"
}

export default function ToolDisplay({
  children,
  className = "",
  size = "medium",
  centered = true,
  background = "none",
}: ToolDisplayProps) {
  const sizeClasses = {
    small: "p-4 lg:p-6",
    medium: "p-6 lg:p-8",
    large: "p-8 lg:p-12",
  }

  const backgroundClasses = {
    none: "",
    light: "bg-gray-50 rounded-xl lg:rounded-2xl",
    dark: "bg-gray-900 rounded-xl lg:rounded-2xl",
    gradient: "bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl lg:rounded-2xl",
  }

  return (
    <div
      className={`${sizeClasses[size]} ${backgroundClasses[background]} ${centered ? "text-center" : ""} ${className}`}
      role="region"
      aria-label="Tool display area"
    >
      {children}
    </div>
  )
}
