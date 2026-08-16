"use client"

import { TrashIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { useDeleteResultadoMutation } from "@/modules/resultado/hooks/use-delete-resultado-mutation"

export function DeleteResultadoButton({ id, name }: { id: string; name: string }) {
   const deleteResultadoMutation = useDeleteResultadoMutation()

   return (
      <AlertDialog>
         <AlertDialogTrigger
            render={<Button variant="destructive" size="icon-sm" aria-label="Eliminar resultado" />}
         >
            <TrashIcon />
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <TriangleAlertIcon />
               </AlertDialogMedia>
               <AlertDialogTitle>¿Eliminar el resultado de {name}?</AlertDialogTitle>
               <AlertDialogDescription>
                  Esta acción no se puede deshacer. El resultado será eliminado permanentemente.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
                  variant="destructive"
                  disabled={deleteResultadoMutation.isPending}
                  onClick={() => deleteResultadoMutation.mutate(id)}
               >
                  {deleteResultadoMutation.isPending ? "Eliminando..." : "Eliminar"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
