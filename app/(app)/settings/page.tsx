import { ResumeUpload } from "@/components/ai/resume-upload"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PageHeader } from "@/components/layout/page-header"
import { InfoCard } from "@/components/cards"
import { APP_USER } from "@/lib/constants/user"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description={`Manage profile, resume, and notifications for ${APP_USER.name}.`}
      />

      <InfoCard title="Profile">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{APP_USER.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{APP_USER.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role</span>
            <span>{APP_USER.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Chrome Extension</span>
            <Badge variant="outline">Install from /chrome-extension</Badge>
          </div>
        </div>
      </InfoCard>

      <ResumeUpload />
      <NotificationSettings />
    </div>
  )
}
