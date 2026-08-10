import { cookies } from "next/headers"
import { AppSidebar } from "@/modules/shell/components/app-sidebar"
import { Breadcrumbs } from "@/modules/shell/components/breadcrumbs"
import { AuthGuard } from "@/modules/shell/components/auth-guard"
import { Separator } from "@workspace/ui/components/separator"
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
   const cookieStore = await cookies()
   const sidebarOpen = cookieStore.get("sidebar_state")?.value !== "false"

   return (
      <AuthGuard>
         <SidebarProvider defaultOpen={sidebarOpen}>
            <AppSidebar />
            <SidebarInset>
               <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                     <SidebarTrigger className="-ml-1" />
                     <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                     />
                     <Breadcrumbs />
                  </div>
               </header>
               {children}
            </SidebarInset>
         </SidebarProvider>
      </AuthGuard>
   )
}
