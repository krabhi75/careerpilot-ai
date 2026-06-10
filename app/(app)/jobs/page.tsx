import { RefreshCw } from "lucide-react"
import { JobsHub } from "@/components/jobs/jobs-hub"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { APP_USER } from "@/lib/constants/user"
import { JOB_PORTALS } from "@/lib/constants/portals"
import { aggregateJobsFromAllPortals, getLastFetchTime } from "@/lib/services/job-aggregator"
import { fetchLiveJobs } from "@/lib/services/external-jobs"
import { getLastUpdatedLabel, getNewJobsToday } from "@/lib/mock-data"

export const revalidate = 3600

export default async function JobsPage() {
  const [local, live] = await Promise.all([
    Promise.resolve(aggregateJobsFromAllPortals()),
    fetchLiveJobs(),
  ])

  const seen = new Set<string>()
  const jobs = [...local, ...live].filter((j) => {
    const key = `${j.title}-${j.company}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const newToday = jobs.filter((j) => j.isNewToday)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs Hub"
        description={`${jobs.length} roles for ${APP_USER.name} — ${JOB_PORTALS.length} portals + live APIs (Remotive, Arbeitnow).`}
      >
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <RefreshCw className="size-3.5" />
          {live.length} live · Updated {getLastUpdatedLabel()}
        </Badge>
      </PageHeader>

      <JobsHub
        jobs={jobs}
        newToday={newToday}
        lastUpdated={getLastUpdatedLabel()}
        lastFetch={getLastFetchTime()}
      />
    </div>
  )
}
