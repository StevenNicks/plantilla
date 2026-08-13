"use client"

import { useEffect, useId, useState } from "react"
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
import { Skeleton } from "@workspace/ui/components/skeleton"
import { EmployeeForm } from "@/modules/employee/components/employee-form"
import { useEmployeeForm } from "@/modules/employee/hooks/use-employee-form"
import { useEmployee } from "@/modules/employee/hooks/use-employee"
import { useUpdateEmployeeMutation } from "@/modules/employee/hooks/use-update-employee-mutation"

export function EditEmployeeDialog({ id }: { id: string }) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { data: employee, isLoading } = useEmployee(open ? id : "")
   const { form } = useEmployeeForm()
   const updateEmployeeMutation = useUpdateEmployeeMutation(id)

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
         user: employee.user?.id ?? "",
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
               <DialogDescription>Actualiza la información del empleado.</DialogDescription>
            </DialogHeader>
            {isFormReady ? (
               <EmployeeForm form={form} currentUser={employee?.user} />
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
