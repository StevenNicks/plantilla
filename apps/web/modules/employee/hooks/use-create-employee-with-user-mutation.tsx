"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createEmployeeWithUser } from "@/modules/employee/services/employee.service"

export function useCreateEmployeeWithUserMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: createEmployeeWithUser,
      onSuccess: () => {
         toast.success("Empleado y usuario creados correctamente.")
         queryClient.invalidateQueries({ queryKey: ["employees"] })
         queryClient.invalidateQueries({ queryKey: ["users"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
