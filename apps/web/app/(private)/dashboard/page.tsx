import type { Metadata } from "next"
import { DashboardGreeting } from "@/modules/dashboard/components/dashboard-greeting"
import { ActiveTamizajeCard } from "@/modules/dashboard/components/active-tamizaje-card"

export const metadata: Metadata = {
   title: "Dashboard",
}

export default function Dashboard() {
   return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         <DashboardGreeting />
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <ActiveTamizajeCard />
         </div>
      </div>
   )
}
