import type { Metadata } from "next"
import { SignupForm } from "@/modules/auth/components/signup-form"
import { GridBackground } from "@/modules/auth/components/grid-background"

export const metadata: Metadata = {
  title: "Crear cuenta",
}

export default function SignupPage() {
  return (
    <GridBackground>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <SignupForm />
        </div>
      </div>
    </GridBackground>
  )
}
