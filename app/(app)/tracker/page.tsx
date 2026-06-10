import { Kanban } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { TrackerWithStore } from "@/components/tracker/tracker-with-store"
import { StatCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import { mockTrackerColumns } from "@/lib/mock-data"
import type { KpiMetric } from "@/types"

const trackerStats: KpiMetric[] = [
  {
    id: "active",
    label: "Active Applications",
    value: 11,
    change: 3,
    changeLabel: "this week",
    trend: "up",
  },
  {
    id: "interviews",
    label: "In Interview",
    value: 2,
    change: 1,
    changeLabel: "this week",
    trend: "up",
  },
  {
    id: "offers",
    label: "Offers",
    value: 1,
    change: 1,
    changeLabel: "this month",
    trend: "up",
  },
  {
    id: "response",
    label: "Response Rate",
    value: "34%",
    change: 5,
    changeLabel: "vs last month",
    trend: "up",
  },
]

export default function TrackerPage() {
  const totalItems = mockTrackerColumns.reduce(
    (sum, col) => sum + col.items.length,
    0
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Tracker"
        description={`Kanban view of ${APP_USER.name}'s job search pipeline — ${totalItems} tracked applications.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trackerStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Kanban className="size-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Pipeline Board</h2>
        </div>
        <TrackerWithStore initialColumns={mockTrackerColumns} />
      </section>
    </div>
  )
}
