"use client"

import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/modules/user/services/user.service"

export function useCurrentUser() {
   return useQuery({
      queryKey: ["user"],
      queryFn: getCurrentUser,
      retry: false,
   })
}
