import type { Metadata } from "next"
import { TamizajeList } from "@/modules/tamizaje/components/tamizaje-list"

export const metadata: Metadata = {
   title: "Tamizajes",
}

export default function TamizajesPage() {
   return (
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 pt-0">
         <TamizajeList />
      </div>
   )
}
