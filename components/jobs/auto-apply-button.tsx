"use client"

import { useState } from "react"
import { Check, Loader2, Sparkles } from "lucide-react"
import { useCareerStore } from "@/lib/store/career-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Job } from "@/types"

type AutoApplyButtonProps = {
  job: Job
}

export function AutoApplyButton({ job }: AutoApplyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<{
    matchScore: number
    tailoredBullets: string[]
    message: string
  } | null>(null)
  const resumeText = useCareerStore((s) => s.resumeText)
  const addToTracker = useCareerStore((s) => s.addToTracker)
  const setTailoredResume = useCareerStore((s) => s.setTailoredResume)

  async function handleApply() {
    setLoading(true)
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          description: job.description,
          resumeText,
          matchScore: job.matchScore,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      addToTracker({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        status: "applied",
        matchScore: data.matchScore,
        notes: "Auto-applied with tailored resume",
      })
      if (data.tailoredResume) {
        setTailoredResume(job.id, data.tailoredResume)
      }

      setResult(data)
      setOpen(true)
    } catch {
      setResult({
        matchScore: job.matchScore ?? 0,
        tailoredBullets: [],
        message: "Failed to apply. Try uploading a resume first.",
      })
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button size="sm" onClick={handleApply} disabled={loading}>
        {loading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Sparkles className="size-3.5" />
        )}
        Auto Apply
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="size-5 text-emerald-400" />
              Application Prepared
            </DialogTitle>
            <DialogDescription>{result?.message}</DialogDescription>
          </DialogHeader>
          {result && (
            <div className="space-y-3 text-sm">
              <p>
                Match score: <strong>{result.matchScore}%</strong>
              </p>
              {result.tailoredBullets?.length > 0 && (
                <div>
                  <p className="mb-1 font-medium">Tailored bullets added:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {result.tailoredBullets.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Saved to Tracker. View at /tracker
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
