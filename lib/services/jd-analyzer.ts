import type { JDAnalysis } from "@/types"

const SKILL_PATTERNS = [
  "react",
  "typescript",
  "javascript",
  "node",
  "python",
  "java",
  "go",
  "aws",
  "docker",
  "kubernetes",
  "sql",
  "postgresql",
  "mongodb",
  "redis",
  "graphql",
  "rest",
  "microservices",
  "system design",
  "agile",
  "ci/cd",
  "leadership",
  "mentoring",
]

const RESUME_SKILLS = [
  "react",
  "typescript",
  "javascript",
  "node",
  "python",
  "aws",
  "docker",
  "postgresql",
  "rest",
  "microservices",
  "git",
  "agile",
]

export function analyzeJobDescription(jd: string, resumeText = ""): JDAnalysis {
  const jdLower = jd.toLowerCase()
  const resumeLower = resumeText.toLowerCase()

  const requiredSkills = SKILL_PATTERNS.filter((s) => jdLower.includes(s))
  const resumeSkills =
    resumeText.length > 0
      ? SKILL_PATTERNS.filter((s) => resumeLower.includes(s))
      : RESUME_SKILLS

  const matchedSkills = requiredSkills.filter((s) => resumeSkills.includes(s))
  const gapSkills = requiredSkills.filter((s) => !resumeSkills.includes(s))

  const matchScore =
    requiredSkills.length === 0
      ? 50
      : Math.round((matchedSkills.length / requiredSkills.length) * 100)

  const improvements: string[] = []
  if (gapSkills.length > 0) {
    improvements.push(`Highlight or acquire: ${gapSkills.slice(0, 4).join(", ")}`)
  }
  if (!jdLower.includes("years")) {
    improvements.push("Clarify years of experience required in your cover letter")
  }
  improvements.push("Mirror JD terminology in your resume bullet points")
  improvements.push("Lead with achievements that map to top 3 JD requirements")

  const optimizedBullets = [
    `Built scalable ${matchedSkills[0] ?? "full-stack"} applications serving 100K+ users`,
    `Reduced deployment time by 60% using ${matchedSkills.includes("ci/cd") ? "CI/CD" : "automation"} pipelines`,
    `Collaborated with cross-functional teams in ${matchedSkills.includes("agile") ? "Agile" : "fast-paced"} environment`,
  ]

  const roleSummary =
    jd.length > 200 ? `${jd.slice(0, 180).trim()}...` : jd || "No job description provided."

  return {
    matchScore,
    roleSummary,
    requiredSkills,
    matchedSkills,
    gapSkills,
    improvements,
    optimizedBullets,
  }
}
