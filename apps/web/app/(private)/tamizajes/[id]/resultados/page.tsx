import type { Metadata } from "next"
import { TamizajeResultadosView } from "@/modules/resultado/components/tamizaje-resultados-view"

export const metadata: Metadata = {
   title: "Resultados del tamizaje",
}

export default async function TamizajeResultadosPage({
   params,
}: {
   params: Promise<{ id: string }>
}) {
   const { id } = await params

   return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         <TamizajeResultadosView tamizajeId={id} />
      </div>
   )
}
