"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   resultadoSchema,
   ResultadoSchemaTypes,
} from "@/modules/resultado/schemas/resultado.schema"

const EMPTY_VALUES: ResultadoSchemaTypes = {
   employee: "",
   height: 0,
   weight: 0,
   waistWidth: 0,
   systolic: 0,
   diastolic: 0,
   pulse: 0,
   oxygenSaturation: 0,
   glucose: 0,
   temperature: 0,
}

export function useCreateResultadoForm() {
   const form = useForm<ResultadoSchemaTypes>({
      resolver: zodResolver(resultadoSchema),
      defaultValues: EMPTY_VALUES,
   })

   return { form }
}
