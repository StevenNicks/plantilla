import { ApiError } from "@/modules/auth/services/auth.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface CurrentUser {
   id: string
   name: string
   email: string
}

async function userRequest<T>(path: string, init?: RequestInit): Promise<T> {
   const response = await fetch(`${API_URL}${path}`, {
      credentials: "include",
      headers: init?.body ? { "Content-Type": "application/json" } : undefined,
      ...init,
   })

   const data = await response.json()

   if (!response.ok) {
      throw new ApiError(
         data?.error?.message ?? "Ocurrió un error inesperado.",
         data?.error?.code
      )
   }

   return data
}

export async function getCurrentUser(): Promise<CurrentUser> {
   const data = await userRequest<{ user: CurrentUser }>("/user/profile")
   return data.user
}

export async function getUsers(): Promise<CurrentUser[]> {
   const data = await userRequest<{ users: CurrentUser[] }>("/user")
   return data.users
}
