import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"
import { signUp } from "@/lib/auth/actions"

export const metadata: Metadata = {
  title: "Sign up",
}

export default function SignUpPage() {
  return <AuthForm mode="signup" action={signUp} />
}
