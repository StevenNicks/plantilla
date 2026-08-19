"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { Loader } from "@/components/loader"

export function GuestGuard({ children }: { children: React.ReactNode }) {
   const router = useRouter()
   const { data: user, isLoading, isSuccess } = useCurrentUser()

   useEffect(() => {
      if (isSuccess && user) {
         router.replace("/dashboard")
      }
   }, [isSuccess, user, router])

   if (isLoading || (isSuccess && user)) {
      return (
         <div className="flex min-h-svh w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return children
}
