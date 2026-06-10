import { RefreshCw } from "lucide-react"
import { JobsHub } from "@/components/jobs/jobs-hub"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { APP_USER } from "@/lib/constants/user"
import { JOB_PORTALS } from "@/lib/constants/portals"
import {
  aggregateJobsFromAllPortals,
  getLastFetchTime,
  getTotalAggregatedJobs,
} from "@/lib/services/job-aggregator"
import { getLastUpdatedLabel, getNewJobsToday } from "@/lib/mock-data"

export const revalidate = 86400

export default function JobsPage() {
  const jobs = aggregateJobsFromAllPortals()
  const newToday = getNewJobsToday().map((job) => {
    const match = jobs.find((j) => j.id === job.id)
    return match ?? job
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs Hub"
        description={`${getTotalAggregatedJobs()} roles for ${APP_USER.name} from ${JOB_PORTALS.length} portals — LinkedIn, Naukri, Indeed, and more.`}
      >
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <RefreshCw className="size-3.5" />
          Daily sync · {getLastUpdatedLabel()}
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
