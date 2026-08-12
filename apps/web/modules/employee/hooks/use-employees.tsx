"use client"

import { useQuery } from "@tanstack/react-query"
import { getEmployees } from "@/modules/employee/services/employee.service"

export function useEmployees() {
   return useQuery({
      queryKey: ["employees"],
      queryFn: getEmployees,
   })
}
