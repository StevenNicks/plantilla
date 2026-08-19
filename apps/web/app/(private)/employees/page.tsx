import type { Metadata } from "next"
import { EmployeeList } from "@/modules/employee/components/employee-list"

export const metadata: Metadata = {
   title: "Empleados",
}

export default function EmployeesPage() {
   return (
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 pt-0">
         <EmployeeList />
      </div>
   )
}
