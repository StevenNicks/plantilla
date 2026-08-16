import * as z from "zod"
import {
   BLOOD_TYPES,
   DOCUMENT_TYPES,
   EMPLOYEE_STATUSES,
   GENDERS,
} from "@/modules/employee/services/employee.service"

export const employeeBaseSchema = z.object({
   documentType: z.enum(DOCUMENT_TYPES, "Selecciona un tipo de documento."),
   documentNumber: z.string().min(1, "El número de documento es obligatorio."),
   firstName: z.string().min(1, "El primer nombre es obligatorio."),
   middleName: z.string().optional(),
   lastName: z.string().min(1, "El primer apellido es obligatorio."),
   secondLastName: z.string().optional(),
   birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria."),
   gender: z.enum(GENDERS, "Selecciona un género."),
   bloodType: z.enum(BLOOD_TYPES).optional(),
   status: z.enum(EMPLOYEE_STATUSES),
})

export type EmployeeBaseSchemaTypes = z.infer<typeof employeeBaseSchema>

export const employeeSchema = employeeBaseSchema.extend({
   user: z.string().min(1, "Selecciona un usuario."),
})

export type EmployeeSchemaTypes = z.infer<typeof employeeSchema>

export const employeeWithUserSchema = employeeBaseSchema.extend({
   email: z.email("Ingresa un correo electrónico válido."),
})

export type EmployeeWithUserSchemaTypes = z.infer<typeof employeeWithUserSchema>
