export type JobPortal =
  | "linkedin"
  | "naukri"
  | "indeed"
  | "glassdoor"
  | "instahyre"
  | "cutshort"
  | "wellfound"
  | "foundit"
  | "hirect"

export type PortalInfo = {
  id: JobPortal
  name: string
  url: string
  color: string
}

export type JobAlert = {
  id: string
  title: string
  message: string
  portal: JobPortal
  timestamp: string
  type: "new_job" | "status_update" | "match" | "deadline"
  read: boolean
}

export type ATSResult = {
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  formattingIssues: string[]
}

export type JDAnalysis = {
  matchScore: number
  roleSummary: string
  requiredSkills: string[]
  matchedSkills: string[]
  gapSkills: string[]
  improvements: string[]
  optimizedBullets: string[]
}

export type PortalAnalytics = {
  portal: JobPortal
  applications: number
  responses: number
  interviews: number
}

export type CareerFunnel = {
  stage: string
  count: number
}
