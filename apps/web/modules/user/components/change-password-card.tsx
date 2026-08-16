"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { MailIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { forgotPassword } from "@/modules/auth/services/auth.service"

export function ChangePasswordCard({ email }: { email: string }) {
   const sendResetLinkMutation = useMutation({
      mutationFn: () => forgotPassword({ email }),
      onSuccess: () => toast.success(`Te enviamos un enlace a ${email} para cambiar tu contraseña.`),
      onError: (error: Error) => toast.error(error.message),
   })

   return (
      <Card className="w-full max-w-2xl">
         <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>Gestiona la contraseña de tu cuenta.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex items-center justify-between gap-4">
               <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Contraseña</span>
                  <span className="text-muted-foreground text-sm">
                     Te enviaremos un enlace a tu correo para cambiarla.
                  </span>
               </div>
               <Button
                  type="button"
                  variant="outline"
                  disabled={sendResetLinkMutation.isPending}
                  onClick={() => sendResetLinkMutation.mutate()}
               >
                  <MailIcon />
                  {sendResetLinkMutation.isPending ? "Enviando..." : "Cambiar contraseña"}
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}
