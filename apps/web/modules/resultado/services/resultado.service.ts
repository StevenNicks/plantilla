import { ApiError } from "@/modules/auth/services/auth.service"
import { DocumentType } from "@/modules/employee/services/employee.service"
import { TamizajeStatus } from "@/modules/tamizaje/services/tamizaje.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface ResultadoTamizajeRef {
   _id: string
   name: string
   code: number
   status: TamizajeStatus
}

export interface ResultadoEmployeeRef {
   _id: string
   documentType: DocumentType
   documentNumber: string
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
}

export interface Resultado {
   _id: string
   tamizaje: ResultadoTamizajeRef
   employee: ResultadoEmployeeRef
   height: number
   weight: number
   waistWidth: number
   systolic: number
   diastolic: number
   pulse: number
   oxygenSaturation: number
   glucose: number
   temperature: number
   createdAt: string
   updatedAt: string
}

export interface ResultadoVitals {
   height: number
   weight: number
   waistWidth: number
   systolic: number
   diastolic: number
   pulse: number
   oxygenSaturation: number
   glucose: number
   temperature: number
}

export interface ResultadoPayload extends ResultadoVitals {
   tamizaje: string
   employee: string
}

async function resultadoRequest<T>(path: string, init?: RequestInit): Promise<T> {
   const response = await fetch(`${API_URL}/resultados${path}`, {
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

export async function getResultados(params?: { tamizaje?: string; employee?: string }): Promise<Resultado[]> {
   const search = new URLSearchParams()
   if (params?.tamizaje) search.set("tamizaje", params.tamizaje)
   if (params?.employee) search.set("employee", params.employee)
   const query = search.toString() ? `?${search.toString()}` : ""

   const data = await resultadoRequest<{ resultados: Resultado[] }>(query)
   return data.resultados
}

export async function getResultadoById(id: string): Promise<Resultado> {
   const data = await resultadoRequest<{ resultado: Resultado }>(`/${id}`)
   return data.resultado
}

export async function createResultado(payload: ResultadoPayload): Promise<Resultado> {
   const data = await resultadoRequest<{ resultado: Resultado }>("", {
      method: "POST",
      body: JSON.stringify(payload),
   })
   return data.resultado
}

export async function updateResultado(id: string, payload: ResultadoVitals): Promise<Resultado> {
   const data = await resultadoRequest<{ resultado: Resultado }>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
   })
   return data.resultado
}

export async function deleteResultado(id: string): Promise<{ message: string }> {
   return resultadoRequest(`/${id}`, { method: "DELETE" })
}
