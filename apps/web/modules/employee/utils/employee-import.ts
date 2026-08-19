import type { FlatFileRow } from "@/lib/parse-flat-file"
import { writeRowsToFile } from "@/lib/export-table"
import {
   BLOOD_TYPES,
   BloodType,
   DOCUMENT_TYPES,
   DOCUMENT_TYPE_LABELS,
   DocumentType,
   EMPLOYEE_STATUSES,
   EMPLOYEE_STATUS_LABELS,
   EmployeeStatus,
   EmployeeWithUserPayload,
   GENDERS,
   GENDER_LABELS,
   Gender,
} from "@/modules/employee/services/employee.service"

export const EMPLOYEE_IMPORT_COLUMNS = [
   "Tipo Documento",
   "Número Documento",
   "Primer Nombre",
   "Segundo Nombre",
   "Primer Apellido",
   "Segundo Apellido",
   "Fecha Nacimiento",
   "Género",
   "Tipo de Sangre",
   "Estado",
   "Correo",
] as const

const EMPLOYEE_IMPORT_SAMPLE_ROW = [
   "CC",
   "1000123456",
   "Juan",
   "Andrés",
   "Pérez",
   "Gómez",
   "1990-05-20",
   "M",
   "O+",
   "Activo",
   "juan.perez@ejemplo.com",
]

export async function downloadEmployeeImportTemplate(): Promise<void> {
   await writeRowsToFile(
      [...EMPLOYEE_IMPORT_COLUMNS],
      [EMPLOYEE_IMPORT_SAMPLE_ROW],
      "PLANTILLA_EMPLEADOS",
      "xlsx"
   )
}

function getField(row: FlatFileRow, ...keys: string[]): string {
   for (const key of keys) {
      const match = Object.keys(row).find((k) => k.toLowerCase().trim() === key.toLowerCase())
      if (match && row[match]) return row[match].trim()
   }
   return ""
}

function resolveEnum<T extends string>(
   value: string,
   validValues: readonly T[],
   labels: Record<T, string>
): T | undefined {
   const normalized = value.trim().toUpperCase()
   const byCode = validValues.find((v) => v.toUpperCase() === normalized)
   if (byCode) return byCode

   const byLabel = validValues.find(
      (v) => labels[v].toUpperCase() === value.trim().toUpperCase()
   )
   return byLabel
}

export function mapImportRowToPayload(row: FlatFileRow): EmployeeWithUserPayload {
   const documentTypeRaw = getField(row, "Tipo Documento", "Tipo de Documento")
   const documentNumber = getField(row, "Número Documento", "Numero Documento", "Documento")
   const firstName = getField(row, "Primer Nombre")
   const middleName = getField(row, "Segundo Nombre")
   const lastName = getField(row, "Primer Apellido")
   const secondLastName = getField(row, "Segundo Apellido")
   const birthDate = getField(row, "Fecha Nacimiento")
   const genderRaw = getField(row, "Género", "Genero")
   const bloodTypeRaw = getField(row, "Tipo de Sangre")
   const statusRaw = getField(row, "Estado")
   const email = getField(row, "Correo", "Email", "Correo Electrónico")

   const documentType = resolveEnum<DocumentType>(
      documentTypeRaw,
      DOCUMENT_TYPES,
      DOCUMENT_TYPE_LABELS
   )
   if (!documentType) {
      throw new Error(`Tipo de documento inválido: "${documentTypeRaw || "(vacío)"}"`)
   }
   if (!documentNumber) throw new Error("El número de documento es obligatorio.")
   if (!firstName) throw new Error("El primer nombre es obligatorio.")
   if (!lastName) throw new Error("El primer apellido es obligatorio.")
   if (!birthDate) throw new Error("La fecha de nacimiento es obligatoria.")

   const gender = resolveEnum<Gender>(genderRaw, GENDERS, GENDER_LABELS)
   if (!gender) {
      throw new Error(`Género inválido: "${genderRaw || "(vacío)"}"`)
   }

   if (!email) throw new Error("El correo electrónico es obligatorio.")

   let bloodType: BloodType | undefined
   if (bloodTypeRaw) {
      const normalizedBlood = bloodTypeRaw.trim().toUpperCase()
      bloodType = BLOOD_TYPES.find((b) => b === normalizedBlood)
      if (!bloodType) {
         throw new Error(`Tipo de sangre inválido: "${bloodTypeRaw}"`)
      }
   }

   const status: EmployeeStatus =
      resolveEnum<EmployeeStatus>(statusRaw, EMPLOYEE_STATUSES, EMPLOYEE_STATUS_LABELS) ?? "active"

   return {
      documentType,
      documentNumber,
      firstName,
      middleName: middleName || undefined,
      lastName,
      secondLastName: secondLastName || undefined,
      birthDate,
      gender,
      bloodType,
      status,
      // El modelo de usuario guarda el correo siempre en minúsculas; se normaliza aquí
      // para que una actualización no lo interprete como un cambio de correo y dispare
      // una validación de duplicado contra el propio registro.
      email: email.toLowerCase(),
      password: documentNumber,
   }
}
