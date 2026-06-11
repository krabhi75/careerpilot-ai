export type SalaryInsight = {
  id: string
  role: string
  company: string
  location: string
  minLakhs: number
  maxLakhs: number
  medianLakhs: number
  experience: string
  trend: "up" | "down" | "stable"
  trendPercent: number
}

export const mockSalaryInsights: SalaryInsight[] = [
  { id: "s1", role: "Senior Product Manager", company: "Google", location: "Bangalore", minLakhs: 40, maxLakhs: 65, medianLakhs: 50, experience: "6-10 yrs", trend: "up", trendPercent: 12 },
  { id: "s2", role: "Product Manager", company: "Microsoft", location: "Hyderabad", minLakhs: 32, maxLakhs: 52, medianLakhs: 40, experience: "4-7 yrs", trend: "up", trendPercent: 8 },
  { id: "s3", role: "Associate Product Manager", company: "Flipkart", location: "Bangalore", minLakhs: 18, maxLakhs: 28, medianLakhs: 22, experience: "0-2 yrs", trend: "up", trendPercent: 10 },
  { id: "s4", role: "Group Product Manager", company: "Razorpay", location: "Bangalore", minLakhs: 50, maxLakhs: 80, medianLakhs: 62, experience: "10-14 yrs", trend: "up", trendPercent: 15 },
  { id: "s5", role: "Technical Product Manager", company: "Stripe", location: "Remote", minLakhs: 70, maxLakhs: 120, medianLakhs: 90, experience: "5-8 yrs", trend: "stable", trendPercent: 5 },
  { id: "s6", role: "Lead Product Manager", company: "Swiggy", location: "Bangalore", minLakhs: 38, maxLakhs: 58, medianLakhs: 46, experience: "7-10 yrs", trend: "up", trendPercent: 9 },
  { id: "s7", role: "Director of Product", company: "Uber", location: "Hyderabad", minLakhs: 55, maxLakhs: 90, medianLakhs: 70, experience: "12-16 yrs", trend: "up", trendPercent: 11 },
  { id: "s8", role: "Product Owner", company: "Infosys", location: "Pune", minLakhs: 16, maxLakhs: 26, medianLakhs: 20, experience: "3-6 yrs", trend: "stable", trendPercent: 3 },
  { id: "s9", role: "Program Manager", company: "Wipro", location: "Bangalore", minLakhs: 20, maxLakhs: 32, medianLakhs: 25, experience: "5-8 yrs", trend: "stable", trendPercent: 2 },
  { id: "s10", role: "VP Product", company: "Ola", location: "Bangalore", minLakhs: 70, maxLakhs: 120, medianLakhs: 90, experience: "15+ yrs", trend: "up", trendPercent: 14 },
]

export function getSalaryForRole(role: string): SalaryInsight[] {
  const lower = role.toLowerCase()
  return mockSalaryInsights.filter(
    (s) => s.role.toLowerCase().includes(lower) || lower.includes(s.role.toLowerCase().split(" ")[0])
  )
}
