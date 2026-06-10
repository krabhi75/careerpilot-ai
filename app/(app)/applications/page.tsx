import { FileText } from "lucide-react"
import { ComingSoon } from "@/components/layout/coming-soon"

export default function ApplicationsPage() {
  return (
    <ComingSoon
      title="Applications"
      description="Track and manage all your job applications in one place."
      icon={FileText}
    />
  )
}
