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
            <span className="text-muted-foreground">Deploy branch</span>
            <Badge variant="outline">main</Badge>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground shrink-0">Production URL</span>
            <a
              href="https://careerpilot-ai-five.vercel.app"
              className="truncate text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              careerpilot-ai-five.vercel.app
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Chrome Extension</span>
            <Badge variant="outline">chrome-extension folder</Badge>
          </div>
        </div>
      </InfoCard>

      <ResumeUpload />
      <NotificationSettings />
    </div>
  )
}
