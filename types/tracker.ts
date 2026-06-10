import type { JobStatus } from "./job"

export type TrackerColumn = {
  id: JobStatus
  title: string
  items: TrackerItem[]
}

export type TrackerItem = {
  id: string
  jobTitle: string
  company: string
  appliedAt: string
  matchScore: number
  notes?: string
}
