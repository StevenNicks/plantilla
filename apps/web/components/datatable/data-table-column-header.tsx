"use client"

import * as React from "react"
import { type Column } from "@tanstack/react-table"
import {
   ArrowDownAZ,
   ArrowUpAZ,
   Check,
   ChevronDown,
   EyeOff,
   Filter,
   Search,
   X,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"

interface DataTableColumnHeaderProps<TData, TValue>
   extends React.HTMLAttributes<HTMLDivElement> {
   column: Column<TData, TValue>
   title: string
}

export function DataTableColumnHeader<TData, TValue>({
   column,
   title,
   className,
}: DataTableColumnHeaderProps<TData, TValue>) {
   const [open, setOpen] = React.useState(false)
   const [search, setSearch] = React.useState("")
   const [tempFilters, setTempFilters] = React.useState<string[]>([])

   const currentSort = column.getIsSorted()
   const isFiltered = column.getIsFiltered()

   React.useEffect(() => {
      const current = (column.getFilterValue() as string[]) ?? []
      setTempFilters(current.map(String))
   }, [column, open])

   const formatValue =
      (column.columnDef.meta as { formatValue?: (value: unknown) => string })
         ?.formatValue ??
      ((value: unknown) => String(value ?? "(Vacío)"))

   // Solo se calcula cuando el dropdown está abierto: recorrer/ordenar los
   // valores únicos de la columna en cada render (incluso cerrado) es lo que
   // causaba los "click handler took Nms" al interactuar con la tabla.
   const options = React.useMemo(() => {
      if (!open) return []

      return Array.from(column.getFacetedUniqueValues().entries())
         .map(([value]) => ({
            value: value == null ? "" : String(value),
            label: formatValue(value),
         }))
         .sort((a, b) => a.label.localeCompare(b.label))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open, column])

   const filteredOptions = React.useMemo(
      () =>
         options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
      [options, search]
   )

   if (!column.getCanSort()) {
      return <div className={cn(className)}>{title}</div>
   }

   const allSelected =
      filteredOptions.length > 0 &&
      filteredOptions.every((option) => tempFilters.includes(option.value))

   const toggleValue = (value: string) => {
      setTempFilters((prev) =>
         prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )
   }

   const toggleAll = () => {
      if (allSelected) {
         setTempFilters((prev) =>
            prev.filter((v) => !filteredOptions.some((option) => option.value === v))
         )
      } else {
         setTempFilters((prev) => [
            ...new Set([...prev, ...filteredOptions.map((option) => option.value)]),
         ])
      }
   }

   const applyFilters = () => {
      column.setFilterValue(tempFilters.length ? tempFilters : undefined)
      setOpen(false)
   }

   const clearFilters = () => {
      setTempFilters([])
      column.setFilterValue(undefined)
      setOpen(false)
   }

   return (
      <div className={cn("flex items-center", className)}>
         <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
               render={
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-8 gap-1 data-[state=open]:bg-accent"
                  />
               }
            >
               <span>{title}</span>

               {isFiltered ? (
                  <div className="relative">
                     <Filter className="size-4" />
                     <span className="absolute -right-1 -top-1 flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                     </span>
                  </div>
               ) : currentSort === "asc" ? (
                  <ArrowDownAZ className="size-4" />
               ) : currentSort === "desc" ? (
                  <ArrowUpAZ className="size-4" />
               ) : (
                  <ChevronDown className="size-4 opacity-70" />
               )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-65 p-0">
               {/* SORT */}
               <div className="p-1">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     onClick={() => {
                        if (currentSort === "asc") {
                           column.clearSorting()
                           setOpen(false)
                           return
                        }
                        column.toggleSorting(false)
                        setOpen(false)
                     }}
                  >
                     <ArrowDownAZ className="mr-2 size-4" />
                     Ordenar de A a Z
                     {currentSort === "asc" && <Check className="ml-auto size-4" />}
                  </Button>

                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     onClick={() => {
                        if (currentSort === "desc") {
                           column.clearSorting()
                           setOpen(false)
                           return
                        }
                        column.toggleSorting(true)
                        setOpen(false)
                     }}
                  >
                     <ArrowUpAZ className="mr-2 size-4" />
                     Ordenar de Z a A
                     {currentSort === "desc" && <Check className="ml-auto size-4" />}
                  </Button>
               </div>

               <DropdownMenuSeparator />

               {/* SEARCH */}
               <div className="p-2">
                  <div className="relative">
                     <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                     <Input
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8"
                     />
                  </div>
               </div>

               {/* OPTIONS */}
               <ScrollArea className="h-56 border-y">
                  <div className="space-y-1 p-2">
                     <div
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent"
                        onClick={toggleAll}
                     >
                        <Checkbox checked={allSelected} />
                        <span className="text-sm">(Seleccionar todo)</span>
                     </div>

                     {filteredOptions.map((option) => (
                        <div
                           key={option.value}
                           className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent"
                           onClick={() => toggleValue(option.value)}
                        >
                           <Checkbox checked={tempFilters.includes(option.value)} />
                           <span className="truncate text-sm">{option.label}</span>
                        </div>
                     ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
               </ScrollArea>

               {/* ACTIONS */}
               <div className="space-y-2 p-2">
                  <div className="flex gap-2">
                     <Button onClick={applyFilters} className="flex-1">
                        Aceptar
                     </Button>
                     <Button
                        variant="outline"
                        onClick={() => {
                           setOpen(false)
                           setSearch("")
                        }}
                        className="flex-1"
                     >
                        Cancelar
                     </Button>
                  </div>
               </div>

               <DropdownMenuSeparator />

               {/* HIDE */}
               <div className="p-1 gap-1 flex flex-col">
                  <Button
                     variant="secondary"
                     className="w-full justify-start"
                     onClick={() => column.toggleVisibility(false)}
                  >
                     <EyeOff className="mr-2 size-4" />
                     Ocultar columna
                  </Button>
                  <Button
                     variant="destructive"
                     className="w-full justify-start"
                     onClick={clearFilters}
                  >
                     <X className="mr-2 size-4" />
                     Borrar filtros
                  </Button>
               </div>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
