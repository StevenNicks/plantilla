"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { DataTable } from "@/components/datatable/data-table"
import { useTamizajes } from "@/modules/tamizaje/hooks/use-tamizajes"
import { useDeleteTamizajesMutation } from "@/modules/tamizaje/hooks/use-delete-tamizajes-mutation"
import { CreateTamizajeDialog } from "@/modules/tamizaje/components/create-tamizaje-dialog"
import { buildTamizajeColumns } from "@/modules/tamizaje/components/tamizaje-columns"
import type { Tamizaje } from "@/modules/tamizaje/services/tamizaje.service"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { useEmployees } from "@/modules/employee/hooks/use-employees"

export function TamizajeList() {
   const { data: tamizajes, isLoading, refetch } = useTamizajes()
   const deleteTamizajesMutation = useDeleteTamizajesMutation()
   const { data: resultados } = useResultados()
   const { data: employees } = useEmployees()

   const handleDelete = async (rows: Tamizaje[]) => {
      await deleteTamizajesMutation.mutateAsync(rows.map((r) => r._id))
   }

   const resultadosCountByTamizaje = useMemo(() => {
      const counts = new Map<string, number>()
      for (const resultado of resultados ?? []) {
         const id = resultado.tamizaje._id
         counts.set(id, (counts.get(id) ?? 0) + 1)
      }
      return counts
   }, [resultados])

   const activeEmployeesCount = useMemo(
      () => employees?.filter((e) => e.status === "active").length ?? 0,
      [employees]
   )

   const columns = useMemo(
      () => buildTamizajeColumns({ resultadosCountByTamizaje, activeEmployeesCount }),
      [resultadosCountByTamizaje, activeEmployeesCount]
   )

   return (
      <div className="flex min-w-0 flex-col gap-4">
         <div className="flex items-center justify-end">
            <CreateTamizajeDialog />
         </div>

         <Card className="min-w-0">
            <CardContent className="min-w-0 p-4">
               {isLoading ? (
                  <div className="flex flex-col gap-3">
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                  </div>
               ) : (
                  <DataTable
                     columns={columns}
                     data={tamizajes ?? []}
                     onRefresh={refetch}
                     onDeleteRows={handleDelete}
                  />
               )}
            </CardContent>
         </Card>
      </div>
   )
}
