"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { DataTable } from "@/components/datatable/data-table"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { buildResultadoColumns } from "@/modules/resultado/components/resultado-columns"

export function ResultadoList({
   tamizajeId,
   canManage,
}: {
   tamizajeId: string
   canManage: boolean
}) {
   const { data: resultados, isLoading, refetch } = useResultados({ tamizaje: tamizajeId })
   const columns = useMemo(() => buildResultadoColumns({ canManage }), [canManage])

   return (
      <Card className="min-w-0">
         <CardContent className="min-w-0 p-4">
            {isLoading ? (
               <div className="flex flex-col gap-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
               </div>
            ) : (
               <DataTable columns={columns} data={resultados ?? []} onRefresh={refetch} />
            )}
         </CardContent>
      </Card>
   )
}
