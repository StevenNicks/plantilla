import * as z from "zod"
import { DOCUMENT_TYPES } from "@/modules/employee/services/employee.service"

export const employeeSchema = z.object({
   documentType: z.enum(DOCUMENT_TYPES, "Selecciona un tipo de documento."),
   documentNumber: z.string().min(1, "El número de documento es obligatorio."),
   firstName: z.string().min(1, "El primer nombre es obligatorio."),
   middleName: z.string().optional(),
   lastName: z.string().min(1, "El primer apellido es obligatorio."),
   secondLastName: z.string().optional(),
   birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria."),
   user: z.string().min(1, "Selecciona un usuario."),
})

export type EmployeeSchemaTypes = z.infer<typeof employeeSchema>
