import {
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  Calendar,
  FileText,
  GraduationCap,
  IndianRupee,
  Kanban,
  LayoutDashboard,
  Library,
  Settings,
  Users,
} from "lucide-react"
import type { NavGroup } from "@/types"

export const JOB_COUNT = "50+"

export const mainNavigation: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Jobs Hub", href: "/jobs", icon: Briefcase, badge: JOB_COUNT },
      { title: "Tracker", href: "/tracker", icon: Kanban },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
      { title: "Job Alerts", href: "/alerts", icon: Bell, badge: "3" },
      { title: "Applications", href: "/applications", icon: FileText, badge: "8" },
    ],
  },
  {
    label: "Grow",
    items: [
      { title: "Learning Material", href: "/learning", icon: GraduationCap },
      { title: "Interviews", href: "/interviews", icon: Calendar, badge: "AI" },
      { title: "Salary Insights", href: "/salary", icon: IndianRupee },
      { title: "Recruiters", href: "/recruiters", icon: Users },
      { title: "Resources", href: "/resources", icon: Library },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "ATS & JD Tools", href: "/ai-tools", icon: Bot },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export const flatNavigation = mainNavigation.flatMap((group) => group.items)
