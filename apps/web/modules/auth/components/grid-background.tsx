import { cn } from "@workspace/ui/lib/utils"

export function GridBackground({ children }: { children: React.ReactNode }) {
   return (
      <div className="relative min-h-svh w-full bg-white dark:bg-black">
         {/* Grid */}
         <div
            className={cn(
               "absolute inset-0",
               "bg-size-[24px_24px]",
               "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
               "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
         />

         {/* Fade radial */}
         <div className="pointer-events-none absolute inset-0 bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

         {/* Contenido */}
         <div className="relative z-10">
            {children}
         </div>
      </div>
   )
}