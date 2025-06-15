"use client"

import type React from "react"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ToolResultProps {
  children: React.ReactNode
  title?: string
  copyable?: boolean
  copyText?: string
  className?: string
  variant?: "default" | "success" | "warning" | "error"
}

export default function ToolResult({
  children,
  title,
  copyable = false,
  copyText,
  className = "",
  variant = "default",
}: ToolResultProps) {
  const [copied, setCopied] = useState(false)

  const variantClasses = {
    default: "bg-gray-50 border-gray-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  }

  const copyToClipboard = async () => {
    if (!copyText) return

    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]} ${className}`} role="region">
      {(title || copyable) && (
        <div className="flex items-center justify-between mb-2">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {copyable && copyText && (
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
