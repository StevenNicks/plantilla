"use client"

import { memo } from "react"
import { Employee, getEmployeeFullName } from "@/modules/employee/services/employee.service"
import { EditEmployeeDialog } from "@/modules/employee/components/edit-employee-dialog"
import { DeleteEmployeeButton } from "@/modules/employee/components/delete-employee-button"

export const EmployeeRowActions = memo(function EmployeeRowActions({
   employee,
}: {
   employee: Employee
}) {
   return (
      <div className="flex items-center justify-center gap-2">
         <EditEmployeeDialog id={employee._id} />
         <DeleteEmployeeButton id={employee._id} name={getEmployeeFullName(employee)} />
      </div>
   )
})
