"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteEmployee } from "@/modules/employee/services/employee.service"

export interface DeleteEmployeesResult {
   total: number
   deleted: number
   failed: number
   errors: { id: string; message: string }[]
}

export function useDeleteEmployeesMutation() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (ids: string[]): Promise<DeleteEmployeesResult> => {
         const errors: { id: string; message: string }[] = []
         let deleted = 0

         for (const id of ids) {
            try {
               await deleteEmployee(id)
               deleted++
            } catch (error) {
               errors.push({
                  id,
                  message: error instanceof Error ? error.message : "Error desconocido",
               })
            }
         }

         return { total: ids.length, deleted, failed: errors.length, errors }
      },
      onSuccess: (result) => {
         if (result.deleted > 0) {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
         }

         if (result.failed > 0) {
            toast.error(
               `Eliminación parcial: ${result.deleted} de ${result.total} registros eliminados`,
               {
                  description: `${result.failed} registro(s) no se pudieron eliminar.`,
                  duration: 10000,
                  position: "top-right",
               }
            )
            console.warn("Errores de eliminación:", result.errors)
            return
         }

         toast.success(
            `${result.deleted} ${result.deleted === 1 ? "registro eliminado" : "registros eliminados"} correctamente.`,
            { position: "top-right" }
         )
      },
      onError: (error: Error) => {
         toast.error(error.message, { position: "top-right" })
      },
   })
}
