import Link from "next/link"
import { Calendar, MapPin, Phone, Video } from "lucide-react"
import { InfoCard } from "@/components/cards"
import { Button } from "@/components/ui/button"
import type { UpcomingInterview } from "@/types"

const typeIcons = {
  phone: Phone,
  video: Video,
  onsite: MapPin,
}

type UpcomingInterviewsProps = {
  interviews: UpcomingInterview[]
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  return (
    <InfoCard
      title="Upcoming Interviews"
      description="Scheduled interviews this week"
      action={
        <Button variant="ghost" size="sm" asChild>
          <Link href="/interviews">View calendar</Link>
        </Button>
      }
    >
      <div className="space-y-3">
        {interviews.map((interview) => {
          const TypeIcon = typeIcons[interview.type]
          return (
            <div
              key={interview.id}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
                <TypeIcon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{interview.company}</p>
                <p className="text-sm text-muted-foreground">{interview.role}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  {interview.date} · {interview.time}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </InfoCard>
  )
}
