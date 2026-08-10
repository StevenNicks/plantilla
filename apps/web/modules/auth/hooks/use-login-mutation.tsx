"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login, ApiError } from "@/modules/auth/services/auth.service"

export function useLoginMutation() {
   const router = useRouter()

   return useMutation({
      mutationFn: login,
      onSuccess: (data) => {
         toast.success(data.message)
         router.push("/dashboard")
      },
      onError: (error: Error) => {
         if (error instanceof ApiError && error.code === "USER_NOT_FOUND") {
            toast.error("El usuario no existe", {
               description: "¿Deseas crear una cuenta?",
               action: {
                  label: "Registrar",
                  onClick: () => router.push("/auth/signup"),
               },
            })
            return
         }

         toast.error(error.message)
      },
   })
}
