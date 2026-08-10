"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logout } from "@/modules/auth/services/auth.service"

export function useLogoutMutation() {
   const router = useRouter()
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: logout,
      onSuccess: (data) => {
         queryClient.removeQueries({ queryKey: ["user"] })
         toast.success(data.message)
         router.push("/auth/login")
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
