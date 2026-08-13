"use client"

import { Controller, UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@workspace/ui/components/select"
import { EmployeeFields } from "@/modules/employee/components/employee-fields"
import { EmployeeSchemaTypes } from "@/modules/employee/schemas/employee.schema"
import { useUsers } from "@/modules/user/hooks/use-users"
import { CurrentUser } from "@/modules/user/services/user.service"

interface EmployeeFormProps {
   form: UseFormReturn<EmployeeSchemaTypes>
   hideUserField?: boolean
   /** Usuario ya vinculado a este empleado (modo edición): se agrega a la lista aunque no esté "sin vincular". */
   currentUser?: CurrentUser
}

export function EmployeeForm({ form, hideUserField, currentUser }: EmployeeFormProps) {
   const { data: unlinkedUsers, isLoading: isLoadingUsers } = useUsers({ unlinked: true })
   const users =
      currentUser && !unlinkedUsers?.some((u) => u.id === currentUser.id)
         ? [currentUser, ...(unlinkedUsers ?? [])]
         : unlinkedUsers

   return (
      <FieldGroup>
         <EmployeeFields control={form.control} />

         {!hideUserField && (
            <Controller
               name="user"
               control={form.control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name}>Usuario vinculado</FieldLabel>
                     <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                        disabled={isLoadingUsers}
                     >
                        <SelectTrigger
                           id={field.name}
                           className="w-full"
                           aria-invalid={fieldState.invalid}
                           onBlur={field.onBlur}
                        >
                           <SelectValue>
                              {(value: string) => {
                                 if (!value) {
                                    return isLoadingUsers
                                       ? "Cargando usuarios..."
                                       : "Selecciona un usuario"
                                 }
                                 const user = users?.find((u) => u.id === value)
                                 return user ? user.email : value
                              }}
                           </SelectValue>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                           {users?.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                 {user.email}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
               )}
            />
         )}
      </FieldGroup>
   )
}
