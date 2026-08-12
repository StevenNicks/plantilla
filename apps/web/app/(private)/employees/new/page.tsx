import type { Metadata } from "next"
import { CreateEmployeeView } from "@/modules/employee/components/create-employee-view"

export const metadata: Metadata = {
   title: "Nuevo empleado",
}

export default function NewEmployeePage() {
   return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         <CreateEmployeeView />
      </div>
   )
}
