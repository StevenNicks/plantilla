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

export function ProfileView() {
   const { data: user, isLoading } = useCurrentUser()

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

   return (
      <Card className="w-full max-w-md">
         <CardHeader>
            <CardTitle>Perfil</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
               <Avatar className="size-16">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="text-lg">
                     {getInitials(user.name)}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
               </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">Nombre</span>
                  <span className="text-sm">{user.name}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">Correo electrónico</span>
                  <span className="text-sm">{user.email}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">ID de usuario</span>
                  <span className="text-sm">{user.id}</span>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
