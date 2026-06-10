"use client"

import { InfoCard } from "@/components/cards"
import type { CareerFunnel } from "@/types"

type FunnelChartProps = {
  data: CareerFunnel[]
}

export function FunnelChart({ data }: FunnelChartProps) {
  const max = Math.max(...data.map((d) => d.count))

  return (
    <InfoCard title="Application Funnel" description="Your job search pipeline conversion">
      <div className="space-y-3">
        {data.map((stage, index) => {
          const width = (stage.count / max) * 100
          return (
            <div key={stage.stage} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-muted-foreground">{stage.count}</span>
              </div>
              <div className="h-8 overflow-hidden rounded-lg bg-muted">
                <div
                  className="flex h-full items-center rounded-lg bg-sidebar-primary/80 px-3 text-xs font-medium text-white transition-all"
                  style={{ width: `${width}%`, opacity: 1 - index * 0.12 }}
                >
                  {width > 20 && `${Math.round((stage.count / data[0].count) * 100)}%`}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </InfoCard>
  )
}
