import {
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Kanban,
  Radar,
} from "lucide-react"
import { ActionCard } from "@/components/cards"
import { InfoCard } from "@/components/cards"
import { JOB_PORTALS } from "@/lib/constants/portals"

const modules = [
  {
    title: "Jobs Hub",
    description: `Browse 50+ roles from ${JOB_PORTALS.length} portals + live APIs.`,
    href: "/jobs",
    icon: Briefcase,
    cta: "Explore Jobs",
  },
  {
    title: "Application Tracker",
    description: "Kanban pipeline from saved to offer — one view for all applications.",
    href: "/tracker",
    icon: Kanban,
    cta: "Open Tracker",
  },
  {
    title: "Career Analytics",
    description: "Funnel metrics, portal performance, and monthly application trends.",
    href: "/analytics",
    icon: BarChart3,
    cta: "View Analytics",
  },
  {
    title: "Job Alerts",
    description: "Real-time updates from LinkedIn, Naukri, Indeed, and more.",
    href: "/alerts",
    icon: Bell,
    cta: "See Alerts",
  },
  {
    title: "Learning Material",
    description: "Courses and interview prep to close skill gaps.",
    href: "/learning",
    icon: GraduationCap,
    cta: "Start Learning",
  },
  {
    title: "ATS & JD Tools",
    description: "PDF upload, ATS scan, JD match, and auto-apply.",
    href: "/ai-tools",
    icon: Bot,
    cta: "Open AI Tools",
  },
  {
    title: "Salary Insights",
    description: "Compensation benchmarks to negotiate better offers.",
    href: "/salary",
    icon: IndianRupee,
    cta: "View Salaries",
  },
  {
    title: "Mock Interviews",
    description: "AI practice sessions with instant feedback.",
    href: "/interviews",
    icon: GraduationCap,
    cta: "Start Practice",
  },
]

export function PlatformHub() {
  return (
    <InfoCard
      title="Career Command Center"
      description="Your single platform for jobs, tracking, learning, analytics, and AI-powered career tools."
      icon={Radar}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((mod) => (
          <ActionCard key={mod.href} {...mod} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-4">
        <span className="text-xs text-muted-foreground">Job sources:</span>
        {JOB_PORTALS.map((p) => (
          <span
            key={p.id}
            className="rounded-full border px-2 py-0.5 text-xs"
            style={{ borderColor: `${p.color}40`, color: p.color }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </InfoCard>
  )
}
