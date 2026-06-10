import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TrackerColumn } from "@/types"

const columnColors: Record<string, string> = {
  saved: "border-t-zinc-500",
  applied: "border-t-blue-500",
  reviewing: "border-t-amber-500",
  interviewing: "border-t-violet-500",
  offered: "border-t-emerald-500",
  rejected: "border-t-red-500",
}

type TrackerBoardProps = {
  columns: TrackerColumn[]
}

export function TrackerBoard({ columns }: TrackerBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="w-72 shrink-0">
          <Card
            className={`border-t-2 bg-card/50 ${columnColors[column.id] ?? "border-t-muted"}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                {column.title}
                <Badge variant="secondary">{column.items.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {column.items.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  No items
                </p>
              ) : (
                column.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border/60 bg-muted/20 p-3"
                  >
                    <p className="text-sm font-medium">{item.jobTitle}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.matchScore}% match</span>
                      <span>{item.appliedAt}</span>
                    </div>
                    {item.notes && (
                      <p className="mt-2 text-xs text-muted-foreground/80">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
