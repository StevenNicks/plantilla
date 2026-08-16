import * as z from "zod"
import { TAMIZAJE_STATUSES } from "@/modules/tamizaje/services/tamizaje.service"

export const tamizajeSchema = z.object({
   name: z.string().min(1, "El nombre del tamizaje es obligatorio."),
   status: z.enum(TAMIZAJE_STATUSES),
})

export type TamizajeSchemaTypes = z.infer<typeof tamizajeSchema>
