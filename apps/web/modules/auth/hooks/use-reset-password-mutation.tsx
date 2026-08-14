"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { resetPassword } from "@/modules/auth/services/auth.service"

export function useResetPasswordMutation() {
   const router = useRouter()

   return useMutation({
      mutationFn: resetPassword,
      onSuccess: (data) => {
         toast.success(data.message)
         router.push("/auth/login")
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
