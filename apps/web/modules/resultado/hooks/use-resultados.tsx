"use client"

import { useQuery } from "@tanstack/react-query"
import { getResultados } from "@/modules/resultado/services/resultado.service"

export function useResultados(params?: { tamizaje?: string; employee?: string }) {
   return useQuery({
      queryKey: ["resultados", params ?? {}],
      queryFn: () => getResultados(params),
   })
}
