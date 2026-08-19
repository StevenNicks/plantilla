import { redirect } from "next/navigation"

export default async function TamizajePage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params
   redirect(`/tamizajes/${id}/resultados`)
}
