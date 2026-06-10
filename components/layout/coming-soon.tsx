import type { LucideIcon } from "lucide-react"
import { InfoCard } from "@/components/cards"
import { PageHeader } from "@/components/layout/page-header"

type ComingSoonProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <InfoCard title="Coming soon" description="This section is part of the UI foundation and will be built in the next phase.">
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-sidebar-primary/15 text-sidebar-primary">
            <Icon className="size-7" />
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Mock data and navigation are wired. Feature content for {title.toLowerCase()} will be added incrementally.
          </p>
        </div>
      </InfoCard>
    </div>
  )
}
