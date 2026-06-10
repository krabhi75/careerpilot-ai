import type { Job, JobPortal } from "@/types"

type RemotiveJob = {
  id: number
  title: string
  company_name: string
  candidate_required_location: string
  job_type: string
  salary?: string
  description: string
  url: string
  publication_date: string
  tags?: string[]
}

type ArbeitnowJob = {
  slug: string
  title: string
  company_name: string
  location: string
  remote: boolean
  description: string
  url: string
  created_at: number
  tags?: string[]
}

function mapJobType(raw: string, remote = false): Job["type"] {
  if (remote) return "remote"
  const lower = raw.toLowerCase()
  if (lower.includes("part")) return "part_time"
  if (lower.includes("contract")) return "contract"
  return "full_time"
}

export async function fetchRemotiveJobs(): Promise<Job[]> {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = (await res.json()) as { jobs: RemotiveJob[] }
    return (data.jobs ?? []).slice(0, 15).map((j) => ({
      id: `remotive-${j.id}`,
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location || "Remote",
      type: "remote" as const,
      salary: j.salary || "Not disclosed",
      description: j.description?.slice(0, 300),
      postedAt: j.publication_date?.split("T")[0] ?? new Date().toISOString().split("T")[0],
      matchScore: 75 + (j.id % 20),
      skills: j.tags?.slice(0, 5),
      source: "linkedin" as JobPortal,
      externalUrl: j.url,
      isNewToday: isToday(j.publication_date),
    }))
  } catch {
    return []
  }
}

export async function fetchArbeitnowJobs(): Promise<Job[]> {
  try {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = (await res.json()) as { data: ArbeitnowJob[] }
    return (data.data ?? []).slice(0, 15).map((j) => ({
      id: `arbeitnow-${j.slug}`,
      title: j.title,
      company: j.company_name,
      location: j.location || (j.remote ? "Remote" : "Europe"),
      type: mapJobType("", j.remote),
      salary: "Not disclosed",
      description: j.description?.slice(0, 300),
      postedAt: new Date(j.created_at * 1000).toISOString().split("T")[0],
      matchScore: 70 + (j.slug.length % 25),
      skills: j.tags?.slice(0, 5),
      source: "indeed" as JobPortal,
      externalUrl: j.url,
      isNewToday: isToday(new Date(j.created_at * 1000).toISOString()),
    }))
  } catch {
    return []
  }
}

function isToday(dateStr?: string): boolean {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const now = new Date()
  return d.toDateString() === now.toDateString()
}

export async function fetchLiveJobs(): Promise<Job[]> {
  const [remotive, arbeitnow] = await Promise.all([
    fetchRemotiveJobs(),
    fetchArbeitnowJobs(),
  ])
  return [...remotive, ...arbeitnow]
}
