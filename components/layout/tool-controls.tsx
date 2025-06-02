import type React from "react"

interface ToolControlsProps {
  children: React.ReactNode
  className?: string
  layout?: "horizontal" | "vertical" | "grid"
  align?: "left" | "center" | "right"
}

export default function ToolControls({
  children,
  className = "",
  layout = "horizontal",
  align = "center",
}: ToolControlsProps) {
  const layoutClasses = {
    horizontal: "flex flex-wrap gap-3 lg:gap-4",
    vertical: "flex flex-col gap-3 lg:gap-4",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4",
  }

  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  return (
    <div
      className={`${layoutClasses[layout]} ${layout === "horizontal" ? alignClasses[align] : ""} ${className}`}
      role="group"
      aria-label="Tool controls"
    >
      {children}
    </div>
  )
}
