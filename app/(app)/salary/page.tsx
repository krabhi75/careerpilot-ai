import { IndianRupee } from "lucide-react"
import { SalaryTable } from "@/components/salary/salary-table"
import { PageHeader } from "@/components/layout/page-header"
import { StatCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import { mockSalaryInsights } from "@/lib/mock-data/salary"
import type { KpiMetric } from "@/types"

const salaryStats: KpiMetric[] = [
  {
    id: "median",
    label: "Your Target Median",
    value: "₹32L",
    change: 8,
    changeLabel: "vs last year",
    trend: "up",
  },
  {
    id: "roles",
    label: "Roles Tracked",
    value: mockSalaryInsights.length,
    change: 2,
    changeLabel: "new this month",
    trend: "up",
  },
  {
    id: "top",
    label: "Highest Range",
    value: "₹150L",
    change: 0,
    changeLabel: "AI/ML Remote",
    trend: "neutral",
  },
  {
    id: "growth",
    label: "Avg YoY Growth",
    value: "9%",
    change: 3,
    changeLabel: "tech sector",
    trend: "up",
  },
]

export default function SalaryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Salary Insights"
        description={`Glassdoor-style compensation data to negotiate better offers, ${APP_USER.name}.`}
      >
        <IndianRupee className="size-5 text-muted-foreground" />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {salaryStats.map((m) => (
          <StatCard key={m.id} metric={m} />
        ))}
      </div>

      <SalaryTable data={mockSalaryInsights} />
    </div>
  )
}
