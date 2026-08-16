import { cn } from "@workspace/ui/lib/utils"

export function StatusBadge({ active, label }: { active: boolean; label: string }) {
   return (
      <span
         className={cn(
            "inline-flex items-center gap-1.5 text-sm",
            active ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
         )}
      >
         <span
            className={cn(
               "relative flex size-2 rounded-full before:absolute before:inset-0 before:animate-ping before:rounded-full before:opacity-75 before:duration-1500 after:absolute after:inset-0 after:animate-ping after:rounded-full after:opacity-40 after:delay-500 after:duration-1500",
               active
                  ? "bg-emerald-500 before:bg-emerald-400 after:bg-emerald-400"
                  : "bg-destructive before:bg-destructive after:bg-destructive"
            )}
         />
         {label}
      </span>
   )
}
