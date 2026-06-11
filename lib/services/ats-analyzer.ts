import type { ATSResult } from "@/types"

const TARGET_KEYWORDS = [
  "product management",
  "roadmap",
  "prd",
  "user research",
  "stakeholder",
  "agile",
  "okrs",
  "metrics",
  "a/b testing",
  "sql",
  "analytics",
  "go-to-market",
  "gtm",
  "leadership",
  "cross-functional",
]

export function analyzeResume(text: string): ATSResult {
  const lower = text.toLowerCase()
  const matchedKeywords = TARGET_KEYWORDS.filter((kw) => lower.includes(kw))
  const missingKeywords = TARGET_KEYWORDS.filter((kw) => !lower.includes(kw))

  let score = 40
  score += matchedKeywords.length * 4
  if (text.length > 500) score += 10
  if (text.length > 1500) score += 5
  if (/\d+%|\d+x|₹|\$/.test(text)) score += 8
  if (lower.includes("experience") || lower.includes("project")) score += 5
  score = Math.min(98, Math.max(20, score))

  const grade =
    score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : score >= 40 ? "D" : "F"

  const suggestions: string[] = []
  if (missingKeywords.length > 5) {
    suggestions.push(
      `Add ${missingKeywords.slice(0, 3).join(", ")} to improve keyword match`
    )
  }
  if (!/\d/.test(text)) {
    suggestions.push("Quantify achievements with numbers (e.g. 'reduced latency by 40%')")
  }
  if (text.length < 400) {
    suggestions.push("Expand experience section with 3–5 bullet points per role")
  }
  if (!lower.includes("skills")) {
    suggestions.push("Add a dedicated Skills section with ATS-friendly keywords")
  }
  suggestions.push("Tailor resume keywords to each job description before applying")

  const formattingIssues: string[] = []
  if (text.includes("\t")) formattingIssues.push("Remove tab characters — use standard spacing")
  if (/[•●▪]/.test(text)) formattingIssues.push("Replace special bullets with simple hyphens (-)")
  if (text.split("\n").some((l) => l.length > 120)) {
    formattingIssues.push("Keep bullet points under 120 characters for ATS parsing")
  }

  return {
    score,
    grade,
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 8),
    suggestions,
    formattingIssues,
  }
}
