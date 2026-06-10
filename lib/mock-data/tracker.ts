import type { TrackerColumn } from "@/types"

export const mockTrackerColumns: TrackerColumn[] = [
  {
    id: "saved",
    title: "Saved",
    items: [
      {
        id: "t-1",
        jobTitle: "Staff Engineer",
        company: "Netflix",
        appliedAt: "2026-06-09",
        matchScore: 95,
      },
      {
        id: "t-2",
        jobTitle: "AI/ML Engineer",
        company: "OpenAI",
        appliedAt: "2026-06-08",
        matchScore: 92,
      },
    ],
  },
  {
    id: "applied",
    title: "Applied",
    items: [
      {
        id: "t-3",
        jobTitle: "Senior Software Engineer",
        company: "Google",
        appliedAt: "2026-06-10",
        matchScore: 94,
        notes: "Referred by alumni network",
      },
      {
        id: "t-4",
        jobTitle: "Full Stack Developer",
        company: "Microsoft",
        appliedAt: "2026-06-09",
        matchScore: 91,
      },
      {
        id: "t-5",
        jobTitle: "Platform Engineer",
        company: "Atlassian",
        appliedAt: "2026-06-07",
        matchScore: 91,
      },
    ],
  },
  {
    id: "reviewing",
    title: "Reviewing",
    items: [
      {
        id: "t-6",
        jobTitle: "Frontend Engineer",
        company: "Flipkart",
        appliedAt: "2026-06-05",
        matchScore: 89,
      },
      {
        id: "t-7",
        jobTitle: "Backend Engineer",
        company: "Razorpay",
        appliedAt: "2026-06-04",
        matchScore: 88,
      },
    ],
  },
  {
    id: "interviewing",
    title: "Interview",
    items: [
      {
        id: "t-8",
        jobTitle: "Golang Developer",
        company: "Uber",
        appliedAt: "2026-06-01",
        matchScore: 90,
        notes: "Technical round on Jun 14",
      },
      {
        id: "t-9",
        jobTitle: "Tech Lead",
        company: "Meesho",
        appliedAt: "2026-05-28",
        matchScore: 93,
      },
    ],
  },
  {
    id: "offered",
    title: "Offer",
    items: [
      {
        id: "t-10",
        jobTitle: "SRE Engineer",
        company: "PhonePe",
        appliedAt: "2026-05-20",
        matchScore: 88,
        notes: "₹38L CTC — reviewing offer",
      },
    ],
  },
  {
    id: "rejected",
    title: "Rejected",
    items: [
      {
        id: "t-11",
        jobTitle: "Junior Software Engineer",
        company: "CRED",
        appliedAt: "2026-05-15",
        matchScore: 80,
      },
    ],
  },
]
