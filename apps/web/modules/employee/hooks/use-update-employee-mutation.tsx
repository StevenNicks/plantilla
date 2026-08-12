"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
   EmployeePayload,
   updateEmployee,
} from "@/modules/employee/services/employee.service"

export function useUpdateEmployeeMutation(id: string) {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (payload: EmployeePayload) => updateEmployee(id, payload),
      onSuccess: () => {
         toast.success("Empleado actualizado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["employees"] })
         router.push("/employees")
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
