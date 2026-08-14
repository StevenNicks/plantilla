"use client"

import { useEffect, useId, useState } from "react"
import { Controller } from "react-hook-form"
import { PencilIcon } from "lucide-react"
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
import { Skeleton } from "@workspace/ui/components/skeleton"
import { EmployeeFields } from "@/modules/employee/components/employee-fields"
import { useEmployeeWithUserForm } from "@/modules/employee/hooks/use-employee-with-user-form"
import { useEmployee } from "@/modules/employee/hooks/use-employee"
import { useUpdateEmployeeWithUserMutation } from "@/modules/employee/hooks/use-update-employee-with-user-mutation"

export function EditEmployeeDialog({ id }: { id: string }) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { data: employee, isLoading } = useEmployee(open ? id : "")
   const { form } = useEmployeeWithUserForm()
   const updateEmployeeMutation = useUpdateEmployeeWithUserMutation(id)

   useEffect(() => {
      if (!employee) return

      form.reset({
         documentType: employee.documentType,
         documentNumber: employee.documentNumber,
         firstName: employee.firstName,
         middleName: employee.middleName ?? "",
         lastName: employee.lastName,
         secondLastName: employee.secondLastName ?? "",
         birthDate: employee.birthDate.slice(0, 10),
         email: employee.user?.email ?? "",
      })
   }, [employee, form])

   const isFormReady = !isLoading && Boolean(employee)

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <form
            id={formId}
            onSubmit={form.handleSubmit((values) =>
               updateEmployeeMutation.mutate(values, {
                  onSuccess: () => setOpen(false),
               })
            )}
         >
            <DialogTrigger
               render={<Button variant="outline" size="icon-sm" aria-label="Editar empleado" />}
            >
               <PencilIcon />
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Editar empleado</DialogTitle>
               <DialogDescription>
                  Actualiza la información del empleado y de su cuenta de acceso.
               </DialogDescription>
            </DialogHeader>
            {isFormReady ? (
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
            ) : (
               <div className="flex flex-col gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
               </div>
            )}
            <DialogFooter>
               <DialogClose render={<Button variant="outline" type="button" />}>
                  Cancelar
               </DialogClose>
               <Button
                  type="submit"
                  form={formId}
                  disabled={updateEmployeeMutation.isPending || !isFormReady}
               >
                  {updateEmployeeMutation.isPending ? "Guardando..." : "Guardar cambios"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
