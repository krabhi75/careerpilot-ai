export type JobType = "full_time" | "part_time" | "contract" | "remote"
export type JobStatus =
  | "saved"
  | "applied"
  | "reviewing"
  | "interviewing"
  | "offered"
  | "rejected"

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: JobType
  salary: string
  postedAt: string
  matchScore?: number
  description?: string
  skills?: string[]
  isNewToday?: boolean
}

export type Application = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: JobStatus
  appliedAt: string
  matchScore: number
}
