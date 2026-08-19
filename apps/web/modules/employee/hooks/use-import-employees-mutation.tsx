"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FlatFileRow } from "@/lib/parse-flat-file"
import {
   createEmployee,
   createEmployeeWithUser,
   getEmployees,
   updateEmployeeWithUser,
   type Employee,
} from "@/modules/employee/services/employee.service"
import { getUnlinkedUsers } from "@/modules/user/services/user.service"
import { mapImportRowToPayload } from "@/modules/employee/utils/employee-import"

export interface ImportEmployeesResult {
   total: number
   created: number
   updated: number
   failed: number
   errors: { row: number; message: string }[]
}

function normalizeDocumentNumber(value: string): string {
   return value.trim().replace(/\D/g, "")
}

function normalizeEmail(value: string): string {
   return value.trim().toLowerCase()
}

function isDuplicateEmailError(error: unknown): boolean {
   return error instanceof Error && /correo/i.test(error.message)
}

export function useImportEmployeesMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (rows: FlatFileRow[]): Promise<ImportEmployeesResult> => {
         // Se pide la lista fresca al backend (en vez de la caché de react-query) para
         // evitar falsos "nuevo registro" por datos ligeramente desactualizados.
         const [existing, unlinkedUsers] = await Promise.all([getEmployees(), getUnlinkedUsers()])

         const byDocumentNumber = new Map<string, Employee>()
         const byEmail = new Map<string, Employee>()
         const indexEmployee = (employee: Employee) => {
            byDocumentNumber.set(normalizeDocumentNumber(employee.documentNumber), employee)
            if (employee.user?.email) {
               byEmail.set(normalizeEmail(employee.user.email), employee)
            }
         }
         existing.forEach(indexEmployee)

         const unlinkedUserByEmail = new Map(
            unlinkedUsers.map((user) => [normalizeEmail(user.email), user])
         )

         const errors: { row: number; message: string }[] = []
         let created = 0
         let updated = 0

         for (let i = 0; i < rows.length; i++) {
            const rowNumber = i + 2 // +1 por índice base 1, +1 por la fila de encabezado
            try {
               const payload = mapImportRowToPayload(rows[i]!)
               const normalizedEmail = normalizeEmail(payload.email)
               const match =
                  byDocumentNumber.get(normalizeDocumentNumber(payload.documentNumber)) ??
                  byEmail.get(normalizedEmail)

               if (match) {
                  // Empleado existente (por cédula o correo): se actualiza sin tocar la contraseña.
                  const { password: _password, ...updatePayload } = payload
                  const updatedEmployee = await updateEmployeeWithUser(match._id, updatePayload)
                  indexEmployee(updatedEmployee)
                  updated++
                  continue
               }

               const unlinkedUser = unlinkedUserByEmail.get(normalizedEmail)
               if (unlinkedUser) {
                  // Ya existe una cuenta de usuario con ese correo pero sin perfil de
                  // empleado (registro previo incompleto): se vincula en vez de crear otra cuenta.
                  const { password: _password, email: _email, ...profilePayload } = payload
                  const createdEmployee = await createEmployee({
                     ...profilePayload,
                     user: unlinkedUser.id,
                  })
                  unlinkedUserByEmail.delete(normalizedEmail)
                  indexEmployee(createdEmployee)
                  created++
                  continue
               }

               try {
                  const createdEmployee = await createEmployeeWithUser(payload)
                  indexEmployee(createdEmployee)
                  created++
               } catch (error) {
                  if (!isDuplicateEmailError(error)) throw error

                  // Último recurso: el correo ya está en uso por un empleado que no
                  // detectamos antes (datos que cambiaron entre nuestra foto inicial y
                  // este punto). Se refresca la lista y se reintenta como actualización.
                  const refreshed = await getEmployees()
                  refreshed.forEach(indexEmployee)
                  const lateMatch = byEmail.get(normalizedEmail)
                  if (!lateMatch) throw error

                  const { password: _password, ...updatePayload } = payload
                  const updatedEmployee = await updateEmployeeWithUser(lateMatch._id, updatePayload)
                  indexEmployee(updatedEmployee)
                  updated++
               }
            } catch (error) {
               errors.push({
                  row: rowNumber,
                  message: error instanceof Error ? error.message : "Error desconocido",
               })
            }
         }

         return { total: rows.length, created, updated, failed: errors.length, errors }
      },
      onSuccess: (result) => {
         if (result.created > 0 || result.updated > 0) {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            queryClient.invalidateQueries({ queryKey: ["users"] })
         }
      },
   })
}
