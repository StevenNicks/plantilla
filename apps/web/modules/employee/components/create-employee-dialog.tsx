"use client"

import { useId, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import { PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { PasswordStrengthInput } from "@/modules/auth/components/password-strength-input"
import { ConfirmPasswordInput } from "@/modules/auth/components/confirm-password-input"
import { EmployeeFields } from "@/modules/employee/components/employee-fields"
import { useEmployeeWithUserForm } from "@/modules/employee/hooks/use-employee-with-user-form"
import { useCreateEmployeeWithUserMutation } from "@/modules/employee/hooks/use-create-employee-with-user-mutation"

export function CreateEmployeeDialog() {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { form } = useEmployeeWithUserForm()
   const password = useWatch({ control: form.control, name: "password" })
   const createEmployeeMutation = useCreateEmployeeWithUserMutation()

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen)
            if (!nextOpen) form.reset()
         }}
      >
         <form
            id={formId}
            onSubmit={form.handleSubmit(({ confirmPassword, ...values }) =>
               createEmployeeMutation.mutate(values, {
                  onSuccess: () => {
                     setOpen(false)
                     form.reset()
                  },
               })
            )}
         >
            <DialogTrigger render={<Button />}>
               <PlusIcon />
               Nuevo empleado
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Nuevo empleado</DialogTitle>
               <DialogDescription>
                  Completa la información para registrar un nuevo empleado. Se creará también
                  su cuenta de acceso.
               </DialogDescription>
            </DialogHeader>
            <FieldGroup>
               <EmployeeFields control={form.control} />

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

               <div className="grid gap-4 sm:grid-cols-2">
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
               </div>
            </FieldGroup>
            <DialogFooter>
               <DialogClose render={<Button variant="outline" type="button" />}>
                  Cancelar
               </DialogClose>
               <Button type="submit" form={formId} disabled={createEmployeeMutation.isPending}>
                  {createEmployeeMutation.isPending ? "Creando..." : "Crear empleado"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
