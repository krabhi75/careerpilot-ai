"use client"

import { useState } from "react"
import { Mic, Send, Sparkles } from "lucide-react"
import type { InterviewFeedback, InterviewQuestion } from "@/lib/services/interview-ai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/cards"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MockInterview() {
  const [role, setRole] = useState("Software Engineer")
  const [company, setCompany] = useState("")
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [scores, setScores] = useState<number[]>([])

  async function startInterview() {
    setLoading(true)
    const res = await fetch(`/api/interview?role=${encodeURIComponent(role)}&count=5`)
    const data = await res.json()
    setQuestions(data.questions)
    setCurrentIndex(0)
    setAnswer("")
    setFeedback(null)
    setScores([])
    setStarted(true)
    setLoading(false)
  }

  async function submitAnswer() {
    if (!questions[currentIndex]) return
    setLoading(true)
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: questions[currentIndex],
        answer,
        role,
      }),
    })
    const data = await res.json()
    setFeedback(data.feedback)
    setScores((prev) => [...prev, data.feedback.score])
    setLoading(false)
  }

  function nextQuestion() {
    setFeedback(null)
    setAnswer("")
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    }
  }

  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0
  const finished = started && currentIndex === questions.length - 1 && feedback

  return (
    <div className="space-y-6">
      {!started ? (
        <InfoCard title="Start Mock Interview" description="AI-powered practice with instant feedback">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Target Role</Label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Company (optional)</Label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google, Microsoft..."
              />
            </div>
          </div>
          <Button className="mt-4" onClick={startInterview} disabled={loading}>
            <Mic className="size-4" />
            Start Interview
          </Button>
        </InfoCard>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <Progress
                value={((currentIndex + 1) / questions.length) * 100}
                className="mt-1 h-2 w-48"
              />
            </div>
            {scores.length > 0 && (
              <Badge variant="outline">Avg score: {avgScore}%</Badge>
            )}
          </div>

          {questions[currentIndex] && !finished && (
            <InfoCard
              title={questions[currentIndex].question}
              description={`Category: ${questions[currentIndex].category.replace("_", " ")}`}
            >
              <p className="mb-3 text-xs text-muted-foreground">
                Tip: {questions[currentIndex].tips}
              </p>
              <Textarea
                placeholder="Type your answer here..."
                className="min-h-[120px]"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!feedback}
              />
              <div className="mt-3 flex gap-2">
                {!feedback ? (
                  <Button onClick={submitAnswer} disabled={loading || !answer.trim()}>
                    <Send className="size-4" />
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    {currentIndex < questions.length - 1 ? "Next Question" : "Finish"}
                  </Button>
                )}
              </div>
            </InfoCard>
          )}

          {feedback && (
            <InfoCard title="AI Feedback" icon={Sparkles}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">{feedback.score}</span>
                  <span className="text-muted-foreground">/ 100</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-400">Strengths</p>
                  <ul className="text-sm text-muted-foreground">
                    {feedback.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-400">Improve</p>
                  <ul className="text-sm text-muted-foreground">
                    {feedback.improvements.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-lg bg-muted/30 p-3 text-sm text-muted-foreground">
                  {feedback.sampleAnswer}
                </p>
              </div>
            </InfoCard>
          )}

          {finished && (
            <InfoCard title="Interview Complete">
              <p className="text-lg font-semibold">
                Overall Score: {avgScore}%
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Practice more at /learning to improve weak areas.
              </p>
              <Button className="mt-3" variant="outline" onClick={() => setStarted(false)}>
                Start New Session
              </Button>
            </InfoCard>
          )}
        </>
      )}
    </div>
  )
}
