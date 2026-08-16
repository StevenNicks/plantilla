"use client"

import { useEffect, useState } from "react"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"

function getGreeting(): string {
   const hour = new Date().getHours()
   if (hour < 12) return "Buenos días"
   if (hour < 18) return "Buenas tardes"
   return "Buenas noches"
}

function getFormattedDate(): string {
   return new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   })
}

export function DashboardGreeting() {
   const { data: user } = useCurrentUser()
   const { data: employee } = useEmployeeByUser(user?.id)
   const [greeting, setGreeting] = useState("")
   const [date, setDate] = useState("")

   useEffect(() => {
      setGreeting(getGreeting())
      setDate(getFormattedDate())
   }, [])

   const displayName = employee ? getEmployeeFullName(employee) : user?.email

   return (
      <div className="flex flex-col items-start gap-2 py-2">
         <h1 className="text-2xl font-bold text-pretty lg:text-4xl">
            {greeting}, <span className="text-primary">{displayName}</span>
         </h1>
         <p className="text-muted-foreground text-sm capitalize md:text-base">
            {date}
         </p>
      </div>
   )
}
