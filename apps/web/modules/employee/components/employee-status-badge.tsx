import { StatusBadge } from "@/components/status-badge"
import { EMPLOYEE_STATUS_LABELS, EmployeeStatus } from "@/modules/employee/services/employee.service"

export function EmployeeStatusBadge({ status }: { status: EmployeeStatus }) {
   return <StatusBadge active={status === "active"} label={EMPLOYEE_STATUS_LABELS[status]} />
}
