"use client"

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
import { SignupPasswordFields } from "@/modules/auth/components/signup-password-fields"
import { useSignupForm } from "@/modules/auth/hooks/use-signup-form"
import { useSignupMutation } from "@/modules/auth/hooks/use-signup-mutation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form } = useSignupForm()
  const signupMutation = useSignupMutation()
  const onSubmit = form.handleSubmit(({ confirmPassword, ...payload }) =>
    signupMutation.mutate(payload)
  )

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-start gap-2 text-start">
                <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Ingresa tu correo electrónico para crear tu cuenta
                </p>
              </div>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Tu nombre"
                      autoFocus
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
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
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <SignupPasswordFields control={form.control} />
              </Field>
              <Field>
                <Button type="submit" disabled={signupMutation.isPending}>
                  {signupMutation.isPending ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                ¿Ya tienes una cuenta? <a href="/auth/login">Inicia sesión</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.png"
              alt="Imagen"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
