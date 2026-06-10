import { Settings } from "lucide-react"
import { ComingSoon } from "@/components/layout/coming-soon"

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      description="Manage your profile, notifications, and account preferences."
      icon={Settings}
    />
  )
}
