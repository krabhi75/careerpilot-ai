"use client"

import { Bell, Menu, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { flatNavigation } from "@/lib/constants/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/layout/user-menu"
import { APP_USER } from "@/lib/constants/user"

type AppTopbarProps = {
  onMenuClick?: () => void
}

export function AppTopbar({ onMenuClick }: AppTopbarProps) {
  const pathname = usePathname()
  const currentPage = flatNavigation.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
  )
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="hidden min-w-0 sm:block">
        <p className="text-sm font-medium">{currentPage?.title ?? "Dashboard"}</p>
        <p className="text-xs text-muted-foreground">
          Welcome back, {APP_USER.name}
        </p>
      </div>

      <div className="relative ml-auto flex max-w-md flex-1 items-center">
        <Search className="absolute left-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, resources..."
          className="h-9 bg-muted/40 pl-9"
        />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          <Badge className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full p-0 text-[10px]">
            3
          </Badge>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}
