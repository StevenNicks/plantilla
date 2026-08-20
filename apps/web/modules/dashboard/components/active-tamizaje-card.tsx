"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { LockIcon, MoreVerticalIcon, TriangleAlertIcon } from "lucide-react"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import {
   Card,
   CardAction,
   CardContent,
   CardHeader,
   CardTitle,
} from "@workspace/ui/components/card"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useEmployees } from "@/modules/employee/hooks/use-employees"
import { useResultados } from "@/modules/resultado/hooks/use-resultados"
import { TamizajeStatusBadge } from "@/modules/tamizaje/components/tamizaje-status-badge"
import { useTamizajes } from "@/modules/tamizaje/hooks/use-tamizajes"
import { useUpdateTamizajeMutation } from "@/modules/tamizaje/hooks/use-update-tamizaje-mutation"

function formatDate(value: string): string {
   return new Date(value).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
   })
}

export function ActiveTamizajeCard() {
   const { data: tamizajes, isLoading } = useTamizajes()
   const [closeDialogOpen, setCloseDialogOpen] = useState(false)
   const featured = tamizajes?.[0]
   const isClosed = featured?.status === "inactive"

   const { data: resultados } = useResultados(featured ? { tamizaje: featured._id } : undefined)
   const { data: employees } = useEmployees()
   const activeEmployeesCount = useMemo(
      () => employees?.filter((e) => e.status === "active").length ?? 0,
      [employees]
   )
   const resultadosCount = featured ? (resultados?.length ?? 0) : 0
   const progress =
      activeEmployeesCount > 0
         ? Math.min(Math.round((resultadosCount / activeEmployeesCount) * 100), 100)
         : 0

   const updateTamizajeMutation = useUpdateTamizajeMutation(featured?._id ?? "")

   if (isLoading) {
      return (
         <Card className="w-full">
            <CardContent className="flex flex-col gap-3">
               <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-5 w-14 rounded-md" />
               </div>
               <Skeleton className="h-1.5 w-full rounded-full" />
               <Skeleton className="h-3.5 w-28" />
            </CardContent>
         </Card>
      )
   }

   if (!featured) {
      return (
         <Card className="w-full">
            <CardContent className="flex flex-col items-center gap-1.5 py-6 text-center">
               <p className="text-sm font-medium">Sin tamizajes registrados</p>
               <p className="text-muted-foreground text-xs">
                  Crea un tamizaje para empezar a registrar resultados.
               </p>
               <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  nativeButton={false}
                  render={<Link href="/tamizajes" />}
               >
                  Ir a tamizajes
               </Button>
            </CardContent>
         </Card>
      )
   }

   function handleCloseTamizaje() {
      if (!featured) return
      updateTamizajeMutation.mutate(
         { name: featured.name, status: "inactive" },
         { onSuccess: () => setCloseDialogOpen(false) }
      )
   }

   return (
      <>
         <Card className="w-full gap-0 overflow-hidden">
            <CardHeader className="flex items-center justify-between gap-3">
               <CardTitle>
                  {featured.name}
               </CardTitle>
               <CardAction className="flex items-center gap-2">
                  <TamizajeStatusBadge status={featured.status} />
                  {!isClosed && (
                     <DropdownMenu>
                        <DropdownMenuTrigger
                           render={
                              <Button
                                 variant="ghost"
                                 size="icon-sm"
                                 className="text-muted-foreground"
                                 aria-label="Más opciones"
                              />
                           }
                        >
                           <MoreVerticalIcon aria-hidden="true" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44" align="end">
                           <DropdownMenuGroup>
                              <DropdownMenuItem
                                 variant="destructive"
                                 onClick={() => setCloseDialogOpen(true)}
                              >
                                 <LockIcon />
                                 Cerrar tamizaje
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  )}
               </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-4">
               <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                     <span>
                        <span className="font-semibold tabular-nums">{resultadosCount}</span>
                        <span className="text-muted-foreground">
                           {" "}
                           / {activeEmployeesCount} empleados evaluados
                        </span>
                     </span>
                     <span className="text-muted-foreground text-xs font-medium tabular-nums">
                        {progress}%
                     </span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                     <div
                        className="h-full rounded-full bg-emerald-500 transition-[width]"
                        style={{ width: `${progress}%` }}
                     />
                  </div>
               </div>
               <p className="text-muted-foreground text-xs">
                  {isClosed ? "Cerrado" : "Iniciado"} el{" "}
                  {formatDate(isClosed ? featured.updatedAt : featured.createdAt)}
               </p>
            </CardContent>
            <div className="border-t p-3">
               <Button
                  variant="outline"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href={`/tamizajes/${featured._id}/resultados`} />}
               >
                  Ingresar
               </Button>
            </div>
         </Card>
         <AlertDialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                     <TriangleAlertIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>¿Cerrar {featured.name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                     El tamizaje pasará a estado inactivo y dejará de aparecer como activo.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                     variant="destructive"
                     disabled={updateTamizajeMutation.isPending}
                     onClick={handleCloseTamizaje}
                  >
                     {updateTamizajeMutation.isPending ? "Cerrando..." : "Cerrar tamizaje"}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}
