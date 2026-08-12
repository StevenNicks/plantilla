"use client"

import { useQuery } from "@tanstack/react-query"
import { getEmployeeById } from "@/modules/employee/services/employee.service"

export function useEmployee(id: string) {
   return useQuery({
      queryKey: ["employees", id],
      queryFn: () => getEmployeeById(id),
      enabled: Boolean(id),
   })
}
