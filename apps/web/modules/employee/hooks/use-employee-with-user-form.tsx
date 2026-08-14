"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   employeeWithUserSchema,
   EmployeeWithUserSchemaTypes,
} from "@/modules/employee/schemas/employee.schema"

const EMPTY_VALUES: EmployeeWithUserSchemaTypes = {
   documentType: "" as EmployeeWithUserSchemaTypes["documentType"],
   documentNumber: "",
   firstName: "",
   middleName: "",
   lastName: "",
   secondLastName: "",
   birthDate: "",
   email: "",
}

export function useEmployeeWithUserForm() {
   const form = useForm<EmployeeWithUserSchemaTypes>({
      resolver: zodResolver(employeeWithUserSchema),
      defaultValues: EMPTY_VALUES,
   })

   return { form }
}
