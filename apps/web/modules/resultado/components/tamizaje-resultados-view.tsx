"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useTamizaje } from "@/modules/tamizaje/hooks/use-tamizaje"
import { TamizajeStatusBadge } from "@/modules/tamizaje/components/tamizaje-status-badge"
import { CreateResultadoDialog } from "@/modules/resultado/components/create-resultado-dialog"
import { ResultadoList } from "@/modules/resultado/components/resultado-list"

export function TamizajeResultadosView({ tamizajeId }: { tamizajeId: string }) {
   const { data: tamizaje, isLoading } = useTamizaje(tamizajeId)

   return (
      <div className="flex flex-col gap-4">
         <Button
            variant="ghost"
            size="sm"
            className="w-fit"
            nativeButton={false}
            render={<Link href="/tamizajes" />}
         >
            <ArrowLeftIcon />
            Volver a tamizajes
         </Button>

         <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
               {isLoading ? (
                  <Skeleton className="h-7 w-48" />
               ) : (
                  <>
                     <h1 className="text-xl font-semibold">{tamizaje?.name}</h1>
                     {tamizaje && <TamizajeStatusBadge status={tamizaje.status} />}
                     {tamizaje && (
                        <span className="text-muted-foreground text-sm">#{tamizaje.code}</span>
                     )}
                  </>
               )}
            </div>
            <CreateResultadoDialog tamizajeId={tamizajeId} />
         </div>

         <ResultadoList tamizajeId={tamizajeId} />
      </div>
   )
}
