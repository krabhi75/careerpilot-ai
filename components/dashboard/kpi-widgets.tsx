import { StatCard } from "@/components/cards"
import type { KpiMetric } from "@/types"

type KpiWidgetsProps = {
  metrics: KpiMetric[]
}

export function KpiWidgets({ metrics }: KpiWidgetsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
