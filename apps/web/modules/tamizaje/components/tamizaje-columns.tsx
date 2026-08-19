"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { multiValueFilter } from "@/lib/table-filters"
import { Tamizaje } from "@/modules/tamizaje/services/tamizaje.service"
import { TamizajeStatusBadge } from "@/modules/tamizaje/components/tamizaje-status-badge"
import {
   TamizajeRealizarAction,
   TamizajeEditAction,
   TamizajeDeleteAction,
} from "@/modules/tamizaje/components/tamizaje-row-actions"
import { ResultadosProgressBadge } from "@/modules/resultado/components/resultados-progress-badge"

function formatDate(value: string | undefined): string {
   if (!value) return "—"
   return new Date(value).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
   })
}

export function buildTamizajeColumns({
   resultadosCountByTamizaje,
   activeEmployeesCount,
}: {
   resultadosCountByTamizaje: Map<string, number>
   activeEmployeesCount: number
}): ColumnDef<Tamizaje>[] {
   return [
      {
         id: "select",
         header: ({ table }) => (
            <div className="flex justify-center">
               <Checkbox
                  checked={table.getIsAllPageRowsSelected()}
                  indeterminate={
                     table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                  }
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
         accessorKey: "code",
         id: "Código",
         header: ({ column }) => (
            <div className="flex justify-center">
               <DataTableColumnHeader column={column} title="CÓDIGO" />
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-center text-lg font-bold">{row.original.code}</div>
         ),
         filterFn: multiValueFilter,
      },
      {
         accessorKey: "name",
         id: "Nombre",
         header: ({ column }) => (
            <div className="flex justify-center">
               <DataTableColumnHeader column={column} title="NOMBRE" />
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-start font-medium">{row.original.name}</div>
         ),
         filterFn: multiValueFilter,
      },
      {
         id: "Resultados",
         accessorFn: (row) => resultadosCountByTamizaje.get(row._id) ?? 0,
         header: ({ column }) => (
            <div className="flex justify-center">
               <DataTableColumnHeader column={column} title="RESULTADOS" />
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-center">
               <ResultadosProgressBadge
                  resultadosCount={resultadosCountByTamizaje.get(row.original._id) ?? 0}
                  activeEmployeesCount={activeEmployeesCount}
               />
            </div>
         ),
         filterFn: multiValueFilter,
      },
      {
         id: "Ver resultados",
         header: () => <div className="flex justify-center">VER RESULTADOS</div>,
         cell: ({ row }) => (
            <div className="flex justify-center">
               <TamizajeRealizarAction tamizaje={row.original} />
            </div>
         ),
         enableSorting: false,
         enableHiding: false,
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
               <TamizajeStatusBadge status={row.original.status} />
            </div>
         ),
         filterFn: multiValueFilter,
      },
      {
         accessorKey: "createdAt",
         id: "Fecha Creación",
         meta: { formatValue: (value: unknown) => formatDate(value as string) },
         header: ({ column }) => (
            <div className="flex justify-center">
               <DataTableColumnHeader column={column} title="F. CREACIÓN" />
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-center">{formatDate(row.original.createdAt)}</div>
         ),
         filterFn: multiValueFilter,
      },
      {
         accessorKey: "updatedAt",
         id: "Fecha Cierre",
         meta: { formatValue: (value: unknown) => formatDate(value as string) },
         header: ({ column }) => (
            <div className="flex justify-center">
               <DataTableColumnHeader column={column} title="F. CIERRE" />
            </div>
         ),
         cell: ({ row }) => (
            <div className="flex justify-center">{formatDate(row.original.updatedAt)}</div>
         ),
         filterFn: multiValueFilter,
      },
      {
         id: "Editar",
         header: () => <div className="flex justify-center">EDITAR</div>,
         cell: ({ row }) => (
            <div className="flex justify-center">
               <TamizajeEditAction tamizaje={row.original} />
            </div>
         ),
         enableSorting: false,
         enableHiding: false,
      },
      {
         id: "Eliminar",
         header: () => <div className="flex justify-center">ELIMINAR</div>,
         cell: ({ row }) => (
            <div className="flex justify-center">
               <TamizajeDeleteAction tamizaje={row.original} />
            </div>
         ),
         enableSorting: false,
         enableHiding: false,
      },
   ]
}
