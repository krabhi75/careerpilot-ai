import { NextResponse } from "next/server"
import {
  evaluateAnswer,
  getInterviewQuestions,
  type InterviewQuestion,
} from "@/lib/services/interview-ai"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role") ?? "Software Engineer"
  const count = Number(searchParams.get("count") ?? 5)

  const questions = getInterviewQuestions(role, count)
  return NextResponse.json({ questions })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { question, answer, role } = body as {
    question: InterviewQuestion
    answer: string
    role?: string
  }

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 })
  }

  const feedback = evaluateAnswer(question, answer)

  return NextResponse.json({
    feedback,
    role: role ?? "Software Engineer",
    evaluatedAt: new Date().toISOString(),
  })
}
