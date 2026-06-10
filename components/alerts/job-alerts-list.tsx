import { Bell, Clock } from "lucide-react"
import { PortalBadge } from "@/components/jobs/portal-badge"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/cards"
import type { JobAlert } from "@/types"

const typeStyles: Record<JobAlert["type"], string> = {
  new_job: "bg-emerald-500/15 text-emerald-400",
  status_update: "bg-blue-500/15 text-blue-400",
  match: "bg-violet-500/15 text-violet-400",
  deadline: "bg-amber-500/15 text-amber-400",
}

type JobAlertsListProps = {
  alerts: JobAlert[]
}

export function JobAlertsList({ alerts }: JobAlertsListProps) {
  const unread = alerts.filter((a) => !a.read).length

  return (
    <InfoCard
      title="Job Updates"
      description={`${unread} unread alerts from all connected portals`}
      icon={Bell}
      action={
        unread > 0 ? (
          <Badge className="bg-sidebar-primary/20 text-sidebar-primary">{unread} new</Badge>
        ) : undefined
      }
    >
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex gap-3 rounded-lg border p-3 ${
              alert.read
                ? "border-border/40 bg-muted/10"
                : "border-sidebar-primary/30 bg-sidebar-primary/5"
            }`}
          >
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{alert.title}</p>
                <Badge className={typeStyles[alert.type]} variant="secondary">
                  {alert.type.replace("_", " ")}
                </Badge>
                {!alert.read && (
                  <span className="size-2 rounded-full bg-sidebar-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <div className="flex items-center gap-2 pt-1">
                <PortalBadge portal={alert.portal} />
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {alert.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
