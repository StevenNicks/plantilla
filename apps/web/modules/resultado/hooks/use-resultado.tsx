"use client"

import { useQuery } from "@tanstack/react-query"
import { getResultadoById } from "@/modules/resultado/services/resultado.service"

export function useResultado(id: string) {
   return useQuery({
      queryKey: ["resultados", id],
      queryFn: () => getResultadoById(id),
      enabled: Boolean(id),
   })
}
