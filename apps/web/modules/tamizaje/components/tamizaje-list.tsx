"use client"

import Link from "next/link"
import { ClipboardListIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useTamizajes } from "@/modules/tamizaje/hooks/use-tamizajes"
import { CreateTamizajeDialog } from "@/modules/tamizaje/components/create-tamizaje-dialog"
import { EditTamizajeDialog } from "@/modules/tamizaje/components/edit-tamizaje-dialog"
import { DeleteTamizajeButton } from "@/modules/tamizaje/components/delete-tamizaje-button"
import { TamizajeStatusBadge } from "@/modules/tamizaje/components/tamizaje-status-badge"

export function TamizajeList() {
   const { data: tamizajes, isLoading } = useTamizajes()

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-end">
            <CreateTamizajeDialog />
         </div>

         <Card>
            <CardContent className="p-0">
               {isLoading ? (
                  <div className="flex flex-col gap-3 p-4">
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                  </div>
               ) : !tamizajes?.length ? (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                     No hay tamizajes registrados.
                  </p>
               ) : (
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                        <thead>
                           <tr className="border-b text-left text-muted-foreground">
                              <th className="p-3 font-medium">Nombre</th>
                              <th className="p-3 font-medium">Código</th>
                              <th className="p-3 font-medium">Estado</th>
                              <th className="p-3 font-medium">
                                 <span className="sr-only">Acciones</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {tamizajes.map((tamizaje) => (
                              <tr key={tamizaje._id} className="border-b last:border-0">
                                 <td className="p-3 font-medium">{tamizaje.name}</td>
                                 <td className="p-3 text-muted-foreground">{tamizaje.code}</td>
                                 <td className="p-3">
                                    <TamizajeStatusBadge status={tamizaje.status} />
                                 </td>
                                 <td className="p-3">
                                    <div className="flex items-center justify-end gap-2">
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          nativeButton={false}
                                          render={<Link href={`/tamizajes/${tamizaje._id}/resultados`} />}
                                       >
                                          <ClipboardListIcon />
                                          Realizar tamizaje
                                       </Button>
                                       <EditTamizajeDialog id={tamizaje._id} />
                                       <DeleteTamizajeButton id={tamizaje._id} name={tamizaje.name} />
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   )
}
