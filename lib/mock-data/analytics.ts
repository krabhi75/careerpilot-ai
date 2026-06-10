import type { CareerFunnel, ChartDataPoint, PortalAnalytics } from "@/types"

export const mockCareerFunnel: CareerFunnel[] = [
  { stage: "Jobs Saved", count: 32 },
  { stage: "Applied", count: 42 },
  { stage: "Reviewing", count: 12 },
  { stage: "Interview", count: 8 },
  { stage: "Offer", count: 2 },
]

export const mockPortalAnalytics: PortalAnalytics[] = [
  { portal: "linkedin", applications: 12, responses: 5, interviews: 3 },
  { portal: "naukri", applications: 10, responses: 4, interviews: 2 },
  { portal: "indeed", applications: 8, responses: 2, interviews: 1 },
  { portal: "instahyre", applications: 5, responses: 3, interviews: 1 },
  { portal: "cutshort", applications: 4, responses: 2, interviews: 1 },
  { portal: "glassdoor", applications: 3, responses: 1, interviews: 0 },
]

export const mockMonthlyTrend: ChartDataPoint[] = [
  { name: "Jan", value: 8, secondary: 1 },
  { name: "Feb", value: 12, secondary: 2 },
  { name: "Mar", value: 15, secondary: 1 },
  { name: "Apr", value: 18, secondary: 3 },
  { name: "May", value: 22, secondary: 2 },
  { name: "Jun", value: 42, secondary: 8 },
]

export const mockATSScoreHistory: ChartDataPoint[] = [
  { name: "Week 1", value: 62 },
  { name: "Week 2", value: 68 },
  { name: "Week 3", value: 74 },
  { name: "Week 4", value: 81 },
]
