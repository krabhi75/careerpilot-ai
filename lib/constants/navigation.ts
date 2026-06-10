import {
  Bot,
  Briefcase,
  Calendar,
  FileText,
  GraduationCap,
  Kanban,
  LayoutDashboard,
  Library,
  Settings,
  Users,
} from "lucide-react"
import type { NavGroup } from "@/types"

export const JOB_COUNT = 24

export const mainNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Jobs", href: "/jobs", icon: Briefcase, badge: String(JOB_COUNT) },
      { title: "Tracker", href: "/tracker", icon: Kanban },
      { title: "Applications", href: "/applications", icon: FileText, badge: "8" },
    ],
  },
  {
    label: "Career",
    items: [
      { title: "Recruiters", href: "/recruiters", icon: Users },
      {
        title: "Learning Material",
        href: "/learning",
        icon: GraduationCap,
      },
      { title: "Interviews", href: "/interviews", icon: Calendar, badge: "3" },
      { title: "Resources", href: "/resources", icon: Library },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "AI Tools", href: "/ai-tools", icon: Bot },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export const flatNavigation = mainNavigation.flatMap((group) => group.items)
