"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"
import { CompleteEmployeeProfile } from "@/modules/employee/components/complete-employee-profile"
import { Loader } from "@/components/loader"

export function AuthGuard({ children }: { children: React.ReactNode }) {
   const router = useRouter()
   const { data: user, isLoading, isError } = useCurrentUser()
   const { data: employee, isLoading: isLoadingEmployee } = useEmployeeByUser(user?.id)

   useEffect(() => {
      if (isError) {
         router.replace("/auth/login")
      }
   }, [isError, router])

   if (isLoading || isError || !user || isLoadingEmployee) {
      return (
         <div className="flex min-h-svh w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   if (!employee) {
      return <CompleteEmployeeProfile userId={user.id} />
   }

   return children
}
