import { BookOpen, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { LearningMaterial } from "@/types"

const levelStyles: Record<LearningMaterial["level"], string> = {
  beginner: "bg-emerald-500/15 text-emerald-400",
  intermediate: "bg-amber-500/15 text-amber-400",
  advanced: "bg-red-500/15 text-red-400",
}

type LearningCardProps = {
  material: LearningMaterial
}

export function LearningCard({ material }: LearningCardProps) {
  return (
    <Card className="flex h-full flex-col bg-card/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="text-xs">
            {material.category}
          </Badge>
          <Badge className={levelStyles[material.level]} variant="secondary">
            {material.level}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-base">{material.title}</CardTitle>
        <CardDescription>{material.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {material.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            Updated {material.updatedAt}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{material.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-sidebar-primary transition-all"
              style={{ width: `${material.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30">
        <Button size="sm" variant={material.progress === 100 ? "outline" : "default"}>
          {material.progress === 100 ? "Review" : material.progress > 0 ? "Continue" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}
