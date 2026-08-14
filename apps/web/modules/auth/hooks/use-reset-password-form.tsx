"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   resetPasswordSchema,
   ResetPasswordSchemaTypes,
} from "@/modules/auth/schemas/reset-password.schema"

export function useResetPasswordForm() {
   const form = useForm<ResetPasswordSchemaTypes>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      },
   })

   return { form }
}
