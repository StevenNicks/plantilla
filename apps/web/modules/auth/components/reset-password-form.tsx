"use client"

import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Field, FieldDescription, FieldError, FieldGroup } from "@workspace/ui/components/field"
import { PasswordStrengthInput } from "@/modules/auth/components/password-strength-input"
import { ConfirmPasswordInput } from "@/modules/auth/components/confirm-password-input"
import { useResetPasswordForm } from "@/modules/auth/hooks/use-reset-password-form"
import { useResetPasswordMutation } from "@/modules/auth/hooks/use-reset-password-mutation"

export function ResetPasswordForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const [token, setToken] = useState<string | null>(null)
   const [isReady, setIsReady] = useState(false)

   useEffect(() => {
      setToken(new URLSearchParams(window.location.search).get("token"))
      setIsReady(true)
   }, [])

   const { form } = useResetPasswordForm()
   const password = form.watch("password")
   const resetPasswordMutation = useResetPasswordMutation()

   if (!isReady) {
      return null
   }

   if (!token) {
      return (
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
               <CardContent className="flex flex-col items-start gap-2 p-8 text-start">
                  <h1 className="text-2xl font-bold">Enlace inválido</h1>
                  <p className="text-balance text-muted-foreground">
                     Este enlace de recuperación no es válido. Solicita uno nuevo desde la
                     pantalla de inicio de sesión.
                  </p>
                  <Button className="mt-2" nativeButton={false} render={<a href="/auth/login" />}>
                     Volver a iniciar sesión
                  </Button>
               </CardContent>
            </Card>
         </div>
      )
   }

   const onSubmit = form.handleSubmit(({ password }) =>
      resetPasswordMutation.mutate({ token, password })
   )

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardContent className="p-6 md:p-8">
               <form onSubmit={onSubmit}>
                  <FieldGroup>
                     <div className="flex flex-col items-start gap-2 text-start">
                        <h1 className="text-2xl font-bold">Restablece tu contraseña</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                           Ingresa tu nueva contraseña.
                        </p>
                     </div>
                     <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <PasswordStrengthInput
                                 id="password"
                                 label="Nueva contraseña"
                                 value={field.value}
                                 onValueChange={field.onChange}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                           </Field>
                        )}
                     />
                     <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <ConfirmPasswordInput
                                 id="confirm-password"
                                 label="Confirmar contraseña"
                                 password={password}
                                 value={field.value}
                                 onValueChange={field.onChange}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                           </Field>
                        )}
                     />
                     <Field>
                        <Button type="submit" disabled={resetPasswordMutation.isPending}>
                           {resetPasswordMutation.isPending
                              ? "Guardando..."
                              : "Restablecer contraseña"}
                        </Button>
                     </Field>
                     <FieldDescription className="text-center">
                        <a href="/auth/login">Volver a iniciar sesión</a>
                     </FieldDescription>
                  </FieldGroup>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
