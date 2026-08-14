"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { MailCheckIcon } from "lucide-react"
import { forgotPassword } from "@/modules/auth/services/auth.service"

export function ForgotPasswordDialog() {
   const [open, setOpen] = useState(false)
   const [email, setEmail] = useState("")

   const forgotPasswordMutation = useMutation({
      mutationFn: forgotPassword,
      onError: (error: Error) => toast.error(error.message),
   })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      forgotPasswordMutation.mutate({ email })
   }

   const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) {
         forgotPasswordMutation.reset()
         setEmail("")
      }
   }

   return (
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
         <AlertDialogTrigger
            tabIndex={-1}
            className="text-sm underline-offset-2 hover:underline"
         >
            ¿Olvidaste tu contraseña?
         </AlertDialogTrigger>
         <AlertDialogContent>
            {forgotPasswordMutation.isSuccess ? (
               <>
                  <AlertDialogHeader>
                     <AlertDialogMedia>
                        <MailCheckIcon className="text-green-600 dark:text-green-400" />
                     </AlertDialogMedia>
                     <AlertDialogTitle>Revisa tu correo</AlertDialogTitle>
                     <AlertDialogDescription>
                        Si existe una cuenta con{" "}
                        <span className="font-medium text-foreground">{email}</span>,
                        te enviamos un enlace para restablecer tu contraseña.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cerrar</AlertDialogCancel>
                  </AlertDialogFooter>
               </>
            ) : (
               <form onSubmit={handleSubmit}>
                  <AlertDialogHeader>
                     <AlertDialogTitle>¿Olvidaste tu contraseña?</AlertDialogTitle>
                     <AlertDialogDescription>
                        Ingresa tu correo y te enviaremos un enlace para restablecerla.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Field className="mt-4 mb-5">
                     <FieldLabel htmlFor="forgot-password-email">
                        Correo electrónico
                     </FieldLabel>
                     <Input
                        id="forgot-password-email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                     />
                  </Field>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cancelar</AlertDialogCancel>
                     <AlertDialogAction type="submit" disabled={forgotPasswordMutation.isPending}>
                        {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar enlace"}
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </form>
            )}
         </AlertDialogContent>
      </AlertDialog>
   )
}
