import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { InfoCard } from "@/components/cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Job } from "@/types"

type RecommendedJobsProps = {
  jobs: Job[]
}

export function RecommendedJobs({ jobs }: RecommendedJobsProps) {
  return (
    <InfoCard
      title="AI-Recommended Jobs"
      description="Top matches based on your profile and skills"
      action={
        <Button variant="ghost" size="sm" asChild>
          <Link href="/jobs">
            Browse jobs
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      }
    >
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/20 p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {job.location}
                <span>·</span>
                {job.salary}
              </div>
            </div>
            {job.matchScore && (
              <Badge className="shrink-0 bg-sidebar-primary/20 text-sidebar-primary">
                {job.matchScore}% match
              </Badge>
            )}
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
