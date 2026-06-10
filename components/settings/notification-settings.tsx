"use client"

import { useState } from "react"
import { Bell, Mail, MessageCircle } from "lucide-react"
import { useCareerStore } from "@/lib/store/career-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoCard } from "@/components/cards"

const ALERT_OPTIONS = [
  { id: "new_job", label: "New job matches" },
  { id: "status_update", label: "Application status updates" },
  { id: "match", label: "High match alerts" },
  { id: "deadline", label: "Interview deadlines" },
]

export function NotificationSettings() {
  const { notifications, setNotifications } = useCareerStore()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailEnabled: notifications.emailEnabled,
        whatsappEnabled: notifications.whatsappEnabled,
        email: notifications.email,
        whatsapp: notifications.whatsapp,
        alertTypes: notifications.alertTypes,
      }),
    })
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  function toggleAlert(id: string) {
    const types = notifications.alertTypes.includes(id)
      ? notifications.alertTypes.filter((t) => t !== id)
      : [...notifications.alertTypes, id]
    setNotifications({ alertTypes: types })
  }

  return (
    <InfoCard title="Alerts & Notifications" description="Email and WhatsApp job updates" icon={Bell}>
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
          <div className="flex items-center gap-3">
            <Mail className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email alerts</p>
              <p className="text-xs text-muted-foreground">Daily digest + instant match alerts</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={notifications.emailEnabled}
            onChange={(e) => setNotifications({ emailEnabled: e.target.checked })}
            className="size-4"
          />
        </div>

        {notifications.emailEnabled && (
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input
              type="email"
              value={notifications.email}
              onChange={(e) => setNotifications({ email: e.target.value })}
            />
          </div>
        )}

        <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">WhatsApp alerts</p>
              <p className="text-xs text-muted-foreground">Instant notifications via WhatsApp</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={notifications.whatsappEnabled}
            onChange={(e) => setNotifications({ whatsappEnabled: e.target.checked })}
            className="size-4"
          />
        </div>

        {notifications.whatsappEnabled && (
          <div className="space-y-2">
            <Label>WhatsApp number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={notifications.whatsapp}
              onChange={(e) => setNotifications({ whatsapp: e.target.value })}
            />
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-medium">Alert types</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ALERT_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 p-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={notifications.alertTypes.includes(opt.id)}
                  onChange={() => toggleAlert(opt.id)}
                  className="size-4"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {saved ? "Saved!" : "Save Preferences"}
        </Button>
      </div>
    </InfoCard>
  )
}
