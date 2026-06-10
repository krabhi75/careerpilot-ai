"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { JobStatus } from "@/types"

export type TrackerEntry = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: JobStatus
  matchScore: number
  notes?: string
  tailoredResume?: string
  appliedAt: string
}

export type NotificationPrefs = {
  emailEnabled: boolean
  whatsappEnabled: boolean
  email: string
  whatsapp: string
  alertTypes: string[]
}

type CareerState = {
  resumeText: string
  tracker: TrackerEntry[]
  notifications: NotificationPrefs
  setResumeText: (text: string) => void
  addToTracker: (entry: Omit<TrackerEntry, "id" | "appliedAt">) => void
  updateTrackerStatus: (jobId: string, status: JobStatus, notes?: string) => void
  setTailoredResume: (jobId: string, resume: string) => void
  setNotifications: (prefs: Partial<NotificationPrefs>) => void
}

const defaultNotifications: NotificationPrefs = {
  emailEnabled: true,
  whatsappEnabled: false,
  email: "abhishek@careerpilot.ai",
  whatsapp: "+91",
  alertTypes: ["new_job", "status_update", "match", "deadline"],
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set, get) => ({
      resumeText: "",
      tracker: [],
      notifications: defaultNotifications,

      setResumeText: (text) => set({ resumeText: text }),

      addToTracker: (entry) => {
        const exists = get().tracker.find((t) => t.jobId === entry.jobId)
        if (exists) return
        set({
          tracker: [
            {
              ...entry,
              id: `tr-${Date.now()}`,
              appliedAt: new Date().toISOString().split("T")[0],
            },
            ...get().tracker,
          ],
        })
      },

      updateTrackerStatus: (jobId, status, notes) =>
        set({
          tracker: get().tracker.map((t) =>
            t.jobId === jobId ? { ...t, status, notes: notes ?? t.notes } : t
          ),
        }),

      setTailoredResume: (jobId, resume) =>
        set({
          tracker: get().tracker.map((t) =>
            t.jobId === jobId ? { ...t, tailoredResume: resume } : t
          ),
        }),

      setNotifications: (prefs) =>
        set({ notifications: { ...get().notifications, ...prefs } }),
    }),
    { name: "careerpilot-career" }
  )
)
