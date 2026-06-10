import type { Job, JobPortal } from "@/types"
import { JOB_PORTALS } from "@/lib/constants/portals"
import { getPortalJobs } from "@/lib/mock-data/jobs"

const PORTAL_IDS = JOB_PORTALS.map((p) => p.id)

/** Assigns each job to a portal and simulates cross-portal aggregation. */
export function aggregateJobsFromAllPortals(): Job[] {
  const base = getPortalJobs()

  return base.map((job, index) => {
    const portal = PORTAL_IDS[index % PORTAL_IDS.length] as JobPortal
    const portalInfo = JOB_PORTALS.find((p) => p.id === portal)!

    return {
      ...job,
      source: portal,
      externalUrl: `${portalInfo.url}/job/${job.id}`,
    }
  })
}

export function getJobsByPortal(portal: JobPortal): Job[] {
  return aggregateJobsFromAllPortals().filter((j) => j.source === portal)
}

export function getPortalJobCounts(): Record<JobPortal, number> {
  const jobs = aggregateJobsFromAllPortals()
  const counts = {} as Record<JobPortal, number>

  for (const portal of PORTAL_IDS) {
    counts[portal as JobPortal] = jobs.filter((j) => j.source === portal).length
  }

  return counts
}

export function getTotalAggregatedJobs(): number {
  return aggregateJobsFromAllPortals().length
}

export function getLastFetchTime(): string {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}
