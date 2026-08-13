"use client"

import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"

export function useCurrentEmployee() {
   const { data: user } = useCurrentUser()
   return useEmployeeByUser(user?.id)
}
