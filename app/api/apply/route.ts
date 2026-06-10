import { NextResponse } from "next/server"
import { analyzeJobDescription } from "@/lib/services/jd-analyzer"
import { analyzeResume } from "@/lib/services/ats-analyzer"
import { createClient } from "@/lib/supabase/server"
import { hasSupabaseEnv } from "@/lib/env"

export async function POST(request: Request) {
  const body = await request.json()
  const { jobId, jobTitle, company, description, resumeText, matchScore } = body

  if (!jobId || !jobTitle || !company) {
    return NextResponse.json({ error: "Missing job details" }, { status: 400 })
  }

  const jdAnalysis = analyzeJobDescription(description ?? "", resumeText ?? "")
  const atsResult = resumeText ? analyzeResume(resumeText) : null

  const tailoredBullets = jdAnalysis.optimizedBullets
  const tailoredResume = resumeText
    ? `${resumeText}\n\n--- Tailored for ${jobTitle} at ${company} ---\n${tailoredBullets.map((b) => `• ${b}`).join("\n")}`
    : tailoredBullets.map((b) => `• ${b}`).join("\n")

  let savedToDb = false
  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from("tracker_items").upsert({
          user_id: user.id,
          job_id: jobId,
          job_title: jobTitle,
          company,
          status: "applied",
          match_score: matchScore ?? jdAnalysis.matchScore,
          tailored_resume: tailoredResume,
          applied_at: new Date().toISOString(),
        })
        savedToDb = true
      }
    } catch {
      // Fall through — client store handles offline
    }
  }

  return NextResponse.json({
    success: true,
    matchScore: jdAnalysis.matchScore,
    tailoredResume,
    tailoredBullets,
    atsScore: atsResult?.score,
    savedToDb,
    message: `Application prepared for ${jobTitle} at ${company}`,
  })
}
