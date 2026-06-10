export type LearningMaterial = {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  progress: number
  updatedAt: string
}
