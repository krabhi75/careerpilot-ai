import { RefreshCw } from "lucide-react"
import { JobCard } from "@/components/jobs/job-card"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { APP_USER } from "@/lib/constants/user"
import { JOB_COUNT } from "@/lib/constants/navigation"
import {
  getLastUpdatedLabel,
  getNewJobsToday,
  getPortalJobs,
} from "@/lib/mock-data"

export const revalidate = 86400

export default function JobsPage() {
  const jobs = getPortalJobs()
  const newToday = getNewJobsToday()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Portal"
        description={`${JOB_COUNT} openings curated for ${APP_USER.name} — updated daily with fresh listings.`}
      >
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <RefreshCw className="size-3.5" />
          Updated {getLastUpdatedLabel()}
        </Badge>
      </PageHeader>

      {newToday.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Posted Today
            <Badge className="ml-2 bg-emerald-500/15 text-emerald-400">
              {newToday.length} new
            </Badge>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {newToday.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">All Open Positions</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  )
}
