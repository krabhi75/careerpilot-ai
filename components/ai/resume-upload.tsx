"use client"

import { useRef, useState } from "react"
import { FileUp, Loader2 } from "lucide-react"
import { useCareerStore } from "@/lib/store/career-store"
import { Button } from "@/components/ui/button"
import { InfoCard } from "@/components/cards"

export function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const setResumeText = useCareerStore((s) => s.setResumeText)

  async function handleFile(file: File) {
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/resume/parse", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResumeText(data.text)
      setFileName(data.fileName)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <InfoCard title="Upload Resume (PDF)" description="Extract text automatically for ATS scan and auto-apply">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/20 py-10"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
      >
        {loading ? (
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        ) : (
          <FileUp className="size-8 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          Drag & drop PDF or click to upload
        </p>
        {fileName && (
          <p className="text-xs text-emerald-400">Parsed: {fileName}</p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
        >
          Choose PDF
        </Button>
      </div>
    </InfoCard>
  )
}
