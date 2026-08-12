"use client"

import { Controller, UseFormReturn } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import { DOCUMENT_TYPES } from "@/modules/employee/services/employee.service"
import { EmployeeSchemaTypes } from "@/modules/employee/schemas/employee.schema"
import { useUsers } from "@/modules/user/hooks/use-users"

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
   CC: "Cédula de ciudadanía",
   CE: "Cédula de extranjería",
   TI: "Tarjeta de identidad",
   PA: "Pasaporte",
   RC: "Registro civil",
}

const selectClassName = cn(
   "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
   "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
   "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
   "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
   "dark:bg-input/30 dark:disabled:bg-input/80"
)

interface EmployeeFormProps {
   form: UseFormReturn<EmployeeSchemaTypes>
   onSubmit: (values: EmployeeSchemaTypes) => void
   isSubmitting?: boolean
   submitLabel?: string
}

export function EmployeeForm({
   form,
   onSubmit,
   isSubmitting,
   submitLabel = "Guardar",
}: EmployeeFormProps) {
   const { data: users, isLoading: isLoadingUsers } = useUsers()

   return (
      <Card className="w-full max-w-2xl">
         <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                     <Controller
                        name="documentType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>Tipo de documento</FieldLabel>
                              <select
                                 {...field}
                                 id={field.name}
                                 className={selectClassName}
                                 aria-invalid={fieldState.invalid}
                              >
                                 {DOCUMENT_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                       {DOCUMENT_TYPE_LABELS[type]}
                                    </option>
                                 ))}
                              </select>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                           </Field>
                        )}
                     />
                     <Controller
                        name="documentNumber"
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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

                  <Controller
                     name="birthDate"
                     control={form.control}
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
                     name="user"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Usuario vinculado</FieldLabel>
                           <select
                              {...field}
                              id={field.name}
                              className={selectClassName}
                              aria-invalid={fieldState.invalid}
                              disabled={isLoadingUsers}
                           >
                              <option value="" disabled>
                                 {isLoadingUsers ? "Cargando usuarios..." : "Selecciona un usuario"}
                              </option>
                              {users?.map((user) => (
                                 <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                 </option>
                              ))}
                           </select>
                           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                     )}
                  />

                  <Field orientation="horizontal" className="justify-end">
                     <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : submitLabel}
                     </Button>
                  </Field>
               </FieldGroup>
            </form>
         </CardContent>
      </Card>
   )
}
