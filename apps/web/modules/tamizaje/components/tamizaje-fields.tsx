"use client"

import { Control, Controller, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@workspace/ui/components/select"
import {
   TAMIZAJE_STATUS_LABELS,
   TAMIZAJE_STATUSES,
} from "@/modules/tamizaje/services/tamizaje.service"
import { TamizajeSchemaTypes } from "@/modules/tamizaje/schemas/tamizaje.schema"

export function TamizajeFields<T extends FieldValues & TamizajeSchemaTypes>({
   control: genericControl,
}: {
   control: Control<T>
}) {
   const control = genericControl as unknown as Control<TamizajeSchemaTypes>

   return (
      <>
         <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nombre del tamizaje</FieldLabel>
                  <Input
                     {...field}
                     id={field.name}
                     placeholder="Tamizaje visual"
                     aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />

         <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
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
                        <SelectValue placeholder="Selecciona un estado">
                           {field.value ? TAMIZAJE_STATUS_LABELS[field.value] : undefined}
                        </SelectValue>
                     </SelectTrigger>
                     <SelectContent alignItemWithTrigger={false}>
                        {TAMIZAJE_STATUSES.map((status) => (
                           <SelectItem key={status} value={status}>
                              {TAMIZAJE_STATUS_LABELS[status]}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </>
   )
}
