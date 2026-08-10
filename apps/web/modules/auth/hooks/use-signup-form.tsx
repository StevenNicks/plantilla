"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signupSchema, SignupSchemaTypes } from "@/modules/auth/schemas/signup.schema"

export function useSignupForm() {
   const form = useForm<SignupSchemaTypes>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   })

   return { form }
}
