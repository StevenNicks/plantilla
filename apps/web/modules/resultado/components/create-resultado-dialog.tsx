"use client"

import { useId, useMemo, useState } from "react"
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
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
   Combobox,
   ComboboxContent,
   ComboboxEmpty,
   ComboboxInput,
   ComboboxItem,
   ComboboxList,
} from "@workspace/ui/components/combobox"
import { ResultadoVitalsFields } from "@/modules/resultado/components/resultado-vitals-fields"
import { useCreateResultadoForm } from "@/modules/resultado/hooks/use-create-resultado-form"
import { useCreateResultadoMutation } from "@/modules/resultado/hooks/use-create-resultado-mutation"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"

interface EmployeeOption {
   value: string
   label: string
}

export function CreateResultadoDialog({
   tamizajeId,
   disabled = false,
}: {
   tamizajeId: string
   disabled?: boolean
}) {
   const formId = useId()
   const [open, setOpen] = useState(false)
   const { form } = useCreateResultadoForm()
   const createResultadoMutation = useCreateResultadoMutation()
   const { data: employees } = useEmployees()
   const { data: resultados } = useResultados({ tamizaje: tamizajeId })

   const registeredEmployeeIds = new Set(resultados?.map((r) => r.employee._id))
   const availableEmployees = employees?.filter((e) => !registeredEmployeeIds.has(e._id)) ?? []

   const employeeOptions: EmployeeOption[] = useMemo(
      () =>
         availableEmployees.map((employee) => ({
            value: employee._id,
            label: getEmployeeFullName(employee),
         })),
      [availableEmployees]
   )

   if (disabled) {
      return (
         <Tooltip>
            <TooltipTrigger render={<span className="inline-flex" />}>
               <Button disabled>
                  <PlusIcon />
                  Registrar resultado
               </Button>
            </TooltipTrigger>
            <TooltipContent>El tamizaje está inactivo, no se pueden registrar resultados.</TooltipContent>
         </Tooltip>
      )
   }

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
                        <Combobox
                           items={employeeOptions}
                           value={employeeOptions.find((o) => o.value === field.value) ?? null}
                           onValueChange={(option) => field.onChange(option?.value ?? "")}
                        >
                           <ComboboxInput
                              id={field.name}
                              placeholder="Selecciona un empleado"
                              aria-invalid={fieldState.invalid}
                              onBlur={field.onBlur}
                           />
                           <ComboboxContent>
                              <ComboboxEmpty>
                                 {employeeOptions.length === 0
                                    ? "No hay empleados disponibles."
                                    : "No se encontraron empleados."}
                              </ComboboxEmpty>
                              <ComboboxList>
                                 {(option: EmployeeOption) => (
                                    <ComboboxItem key={option.value} value={option}>
                                       {option.label}
                                    </ComboboxItem>
                                 )}
                              </ComboboxList>
                           </ComboboxContent>
                        </Combobox>
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
