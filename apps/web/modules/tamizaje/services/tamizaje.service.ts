import { ApiError } from "@/modules/auth/services/auth.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const TAMIZAJE_STATUSES = ["active", "inactive"] as const
export type TamizajeStatus = (typeof TAMIZAJE_STATUSES)[number]

export const TAMIZAJE_STATUS_LABELS: Record<TamizajeStatus, string> = {
   active: "Activo",
   inactive: "Inactivo",
}

export interface Tamizaje {
   _id: string
   name: string
   code: number
   status: TamizajeStatus
   createdAt: string
   updatedAt: string
}

export interface TamizajePayload {
   name: string
   status?: TamizajeStatus
}

async function tamizajeRequest<T>(path: string, init?: RequestInit): Promise<T> {
   const response = await fetch(`${API_URL}/tamizajes${path}`, {
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

export async function getTamizajes(): Promise<Tamizaje[]> {
   const data = await tamizajeRequest<{ tamizajes: Tamizaje[] }>("")
   return data.tamizajes
}

export async function getTamizajeById(id: string): Promise<Tamizaje> {
   const data = await tamizajeRequest<{ tamizaje: Tamizaje }>(`/${id}`)
   return data.tamizaje
}

export async function createTamizaje(payload: TamizajePayload): Promise<Tamizaje> {
   const data = await tamizajeRequest<{ tamizaje: Tamizaje }>("", {
      method: "POST",
      body: JSON.stringify(payload),
   })
   return data.tamizaje
}

export async function updateTamizaje(id: string, payload: TamizajePayload): Promise<Tamizaje> {
   const data = await tamizajeRequest<{ tamizaje: Tamizaje }>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
   })
   return data.tamizaje
}

export async function deleteTamizaje(id: string): Promise<{ message: string }> {
   return tamizajeRequest(`/${id}`, { method: "DELETE" })
}
