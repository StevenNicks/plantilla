import { StatusBadge } from "@/components/status-badge"
import { TAMIZAJE_STATUS_LABELS, TamizajeStatus } from "@/modules/tamizaje/services/tamizaje.service"

export function TamizajeStatusBadge({ status }: { status: TamizajeStatus }) {
   return <StatusBadge active={status === "active"} label={TAMIZAJE_STATUS_LABELS[status]} />
}
