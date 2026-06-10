import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { KpiMetric } from "@/types"

type StatCardProps = {
  metric: KpiMetric
  className?: string
}

export function StatCard({ metric, className }: StatCardProps) {
  const TrendIcon =
    metric.trend === "up"
      ? ArrowUpRight
      : metric.trend === "down"
        ? ArrowDownRight
        : Minus

  return (
    <Card className={cn("bg-card/50", className)}>
      <CardHeader className="pb-2">
        <CardDescription>{metric.label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {metric.value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            metric.trend === "up" && "text-emerald-400",
            metric.trend === "down" && "text-red-400",
            metric.trend === "neutral" && "text-muted-foreground"
          )}
        >
          <TrendIcon className="size-3.5" />
          <span>
            {metric.change > 0 ? "+" : ""}
            {metric.change}%
          </span>
          <span className="font-normal text-muted-foreground">
            {metric.changeLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
