import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type InfoCardProps = {
  title: string
  description?: string
  icon?: LucideIcon
  children?: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function InfoCard({
  title,
  description,
  icon: Icon,
  children,
  className,
  action,
}: InfoCardProps) {
  return (
    <Card className={cn("bg-card/50", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}
