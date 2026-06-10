"use client"

import { useMemo, useState } from "react"
import { JobCard } from "@/components/jobs/job-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JOB_PORTALS } from "@/lib/constants/portals"
import type { Job, JobPortal } from "@/types"

type JobsHubProps = {
  jobs: Job[]
  newToday: Job[]
  lastUpdated: string
  lastFetch: string
}

export function JobsHub({ jobs, newToday, lastUpdated, lastFetch }: JobsHubProps) {
  const [portal, setPortal] = useState<JobPortal | "all">("all")

  const filtered = useMemo(
    () => (portal === "all" ? jobs : jobs.filter((j) => j.source === portal)),
    [jobs, portal]
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={portal === "all" ? "default" : "outline"}
          onClick={() => setPortal("all")}
        >
          All Portals ({jobs.length})
        </Button>
        {JOB_PORTALS.map((p) => {
          const count = jobs.filter((j) => j.source === p.id).length
          return (
            <Button
              key={p.id}
              size="sm"
              variant={portal === p.id ? "default" : "outline"}
              onClick={() => setPortal(p.id)}
            >
              {p.name} ({count})
            </Button>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Aggregated from {JOB_PORTALS.length} portals · Last fetch: {lastFetch}
      </p>

      {newToday.length > 0 && portal === "all" && (
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {portal === "all" ? "All Open Positions" : `${JOB_PORTALS.find((p) => p.id === portal)?.name} Jobs`}
          </h2>
          <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
        </div>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No jobs from this portal yet. Check back after the next daily sync.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
