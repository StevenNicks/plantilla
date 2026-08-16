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
import { useDeleteEmployeeMutation } from "@/modules/employee/hooks/use-delete-employee-mutation"

export function DeleteEmployeeButton({ id, name }: { id: string; name: string }) {
   const deleteEmployeeMutation = useDeleteEmployeeMutation()

   return (
      <AlertDialog>
         <AlertDialogTrigger
            render={<Button variant="destructive" size="icon-sm" aria-label="Eliminar empleado" />}
         >
            <TrashIcon />
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <TriangleAlertIcon />
               </AlertDialogMedia>
               <AlertDialogTitle>¿Eliminar a {name}?</AlertDialogTitle>
               <AlertDialogDescription>
                  Esta acción no se puede deshacer. El empleado será eliminado permanentemente.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
                  variant="destructive"
                  disabled={deleteEmployeeMutation.isPending}
                  onClick={() => deleteEmployeeMutation.mutate(id)}
               >
                  {deleteEmployeeMutation.isPending ? "Eliminando..." : "Eliminar"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
