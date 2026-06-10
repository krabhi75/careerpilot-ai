import { createClient } from "@supabase/supabase-js"
import { getSupabaseSecretEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Server-only admin client (bypasses RLS).
 * Use for trusted backend operations — never expose to the browser.
 */
export function createAdminClient() {
  const { url, secretKey } = getSupabaseSecretEnv()

  return createClient<Database>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
