import * as z from "zod"

export const resultadoVitalsSchema = z.object({
   height: z
      .number("La altura debe ser un número.")
      .positive("La altura debe ser un número positivo."),
   weight: z
      .number("El peso debe ser un número.")
      .positive("El peso debe ser un número positivo."),
   waistWidth: z
      .number("El ancho de cintura debe ser un número.")
      .positive("El ancho de cintura debe ser un número positivo."),
   systolic: z
      .number("La sístole debe ser un número.")
      .positive("La sístole debe ser un número positivo."),
   diastolic: z
      .number("La diástole debe ser un número.")
      .positive("La diástole debe ser un número positivo."),
   pulse: z
      .number("El pulso debe ser un número.")
      .positive("El pulso debe ser un número positivo."),
   oxygenSaturation: z
      .number("El nivel de oxigenación debe ser un número.")
      .min(0, "Debe estar entre 0 y 100.")
      .max(100, "Debe estar entre 0 y 100."),
   glucose: z
      .number("La glucosa debe ser un número.")
      .positive("La glucosa debe ser un número positivo."),
   temperature: z
      .number("La temperatura debe ser un número.")
      .positive("La temperatura debe ser un número positivo."),
})

export type ResultadoVitalsSchemaTypes = z.infer<typeof resultadoVitalsSchema>

export const resultadoSchema = resultadoVitalsSchema.extend({
   employee: z.string().min(1, "Selecciona un empleado."),
})

export type ResultadoSchemaTypes = z.infer<typeof resultadoSchema>
