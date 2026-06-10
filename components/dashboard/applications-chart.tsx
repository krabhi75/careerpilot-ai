"use client"

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { InfoCard } from "@/components/cards"
import type { ChartDataPoint } from "@/types"

const COLORS = [
  "oklch(0.488 0.243 264.376)",
  "oklch(0.556 0 0)",
  "oklch(0.708 0 0)",
  "oklch(0.439 0 0)",
  "oklch(0.371 0 0)",
]

type ApplicationsChartProps = {
  data: ChartDataPoint[]
}

export function ApplicationsChart({ data }: ApplicationsChartProps) {
  return (
    <InfoCard
      title="Application Pipeline"
      description="Status breakdown of your active applications"
      className="h-full"
    >
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.205 0 0)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: "8px",
                color: "oklch(0.985 0 0)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="ml-auto font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
