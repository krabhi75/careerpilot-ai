"use client"

import { useState } from "react"
import { FileSearch, Sparkles } from "lucide-react"
import { analyzeResume } from "@/lib/services/ats-analyzer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/cards"
import type { ATSResult } from "@/types"

const SAMPLE_RESUME = `Abhishek Kumar — Software Engineer

Skills: React, TypeScript, Node.js, Python, AWS, PostgreSQL, Docker, Git

Experience:
- Built full-stack web apps serving 50K+ users using React and Node.js
- Reduced API latency by 40% through query optimization and Redis caching
- Led migration to AWS with CI/CD pipelines using GitHub Actions
- Mentored 3 junior developers on code quality and Agile practices`

export function ATSScanner() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<ATSResult | null>(null)

  function handleAnalyze() {
    setResult(analyzeResume(text || SAMPLE_RESUME))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="Resume Input" description="Paste your resume to scan for ATS compatibility">
        <Textarea
          placeholder="Paste your resume text here..."
          className="min-h-[280px] resize-none font-mono text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-3 flex gap-2">
          <Button onClick={handleAnalyze}>
            <Sparkles className="size-4" />
            Scan Resume
          </Button>
          <Button variant="outline" onClick={() => setText(SAMPLE_RESUME)}>
            Load Sample
          </Button>
        </div>
      </InfoCard>

      {result && (
        <InfoCard
          title="ATS Score"
          description="How well your resume passes Applicant Tracking Systems"
          icon={FileSearch}
        >
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <span className="text-5xl font-bold">{result.score}</span>
              <Badge
                className="mb-2 text-lg"
                variant={["D", "F"].includes(result.grade) ? "destructive" : "secondary"}
              >
                Grade {result.grade}
              </Badge>
            </div>
            <Progress value={result.score} className="h-3" />

            <div>
              <p className="mb-2 text-sm font-medium text-emerald-400">
                Matched Keywords ({result.matchedKeywords.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedKeywords.map((kw) => (
                  <Badge key={kw} variant="outline" className="text-xs">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>

            {result.missingKeywords.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-amber-400">Missing Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-medium">Suggestions</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {result.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            {result.formattingIssues.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-red-400">Formatting Issues</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {result.formattingIssues.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </InfoCard>
      )}
    </div>
  )
}
