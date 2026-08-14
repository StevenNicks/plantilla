"use client"

import Image from "next/image"
import { Controller } from "react-hook-form"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
   Field,
   FieldDescription,
   FieldError,
   FieldGroup,
   FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { PasswordStrengthInput } from "@/modules/auth/components/password-strength-input"
import { ForgotPasswordDialog } from "@/modules/auth/components/forgot-password-dialog"
import { useLoginForm } from "@/modules/auth/hooks/use-login-form"
import { useLoginMutation } from "@/modules/auth/hooks/use-login-mutation"

export function LoginForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const { form } = useLoginForm();
   const loginMutation = useLoginMutation();
   const onSubmit = form.handleSubmit((data) => loginMutation.mutate(data));

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0 md:min-h-[525px]">
            <CardContent className="grid flex-1 p-0 md:grid-cols-2">
               <form
                  className="flex flex-col justify-center p-6 md:p-8"
                  onSubmit={onSubmit}
               >
                  <FieldGroup>
                     <div className="flex -translate-y-4 flex-col items-start gap-2 text-start">
                        <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                        <p className="text-balance text-muted-foreground">
                           Inicia sesión en tu cuenta de Acme Inc
                        </p>
                     </div>
                     <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 type="email"
                                 placeholder="m@example.com"
                                 autoFocus
                                 aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <PasswordStrengthInput
                                 id="password"
                                 label="Contraseña"
                                 value={field.value}
                                 onValueChange={field.onChange}
                                 forgotPasswordSlot={<ForgotPasswordDialog />}
                                 invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Field>
                        <Button type="submit" disabled={loginMutation.isPending}>
                           {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                        </Button>
                     </Field>

                     <FieldDescription className="text-center">
                        ¿No tienes una cuenta? <a href="/auth/signup">Regístrate</a>
                     </FieldDescription>
                  </FieldGroup>
               </form>
               <div className="relative hidden bg-muted md:block">
                  <Image
                     src="/placeholder.png"
                     alt="Imagen"
                     fill
                     priority
                     sizes="(min-width: 768px) 50vw, 0px"
                     className="object-cover"
                  />
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
