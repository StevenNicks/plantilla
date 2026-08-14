"use client"

import { Controller, useWatch, type Control } from "react-hook-form"
import { Field, FieldError } from "@workspace/ui/components/field"
import { PasswordStrengthInput } from "@/modules/auth/components/password-strength-input"
import { ConfirmPasswordInput } from "@/modules/auth/components/confirm-password-input"
import type { SignupSchemaTypes } from "@/modules/auth/schemas/signup.schema"

interface SignupPasswordFieldsProps {
   control: Control<SignupSchemaTypes>
}

export function SignupPasswordFields({ control }: SignupPasswordFieldsProps) {
   const password = useWatch({ control, name: "password" })

   return (
      <div className="flex flex-col gap-4">
         <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                  <PasswordStrengthInput
                     id="password"
                     label="Contraseña"
                     value={field.value}
                     onValueChange={field.onChange}
                     invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
         <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                  <ConfirmPasswordInput
                     id="confirm-password"
                     label="Confirmar contraseña"
                     password={password}
                     value={field.value}
                     onValueChange={field.onChange}
                     invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </div>
   )
}
