"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { register } from "@/modules/auth/services/auth.service"

export function useSignupMutation() {
   const router = useRouter()

   return useMutation({
      mutationFn: register,
      onSuccess: (data) => {
         toast.success(data.message)
         router.push("/dashboard")
      },
      onError: (error: Error) => {
         toast.error(error.message)
      },
   })
}
