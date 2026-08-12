"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createEmployee } from "@/modules/employee/services/employee.service"

export function useCreateEmployeeMutation() {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: createEmployee,
      onSuccess: () => {
         toast.success("Empleado creado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["employees"] })
         router.push("/employees")
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
