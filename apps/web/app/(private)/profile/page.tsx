import type { Metadata } from "next"
import { ProfileView } from "@/modules/user/components/profile-view"

export const metadata: Metadata = {
   title: "Perfil",
}

export default function ProfilePage() {
   return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         <ProfileView />
      </div>
   )
}
