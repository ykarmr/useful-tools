interface StatItem {
  label: string
  value: string | number
  color?: "default" | "primary" | "success" | "warning" | "error"
}

interface ToolStatsProps {
  title?: string
  stats: StatItem[]
  className?: string
  layout?: "grid" | "list"
}

export default function ToolStats({ title, stats = [], className = "", layout = "grid" }: ToolStatsProps) {
  const colorClasses = {
    default: "text-gray-900",
    primary: "text-primary-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  }

  const layoutClasses = {
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
    list: "space-y-4",
  }

  // Return null if no stats provided
  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <section className={`${className}`} aria-labelledby={title ? "stats-title" : undefined}>
      {title && (
        <h3 id="stats-title" className="text-xl font-bold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <div className={layoutClasses[layout]}>
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${colorClasses[stat.color || "default"]}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
