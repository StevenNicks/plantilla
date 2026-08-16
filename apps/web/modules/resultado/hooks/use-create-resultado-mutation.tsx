"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createResultado } from "@/modules/resultado/services/resultado.service"

export function useCreateResultadoMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: createResultado,
      onSuccess: () => {
         toast.success("Resultado registrado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["resultados"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
