import type { PortalInfo } from "@/types"

export const JOB_PORTALS: PortalInfo[] = [
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/jobs", color: "#0A66C2" },
  { id: "naukri", name: "Naukri", url: "https://naukri.com", color: "#4A90D9" },
  { id: "indeed", name: "Indeed", url: "https://indeed.co.in", color: "#2164F3" },
  { id: "glassdoor", name: "Glassdoor", url: "https://glassdoor.co.in", color: "#0CAA41" },
  { id: "instahyre", name: "Instahyre", url: "https://instahyre.com", color: "#6C5CE7" },
  { id: "cutshort", name: "Cutshort", url: "https://cutshort.io", color: "#FF6B35" },
  { id: "wellfound", name: "Wellfound", url: "https://wellfound.com", color: "#000000" },
  { id: "foundit", name: "Foundit", url: "https://foundit.in", color: "#6E3FF3" },
  { id: "hirect", name: "Hirect", url: "https://hirect.in", color: "#E63946" },
]

export const PORTAL_MAP = Object.fromEntries(
  JOB_PORTALS.map((p) => [p.id, p])
) as Record<string, PortalInfo>
