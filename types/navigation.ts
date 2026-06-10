import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}
