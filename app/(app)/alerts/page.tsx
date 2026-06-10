import { Bell, RefreshCw } from "lucide-react"
import { JobAlertsList } from "@/components/alerts/job-alerts-list"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import { JOB_PORTALS } from "@/lib/constants/portals"
import { mockJobAlerts } from "@/lib/mock-data"
import type { KpiMetric } from "@/types"

const alertStats: KpiMetric[] = [
  {
    id: "unread",
    label: "Unread Alerts",
    value: mockJobAlerts.filter((a) => !a.read).length,
    change: 2,
    changeLabel: "since yesterday",
    trend: "up",
  },
  {
    id: "new-jobs",
    label: "New Job Matches",
    value: mockJobAlerts.filter((a) => a.type === "new_job").length,
    change: 1,
    changeLabel: "today",
    trend: "up",
  },
  {
    id: "portals",
    label: "Connected Portals",
    value: JOB_PORTALS.length,
    change: 0,
    changeLabel: "active",
    trend: "neutral",
  },
  {
    id: "updates",
    label: "Status Updates",
    value: mockJobAlerts.filter((a) => a.type === "status_update").length,
    change: 1,
    changeLabel: "this week",
    trend: "up",
  },
]

export const revalidate = 3600

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Alerts"
        description={`Daily job updates and application status changes for ${APP_USER.name} across all portals.`}
      >
        <Badge variant="outline" className="gap-1.5">
          <RefreshCw className="size-3.5" />
          Syncs hourly
        </Badge>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {alertStats.map((m) => (
          <StatCard key={m.id} metric={m} />
        ))}
      </div>

      <JobAlertsList alerts={mockJobAlerts} />

      <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bell className="size-4" />
          Monitored Portals
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {JOB_PORTALS.map((p) => (
            <Badge key={p.id} variant="outline" style={{ borderColor: `${p.color}40`, color: p.color }}>
              {p.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
