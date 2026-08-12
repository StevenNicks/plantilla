"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteEmployee } from "@/modules/employee/services/employee.service"

export function useDeleteEmployeeMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => {
         toast.success("Empleado eliminado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["employees"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
