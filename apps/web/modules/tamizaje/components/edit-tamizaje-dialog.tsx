"use client"

import { useEffect, useId, useState } from "react"
import { PencilIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@workspace/ui/components/dialog"
import { FieldGroup } from "@workspace/ui/components/field"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { TamizajeFields } from "@/modules/tamizaje/components/tamizaje-fields"
import { useTamizajeForm } from "@/modules/tamizaje/hooks/use-tamizaje-form"
import { useTamizaje } from "@/modules/tamizaje/hooks/use-tamizaje"
import { useUpdateTamizajeMutation } from "@/modules/tamizaje/hooks/use-update-tamizaje-mutation"

export function EditTamizajeDialog({ id }: { id: string }) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { data: tamizaje, isLoading } = useTamizaje(open ? id : "")
   const { form } = useTamizajeForm()
   const updateTamizajeMutation = useUpdateTamizajeMutation(id)

   useEffect(() => {
      if (!tamizaje) return

      form.reset({
         name: tamizaje.name,
         status: tamizaje.status,
      })
   }, [tamizaje, form])

   const isFormReady = !isLoading && Boolean(tamizaje)

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <form
            id={formId}
            onSubmit={form.handleSubmit((values) =>
               updateTamizajeMutation.mutate(values, {
                  onSuccess: () => setOpen(false),
               })
            )}
         >
            <DialogTrigger
               render={<Button variant="outline" size="icon-sm" aria-label="Editar tamizaje" />}
            >
               <PencilIcon />
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Editar tamizaje</DialogTitle>
               <DialogDescription>Actualiza la información del tamizaje.</DialogDescription>
            </DialogHeader>
            {isFormReady ? (
               <FieldGroup>
                  <p className="text-muted-foreground text-sm">
                     Código: <span className="font-medium text-foreground">{tamizaje?.code}</span>
                  </p>
                  <TamizajeFields control={form.control} />
               </FieldGroup>
            ) : (
               <div className="flex flex-col gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
               </div>
            )}
            <DialogFooter>
               <DialogClose render={<Button variant="outline" type="button" />}>
                  Cancelar
               </DialogClose>
               <Button
                  type="submit"
                  form={formId}
                  disabled={updateTamizajeMutation.isPending || !isFormReady}
               >
                  {updateTamizajeMutation.isPending ? "Guardando..." : "Guardar cambios"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
