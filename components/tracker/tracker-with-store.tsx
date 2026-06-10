"use client"

import { useMemo } from "react"
import { TrackerBoard } from "@/components/tracker/tracker-board"
import { useCareerStore } from "@/lib/store/career-store"
import type { TrackerColumn } from "@/types"

type TrackerWithStoreProps = {
  initialColumns: TrackerColumn[]
}

export function TrackerWithStore({ initialColumns }: TrackerWithStoreProps) {
  const storeTracker = useCareerStore((s) => s.tracker)

  const columns = useMemo(() => {
    const merged = [...initialColumns]

    for (const entry of storeTracker) {
      const col = merged.find((c) => c.id === entry.status)
      const item = {
        id: entry.id,
        jobTitle: entry.jobTitle,
        company: entry.company,
        appliedAt: entry.appliedAt,
        matchScore: entry.matchScore,
        notes: entry.notes,
      }
      if (col && !col.items.find((i) => i.id === entry.id)) {
        col.items.unshift(item)
      }
    }

    return merged
  }, [initialColumns, storeTracker])

  return <TrackerBoard columns={columns} />
}
