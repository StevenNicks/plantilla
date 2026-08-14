const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface AuthResponse {
   status: string
   message: string
}

export class ApiError extends Error {
   code?: string

   constructor(message: string, code?: string) {
      super(message)
      this.name = "ApiError"
      this.code = code
   }
}

async function authRequest(path: string, body: unknown): Promise<AuthResponse> {
   const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
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

export interface LoginPayload {
   email: string
   password: string
}

export interface RegisterPayload {
   email: string
   password: string
}

export interface ForgotPasswordPayload {
   email: string
}

export interface ResetPasswordPayload {
   token: string
   password: string
}

export function login(payload: LoginPayload) {
   return authRequest("/auth/login", payload)
}

export function register(payload: RegisterPayload) {
   return authRequest("/auth/register", payload)
}

export function logout() {
   return authRequest("/auth/logout", {})
}

export function forgotPassword(payload: ForgotPasswordPayload) {
   return authRequest("/auth/forgot-password", payload)
}

export function resetPassword(payload: ResetPasswordPayload) {
   return authRequest("/auth/reset-password", payload)
}
