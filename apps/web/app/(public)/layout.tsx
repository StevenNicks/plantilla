import { GuestGuard } from "@/modules/shell/components/guest-guard"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
   return <GuestGuard>{children}</GuestGuard>
}
