import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { hasSupabaseEnv } from "@/lib/env"

export async function GET() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({
      emailEnabled: true,
      whatsappEnabled: false,
      email: "abhishek@careerpilot.ai",
      whatsapp: "",
      alertTypes: ["new_job", "status_update", "match", "deadline"],
    })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { data } = await supabase
    .from("notification_preferences")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return NextResponse.json(data ?? {
    email_enabled: true,
    whatsapp_enabled: false,
    alert_types: ["new_job", "status_update", "match", "deadline"],
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { emailEnabled, whatsappEnabled, email, whatsapp, alertTypes } = body

  if (!hasSupabaseEnv()) {
    return NextResponse.json({
      success: true,
      message: "Preferences saved locally (connect Supabase for cloud sync)",
      prefs: body,
    })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({
      success: true,
      message: "Preferences saved locally",
      prefs: body,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).from("notification_preferences").upsert({
    user_id: user.id,
    email_enabled: emailEnabled,
    whatsapp_enabled: whatsappEnabled,
    email_address: email,
    whatsapp_number: whatsapp,
    alert_types: alertTypes,
    updated_at: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, message: "Notification preferences saved" })
}
