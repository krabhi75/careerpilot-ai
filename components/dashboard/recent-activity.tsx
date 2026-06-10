import {
  Bot,
  Briefcase,
  Calendar,
  GraduationCap,
} from "lucide-react"
import { InfoCard } from "@/components/cards"
import type { RecentActivity } from "@/types"

const activityIcons = {
  application: Briefcase,
  interview: Calendar,
  learning: GraduationCap,
  ai: Bot,
}

type RecentActivityFeedProps = {
  activities: RecentActivity[]
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <InfoCard title="Recent Activity" description="Latest updates across your career journey">
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type]
          return (
            <div key={activity.id} className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Icon className="size-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </InfoCard>
  )
}
