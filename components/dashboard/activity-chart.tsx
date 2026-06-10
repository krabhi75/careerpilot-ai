"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { InfoCard } from "@/components/cards"
import type { ActivityPoint } from "@/types"

type ActivityChartProps = {
  data: ActivityPoint[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <InfoCard
      title="Weekly Activity"
      description="Applications and interviews over the past 7 days"
      className="h-full"
    >
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.488 0.243 264.376)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.488 0.243 264.376)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="interviewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.708 0 0)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.708 0 0)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.205 0 0)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: "8px",
                color: "oklch(0.985 0 0)",
              }}
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="oklch(0.488 0.243 264.376)"
              fill="url(#applicationsGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="interviews"
              stroke="oklch(0.708 0 0)"
              fill="url(#interviewsGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </InfoCard>
  )
}
