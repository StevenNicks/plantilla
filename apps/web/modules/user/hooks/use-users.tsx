"use client"

import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/modules/user/services/user.service"

export function useUsers(params?: { unlinked?: boolean }) {
   return useQuery({
      queryKey: ["users", params ?? {}],
      queryFn: () => getUsers(params),
   })
}
