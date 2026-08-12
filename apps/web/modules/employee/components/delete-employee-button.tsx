"use client"

import { TrashIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
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
               <AlertDialogTitle>¿Eliminar a {name}?</AlertDialogTitle>
               <AlertDialogDescription>
                  Esta acción no se puede deshacer. El empleado será eliminado permanentemente.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
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
