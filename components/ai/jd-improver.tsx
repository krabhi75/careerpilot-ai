"use client"

import { useState } from "react"
import { Sparkles, Target } from "lucide-react"
import { analyzeJobDescription } from "@/lib/services/jd-analyzer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/cards"
import type { JDAnalysis } from "@/types"

const SAMPLE_JD = `We are looking for a Senior Product Manager with 5+ years of experience.

Requirements:
- Proven track record shipping B2B or consumer products end-to-end
- Strong skills in roadmapping, PRDs, and stakeholder management
- Experience with user research, A/B testing, and data-driven decisions
- SQL and analytics tools (Mixpanel, Amplitude, or similar)
- Agile/Scrum experience and cross-functional leadership`

export function JDImprover() {
  const [jd, setJd] = useState("")
  const [resume, setResume] = useState("")
  const [result, setResult] = useState<JDAnalysis | null>(null)

  function handleAnalyze() {
    setResult(analyzeJobDescription(jd || SAMPLE_JD, resume))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Job Description" description="Paste the JD you want to match against">
          <Textarea
            placeholder="Paste job description..."
            className="min-h-[200px] resize-none text-sm"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </InfoCard>
        <InfoCard
          title="Your Resume (optional)"
          description="Improves match accuracy for gap analysis"
        >
          <Textarea
            placeholder="Paste resume text for personalized match..."
            className="min-h-[200px] resize-none text-sm"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </InfoCard>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleAnalyze}>
          <Sparkles className="size-4" />
          Analyze & Improve
        </Button>
        <Button variant="outline" onClick={() => setJd(SAMPLE_JD)}>
          Load Sample JD
        </Button>
      </div>

      {result && (
        <InfoCard
          title="JD Match Analysis"
          description="How your profile aligns and how to improve"
          icon={Target}
        >
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Match Score</span>
                <span className="text-2xl font-bold">{result.matchScore}%</span>
              </div>
              <Progress value={result.matchScore} className="h-3" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-emerald-400">Matched Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedSkills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-amber-400">Skill Gaps</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.gapSkills.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No gaps detected</span>
                  ) : (
                    result.gapSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Improvement Tips</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {result.improvements.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Optimized Resume Bullets</p>
              <ul className="space-y-2">
                {result.optimizedBullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </InfoCard>
      )}
    </div>
  )
}
