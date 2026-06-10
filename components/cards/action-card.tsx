import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ActionCardProps = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  cta?: string
  className?: string
}

export function ActionCard({
  title,
  description,
  href,
  icon: Icon,
  cta = "Open",
  className,
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        "group bg-card/50 transition-colors hover:bg-card/80",
        className
      )}
    >
      <CardHeader>
        <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary/15 text-sidebar-primary">
          <Icon className="size-5" />
        </div>
        <CardTitle className="mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" size="sm" className="px-0" asChild>
          <Link href={href}>
            {cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
