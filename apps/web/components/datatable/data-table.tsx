"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import {
   ColumnDef,
   ColumnFiltersState,
   RowSelectionState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"
import {
   Table as TableUI,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@workspace/ui/components/table"
import { Input } from "@workspace/ui/components/input"
import { DataTableViewOptions, type ImportRowsHandler } from "./data-table-view-options"
import { DataTablePagination } from "./data-table-pagination"
import { SearchX } from "lucide-react"

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
   initialSorting?: SortingState
   onRefresh?: () => unknown
   onImportRows?: ImportRowsHandler
   onDownloadTemplate?: () => unknown
   onDeleteRows?: (rows: TData[]) => Promise<void>
   exportFileName?: string
}

function getColumnMeta(columnMeta: unknown): { cellClassName?: string; headClassName?: string } {
   if (!columnMeta || typeof columnMeta !== "object") {
      return {}
   }

   return columnMeta as { cellClassName?: string; headClassName?: string }
}

export function DataTable<TData, TValue>({
   columns,
   data,
   initialSorting = [],
   onRefresh,
   onImportRows,
   onDownloadTemplate,
   onDeleteRows,
   exportFileName,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
   const [globalFilter, setGlobalFilter] = React.useState("")
   const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onGlobalFilterChange: setGlobalFilter,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         globalFilter,
         rowSelection,
      },
      initialState: {
         pagination: {
            pageSize: 50,
         },
      },
   })

   return (
      <div className="flex min-w-0 h-full flex-col gap-4">
         <div className="flex justify-between flex-wrap items-center gap-4">
            <Input
               placeholder="Buscar en tabla..."
               value={globalFilter}
               onChange={(event) => table.setGlobalFilter(event.target.value)}
               className="max-w-sm"
            />
            <DataTableViewOptions
               table={table}
               onRefresh={onRefresh}
               onImportRows={onImportRows}
               onDownloadTemplate={onDownloadTemplate}
               onDeleteRows={onDeleteRows}
               exportFileName={exportFileName}
            />
         </div>
         <div className="overflow-hidden rounded-md border">
            <div className="overflow-auto max-h-160 w-full [&>[data-slot=table-container]]:overflow-visible">
               <TableUI>
                  <TableHeader className="sticky top-0 z-10 bg-background">
                     {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                           {headerGroup.headers.map((header) => {
                              const headerMeta = getColumnMeta(header.column.columnDef.meta)
                              return (
                                 <TableHead
                                    key={header.id}
                                    className={cn(
                                       "border-r last:border-r-0 text-center",
                                       headerMeta.headClassName
                                    )}
                                 >
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(header.column.columnDef.header, header.getContext())}
                                 </TableHead>
                              )
                           })}
                        </TableRow>
                     ))}
                  </TableHeader>
                  <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                           <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                              {row.getVisibleCells().map((cell) => {
                                 const cellMeta = getColumnMeta(cell.column.columnDef.meta)

                                 return (
                                    <TableCell
                                       key={cell.id}
                                       className={cn(
                                          "border-r last:border-r-0 text-center",
                                          cellMeta.cellClassName
                                       )}
                                    >
                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                 )
                              })}
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell colSpan={columns.length} className="h-36 text-center">
                              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                 <SearchX className="h-8 w-8" />
                                 <span className="text-sm font-medium">Sin resultados</span>
                                 <span className="text-xs">No se encontraron registros.</span>
                              </div>
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </TableUI>
            </div>
         </div>
         <DataTablePagination table={table} />
      </div>
   )
}
