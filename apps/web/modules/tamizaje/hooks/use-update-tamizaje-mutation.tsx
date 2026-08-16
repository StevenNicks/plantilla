"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
   TamizajePayload,
   updateTamizaje,
} from "@/modules/tamizaje/services/tamizaje.service"

export function useUpdateTamizajeMutation(id: string) {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (payload: TamizajePayload) => updateTamizaje(id, payload),
      onSuccess: () => {
         toast.success("Tamizaje actualizado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["tamizajes"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
