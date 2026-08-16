"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteTamizaje } from "@/modules/tamizaje/services/tamizaje.service"

export function useDeleteTamizajeMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: deleteTamizaje,
      onSuccess: () => {
         toast.success("Tamizaje eliminado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["tamizajes"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
