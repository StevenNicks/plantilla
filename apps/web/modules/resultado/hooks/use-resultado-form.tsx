"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   resultadoVitalsSchema,
   ResultadoVitalsSchemaTypes,
} from "@/modules/resultado/schemas/resultado.schema"

const EMPTY_VALUES: ResultadoVitalsSchemaTypes = {
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

export function useResultadoForm(defaultValues?: Partial<ResultadoVitalsSchemaTypes>) {
   const form = useForm<ResultadoVitalsSchemaTypes>({
      resolver: zodResolver(resultadoVitalsSchema),
      defaultValues: { ...EMPTY_VALUES, ...defaultValues },
   })

   return { form }
}
