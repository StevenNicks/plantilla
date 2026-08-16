"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   tamizajeSchema,
   TamizajeSchemaTypes,
} from "@/modules/tamizaje/schemas/tamizaje.schema"

const EMPTY_VALUES: TamizajeSchemaTypes = {
   name: "",
   status: "active",
}

export function useTamizajeForm(defaultValues?: Partial<TamizajeSchemaTypes>) {
   const form = useForm<TamizajeSchemaTypes>({
      resolver: zodResolver(tamizajeSchema),
      defaultValues: { ...EMPTY_VALUES, ...defaultValues },
   })

   return { form }
}
