import type { TrackerColumn } from "@/types"

export const mockTrackerColumns: TrackerColumn[] = [
  {
    id: "saved",
    title: "Saved",
    items: [
      {
        id: "t-1",
        jobTitle: "Staff Product Manager",
        company: "Netflix",
        appliedAt: "2026-06-09",
        matchScore: 95,
      },
      {
        id: "t-2",
        jobTitle: "Director of Product",
        company: "Uber",
        appliedAt: "2026-06-08",
        matchScore: 95,
      },
    ],
  },
  {
    id: "applied",
    title: "Applied",
    items: [
      {
        id: "t-3",
        jobTitle: "Senior Product Manager",
        company: "Google",
        appliedAt: "2026-06-10",
        matchScore: 96,
        notes: "Referred by PM network",
      },
      {
        id: "t-4",
        jobTitle: "Product Manager",
        company: "Microsoft",
        appliedAt: "2026-06-09",
        matchScore: 93,
      },
      {
        id: "t-5",
        jobTitle: "Technical Product Manager",
        company: "Stripe",
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
        jobTitle: "Lead Product Manager",
        company: "Swiggy",
        appliedAt: "2026-06-05",
        matchScore: 92,
      },
      {
        id: "t-7",
        jobTitle: "Group Product Manager",
        company: "Razorpay",
        appliedAt: "2026-06-04",
        matchScore: 94,
      },
    ],
  },
  {
    id: "interviewing",
    title: "Interview",
    items: [
      {
        id: "t-8",
        jobTitle: "Senior Product Manager — Marketplace",
        company: "Meesho",
        appliedAt: "2026-06-01",
        matchScore: 94,
        notes: "Case study round on Jun 14",
      },
      {
        id: "t-9",
        jobTitle: "Product Manager — AI/ML",
        company: "Amazon",
        appliedAt: "2026-05-28",
        matchScore: 89,
      },
    ],
  },
  {
    id: "offered",
    title: "Offer",
    items: [
      {
        id: "t-10",
        jobTitle: "Product Manager — Payments",
        company: "PhonePe",
        appliedAt: "2026-05-20",
        matchScore: 91,
        notes: "₹42L CTC — reviewing offer",
      },
    ],
  },
  {
    id: "rejected",
    title: "Rejected",
    items: [
      {
        id: "t-11",
        jobTitle: "Associate Product Manager",
        company: "Flipkart",
        appliedAt: "2026-05-15",
        matchScore: 90,
      },
    ],
  },
]
