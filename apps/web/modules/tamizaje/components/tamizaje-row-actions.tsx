"use client"

import { memo } from "react"
import Link from "next/link"
import { ClipboardListIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Tamizaje } from "@/modules/tamizaje/services/tamizaje.service"
import { EditTamizajeDialog } from "@/modules/tamizaje/components/edit-tamizaje-dialog"
import { DeleteTamizajeButton } from "@/modules/tamizaje/components/delete-tamizaje-button"

export const TamizajeRealizarAction = memo(function TamizajeRealizarAction({
   tamizaje,
}: {
   tamizaje: Tamizaje
}) {
   return (
      <Button
         variant="outline"
         size="sm"
         nativeButton={false}
         render={<Link href={`/tamizajes/${tamizaje._id}/resultados`} />}
      >
         <ClipboardListIcon />
         Ver resultados
      </Button>
   )
})

export const TamizajeEditAction = memo(function TamizajeEditAction({
   tamizaje,
}: {
   tamizaje: Tamizaje
}) {
   return <EditTamizajeDialog id={tamizaje._id} />
})

export const TamizajeDeleteAction = memo(function TamizajeDeleteAction({
   tamizaje,
}: {
   tamizaje: Tamizaje
}) {
   return <DeleteTamizajeButton id={tamizaje._id} name={tamizaje.name} />
})
