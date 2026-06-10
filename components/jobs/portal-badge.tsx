import { Badge } from "@/components/ui/badge"
import { PORTAL_MAP } from "@/lib/constants/portals"
import type { JobPortal } from "@/types"

type PortalBadgeProps = {
  portal: JobPortal
  className?: string
}

export function PortalBadge({ portal, className }: PortalBadgeProps) {
  const info = PORTAL_MAP[portal]
  if (!info) return null

  return (
    <Badge
      variant="outline"
      className={className}
      style={{ borderColor: `${info.color}40`, color: info.color }}
    >
      {info.name}
    </Badge>
  )
}
