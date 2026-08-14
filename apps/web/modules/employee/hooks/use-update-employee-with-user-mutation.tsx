"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
   EmployeeUpdateWithUserPayload,
   updateEmployeeWithUser,
} from "@/modules/employee/services/employee.service"

export function useUpdateEmployeeWithUserMutation(id: string) {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (payload: EmployeeUpdateWithUserPayload) => updateEmployeeWithUser(id, payload),
      onSuccess: () => {
         toast.success("Empleado actualizado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["employees"] })
         queryClient.invalidateQueries({ queryKey: ["user"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
