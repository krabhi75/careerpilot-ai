"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { InfoCard } from "@/components/cards"
import { PORTAL_MAP } from "@/lib/constants/portals"
import type { PortalAnalytics } from "@/types"

type PortalChartProps = {
  data: PortalAnalytics[]
}

export function PortalChart({ data }: PortalChartProps) {
  const chartData = data.map((d) => ({
    name: PORTAL_MAP[d.portal]?.name ?? d.portal,
    applications: d.applications,
    responses: d.responses,
    interviews: d.interviews,
  }))

  return (
    <InfoCard
      title="Portal Performance"
      description="Applications, responses, and interviews by job portal"
      className="h-full"
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
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
            <Bar dataKey="applications" fill="oklch(0.488 0.243 264.376)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="responses" fill="oklch(0.708 0 0)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="interviews" fill="oklch(0.556 0 0)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </InfoCard>
  )
}
