export type InterviewQuestion = {
  id: string
  question: string
  category: "technical" | "behavioral" | "system_design" | "hr"
  tips: string
}

export type InterviewFeedback = {
  score: number
  strengths: string[]
  improvements: string[]
  sampleAnswer: string
}

const QUESTION_BANK: InterviewQuestion[] = [
  {
    id: "q1",
    question: "Tell me about a challenging project you led and its outcome.",
    category: "behavioral",
    tips: "Use STAR: Situation, Task, Action, Result. Quantify impact.",
  },
  {
    id: "q2",
    question: "How would you design a URL shortener like bit.ly?",
    category: "system_design",
    tips: "Cover API design, hashing, database sharding, and caching.",
  },
  {
    id: "q3",
    question: "Explain the difference between REST and GraphQL. When would you use each?",
    category: "technical",
    tips: "Discuss over-fetching, versioning, and client flexibility.",
  },
  {
    id: "q4",
    question: "Describe how React reconciliation works.",
    category: "technical",
    tips: "Mention virtual DOM, diffing algorithm, and keys.",
  },
  {
    id: "q5",
    question: "Why do you want to join our company?",
    category: "hr",
    tips: "Research the company. Align your goals with their mission.",
  },
]

export function getInterviewQuestions(role: string, count = 5): InterviewQuestion[] {
  return QUESTION_BANK.slice(0, count).map((q, i) => ({
    ...q,
    question: q.question.replace("a challenging project", `a ${role} project`),
    id: `q-${i}`,
  }))
}

export function evaluateAnswer(
  question: InterviewQuestion,
  answer: string
): InterviewFeedback {
  const wordCount = answer.trim().split(/\s+/).length
  let score = 30
  if (wordCount > 30) score += 20
  if (wordCount > 80) score += 15
  if (/\d|%/.test(answer)) score += 15
  if (answer.toLowerCase().includes("team") || answer.toLowerCase().includes("led")) score += 10
  if (question.category === "behavioral" && /result|outcome|impact/i.test(answer)) score += 10
  score = Math.min(95, score)

  const strengths: string[] = []
  const improvements: string[] = []

  if (wordCount > 50) strengths.push("Good detail and depth in your response")
  else improvements.push("Expand your answer with more specific examples")

  if (/\d/.test(answer)) strengths.push("Used quantifiable metrics effectively")
  else improvements.push("Add numbers to demonstrate impact (e.g. '40% faster')")

  if (question.category === "behavioral" && !/situation|task|action|result/i.test(answer)) {
    improvements.push("Structure behavioral answers using the STAR method")
  }

  return {
    score,
    strengths: strengths.length ? strengths : ["Clear communication"],
    improvements: improvements.length ? improvements : ["Practice more examples for this question type"],
    sampleAnswer: `For this ${question.category} question, a strong answer would: ${question.tips}`,
  }
}
