"use client"

import { Control, Controller, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { ResultadoVitalsSchemaTypes } from "@/modules/resultado/schemas/resultado.schema"

const VITAL_FIELDS: {
   name: keyof ResultadoVitalsSchemaTypes
   label: string
   placeholder: string
   step?: string
}[] = [
   { name: "height", label: "Altura (cm)", placeholder: "170" },
   { name: "weight", label: "Peso (kg)", placeholder: "70", step: "0.1" },
   { name: "waistWidth", label: "Ancho de cintura (cm)", placeholder: "80" },
   { name: "systolic", label: "Sístole (mmHg)", placeholder: "120" },
   { name: "diastolic", label: "Diástole (mmHg)", placeholder: "80" },
   { name: "pulse", label: "Pulso (lpm)", placeholder: "72" },
   { name: "oxygenSaturation", label: "Oxigenación (%)", placeholder: "98" },
   { name: "glucose", label: "Glucosa (mg/dL)", placeholder: "90" },
   { name: "temperature", label: "Temperatura (°C)", placeholder: "36.5", step: "0.1" },
]

export function ResultadoVitalsFields<T extends FieldValues & ResultadoVitalsSchemaTypes>({
   control: genericControl,
}: {
   control: Control<T>
}) {
   const control = genericControl as unknown as Control<ResultadoVitalsSchemaTypes>

   return (
      <div className="grid gap-4 sm:grid-cols-2">
         {VITAL_FIELDS.map(({ name, label, placeholder, step }) => (
            <Controller
               key={name}
               name={name}
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                     <Input
                        id={field.name}
                        type="number"
                        step={step}
                        placeholder={placeholder}
                        value={Number.isNaN(field.value) ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        onBlur={field.onBlur}
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         ))}
      </div>
   )
}
