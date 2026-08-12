"use client"

import { PencilIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { DeleteEmployeeButton } from "@/modules/employee/components/delete-employee-button"

function fullName(employee: { firstName: string; middleName?: string; lastName: string; secondLastName?: string }) {
   return [employee.firstName, employee.middleName, employee.lastName, employee.secondLastName]
      .filter(Boolean)
      .join(" ")
}

export function EmployeeList() {
   const { data: employees, isLoading } = useEmployees()

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-end">
            <Button nativeButton={false} render={<Link href="/employees/new" />}>
               <PlusIcon />
               Nuevo empleado
            </Button>
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
                              <th className="p-3 font-medium">Usuario</th>
                              <th className="p-3 font-medium">
                                 <span className="sr-only">Acciones</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {employees.map((employee) => (
                              <tr key={employee._id} className="border-b last:border-0">
                                 <td className="p-3 font-medium">{fullName(employee)}</td>
                                 <td className="p-3 text-muted-foreground">
                                    {employee.documentType} {employee.documentNumber}
                                 </td>
                                 <td className="p-3 text-muted-foreground">
                                    {employee.user?.name ?? "—"}
                                 </td>
                                 <td className="p-3">
                                    <div className="flex items-center justify-end gap-2">
                                       <Button
                                          variant="outline"
                                          size="icon-sm"
                                          aria-label="Editar empleado"
                                          nativeButton={false}
                                          render={<Link href={`/employees/${employee._id}`} />}
                                       >
                                          <PencilIcon />
                                       </Button>
                                       <DeleteEmployeeButton id={employee._id} name={fullName(employee)} />
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
