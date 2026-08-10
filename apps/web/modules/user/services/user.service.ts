import { ApiError } from "@/modules/auth/services/auth.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface CurrentUser {
   id: string
   name: string
   email: string
}

export async function getCurrentUser(): Promise<CurrentUser> {
   const response = await fetch(`${API_URL}/user/profile`, {
      credentials: "include",
   })

   const data = await response.json()

   if (!response.ok) {
      throw new ApiError(
         data?.error?.message ?? "No autenticado.",
         data?.error?.code
      )
   }

   return data.user
}
