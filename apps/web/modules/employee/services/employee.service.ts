import { ApiError } from "@/modules/auth/services/auth.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const DOCUMENT_TYPES = ["CC", "CE", "TI", "PA", "RC"] as const
export type DocumentType = (typeof DOCUMENT_TYPES)[number]

export interface EmployeeUser {
   id: string
   name: string
   email: string
}

export interface Employee {
   _id: string
   documentType: DocumentType
   documentNumber: string
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
   birthDate: string
   user: EmployeeUser
   createdAt: string
   updatedAt: string
}

export interface EmployeePayload {
   documentType: DocumentType
   documentNumber: string
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
   birthDate: string
   user: string
}

async function employeeRequest<T>(path: string, init?: RequestInit): Promise<T> {
   const response = await fetch(`${API_URL}/employees${path}`, {
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

export async function getEmployees(): Promise<Employee[]> {
   const data = await employeeRequest<{ employees: Employee[] }>("")
   return data.employees
}

export async function getEmployeeById(id: string): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>(`/${id}`)
   return data.employee
}

export async function createEmployee(payload: EmployeePayload): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>("", {
      method: "POST",
      body: JSON.stringify(payload),
   })
   return data.employee
}

export async function updateEmployee(id: string, payload: EmployeePayload): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
   })
   return data.employee
}

export async function deleteEmployee(id: string): Promise<{ message: string }> {
   return employeeRequest(`/${id}`, { method: "DELETE" })
}
