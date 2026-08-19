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
import { ResultadoVitalsFields } from "@/modules/resultado/components/resultado-vitals-fields"
import { useResultadoForm } from "@/modules/resultado/hooks/use-resultado-form"
import { useResultado } from "@/modules/resultado/hooks/use-resultado"
import { useUpdateResultadoMutation } from "@/modules/resultado/hooks/use-update-resultado-mutation"

export function EditResultadoDialog({ id, disabled = false }: { id: string; disabled?: boolean }) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { data: resultado, isLoading } = useResultado(open ? id : "")
   const { form } = useResultadoForm()
   const updateResultadoMutation = useUpdateResultadoMutation(id)

   useEffect(() => {
      if (!resultado) return

      form.reset({
         height: resultado.height,
         weight: resultado.weight,
         waistWidth: resultado.waistWidth,
         systolic: resultado.systolic,
         diastolic: resultado.diastolic,
         pulse: resultado.pulse,
         oxygenSaturation: resultado.oxygenSaturation,
         glucose: resultado.glucose,
         temperature: resultado.temperature,
      })
   }, [resultado, form])

   const isFormReady = !isLoading && Boolean(resultado)

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <form
            id={formId}
            onSubmit={form.handleSubmit((values) =>
               updateResultadoMutation.mutate(values, {
                  onSuccess: () => setOpen(false),
               })
            )}
         >
            <DialogTrigger
               render={
                  <Button
                     variant="outline"
                     size="icon-sm"
                     aria-label="Editar resultado"
                     disabled={disabled}
                  />
               }
            >
               <PencilIcon />
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Editar resultado</DialogTitle>
               <DialogDescription>
                  Actualiza los datos del tamizaje registrados para este empleado.
               </DialogDescription>
            </DialogHeader>
            {isFormReady ? (
               <FieldGroup>
                  <ResultadoVitalsFields control={form.control} />
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
                  disabled={updateResultadoMutation.isPending || !isFormReady}
               >
                  {updateResultadoMutation.isPending ? "Guardando..." : "Guardar cambios"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
