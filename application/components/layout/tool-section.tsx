import type React from "react"

interface ToolSectionProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export default function ToolSection({
  children,
  title,
  description,
  icon: Icon,
  className = "",
  headerClassName = "",
  contentClassName = "",
}: ToolSectionProps) {
  return (
    <section className={`mb-6 lg:mb-8 ${className}`}>
      {(title || description || Icon) && (
        <header className={`mb-4 lg:mb-6 ${headerClassName}`}>
          {Icon && title && (
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3 flex items-center">
              <Icon size={24} className="mr-3 text-primary-600" />
              {title}
            </h2>
          )}
          {!Icon && title && <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">{title}</h2>}
          {description && <p className="text-gray-600 leading-relaxed">{description}</p>}
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  )
}
