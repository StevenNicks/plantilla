"use client"

import { useId, useState } from "react"
import { Controller } from "react-hook-form"
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
import { EmployeeFields } from "@/modules/employee/components/employee-fields"
import { useEmployeeWithUserForm } from "@/modules/employee/hooks/use-employee-with-user-form"
import { useCreateEmployeeWithUserMutation } from "@/modules/employee/hooks/use-create-employee-with-user-mutation"

export function CreateEmployeeDialog() {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { form } = useEmployeeWithUserForm()
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
            onSubmit={form.handleSubmit((values) =>
               createEmployeeMutation.mutate(
                  { ...values, password: values.documentNumber },
                  {
                     onSuccess: () => {
                        setOpen(false)
                        form.reset()
                     },
                  }
               )
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
                  su cuenta de acceso, usando el número de documento como contraseña inicial.
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
