export type UserRole = "job_seeker" | "recruiter" | "admin"

export type UserProfile = {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
  title: string
  location: string
  profileScore: number
}
