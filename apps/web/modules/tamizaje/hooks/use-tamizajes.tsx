"use client"

import { useQuery } from "@tanstack/react-query"
import { getTamizajes } from "@/modules/tamizaje/services/tamizaje.service"

export function useTamizajes() {
   return useQuery({
      queryKey: ["tamizajes"],
      queryFn: getTamizajes,
   })
}
