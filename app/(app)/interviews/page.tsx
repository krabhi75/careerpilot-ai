import { Calendar } from "lucide-react"
import { MockInterview } from "@/components/interview/mock-interview"
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews"
import { PageHeader } from "@/components/layout/page-header"
import { APP_USER } from "@/lib/constants/user"
import { mockUpcomingInterviews } from "@/lib/mock-data"

export default function InterviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Prep"
        description={`AI mock interviews and scheduled sessions for ${APP_USER.name}.`}
      />

      <MockInterview />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Scheduled Interviews</h2>
        </div>
        <UpcomingInterviews interviews={mockUpcomingInterviews} />
      </section>
    </div>
  )
}
