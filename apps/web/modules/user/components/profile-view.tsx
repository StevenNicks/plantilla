"use client"

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@workspace/ui/components/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { getInitials } from "@/modules/user/utils"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"
import {
   DOCUMENT_TYPE_LABELS,
   getEmployeeFullName,
} from "@/modules/employee/services/employee.service"

export function ProfileView() {
   const { data: user, isLoading } = useCurrentUser()
   const { data: employee, isLoading: isLoadingEmployee } = useEmployeeByUser(user?.id)

   if (isLoading || !user) {
      return (
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
               <Skeleton className="size-16 rounded-full" />
               <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
               </div>
            </CardContent>
         </Card>
      )
   }

   const displayName = employee ? getEmployeeFullName(employee) : user.email

   return (
      <Card className="w-full max-w-md">
         <CardHeader>
            <CardTitle>Perfil</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
               <Avatar className="size-16">
                  <AvatarImage alt={displayName} />
                  <AvatarFallback className="text-lg">
                     {getInitials(displayName)}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <p className="text-lg font-semibold">{displayName}</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
               </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">Correo electrónico</span>
                  <span className="text-sm">{user.email}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">ID de usuario</span>
                  <span className="text-sm">{user.id}</span>
               </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
               <h3 className="text-sm font-medium">Datos de empleado</h3>

               {isLoadingEmployee ? (
                  <div className="flex flex-col gap-3">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                  </div>
               ) : !employee ? (
                  <p className="text-muted-foreground text-sm">
                     Este usuario no tiene un empleado vinculado.
                  </p>
               ) : (
                  <>
                     <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground text-xs">Nombre completo</span>
                        <span className="text-sm">{getEmployeeFullName(employee)}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground text-xs">Documento</span>
                        <span className="text-sm">
                           {DOCUMENT_TYPE_LABELS[employee.documentType]} {employee.documentNumber}
                        </span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground text-xs">Fecha de nacimiento</span>
                        <span className="text-sm">{employee.birthDate.slice(0, 10)}</span>
                     </div>
                  </>
               )}
            </div>
         </CardContent>
      </Card>
   )
}
