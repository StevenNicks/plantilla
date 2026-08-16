import { ApiError } from "@/modules/auth/services/auth.service"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const DOCUMENT_TYPES = ["CC", "CE", "TI", "PA", "RC"] as const
export type DocumentType = (typeof DOCUMENT_TYPES)[number]

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
   CC: "Cédula de ciudadanía",
   CE: "Cédula de extranjería",
   TI: "Tarjeta de identidad",
   PA: "Pasaporte",
   RC: "Registro civil",
}

export const GENDERS = ["M", "F", "O"] as const
export type Gender = (typeof GENDERS)[number]

export const GENDER_LABELS: Record<Gender, string> = {
   M: "Masculino",
   F: "Femenino",
   O: "Otro",
}

const GENDER_AVATARS: Partial<Record<Gender, string>> = {
   M: "/avatar_male.png",
   F: "/avatar_famale.png",
}

export function getEmployeeAvatarSrc(gender: Gender): string | undefined {
   return GENDER_AVATARS[gender]
}

export const BLOOD_TYPES = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] as const
export type BloodType = (typeof BLOOD_TYPES)[number]

export const EMPLOYEE_STATUSES = ["active", "inactive"] as const
export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[number]

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
   active: "Activo",
   inactive: "Inactivo",
}

export interface EmployeeUser {
   id: string
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
   gender: Gender
   bloodType?: BloodType
   status: EmployeeStatus
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
   gender: Gender
   bloodType?: BloodType
   status?: EmployeeStatus
   user: string
}

export interface EmployeeWithUserPayload {
   documentType: DocumentType
   documentNumber: string
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
   birthDate: string
   gender: Gender
   bloodType?: BloodType
   status?: EmployeeStatus
   email: string
   password: string
}

export interface EmployeeUpdateWithUserPayload {
   documentType: DocumentType
   documentNumber: string
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
   birthDate: string
   gender: Gender
   bloodType?: BloodType
   status?: EmployeeStatus
   email: string
}

export function getEmployeeFullName(employee: {
   firstName: string
   middleName?: string
   lastName: string
   secondLastName?: string
}): string {
   return [employee.firstName, employee.middleName, employee.lastName, employee.secondLastName]
      .filter(Boolean)
      .join(" ")
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

export async function getEmployeeByUserId(userId: string): Promise<Employee | null> {
   const data = await employeeRequest<{ employee: Employee | null }>(`/by-user/${userId}`)
   return data.employee
}

export async function createEmployee(payload: EmployeePayload): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>("", {
      method: "POST",
      body: JSON.stringify(payload),
   })
   return data.employee
}

export async function createEmployeeWithUser(payload: EmployeeWithUserPayload): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>("/with-user", {
      method: "POST",
      body: JSON.stringify(payload),
   })
   return data.employee
}

export async function updateEmployeeWithUser(
   id: string,
   payload: EmployeeUpdateWithUserPayload
): Promise<Employee> {
   const data = await employeeRequest<{ employee: Employee }>(`/${id}/with-user`, {
      method: "PUT",
      body: JSON.stringify(payload),
   })
   return data.employee
}

export async function deleteEmployee(id: string): Promise<{ message: string }> {
   return employeeRequest(`/${id}`, { method: "DELETE" })
}
