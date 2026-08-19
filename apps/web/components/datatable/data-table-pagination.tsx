import { type Table } from "@tanstack/react-table"
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@workspace/ui/components/select"

interface DataTablePaginationProps<TData> {
   table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
   return (
      <div className="flex flex-col gap-3 py-3 px-2 sm:flex-row sm:items-center sm:justify-between">
         <p className="text-sm text-muted-foreground text-center sm:text-left">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
         </p>

         <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
               <p className="text-sm font-medium whitespace-nowrap">Filas por página</p>
               <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
               >
                  <SelectTrigger className="h-8 w-17.5">
                     <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top" alignItemWithTrigger={false}>
                     {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            <div className="flex items-center gap-2">
               <span className="text-sm font-medium whitespace-nowrap">
                  Página {table.getState().pagination.pageIndex + 1} de{" "}
                  {Math.max(table.getPageCount(), 1)}
               </span>

               <div className="flex items-center gap-1">
                  <Button
                     variant="outline"
                     size="icon"
                     className="hidden size-8 lg:flex"
                     onClick={() => table.setPageIndex(0)}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Primera página</span>
                     <ChevronsLeft />
                  </Button>
                  <Button
                     variant="outline"
                     size="icon"
                     className="size-8"
                     onClick={() => table.previousPage()}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Página anterior</span>
                     <ChevronLeft />
                  </Button>
                  <Button
                     variant="outline"
                     size="icon"
                     className="size-8"
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Página siguiente</span>
                     <ChevronRight />
                  </Button>
                  <Button
                     variant="outline"
                     size="icon"
                     className="hidden size-8 lg:flex"
                     onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Última página</span>
                     <ChevronsRight />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
