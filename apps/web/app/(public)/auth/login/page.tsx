import type { Metadata } from "next"
import { LoginForm } from "@/modules/auth/components/login-form"
import { GridBackground } from "@/modules/auth/components/grid-background"

export const metadata: Metadata = {
  title: "Iniciar sesión",
}

export default function LoginPage() {
  return (
    <GridBackground>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </GridBackground>
  )
}
