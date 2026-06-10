import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/cards"
import type { SalaryInsight } from "@/lib/mock-data/salary"

type SalaryTableProps = {
  data: SalaryInsight[]
}

export function SalaryTable({ data }: SalaryTableProps) {
  return (
    <InfoCard title="Salary Benchmarks" description="Compensation data by role and company (₹ Lakhs per annum)">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Role</th>
              <th className="pb-3 pr-4 font-medium">Company</th>
              <th className="pb-3 pr-4 font-medium">Location</th>
              <th className="pb-3 pr-4 font-medium">Range (LPA)</th>
              <th className="pb-3 pr-4 font-medium">Median</th>
              <th className="pb-3 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const TrendIcon =
                row.trend === "up" ? TrendingUp : row.trend === "down" ? TrendingDown : Minus
              return (
                <tr key={row.id} className="border-b border-border/30">
                  <td className="py-3 pr-4 font-medium">{row.role}</td>
                  <td className="py-3 pr-4">{row.company}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.location}</td>
                  <td className="py-3 pr-4">
                    ₹{row.minLakhs} – ₹{row.maxLakhs}L
                  </td>
                  <td className="py-3 pr-4 font-medium">₹{row.medianLakhs}L</td>
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className={
                        row.trend === "up"
                          ? "text-emerald-400"
                          : row.trend === "down"
                            ? "text-red-400"
                            : ""
                      }
                    >
                      <TrendIcon className="size-3" />
                      {row.trendPercent}%
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </InfoCard>
  )
}
