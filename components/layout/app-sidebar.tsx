"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNavigation } from "@/lib/constants/navigation"
import { mockUser } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type AppSidebarProps = {
  onNavigate?: () => void
  className?: string
}

export function AppSidebar({ onNavigate, className }: AppSidebarProps) {
  const pathname = usePathname()
  const initials = mockUser.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Rocket className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">CareerPilot</p>
          <p className="text-xs text-sidebar-foreground/60">AI Job Platform</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {mainNavigation.map((group) => (
            <div key={group.label ?? group.items[0]?.href} className="space-y-1">
              {group.label && (
                <p className="px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))
                  const Icon = item.icon

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="h-5 min-w-5 justify-center bg-sidebar-primary/20 px-1.5 text-[10px] text-sidebar-primary"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />
      <div className="flex items-center gap-3 p-4">
        <Avatar size="sm">
          <AvatarFallback className="bg-sidebar-primary/20 text-sidebar-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{mockUser.name}</p>
          <p className="truncate text-xs text-sidebar-foreground/60">
            {mockUser.title}
          </p>
        </div>
      </div>
    </aside>
  )
}
