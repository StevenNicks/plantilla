"use client"

import Image from "next/image"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@workspace/ui/components/avatar"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { getInitials } from "@/modules/user/utils"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"
import {
   DOCUMENT_TYPE_LABELS,
   GENDER_LABELS,
   getEmployeeAvatarSrc,
   getEmployeeFullName,
} from "@/modules/employee/services/employee.service"
import { EditEmployeeDialog } from "@/modules/employee/components/edit-employee-dialog"
import { EmployeeStatusBadge } from "@/modules/employee/components/employee-status-badge"
import { ChangePasswordCard } from "@/modules/user/components/change-password-card"
import { useColorTheme } from "@/components/color-theme-provider"
import { THEME_IMAGES } from "@/lib/theme-images"

function formatDate(value: string): string {
   return new Date(value).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   })
}

export function ProfileView() {
   const { data: user, isLoading } = useCurrentUser()
   const { data: employee, isLoading: isLoadingEmployee } = useEmployeeByUser(user?.id)
   const { colorTheme } = useColorTheme()

   if (isLoading || !user) {
      return (
         <Card className="w-full max-w-2xl gap-0 overflow-hidden p-0">
            <Skeleton className="h-32 w-full rounded-none sm:h-40" />
            <CardContent className="flex flex-col gap-6 pt-0">
               <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
                  <Skeleton className="size-20 shrink-0 rounded-full ring-4 ring-background sm:size-24" />
               </div>
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
      <div className="flex w-full max-w-2xl flex-col gap-6">
         <Card className="w-full gap-0 overflow-hidden p-0">
            <div className="relative h-32 w-full sm:h-40">
               <Image
                  src={THEME_IMAGES[colorTheme]}
                  alt=""
                  fill
                  priority
                  sizes="672px"
                  className="object-cover"
               />
            </div>
            <CardContent className="flex flex-col gap-6 pt-0">
               <div className="-mt-10 flex items-end justify-between gap-4 sm:-mt-12">
                  <Avatar className="size-20 shrink-0 ring-4 ring-background sm:size-24">
                     <AvatarImage
                        src={employee ? getEmployeeAvatarSrc(employee.gender) : undefined}
                        alt={displayName}
                     />
                     <AvatarFallback className="text-xl">
                        {getInitials(displayName)}
                     </AvatarFallback>
                  </Avatar>
                  {employee && (
                     <div className="pb-1">
                        <EditEmployeeDialog id={employee._id} />
                     </div>
                  )}
               </div>

               <div>
                  <p className="text-lg font-semibold">{displayName}</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
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
                           <span className="text-sm">{formatDate(employee.birthDate)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-muted-foreground text-xs">Género</span>
                           <span className="text-sm">{GENDER_LABELS[employee.gender]}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-muted-foreground text-xs">Tipo de sangre</span>
                           <span className="text-sm">{employee.bloodType ?? "—"}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-muted-foreground text-xs">Estado</span>
                           <EmployeeStatusBadge status={employee.status} />
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-muted-foreground text-xs">Miembro desde</span>
                           <span className="text-sm">{formatDate(employee.createdAt)}</span>
                        </div>
                     </>
                  )}
               </div>
            </CardContent>
         </Card>

         <ChangePasswordCard email={user.email} />
      </div>
   )
}
