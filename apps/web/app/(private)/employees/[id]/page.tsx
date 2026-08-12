import type { Metadata } from "next"
import { EditEmployeeView } from "@/modules/employee/components/edit-employee-view"

export const metadata: Metadata = {
   title: "Editar empleado",
}

export default async function EditEmployeePage({
   params,
}: {
   params: Promise<{ id: string }>
}) {
   const { id } = await params

   return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         <EditEmployeeView id={id} />
      </div>
   )
}
