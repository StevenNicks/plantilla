"use client"

import { EmployeeForm } from "@/modules/employee/components/employee-form"
import { useEmployeeForm } from "@/modules/employee/hooks/use-employee-form"
import { useCreateEmployeeMutation } from "@/modules/employee/hooks/use-create-employee-mutation"

export function CreateEmployeeView() {
   const { form } = useEmployeeForm()
   const createEmployeeMutation = useCreateEmployeeMutation()

   return (
      <EmployeeForm
         form={form}
         isSubmitting={createEmployeeMutation.isPending}
         submitLabel="Crear empleado"
         onSubmit={(values) => createEmployeeMutation.mutate(values)}
      />
   )
}
