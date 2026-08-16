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
import { useDeleteTamizajeMutation } from "@/modules/tamizaje/hooks/use-delete-tamizaje-mutation"

export function DeleteTamizajeButton({ id, name }: { id: string; name: string }) {
   const deleteTamizajeMutation = useDeleteTamizajeMutation()

   return (
      <AlertDialog>
         <AlertDialogTrigger
            render={<Button variant="destructive" size="icon-sm" aria-label="Eliminar tamizaje" />}
         >
            <TrashIcon />
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <TriangleAlertIcon />
               </AlertDialogMedia>
               <AlertDialogTitle>¿Eliminar {name}?</AlertDialogTitle>
               <AlertDialogDescription>
                  Esta acción no se puede deshacer. El tamizaje será eliminado permanentemente.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
                  variant="destructive"
                  disabled={deleteTamizajeMutation.isPending}
                  onClick={() => deleteTamizajeMutation.mutate(id)}
               >
                  {deleteTamizajeMutation.isPending ? "Eliminando..." : "Eliminar"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
