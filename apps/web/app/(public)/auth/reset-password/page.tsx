import type { Metadata } from "next"
import { ResetPasswordForm } from "@/modules/auth/components/reset-password-form"
import { GridBackground } from "@/modules/auth/components/grid-background"

export const metadata: Metadata = {
   title: "Restablecer contraseña",
}

export default function ResetPasswordPage() {
   return (
      <GridBackground>
         <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
               <ResetPasswordForm />
            </div>
         </div>
      </GridBackground>
   )
}
