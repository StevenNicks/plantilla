"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createTamizaje } from "@/modules/tamizaje/services/tamizaje.service"

export function useCreateTamizajeMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: createTamizaje,
      onSuccess: () => {
         toast.success("Tamizaje creado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["tamizajes"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
