"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { CreateEmployeeDialog } from "@/modules/employee/components/create-employee-dialog"
import { EditEmployeeDialog } from "@/modules/employee/components/edit-employee-dialog"
import { DeleteEmployeeButton } from "@/modules/employee/components/delete-employee-button"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"

export function EmployeeList() {
   const { data: employees, isLoading } = useEmployees()

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-end">
            <CreateEmployeeDialog />
         </div>

         <Card>
            <CardContent className="p-0">
               {isLoading ? (
                  <div className="flex flex-col gap-3 p-4">
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                  </div>
               ) : !employees?.length ? (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                     No hay empleados registrados.
                  </p>
               ) : (
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                        <thead>
                           <tr className="border-b text-left text-muted-foreground">
                              <th className="p-3 font-medium">Nombre</th>
                              <th className="p-3 font-medium">Documento</th>
                              <th className="p-3 font-medium">Correo</th>
                              <th className="p-3 font-medium">
                                 <span className="sr-only">Acciones</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {employees.map((employee) => (
                              <tr key={employee._id} className="border-b last:border-0">
                                 <td className="p-3 font-medium">{getEmployeeFullName(employee)}</td>
                                 <td className="p-3 text-muted-foreground">
                                    {employee.documentType} {employee.documentNumber}
                                 </td>
                                 <td className="p-3 text-muted-foreground">
                                    {employee.user?.email ?? "—"}
                                 </td>
                                 <td className="p-3">
                                    <div className="flex items-center justify-end gap-2">
                                       <EditEmployeeDialog id={employee._id} />
                                       <DeleteEmployeeButton id={employee._id} name={getEmployeeFullName(employee)} />
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   )
}
