"use client"

import { useId, useState } from "react"
import { PlusIcon } from "lucide-react"
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
import { TamizajeFields } from "@/modules/tamizaje/components/tamizaje-fields"
import { useTamizajeForm } from "@/modules/tamizaje/hooks/use-tamizaje-form"
import { useCreateTamizajeMutation } from "@/modules/tamizaje/hooks/use-create-tamizaje-mutation"

export function CreateTamizajeDialog() {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { form } = useTamizajeForm()
   const createTamizajeMutation = useCreateTamizajeMutation()

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen)
            if (!nextOpen) form.reset()
         }}
      >
         <form
            id={formId}
            onSubmit={form.handleSubmit((values) =>
               createTamizajeMutation.mutate(values, {
                  onSuccess: () => {
                     setOpen(false)
                     form.reset()
                  },
               })
            )}
         >
            <DialogTrigger render={<Button />}>
               <PlusIcon />
               Nuevo tamizaje
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Nuevo tamizaje</DialogTitle>
               <DialogDescription>
                  Completa la información para registrar un nuevo tamizaje. El código se asigna
                  automáticamente.
               </DialogDescription>
            </DialogHeader>
            <FieldGroup>
               <TamizajeFields control={form.control} />
            </FieldGroup>
            <DialogFooter>
               <DialogClose render={<Button variant="outline" type="button" />}>
                  Cancelar
               </DialogClose>
               <Button type="submit" form={formId} disabled={createTamizajeMutation.isPending}>
                  {createTamizajeMutation.isPending ? "Creando..." : "Crear tamizaje"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
