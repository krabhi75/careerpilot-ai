import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { InfoCard } from "@/components/cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Application } from "@/types"

const statusStyles: Record<Application["status"], string> = {
  saved: "bg-muted text-muted-foreground",
  applied: "bg-blue-500/15 text-blue-400",
  reviewing: "bg-amber-500/15 text-amber-400",
  interviewing: "bg-violet-500/15 text-violet-400",
  offered: "bg-emerald-500/15 text-emerald-400",
  rejected: "bg-red-500/15 text-red-400",
}

type RecentApplicationsProps = {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <InfoCard
      title="Recent Applications"
      description="Your latest job application activity"
      action={
        <Button variant="ghost" size="sm" asChild>
          <Link href="/applications">
            View all
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      }
    >
      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/20 p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{app.jobTitle}</p>
              <p className="truncate text-sm text-muted-foreground">
                {app.company}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge className={statusStyles[app.status]} variant="secondary">
                {app.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {app.matchScore}% match
              </span>
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
