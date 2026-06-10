import type {
  ActivityPoint,
  Application,
  ChartDataPoint,
  Job,
  KpiMetric,
  RecentActivity,
  SkillProgress,
  UpcomingInterview,
  UserProfile,
} from "@/types"

import { APP_USER } from "@/lib/constants/user"

export const mockUser: UserProfile = {
  id: "user-1",
  name: APP_USER.fullName,
  email: APP_USER.email,
  avatarUrl: undefined,
  role: "job_seeker",
  title: APP_USER.title,
  location: APP_USER.location,
  profileScore: APP_USER.profileScore,
}

export const mockKpis: KpiMetric[] = [
  {
    id: "applications",
    label: "Applications",
    value: 42,
    change: 12,
    changeLabel: "vs last month",
    trend: "up",
  },
  {
    id: "interviews",
    label: "Interviews",
    value: 8,
    change: 3,
    changeLabel: "vs last month",
    trend: "up",
  },
  {
    id: "response-rate",
    label: "Response Rate",
    value: "34%",
    change: 5,
    changeLabel: "vs last month",
    trend: "up",
  },
  {
    id: "profile-score",
    label: "Profile Score",
    value: 87,
    change: -2,
    changeLabel: "vs last week",
    trend: "down",
  },
]

export const mockApplicationStatus: ChartDataPoint[] = [
  { name: "Applied", value: 18 },
  { name: "Reviewing", value: 12 },
  { name: "Interview", value: 8 },
  { name: "Offer", value: 2 },
  { name: "Rejected", value: 2 },
]

export const mockWeeklyActivity: ActivityPoint[] = [
  { date: "Mon", applications: 3, interviews: 1, views: 12 },
  { date: "Tue", applications: 5, interviews: 0, views: 18 },
  { date: "Wed", applications: 2, interviews: 2, views: 9 },
  { date: "Thu", applications: 6, interviews: 1, views: 22 },
  { date: "Fri", applications: 4, interviews: 1, views: 15 },
  { date: "Sat", applications: 1, interviews: 0, views: 6 },
  { date: "Sun", applications: 2, interviews: 0, views: 8 },
]

export const mockRecentApplications: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Product Designer",
    company: "Stripe",
    status: "interviewing",
    appliedAt: "2026-06-08",
    matchScore: 92,
  },
  {
    id: "app-2",
    jobId: "job-2",
    jobTitle: "Lead UX Designer",
    company: "Notion",
    status: "applied",
    appliedAt: "2026-06-07",
    matchScore: 88,
  },
  {
    id: "app-3",
    jobId: "job-3",
    jobTitle: "Product Designer",
    company: "Figma",
    status: "reviewing",
    appliedAt: "2026-06-05",
    matchScore: 85,
  },
  {
    id: "app-4",
    jobId: "job-4",
    jobTitle: "Design Systems Lead",
    company: "Vercel",
    status: "offered",
    appliedAt: "2026-06-01",
    matchScore: 94,
  },
]

export const mockUpcomingInterviews: UpcomingInterview[] = [
  {
    id: "int-1",
    company: "Stripe",
    role: "Senior Product Designer",
    date: "2026-06-12",
    time: "10:00 AM",
    type: "video",
  },
  {
    id: "int-2",
    company: "Linear",
    role: "Product Designer",
    date: "2026-06-14",
    time: "2:30 PM",
    type: "phone",
  },
  {
    id: "int-3",
    company: "Vercel",
    role: "Design Systems Lead",
    date: "2026-06-17",
    time: "11:00 AM",
    type: "onsite",
  },
]

export const mockSkillProgress: SkillProgress[] = [
  { id: "sk-1", skill: "UI Design", level: 92, target: 100 },
  { id: "sk-2", skill: "Design Systems", level: 85, target: 100 },
  { id: "sk-3", skill: "User Research", level: 78, target: 90 },
  { id: "sk-4", skill: "Prototyping", level: 88, target: 95 },
]

export const mockRecentActivity: RecentActivity[] = [
  {
    id: "act-1",
    title: "Application submitted",
    description: "Lead UX Designer at Notion",
    timestamp: "2 hours ago",
    type: "application",
  },
  {
    id: "act-2",
    title: "Interview scheduled",
    description: "Stripe — Senior Product Designer",
    timestamp: "5 hours ago",
    type: "interview",
  },
  {
    id: "act-3",
    title: "Course completed",
    description: "Advanced Figma Prototyping",
    timestamp: "Yesterday",
    type: "learning",
  },
  {
    id: "act-4",
    title: "Resume optimized",
    description: "AI improved keyword match by 18%",
    timestamp: "Yesterday",
    type: "ai",
  },
]

export const mockRecommendedJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Stripe",
    location: "Remote",
    type: "remote",
    salary: "$160k – $210k",
    postedAt: "2026-06-09",
    matchScore: 92,
  },
  {
    id: "job-2",
    title: "Lead UX Designer",
    company: "Notion",
    location: "San Francisco, CA",
    type: "full_time",
    salary: "$150k – $195k",
    postedAt: "2026-06-08",
    matchScore: 88,
  },
  {
    id: "job-3",
    title: "Design Systems Lead",
    company: "Vercel",
    location: "Remote",
    type: "remote",
    salary: "$170k – $220k",
    postedAt: "2026-06-07",
    matchScore: 94,
  },
]
