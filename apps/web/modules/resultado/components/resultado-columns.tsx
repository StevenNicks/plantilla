"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@workspace/ui/components/badge"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { multiValueFilter } from "@/lib/table-filters"
import { Resultado } from "@/modules/resultado/services/resultado.service"
import { getEmployeeFullName } from "@/modules/employee/services/employee.service"
import { ResultadoRowActions } from "@/modules/resultado/components/resultado-row-actions"

function calculateBmi(weightKg: number, heightCm: number): number {
   const heightM = heightCm / 100
   return weightKg / (heightM * heightM)
}

function getBmiCategory(bmi: number): { label: string; className: string } {
   if (bmi < 18.5) {
      return {
         label: "Bajo peso",
         className:
            "border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
      }
   }
   if (bmi < 25) {
      return {
         label: "Normal",
         className:
            "border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",
      }
   }
   if (bmi < 30) {
      return {
         label: "Sobrepeso",
         className:
            "border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
      }
   }
   return {
      label: "Obesidad",
      className: "border-none bg-destructive/10 text-destructive",
   }
}

export function buildResultadoColumns({ canManage }: { canManage: boolean }): ColumnDef<Resultado>[] {
   return [
   {
      id: "Cédula",
      accessorFn: (row) => row.employee.documentNumber,
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="CÉDULA" />
         </div>
      ),
      cell: ({ getValue }) => <div className="flex justify-start">{getValue<string>()}</div>,
      filterFn: multiValueFilter,
   },
   {
      id: "Empleado",
      accessorFn: (row) => getEmployeeFullName(row.employee),
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="EMPLEADO" />
         </div>
      ),
      cell: ({ getValue }) => (
         <div className="flex justify-start font-medium">{getValue<string>()}</div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "height",
      id: "Altura",
      meta: { formatValue: (value: unknown) => `${value} cm` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="ALTURA" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.height} cm</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "weight",
      id: "Peso",
      meta: { formatValue: (value: unknown) => `${value} kg` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="PESO" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.weight} kg</div>,
      filterFn: multiValueFilter,
   },
   {
      id: "IMC",
      accessorFn: (row) => calculateBmi(row.weight, row.height),
      meta: {
         formatValue: (value: unknown) => (typeof value === "number" ? value.toFixed(1) : String(value)),
      },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="IMC" />
         </div>
      ),
      cell: ({ getValue }) => {
         const bmi = getValue<number>()
         const category = getBmiCategory(bmi)
         return (
            <div className="flex justify-center">
               <Badge variant="secondary" className={category.className}>
                  {bmi.toFixed(1)} · {category.label}
               </Badge>
            </div>
         )
      },
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "waistWidth",
      id: "Cintura",
      meta: { formatValue: (value: unknown) => `${value} cm` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="CINTURA" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.waistWidth} cm</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "systolic",
      id: "Sistólica",
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="SISTÓLICA" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.systolic}</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "diastolic",
      id: "Diastólica",
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="DIASTÓLICA" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.diastolic}</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "pulse",
      id: "Pulso",
      meta: { formatValue: (value: unknown) => `${value} lpm` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="PULSO" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.pulse} lpm</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "oxygenSaturation",
      id: "O2",
      meta: { formatValue: (value: unknown) => `${value}%` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="O2" />
         </div>
      ),
      cell: ({ row }) => (
         <div className="flex justify-center">{row.original.oxygenSaturation}%</div>
      ),
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "glucose",
      id: "Glucosa",
      meta: { formatValue: (value: unknown) => `${value} mg/dL` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="GLUCOSA" />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.glucose} mg/dL</div>,
      filterFn: multiValueFilter,
   },
   {
      accessorKey: "temperature",
      id: "Temperatura",
      meta: { formatValue: (value: unknown) => `${value}°C` },
      header: ({ column }) => (
         <div className="flex justify-center">
            <DataTableColumnHeader column={column} title="TEMP." />
         </div>
      ),
      cell: ({ row }) => <div className="flex justify-center">{row.original.temperature}°C</div>,
      filterFn: multiValueFilter,
   },
   {
      id: "Acciones",
      header: () => <div className="flex justify-center">ACCIONES</div>,
      cell: ({ row }) => <ResultadoRowActions resultado={row.original} canManage={canManage} />,
      enableSorting: false,
      enableHiding: false,
   },
   ]
}
