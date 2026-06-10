import { ATSScanner } from "@/components/ai/ats-scanner"
import { JDImprover } from "@/components/ai/jd-improver"
import { ResumeUpload } from "@/components/ai/resume-upload"
import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { APP_USER } from "@/lib/constants/user"

export default function AiToolsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Career Tools"
        description={`ATS resume scanner and JD match improver — optimize every application for ${APP_USER.name}.`}
      />

      <ResumeUpload />

      <Tabs defaultValue="ats">
        <TabsList>
          <TabsTrigger value="ats">ATS Resume Scanner</TabsTrigger>
          <TabsTrigger value="jd">JD Match & Improve</TabsTrigger>
        </TabsList>
        <TabsContent value="ats" className="mt-6">
          <ATSScanner />
        </TabsContent>
        <TabsContent value="jd" className="mt-6">
          <JDImprover />
        </TabsContent>
      </Tabs>
    </div>
  )
}
