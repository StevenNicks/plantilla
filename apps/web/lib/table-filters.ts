import { Row } from "@tanstack/react-table"

export const multiValueFilter = <TData>(
   row: Row<TData>,
   id: string,
   filterValues: unknown
) => {
   const value = row.getValue(id)
   const strValue = value == null ? "" : String(value).trim()

   if (!Array.isArray(filterValues)) {
      if (filterValues == null) return true

      return strValue === String(filterValues)
   }

   return filterValues.some((filter) => {
      if (filter === "") {
         return strValue === "" || value == null
      }
      return strValue === String(filter)
   })
}
