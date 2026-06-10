import Link from "next/link"
import { Bot, Briefcase, Sparkles } from "lucide-react"
import { ActionCard } from "@/components/cards"
import { ProgressCard } from "@/components/cards/progress-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ApplicationsChart } from "@/components/dashboard/applications-chart"
import { KpiWidgets } from "@/components/dashboard/kpi-widgets"
import { RecentActivityFeed } from "@/components/dashboard/recent-activity"
import { RecentApplications } from "@/components/dashboard/recent-applications"
import { RecommendedJobs } from "@/components/dashboard/recommended-jobs"
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews"
import { PlatformHub } from "@/components/platform/platform-hub"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { APP_USER } from "@/lib/constants/user"
import {
  mockApplicationStatus,
  mockKpis,
  mockRecentActivity,
  mockRecentApplications,
  mockSkillProgress,
  mockUpcomingInterviews,
  mockWeeklyActivity,
} from "@/lib/mock-data"
import { aggregateJobsFromAllPortals } from "@/lib/services/job-aggregator"

export default function DashboardPage() {
  const topJobs = aggregateJobsFromAllPortals().slice(0, 3)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Your single career platform — jobs, tracker, learning, analytics & AI tools for ${APP_USER.name}.`}
      >
        <Button size="sm" asChild>
          <Link href="/ai-tools">
            <Sparkles className="size-4" />
            ATS & JD Tools
          </Link>
        </Button>
      </PageHeader>

      <PlatformHub />

      <KpiWidgets metrics={mockKpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <ActionCard
          title="ATS Resume Scan"
          description="Check resume compatibility before applying."
          href="/ai-tools"
          icon={Bot}
          cta="Scan Resume"
        />
        <ActionCard
          title="Jobs Hub"
          description="All portals — LinkedIn, Naukri, Indeed & more."
          href="/jobs"
          icon={Briefcase}
          cta="Browse Jobs"
        />
        <ActionCard
          title="Career Analytics"
          description="Track funnel, portals, and ATS score trends."
          href="/analytics"
          icon={Sparkles}
          cta="View Analytics"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ActivityChart data={mockWeeklyActivity} />
        <ApplicationsChart data={mockApplicationStatus} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <RecentApplications applications={mockRecentApplications} />
        <UpcomingInterviews interviews={mockUpcomingInterviews} />
        <ProgressCard
          title="Skill Progress"
          description="Close gaps identified by JD analysis"
          skills={mockSkillProgress}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecommendedJobs jobs={topJobs} />
        <RecentActivityFeed activities={mockRecentActivity} />
      </div>
    </div>
  )
}
