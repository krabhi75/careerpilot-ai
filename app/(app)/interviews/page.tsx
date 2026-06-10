import { Calendar } from "lucide-react"
import { ComingSoon } from "@/components/layout/coming-soon"

export default function InterviewsPage() {
  return (
    <ComingSoon
      title="Interviews"
      description="Schedule, prepare, and track your interview pipeline."
      icon={Calendar}
    />
  )
}
