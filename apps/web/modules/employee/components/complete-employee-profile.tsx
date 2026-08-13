"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@workspace/ui/components/card"
import { EmployeeForm } from "@/modules/employee/components/employee-form"
import { useEmployeeForm } from "@/modules/employee/hooks/use-employee-form"
import { useCreateEmployeeMutation } from "@/modules/employee/hooks/use-create-employee-mutation"

export function CompleteEmployeeProfile({ userId }: { userId: string }) {
   const { form } = useEmployeeForm({ user: userId })
   const createEmployeeMutation = useCreateEmployeeMutation()

   return (
      <div className="flex min-h-svh w-full items-center justify-center p-4">
         <Card className="w-full max-w-2xl">
            <CardHeader>
               <CardTitle>Completa tu perfil</CardTitle>
               <CardDescription>
                  Antes de continuar, registra tus datos de empleado.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form
                  onSubmit={form.handleSubmit((values) =>
                     createEmployeeMutation.mutate({ ...values, user: userId })
                  )}
                  className="flex flex-col gap-6"
               >
                  <EmployeeForm form={form} hideUserField />
                  <Button
                     type="submit"
                     className="self-end"
                     disabled={createEmployeeMutation.isPending}
                  >
                     {createEmployeeMutation.isPending ? "Guardando..." : "Guardar y continuar"}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
