"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { Loader } from "@/components/loader"

export function AuthGuard({ children }: { children: React.ReactNode }) {
   const router = useRouter()
   const { data: user, isLoading, isError } = useCurrentUser()

   useEffect(() => {
      if (isError) {
         router.replace("/auth/login")
      }
   }, [isError, router])

   if (isLoading || isError || !user) {
      return (
         <div className="flex min-h-svh w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return children
}
