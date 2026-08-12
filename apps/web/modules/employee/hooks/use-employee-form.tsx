"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   employeeSchema,
   EmployeeSchemaTypes,
} from "@/modules/employee/schemas/employee.schema"

const EMPTY_VALUES: EmployeeSchemaTypes = {
   documentType: "CC",
   documentNumber: "",
   firstName: "",
   middleName: "",
   lastName: "",
   secondLastName: "",
   birthDate: "",
   user: "",
}

export function useEmployeeForm(defaultValues?: Partial<EmployeeSchemaTypes>) {
   const form = useForm<EmployeeSchemaTypes>({
      resolver: zodResolver(employeeSchema),
      defaultValues: { ...EMPTY_VALUES, ...defaultValues },
   })

   return { form }
}
