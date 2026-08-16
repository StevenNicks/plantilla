"use client"

import { useQuery } from "@tanstack/react-query"
import { getTamizajeById } from "@/modules/tamizaje/services/tamizaje.service"

export function useTamizaje(id: string) {
   return useQuery({
      queryKey: ["tamizajes", id],
      queryFn: () => getTamizajeById(id),
      enabled: Boolean(id),
   })
}
