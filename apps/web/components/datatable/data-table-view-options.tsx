"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import {
   ChevronDown,
   Columns3,
   Download,
   FileSpreadsheet,
   RefreshCw,
   TrashIcon,
   TriangleAlertIcon,
   Upload,
   X,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { exportTable, type ExportFormat } from "@/lib/export-table"
import { parseFlatFile, type FlatFileRow } from "@/lib/parse-flat-file"

export type ImportRowsHandler = (rows: FlatFileRow[]) => Promise<{
   total: number
   created: number
   updated?: number
   failed: number
   errors?: { row: number; message: string }[]
}>

const EXPORT_FORMATS: { label: string; value: ExportFormat }[] = [
   { label: "XLSX", value: "xlsx" },
   { label: "CSV", value: "csv" },
   { label: "TXT", value: "txt" },
]

interface DataTableViewOptionsProps<TData> {
   table: Table<TData>
   onRefresh?: () => unknown
   onImportRows?: ImportRowsHandler
   onDownloadTemplate?: () => unknown
   onDeleteRows?: (rows: TData[]) => Promise<void>
   exportFileName?: string
}

export function DataTableViewOptions<TData>({
   table,
   onRefresh,
   onImportRows,
   onDownloadTemplate,
   onDeleteRows,
   exportFileName = "EXPORTACION",
}: DataTableViewOptionsProps<TData>) {
   const [isRefreshing, setIsRefreshing] = React.useState(false)
   const [isExporting, setIsExporting] = React.useState(false)
   const [isImporting, setIsImporting] = React.useState(false)
   const [isDownloadingTemplate, setIsDownloadingTemplate] = React.useState(false)
   const [isDeleting, setIsDeleting] = React.useState(false)
   const [exportFormat, setExportFormat] = React.useState<ExportFormat>("xlsx")
   const fileInputRef = React.useRef<HTMLInputElement>(null)
   const hasFilters =
      table.getState().columnFilters.length > 0 || !!table.getState().globalFilter
   const selectedCount = table.getSelectedRowModel().rows.length

   const handleRefresh = async () => {
      if (!onRefresh || isRefreshing) return
      setIsRefreshing(true)
      try {
         await onRefresh()
      } finally {
         setIsRefreshing(false)
      }
   }

   const handleExport = async () => {
      if (isExporting) return
      setIsExporting(true)
      try {
         await exportTable(table, exportFileName, exportFormat)
      } catch {
         toast.error("Error al exportar", {
            description: "No se pudo generar el archivo.",
            position: "top-right",
         })
      } finally {
         setIsExporting(false)
      }
   }

   const handleDownloadTemplate = async () => {
      if (!onDownloadTemplate || isDownloadingTemplate) return
      setIsDownloadingTemplate(true)
      try {
         await onDownloadTemplate()
      } catch {
         toast.error("Error al descargar la plantilla", { position: "top-right" })
      } finally {
         setIsDownloadingTemplate(false)
      }
   }

   const handleDelete = async () => {
      if (!onDeleteRows || isDeleting) return
      const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original)
      if (selectedRows.length === 0) return

      setIsDeleting(true)
      try {
         await onDeleteRows(selectedRows)
         table.resetRowSelection()
      } catch {
         // El manejo/toast del error queda a cargo de onDeleteRows
      } finally {
         setIsDeleting(false)
      }
   }

   const openFilePicker = () => {
      if (isImporting) return
      fileInputRef.current?.click()
   }

   const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ""
      if (!file || !onImportRows) return

      setIsImporting(true)
      try {
         const { rows, skipped } = await parseFlatFile(file)

         if (rows.length === 0) {
            toast.error("El archivo no contiene filas válidas", { position: "top-right" })
            return
         }

         const result = await onImportRows(rows)
         const updated = result.updated ?? 0
         const processed = result.created + updated
         const summary = `${result.created} creado(s), ${updated} actualizado(s)`

         if (result.failed > 0) {
            const errors = result.errors ?? []
            const preview = errors
               .slice(0, 5)
               .map((e) => `Fila ${e.row}: ${e.message}`)
               .join("\n")
            const remaining = errors.length - 5

            toast.error(`Importación parcial: ${processed} de ${result.total} registros procesados`, {
               description: `${summary}. ${result.failed} fila(s) con errores:\n${preview}${remaining > 0 ? `\n(+${remaining} más)` : ""}`,
               duration: 20000,
               position: "top-right",
            })
            if (errors.length) {
               console.warn("Errores de importación:", errors)
            }
            return
         }

         toast.success(`${processed} registro(s) procesados correctamente.`, {
            description: [
               summary,
               skipped > 0 ? `${skipped} fila(s) vacía(s) ignorada(s).` : undefined,
            ]
               .filter(Boolean)
               .join(" — "),
            duration: 6000,
            position: "top-right",
         })
      } catch (error) {
         toast.error("Error al importar", {
            description: error instanceof Error ? error.message : "Error desconocido",
            position: "top-right",
         })
      } finally {
         setIsImporting(false)
      }
   }

   return (
      <div className="flex flex-wrap items-center gap-2">
         {onImportRows && (
            <input
               ref={fileInputRef}
               type="file"
               accept=".csv,.txt,.xlsx,.xls"
               className="hidden"
               onChange={onFileSelected}
            />
         )}

         {onDeleteRows && selectedCount > 0 && (
            <AlertDialog>
               <AlertDialogTrigger
                  render={
                     <Button
                        variant="destructive"
                        disabled={isDeleting}
                        aria-label={
                           isDeleting ? "Eliminando registros" : `Eliminar ${selectedCount} registro(s)`
                        }
                     />
                  }
               >
                  <TrashIcon aria-hidden="true" />
                  <span className="hidden sm:inline">
                     {isDeleting ? "Eliminando..." : `Eliminar (${selectedCount})`}
                  </span>
                  <span className="sm:hidden">{selectedCount}</span>
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <TriangleAlertIcon />
                     </AlertDialogMedia>
                     <AlertDialogTitle>¿Eliminar registros?</AlertDialogTitle>
                     <AlertDialogDescription>
                        Estás a punto de eliminar{" "}
                        <span className="font-semibold text-foreground">
                           {selectedCount} {selectedCount === 1 ? "registro" : "registros"}
                        </span>
                        . Esta acción no se puede deshacer.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel onClick={() => table.resetRowSelection()}>
                        Cancelar
                     </AlertDialogCancel>
                     <AlertDialogAction variant="destructive" onClick={handleDelete}>
                        Sí, eliminar
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         )}

         {hasFilters && (
            <Button
               variant="destructive"
               aria-label="Borrar filtros"
               onClick={() => {
                  table.resetColumnFilters()
                  table.setGlobalFilter("")
               }}
            >
               <X aria-hidden="true" />
               <span className="hidden sm:inline">Borrar filtros</span>
            </Button>
         )}

         {onRefresh && (
            <Tooltip>
               <TooltipTrigger
                  render={
                     <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        aria-label={isRefreshing ? "Actualizando" : "Actualizar"}
                     />
                  }
               >
                  <RefreshCw className={isRefreshing ? "animate-spin" : ""} aria-hidden="true" />
                  <span className="hidden sm:inline">
                     {isRefreshing ? "Actualizando..." : "Actualizar"}
                  </span>
               </TooltipTrigger>
               <TooltipContent className="sm:hidden">Actualizar</TooltipContent>
            </Tooltip>
         )}

         {onImportRows && (
            <ButtonGroup>
               <Tooltip>
                  <TooltipTrigger
                     render={
                        <Button
                           variant="outline"
                           onClick={openFilePicker}
                           disabled={isImporting}
                           aria-label={isImporting ? "Importando" : "Importar"}
                        />
                     }
                  >
                     <Upload aria-hidden="true" />
                     <span className="hidden sm:inline">
                        {isImporting ? "Importando..." : "Importar"}
                     </span>
                  </TooltipTrigger>
                  <TooltipContent className="sm:hidden">Importar</TooltipContent>
               </Tooltip>
               {onDownloadTemplate && (
                  <Tooltip>
                     <TooltipTrigger
                        render={
                           <Button
                              variant="outline"
                              onClick={handleDownloadTemplate}
                              disabled={isDownloadingTemplate}
                              aria-label="Descargar plantilla de importación"
                           />
                        }
                     >
                        <Download aria-hidden="true" />
                     </TooltipTrigger>
                     <TooltipContent>Descargar plantilla</TooltipContent>
                  </Tooltip>
               )}
            </ButtonGroup>
         )}

         <ButtonGroup>
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
               <FileSpreadsheet aria-hidden="true" />
               <span className="hidden sm:inline">{isExporting ? "Exportando..." : "Exportar"}</span>
               <span className="text-xs font-medium opacity-60 px-1">
                  {exportFormat.toUpperCase()}
               </span>
            </Button>
            <DropdownMenu>
               <Tooltip>
                  <TooltipTrigger
                     render={
                        <DropdownMenuTrigger
                           render={
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="shrink-0"
                                 aria-label="Seleccionar formato de exportación"
                              />
                           }
                        />
                     }
                  >
                     <ChevronDown aria-hidden="true" />
                  </TooltipTrigger>
                  <TooltipContent>Formato de exportación</TooltipContent>
               </Tooltip>
               <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuGroup>
                     {EXPORT_FORMATS.map((format) => (
                        <DropdownMenuCheckboxItem
                           key={format.value}
                           checked={exportFormat === format.value}
                           onCheckedChange={(checked) => {
                              if (checked) setExportFormat(format.value)
                           }}
                        >
                           {format.label}
                        </DropdownMenuCheckboxItem>
                     ))}
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </ButtonGroup>

         <DropdownMenu>
            <Tooltip>
               <TooltipTrigger
                  render={
                     <DropdownMenuTrigger
                        render={<Button variant="outline" aria-label="Visibilidad de columnas" />}
                     />
                  }
               >
                  <Columns3 aria-hidden="true" />
               </TooltipTrigger>
               <TooltipContent>Columnas</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-auto">
               <DropdownMenuGroup>
                  <DropdownMenuLabel>Columnas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                     .getAllColumns()
                     .filter(
                        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
                     )
                     .map((column) => {
                        const label = (column.columnDef.meta as { label?: string })?.label ?? column.id

                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) => column.toggleVisibility(!!value)}
                           >
                              {label}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
