"use client"

import { memo } from "react"
import { Resultado } from "@/modules/resultado/services/resultado.service"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"
import { EditResultadoDialog } from "@/modules/resultado/components/edit-resultado-dialog"
import { DeleteResultadoButton } from "@/modules/resultado/components/delete-resultado-button"
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@workspace/ui/components/tooltip"

export const ResultadoRowActions = memo(function ResultadoRowActions({
   resultado,
   canManage,
}: {
   resultado: Resultado
   canManage: boolean
}) {
   const actions = (
      <div className="flex items-center justify-center gap-2">
         <EditResultadoDialog id={resultado._id} disabled={!canManage} />
         <DeleteResultadoButton
            id={resultado._id}
            name={getEmployeeFullName(resultado.employee)}
            disabled={!canManage}
         />
      </div>
   )

   if (canManage) return actions

   return (
      <Tooltip>
         {/* Los botones deshabilitados tienen pointer-events-none, así que el trigger
             real del tooltip es este span envolvente. */}
         <TooltipTrigger render={<span className="inline-flex" />}>{actions}</TooltipTrigger>
         <TooltipContent>
            El tamizaje está inactivo, no se pueden editar ni eliminar resultados.
         </TooltipContent>
      </Tooltip>
   )
})
