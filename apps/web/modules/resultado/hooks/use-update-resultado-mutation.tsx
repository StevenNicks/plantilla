"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
   ResultadoVitals,
   updateResultado,
} from "@/modules/resultado/services/resultado.service"

export function useUpdateResultadoMutation(id: string) {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (payload: ResultadoVitals) => updateResultado(id, payload),
      onSuccess: () => {
         toast.success("Resultado actualizado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["resultados"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
