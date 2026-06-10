import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { RecentApplications } from "@/components/dashboard/recent-applications"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ActionCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import { mockRecentApplications } from "@/lib/mock-data"

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description={`All job applications for ${APP_USER.name} — synced with Tracker and portal alerts.`}
      >
        <Button size="sm" asChild>
          <Link href="/tracker">
            Open Tracker
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <ActionCard
          title="Application Tracker"
          description="Kanban view of your full pipeline."
          href="/tracker"
          icon={FileText}
          cta="View Board"
        />
        <ActionCard
          title="Career Analytics"
          description="Funnel conversion and portal breakdown."
          href="/analytics"
          icon={FileText}
          cta="View Analytics"
        />
        <ActionCard
          title="Job Alerts"
          description="Status updates from all portals."
          href="/alerts"
          icon={FileText}
          cta="View Alerts"
        />
      </div>

      <RecentApplications applications={mockRecentApplications} />
    </div>
  )
}
