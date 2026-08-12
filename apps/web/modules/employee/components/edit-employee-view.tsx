"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { EmployeeForm } from "@/modules/employee/components/employee-form"
import { useEmployeeForm } from "@/modules/employee/hooks/use-employee-form"
import { useEmployee } from "@/modules/employee/hooks/use-employee"
import { useUpdateEmployeeMutation } from "@/modules/employee/hooks/use-update-employee-mutation"

export function EditEmployeeView({ id }: { id: string }) {
   const { data: employee, isLoading } = useEmployee(id)
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

   if (isLoading || !employee) {
      return (
         <Card className="w-full max-w-2xl">
            <CardContent className="flex flex-col gap-4 p-6">
               <Skeleton className="h-8 w-full" />
               <Skeleton className="h-8 w-full" />
               <Skeleton className="h-8 w-full" />
            </CardContent>
         </Card>
      )
   }

   return (
      <EmployeeForm
         form={form}
         isSubmitting={updateEmployeeMutation.isPending}
         submitLabel="Guardar cambios"
         onSubmit={(values) => updateEmployeeMutation.mutate(values)}
      />
   )
}
