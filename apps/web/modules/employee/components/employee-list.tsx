"use client"

import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { DataTable } from "@/components/datatable/data-table"
import type { FlatFileRow } from "@/lib/parse-flat-file"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { useImportEmployeesMutation } from "@/modules/employee/hooks/use-import-employees-mutation"
import { useDeleteEmployeesMutation } from "@/modules/employee/hooks/use-delete-employees-mutation"
import { CreateEmployeeDialog } from "@/modules/employee/components/create-employee-dialog"
import { employeeColumns } from "@/modules/employee/components/employee-columns"
import { downloadEmployeeImportTemplate } from "@/modules/employee/utils/employee-import"
import type { Employee } from "@/modules/employee/services/employee.service"

export function EmployeeList() {
   const { data: employees, isLoading, refetch } = useEmployees()
   const importEmployeesMutation = useImportEmployeesMutation()
   const deleteEmployeesMutation = useDeleteEmployeesMutation()

   const handleImport = async (rows: FlatFileRow[]) => {
      return await importEmployeesMutation.mutateAsync(rows)
   }

   const handleDelete = async (rows: Employee[]) => {
      await deleteEmployeesMutation.mutateAsync(rows.map((r) => r._id))
   }

   return (
      <div className="flex min-w-0 flex-col gap-4">
         <Card className="min-w-0">
            <CardHeader>
               <CardTitle>Empleados</CardTitle>
               <CardDescription>Gestiona los empleados de tu organización.</CardDescription>
               <CardAction>
                  <CreateEmployeeDialog />
               </CardAction>
            </CardHeader>
            <CardContent className="min-w-0 p-4">
               {isLoading ? (
                  <div className="flex flex-col gap-3">
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                  </div>
               ) : (
                  <DataTable
                     columns={employeeColumns}
                     data={employees ?? []}
                     onRefresh={refetch}
                     onImportRows={handleImport}
                     onDownloadTemplate={downloadEmployeeImportTemplate}
                     onDeleteRows={handleDelete}
                     exportFileName="EMPLEADOS"
                  />
               )}
            </CardContent>
         </Card>
      </div>
   )
}
