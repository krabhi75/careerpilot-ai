export type KpiMetric = {
  id: string
  label: string
  value: string | number
  change: number
  changeLabel: string
  trend: "up" | "down" | "neutral"
}

export type ChartDataPoint = {
  name: string
  value: number
  secondary?: number
}

export type ActivityPoint = {
  date: string
  applications: number
  interviews: number
  views: number
}

export type UpcomingInterview = {
  id: string
  company: string
  role: string
  date: string
  time: string
  type: "phone" | "video" | "onsite"
}

export type SkillProgress = {
  id: string
  skill: string
  level: number
  target: number
}

export type RecentActivity = {
  id: string
  title: string
  description: string
  timestamp: string
  type: "application" | "interview" | "learning" | "ai"
}
