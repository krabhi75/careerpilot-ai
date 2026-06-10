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
  { id: "s1", role: "Senior Software Engineer", company: "Google", location: "Bangalore", minLakhs: 35, maxLakhs: 55, medianLakhs: 42, experience: "5-8 yrs", trend: "up", trendPercent: 8 },
  { id: "s2", role: "Full Stack Developer", company: "Microsoft", location: "Hyderabad", minLakhs: 28, maxLakhs: 45, medianLakhs: 34, experience: "3-6 yrs", trend: "up", trendPercent: 5 },
  { id: "s3", role: "Frontend Engineer", company: "Flipkart", location: "Bangalore", minLakhs: 22, maxLakhs: 38, medianLakhs: 28, experience: "3-5 yrs", trend: "stable", trendPercent: 2 },
  { id: "s4", role: "Backend Engineer", company: "Razorpay", location: "Bangalore", minLakhs: 25, maxLakhs: 42, medianLakhs: 32, experience: "4-7 yrs", trend: "up", trendPercent: 12 },
  { id: "s5", role: "DevOps Engineer", company: "Amazon", location: "Hyderabad", minLakhs: 20, maxLakhs: 38, medianLakhs: 27, experience: "3-6 yrs", trend: "up", trendPercent: 6 },
  { id: "s6", role: "Tech Lead", company: "Meesho", location: "Bangalore", minLakhs: 40, maxLakhs: 65, medianLakhs: 50, experience: "8-12 yrs", trend: "up", trendPercent: 15 },
  { id: "s7", role: "AI/ML Engineer", company: "OpenAI", location: "Remote", minLakhs: 80, maxLakhs: 150, medianLakhs: 110, experience: "4-8 yrs", trend: "up", trendPercent: 20 },
  { id: "s8", role: "Product Engineer", company: "Stripe", location: "Remote", minLakhs: 70, maxLakhs: 120, medianLakhs: 90, experience: "5-8 yrs", trend: "stable", trendPercent: 3 },
  { id: "s9", role: "Junior Developer", company: "TCS", location: "Pune", minLakhs: 4, maxLakhs: 8, medianLakhs: 6, experience: "0-2 yrs", trend: "stable", trendPercent: 1 },
  { id: "s10", role: "SRE Engineer", company: "PhonePe", location: "Bangalore", minLakhs: 26, maxLakhs: 44, medianLakhs: 33, experience: "4-7 yrs", trend: "up", trendPercent: 10 },
]

export function getSalaryForRole(role: string): SalaryInsight[] {
  const lower = role.toLowerCase()
  return mockSalaryInsights.filter(
    (s) => s.role.toLowerCase().includes(lower) || lower.includes(s.role.toLowerCase().split(" ")[0])
  )
}
