import { GraduationCap } from "lucide-react"
import { LearningCard } from "@/components/learning/learning-card"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { APP_USER } from "@/lib/constants/user"
import { mockLearningMaterials } from "@/lib/mock-data"

export const revalidate = 86400

const categories = [...new Set(mockLearningMaterials.map((m) => m.category))]

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Material"
        description={`Courses and resources to help ${APP_USER.name} upskill and ace interviews.`}
      >
        <Badge variant="outline" className="gap-1.5">
          <GraduationCap className="size-3.5" />
          {mockLearningMaterials.length} courses
        </Badge>
      </PageHeader>

      {categories.map((category) => {
        const materials = mockLearningMaterials.filter(
          (m) => m.category === category
        )
        return (
          <section key={category} className="space-y-4">
            <h2 className="text-lg font-semibold">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {materials.map((material) => (
                <LearningCard key={material.id} material={material} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
