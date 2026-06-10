import { NextResponse } from "next/server"
import { aggregateJobsFromAllPortals } from "@/lib/services/job-aggregator"
import { fetchLiveJobs } from "@/lib/services/external-jobs"

export const revalidate = 3600

export async function GET() {
  const [local, live] = await Promise.all([
    Promise.resolve(aggregateJobsFromAllPortals()),
    fetchLiveJobs(),
  ])

  const jobs = [...local, ...live]
  const seen = new Set<string>()
  const deduped = jobs.filter((j) => {
    const key = `${j.title}-${j.company}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return NextResponse.json({
    jobs: deduped,
    count: deduped.length,
    sources: { local: local.length, live: live.length },
    fetchedAt: new Date().toISOString(),
  })
}
