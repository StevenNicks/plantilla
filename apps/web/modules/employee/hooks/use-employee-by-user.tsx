"use client"

import { useQuery } from "@tanstack/react-query"
import { getEmployeeByUserId } from "@/modules/employee/services/employee.service"

export function useEmployeeByUser(userId: string | undefined) {
   return useQuery({
      queryKey: ["employees", "by-user", userId],
      queryFn: () => getEmployeeByUserId(userId as string),
      enabled: Boolean(userId),
   })
}
