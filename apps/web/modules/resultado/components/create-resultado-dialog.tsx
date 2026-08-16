"use client"

import { useId, useState } from "react"
import { Controller } from "react-hook-form"
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@workspace/ui/components/select"
import { ResultadoVitalsFields } from "@/modules/resultado/components/resultado-vitals-fields"
import { useCreateResultadoForm } from "@/modules/resultado/hooks/use-create-resultado-form"
import { useCreateResultadoMutation } from "@/modules/resultado/hooks/use-create-resultado-mutation"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"

export function CreateResultadoDialog({ tamizajeId }: { tamizajeId: string }) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { form } = useCreateResultadoForm()
   const createResultadoMutation = useCreateResultadoMutation()
   const { data: employees } = useEmployees()
   const { data: resultados } = useResultados({ tamizaje: tamizajeId })

   const registeredEmployeeIds = new Set(resultados?.map((r) => r.employee._id))
   const availableEmployees = employees?.filter((e) => !registeredEmployeeIds.has(e._id)) ?? []

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
               createResultadoMutation.mutate(
                  { ...values, tamizaje: tamizajeId },
                  {
                     onSuccess: () => {
                        setOpen(false)
                        form.reset()
                     },
                  }
               )
            )}
         >
            <DialogTrigger render={<Button />}>
               <PlusIcon />
               Registrar resultado
            </DialogTrigger>
         </form>
         <DialogContent className="sm:max-w-lg">
            <DialogHeader>
               <DialogTitle>Registrar resultado</DialogTitle>
               <DialogDescription>
                  Selecciona el empleado y registra los datos del tamizaje.
               </DialogDescription>
            </DialogHeader>
            <FieldGroup>
               <Controller
                  name="employee"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Empleado</FieldLabel>
                        <Select
                           value={field.value}
                           onValueChange={field.onChange}
                           name={field.name}
                        >
                           <SelectTrigger
                              id={field.name}
                              className="w-full"
                              aria-invalid={fieldState.invalid}
                              onBlur={field.onBlur}
                           >
                              <SelectValue placeholder="Selecciona un empleado">
                                 {field.value
                                    ? getEmployeeFullName(
                                         employees?.find((e) => e._id === field.value) ?? {
                                            firstName: "",
                                            lastName: "",
                                         }
                                      )
                                    : undefined}
                              </SelectValue>
                           </SelectTrigger>
                           <SelectContent alignItemWithTrigger={false}>
                              {availableEmployees.length === 0 ? (
                                 <p className="text-muted-foreground px-2 py-1.5 text-sm">
                                    No hay empleados disponibles.
                                 </p>
                              ) : (
                                 availableEmployees.map((employee) => (
                                    <SelectItem key={employee._id} value={employee._id}>
                                       {getEmployeeFullName(employee)}
                                    </SelectItem>
                                 ))
                              )}
                           </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                     </Field>
                  )}
               />

               <ResultadoVitalsFields control={form.control} />
            </FieldGroup>
            <DialogFooter>
               <DialogClose render={<Button variant="outline" type="button" />}>
                  Cancelar
               </DialogClose>
               <Button type="submit" form={formId} disabled={createResultadoMutation.isPending}>
                  {createResultadoMutation.isPending ? "Guardando..." : "Registrar resultado"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
