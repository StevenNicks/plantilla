"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@workspace/ui/components/badge"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { multiValueFilter } from "@/lib/table-filters"
import {
   BLOOD_TYPES,
   DOCUMENT_TYPE_LABELS,
   Employee,
   GENDER_LABELS,
   getEmployeeFullName,
} from "@/modules/employee/services/employee.service"
import { EmployeeStatusBadge } from "@/modules/employee/components/employee-status-badge"
import { EmployeeRowActions } from "@/modules/employee/components/employee-row-actions"

function formatDate(value: string | undefined): string {
   if (!value) return "—"
   return new Date(value).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
   })
}

export const employeeColumns: ColumnDef<Employee>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <div className="flex justify-center">
            <Checkbox
               checked={table.getIsAllPageRowsSelected()}
               indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
               onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
               aria-label="Seleccionar todo"
            />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">
            <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label="Seleccionar fila"
            />
         </div>
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "documentType",
      id: "Tipo Documento",
      meta: {
         formatValue: (value: unknown) =>
            DOCUMENT_TYPE_LABELS[value as keyof typeof DOCUMENT_TYPE_LABELS] ?? "(Vacío)",
      },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="TIPO DOC." />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">
            <Badge variant="outline">{row.original.documentType}</Badge>
         </div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "documentNumber",
      id: "Número Documento",
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="N° DOCUMENTO" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-start">{row.original.documentNumber}</div>,
      filterFn: multiValueFilter,
   },
   {
      id: "Nombre",
      accessorFn: (row) => getEmployeeFullName(row),
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="NOMBRE" />
         </div>
      ),
      cell: ({ getValue }) => (
         <div className="flex justify-start font-medium">{getValue<string>()}</div>
      ),
      filterFn: multiValueFilter,
   },
   {
      id: "Correo",
      accessorFn: (row) => row.user?.email ?? "",
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="CORREO" />
         </div>
      ),
      cell: ({ getValue }) => {
         const value = getValue<string>()
         return <div className="flex justify-start">{value || "—"}</div>
      },
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "gender",
      id: "Género",
      meta: {
         formatValue: (value: unknown) =>
            GENDER_LABELS[value as keyof typeof GENDER_LABELS] ?? "(Vacío)",
      },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="GÉNERO" />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">
            {GENDER_LABELS[row.original.gender] ?? row.original.gender}
         </div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "bloodType",
      id: "Tipo de Sangre",
      meta: {
         formatValue: (value: unknown) => (BLOOD_TYPES.includes(value as never) ? String(value) : "(Vacío)"),
      },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="TIPO SANGRE" />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">
            {row.original.bloodType ? (
               <Badge variant="outline">{row.original.bloodType}</Badge>
            ) : (
               "—"
            )}
         </div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "birthDate",
      id: "Fecha Nacimiento",
      meta: { formatValue: (value: unknown) => formatDate(value as string) },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="F. NACIMIENTO" />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">{formatDate(row.original.birthDate)}</div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "status",
      id: "Estado",
      meta: {
         formatValue: (value: unknown) => (value === "active" ? "Activo" : "Inactivo"),
      },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="ESTADO" />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">
            <EmployeeStatusBadge status={row.original.status} />
         </div>
      ),
      filterFn: multiValueFilter,
   },
   {
      id: "Acciones",
      header: () => <div className="flex justify-center">ACCIONES</div>,
      cell: ({ row }) => <EmployeeRowActions employee={row.original} />,
      enableSorting: false,
      enableHiding: false,
   },
]
