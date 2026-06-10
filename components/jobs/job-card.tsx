import { MapPin, Sparkles } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PortalBadge } from "@/components/jobs/portal-badge"
import type { Job } from "@/types"

const typeLabels: Record<Job["type"], string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  remote: "Remote",
}

type JobCardProps = {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="bg-card/50 transition-colors hover:bg-card/80">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-base">{job.title}</CardTitle>
            <CardDescription className="font-medium text-foreground/80">
              {job.company}
            </CardDescription>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {job.isNewToday && (
              <Badge className="bg-emerald-500/15 text-emerald-400">New today</Badge>
            )}
            {job.matchScore && (
              <Badge className="bg-sidebar-primary/20 text-sidebar-primary">
                {job.matchScore}% match
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {job.source && <PortalBadge portal={job.source} />}
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
          <Badge variant="secondary">{typeLabels[job.type]}</Badge>
          <span>{job.salary}</span>
        </div>
        {job.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {job.description}
          </p>
        )}
        {job.skills && (
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/30">
        <span className="text-xs text-muted-foreground">
          Posted {format(parseISO(job.postedAt), "MMM d, yyyy")}
        </span>
        <Button size="sm">
          <Sparkles className="size-3.5" />
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}
