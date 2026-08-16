"use client"

import Link from "next/link"
import { CheckIcon, MoreVerticalIcon, XIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useTamizajes } from "@/modules/tamizaje/hooks/use-tamizajes"

function formatDate(value: string): string {
   return new Date(value).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   })
}

export function ActiveTamizajeCard() {
   const { data: tamizajes, isLoading } = useTamizajes()

   if (isLoading) {
      return (
         <Card className="w-full gap-0 overflow-hidden p-0">
            <div className="flex items-center justify-between border-b px-3 py-2">
               <Skeleton className="h-5.5 w-16 rounded-md" />
               <Skeleton className="size-8 rounded-lg" />
            </div>
            <div className="flex flex-col gap-3 p-4">
               <Skeleton className="h-4 w-32" />
               <Skeleton className="h-4 w-full" />
            </div>
         </Card>
      )
   }

   const activeTamizajes = tamizajes?.filter((t) => t.status === "active") ?? []
   const hasActive = activeTamizajes.length > 0
   const featured = activeTamizajes[0]

   return (
      <Card className="w-full gap-0 overflow-hidden p-0">
         <CardContent className="p-0">
            <div className="flex items-center justify-between border-b px-3 py-2">
               <Badge variant={hasActive ? "success-light" : "secondary"}>
                  {hasActive ? <CheckIcon aria-hidden="true" /> : <XIcon aria-hidden="true" />}
                  {hasActive ? "Activo" : "Sin activos"}
               </Badge>
               <DropdownMenu>
                  <DropdownMenuTrigger
                     render={
                        <Button
                           variant="ghost"
                           size="icon"
                           className="text-muted-foreground"
                           aria-label="Más opciones"
                        />
                     }
                  >
                     <MoreVerticalIcon aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                     <DropdownMenuGroup>
                        <DropdownMenuItem
                           render={<Link href="/tamizajes" />}
                        >
                           Ver tamizajes
                        </DropdownMenuItem>
                     </DropdownMenuGroup>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <div className="flex flex-col gap-3 p-4">
               <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm leading-tight font-medium">
                     {featured ? featured.name : "Sin tamizajes activos"}
                  </h3>
                  {featured && (
                     <Badge variant="outline" size="sm">
                        #{featured.code}
                     </Badge>
                  )}
               </div>
               <p className="text-muted-foreground text-sm">
                  {featured
                     ? `Registrado el ${formatDate(featured.createdAt)}.`
                     : "No hay tamizajes en estado activo en este momento."}
                  {hasActive && activeTamizajes.length > 1 && (
                     <> Hay {activeTamizajes.length} tamizajes activos en total.</>
                  )}
               </p>
            </div>
            <div className="border-t p-3">
               <Button
                  variant="outline"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href="/tamizajes" />}
               >
                  Ver tamizajes
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}
