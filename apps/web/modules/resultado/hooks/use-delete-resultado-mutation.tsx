"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteResultado } from "@/modules/resultado/services/resultado.service"

export function useDeleteResultadoMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: deleteResultado,
      onSuccess: () => {
         toast.success("Resultado eliminado correctamente.")
         queryClient.invalidateQueries({ queryKey: ["resultados"] })
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
