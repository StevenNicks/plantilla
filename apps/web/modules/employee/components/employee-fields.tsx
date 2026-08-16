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
   BLOOD_TYPES,
   DOCUMENT_TYPE_LABELS,
   DOCUMENT_TYPES,
   EMPLOYEE_STATUS_LABELS,
   EMPLOYEE_STATUSES,
   GENDER_LABELS,
   GENDERS,
} from "@/modules/employee/services/employee.service"
import { EmployeeBaseSchemaTypes } from "@/modules/employee/schemas/employee.schema"

export function EmployeeFields<
   T extends FieldValues & EmployeeBaseSchemaTypes,
>({ control: genericControl }: { control: Control<T> }) {
   const control = genericControl as unknown as Control<EmployeeBaseSchemaTypes>

   return (
      <>
         <div className="grid gap-4 sm:grid-cols-2">
            <Controller
               name="documentType"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Tipo de documento</FieldLabel>
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
                           <SelectValue placeholder="Selecciona un tipo de documento" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                           {DOCUMENT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                 {DOCUMENT_TYPE_LABELS[type]}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
            <Controller
               name="documentNumber"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Número de documento</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        placeholder="1234567890"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         </div>

         <div className="grid gap-4 sm:grid-cols-2">
            <Controller
               name="firstName"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Primer nombre</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        placeholder="Juan"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
            <Controller
               name="middleName"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Segundo nombre</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        placeholder="Carlos"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         </div>

         <div className="grid gap-4 sm:grid-cols-2">
            <Controller
               name="lastName"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Primer apellido</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        placeholder="Pérez"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
            <Controller
               name="secondLastName"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Segundo apellido</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        placeholder="Gómez"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         </div>

         <div className="grid gap-4 sm:grid-cols-2">
            <Controller
               name="birthDate"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Fecha de nacimiento</FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        type="date"
                        aria-invalid={fieldState.invalid}
                     />
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
            <Controller
               name="gender"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Género</FieldLabel>
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
                           <SelectValue placeholder="Selecciona un género">
                              {field.value ? GENDER_LABELS[field.value] : undefined}
                           </SelectValue>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                           {GENDERS.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                 {GENDER_LABELS[gender]}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         </div>

         <div className="grid gap-4 sm:grid-cols-2">
            <Controller
               name="bloodType"
               control={control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Tipo de sangre</FieldLabel>
                     <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        name={field.name}
                     >
                        <SelectTrigger
                           id={field.name}
                           className="w-full"
                           aria-invalid={fieldState.invalid}
                           onBlur={field.onBlur}
                        >
                           <SelectValue placeholder="Selecciona un tipo de sangre">
                              {field.value || undefined}
                           </SelectValue>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                           {BLOOD_TYPES.map((bloodType) => (
                              <SelectItem key={bloodType} value={bloodType}>
                                 {bloodType}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
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
                              {field.value ? EMPLOYEE_STATUS_LABELS[field.value] : undefined}
                           </SelectValue>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                           {EMPLOYEE_STATUSES.map((status) => (
                              <SelectItem key={status} value={status}>
                                 {EMPLOYEE_STATUS_LABELS[status]}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         </div>
      </>
   )
}
