import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SkillProgress } from "@/types"

type ProgressCardProps = {
  title: string
  description?: string
  skills: SkillProgress[]
  className?: string
}

export function ProgressCard({
  title,
  description,
  skills,
  className,
}: ProgressCardProps) {
  return (
    <Card className={cn("bg-card/50", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{skill.skill}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-sidebar-primary transition-all"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
