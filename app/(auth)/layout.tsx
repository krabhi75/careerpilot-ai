import Link from "next/link"
import { Rocket } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Link href="/dashboard" className="mb-8 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Rocket className="size-4" />
        </div>
        <span className="text-lg font-semibold">CareerPilot AI</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
