"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { EditResultadoDialog } from "@/modules/resultado/components/edit-resultado-dialog"
import { DeleteResultadoButton } from "@/modules/resultado/components/delete-resultado-button"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"

export function ResultadoList({ tamizajeId }: { tamizajeId: string }) {
   const { data: resultados, isLoading } = useResultados({ tamizaje: tamizajeId })

   return (
      <Card>
         <CardContent className="p-0">
            {isLoading ? (
               <div className="flex flex-col gap-3 p-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
               </div>
            ) : !resultados?.length ? (
               <p className="p-6 text-center text-sm text-muted-foreground">
                  Aún no hay resultados registrados para este tamizaje.
               </p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="border-b text-left text-muted-foreground">
                           <th className="p-3 font-medium">Empleado</th>
                           <th className="p-3 font-medium">Altura</th>
                           <th className="p-3 font-medium">Peso</th>
                           <th className="p-3 font-medium">Presión</th>
                           <th className="p-3 font-medium">Pulso</th>
                           <th className="p-3 font-medium">O2</th>
                           <th className="p-3 font-medium">Glucosa</th>
                           <th className="p-3 font-medium">Temp.</th>
                           <th className="p-3 font-medium">
                              <span className="sr-only">Acciones</span>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {resultados.map((resultado) => (
                           <tr key={resultado._id} className="border-b last:border-0">
                              <td className="p-3 font-medium">
                                 {getEmployeeFullName(resultado.employee)}
                              </td>
                              <td className="p-3 text-muted-foreground">{resultado.height} cm</td>
                              <td className="p-3 text-muted-foreground">{resultado.weight} kg</td>
                              <td className="p-3 text-muted-foreground">
                                 {resultado.systolic}/{resultado.diastolic}
                              </td>
                              <td className="p-3 text-muted-foreground">{resultado.pulse} lpm</td>
                              <td className="p-3 text-muted-foreground">
                                 {resultado.oxygenSaturation}%
                              </td>
                              <td className="p-3 text-muted-foreground">{resultado.glucose} mg/dL</td>
                              <td className="p-3 text-muted-foreground">
                                 {resultado.temperature}°C
                              </td>
                              <td className="p-3">
                                 <div className="flex items-center justify-end gap-2">
                                    <EditResultadoDialog id={resultado._id} />
                                    <DeleteResultadoButton
                                       id={resultado._id}
                                       name={getEmployeeFullName(resultado.employee)}
                                    />
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
   )
}
