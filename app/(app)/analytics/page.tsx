import { BarChart3 } from "lucide-react"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { FunnelChart } from "@/components/analytics/funnel-chart"
import { PortalChart } from "@/components/analytics/portal-chart"
import { KpiWidgets } from "@/components/dashboard/kpi-widgets"
import { PageHeader } from "@/components/layout/page-header"
import { InfoCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import {
  mockATSScoreHistory,
  mockCareerFunnel,
  mockKpis,
  mockMonthlyTrend,
  mockPortalAnalytics,
  mockWeeklyActivity,
} from "@/lib/mock-data"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Career Analytics"
        description={`Unified insights across jobs, applications, portals, and learning for ${APP_USER.name}.`}
      />

      <KpiWidgets metrics={mockKpis} />

      <div className="grid gap-4 xl:grid-cols-2">
        <FunnelChart data={mockCareerFunnel} />
        <PortalChart data={mockPortalAnalytics} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ActivityChart data={mockWeeklyActivity} />
        <InfoCard title="Monthly Application Trend" description="Applications vs interviews over 6 months">
          <div className="space-y-2">
            {mockMonthlyTrend.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-8 text-sm text-muted-foreground">{m.name}</span>
                <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-sidebar-primary"
                    style={{ width: `${(m.value / 42) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-medium">{m.value}</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      <InfoCard
        title="ATS Score Improvement"
        description="Resume ATS compatibility trend over the past 4 weeks"
        icon={BarChart3}
      >
        <div className="grid gap-4 sm:grid-cols-4">
          {mockATSScoreHistory.map((w) => (
            <div key={w.name} className="rounded-lg border border-border/60 bg-muted/20 p-4 text-center">
              <p className="text-xs text-muted-foreground">{w.name}</p>
              <p className="text-2xl font-bold">{w.value}</p>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  )
}
