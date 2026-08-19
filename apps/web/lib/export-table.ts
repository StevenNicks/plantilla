import type { Table } from "@tanstack/react-table"

export type ExportFormat = "xlsx" | "csv" | "txt"

function getColumnLabel(column: { id: string; columnDef: { meta?: unknown } }): string {
   return (column.columnDef.meta as { label?: string })?.label ?? column.id
}

function formatCellValue(column: { columnDef: { meta?: unknown } }, value: unknown): string {
   const format = (column.columnDef.meta as { formatValue?: (value: unknown) => string })
      ?.formatValue
   if (format) return format(value)
   return value == null ? "" : String(value)
}

function getExportData<TData>(table: Table<TData>) {
   // Solo se exportan columnas de datos reales (con accessorKey/accessorFn); columnas de
   // acciones (editar, eliminar, etc.) o de selección no tienen accessor y se excluyen.
   const columns = table
      .getVisibleLeafColumns()
      .filter((column) => typeof column.accessorFn !== "undefined")

   const headers = columns.map(getColumnLabel)
   const rows = table
      .getSortedRowModel()
      .rows.map((row) => columns.map((column) => formatCellValue(column, row.getValue(column.id))))

   return { headers, rows }
}

function downloadBlob(blob: Blob, fileName: string) {
   const url = URL.createObjectURL(blob)
   const link = document.createElement("a")
   link.href = url
   link.download = fileName
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
   URL.revokeObjectURL(url)
}

function escapeDelimited(value: string, delimiter: string): string {
   if (value.includes(delimiter) || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`
   }
   return value
}

function toDelimited(headers: string[], rows: string[][], delimiter: string): string {
   return [headers, ...rows]
      .map((line) => line.map((value) => escapeDelimited(value, delimiter)).join(delimiter))
      .join("\r\n")
}

export async function writeRowsToFile(
   headers: string[],
   rows: string[][],
   fileName: string,
   format: ExportFormat
): Promise<void> {
   if (format === "csv") {
      const content = "﻿" + toDelimited(headers, rows, ",")
      downloadBlob(new Blob([content], { type: "text/csv;charset=utf-8;" }), `${fileName}.csv`)
      return
   }

   if (format === "txt") {
      const content = "﻿" + toDelimited(headers, rows, "\t")
      downloadBlob(new Blob([content], { type: "text/plain;charset=utf-8;" }), `${fileName}.txt`)
      return
   }

   const XLSX = await import("xlsx")
   const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
   const workbook = XLSX.utils.book_new()
   XLSX.utils.book_append_sheet(workbook, worksheet, "Datos")
   XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export async function exportTable<TData>(
   table: Table<TData>,
   fileName: string,
   format: ExportFormat
): Promise<void> {
   const { headers, rows } = getExportData(table)
   await writeRowsToFile(headers, rows, fileName, format)
}
