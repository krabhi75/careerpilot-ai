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
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  mockApplicationStatus,
  mockKpis,
  mockRecentActivity,
  mockRecentApplications,
  mockRecommendedJobs,
  mockSkillProgress,
  mockUpcomingInterviews,
  mockUser,
  mockWeeklyActivity,
} from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Track your job search progress and career growth, ${mockUser.name.split(" ")[0]}.`}
      >
        <Button size="sm">
          <Sparkles className="size-4" />
          AI Career Insights
        </Button>
      </PageHeader>

      <KpiWidgets metrics={mockKpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <ActionCard
          title="Optimize Resume"
          description="Let AI improve your resume for higher match scores."
          href="/ai-tools"
          icon={Bot}
          cta="Try AI Tools"
        />
        <ActionCard
          title="Browse Jobs"
          description="Explore 24 new roles matched to your profile."
          href="/jobs"
          icon={Briefcase}
          cta="View Jobs"
        />
        <ActionCard
          title="Interview Prep"
          description="Practice with AI mock interviews before the real thing."
          href="/interviews"
          icon={Sparkles}
          cta="Start Prep"
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
          description="Track skills relevant to your target roles"
          skills={mockSkillProgress}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecommendedJobs jobs={mockRecommendedJobs} />
        <RecentActivityFeed activities={mockRecentActivity} />
      </div>
    </div>
  )
}
