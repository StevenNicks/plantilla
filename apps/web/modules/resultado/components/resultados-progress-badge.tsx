import { Badge } from "@workspace/ui/components/badge"

export function ResultadosProgressBadge({
   resultadosCount,
   activeEmployeesCount,
}: {
   resultadosCount: number
   activeEmployeesCount: number
}) {
   return (
      <Badge variant="success-light">
         {resultadosCount}/{activeEmployeesCount}
      </Badge>
   )
}
