"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchemaTypes } from "@/modules/auth/schemas/login.schema"

export function useLoginForm() {
   const form = useForm<LoginSchemaTypes>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   return { form }
}
