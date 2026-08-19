export type FlatFileRow = Record<string, string>

export interface ParseFlatFileResult {
   rows: FlatFileRow[]
   skipped: number
}

function normalizeCellValue(value: unknown): string {
   if (value == null) return ""
   if (value instanceof Date) return value.toISOString().slice(0, 10)
   return String(value).trim()
}

export async function parseFlatFile(file: File): Promise<ParseFlatFileResult> {
   const XLSX = await import("xlsx")

   const isTextFile = /\.(csv|txt)$/i.test(file.name)
   const workbook = isTextFile
      ? XLSX.read(await file.text(), { type: "string", cellDates: true })
      : XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: true })

   const sheetName = workbook.SheetNames[0]
   if (!sheetName) return { rows: [], skipped: 0 }

   const sheet = workbook.Sheets[sheetName]
   if (!sheet) return { rows: [], skipped: 0 }

   const records = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" })

   const rows: FlatFileRow[] = []
   let skipped = 0

   for (const record of records) {
      const normalized: FlatFileRow = {}
      let hasValue = false

      for (const [key, value] of Object.entries(record)) {
         const stringValue = normalizeCellValue(value)
         normalized[key.trim()] = stringValue
         if (stringValue !== "") hasValue = true
      }

      if (hasValue) {
         rows.push(normalized)
      } else {
         skipped++
      }
   }

   return { rows, skipped }
}
