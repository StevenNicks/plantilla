"use client"

import { useTheme } from "next-themes"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { ChevronsUpDownIcon, UserRound, SparklesIcon, BadgeCheckIcon, CreditCardIcon, BellIcon, LogOutIcon, Moon, PaletteIcon } from "lucide-react"
import { Switch } from "@workspace/ui/components/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { useCurrentUser } from "@/modules/user/hooks/use-current-user"
import { useEmployeeByUser } from "@/modules/employee/hooks/use-employee-by-user"
import { getEmployeeAvatarSrc, getEmployeeFullName } from "@/modules/employee/services/employee.service"
import { useLogoutMutation } from "@/modules/auth/hooks/use-logout-mutation"
import { getInitials } from "@/modules/user/utils"
import { useColorTheme, ColorTheme, COLOR_THEMES } from "@/components/color-theme-provider"
import { useRouter } from "next/navigation"

const COLOR_THEME_LABELS: Record<ColorTheme, string> = {
  blue: "Azul",
  lime: "Lima",
  indigo: "Índigo",
  purple: "Morado",
  violet: "Violeta",
  yellow: "Amarillo",
  emerald: "Esmeralda",
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data: user } = useCurrentUser()
  const { data: employee } = useEmployeeByUser(user?.id)

  const { resolvedTheme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()
  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  if (!user) {
    return null
  }

  const displayName = employee ? getEmployeeFullName(employee) : user.email

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar>
              <AvatarImage
                src={employee ? getEmployeeAvatarSrc(employee.gender) : undefined}
                alt={displayName}
              />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{displayName}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage
                      src={employee ? getEmployeeAvatarSrc(employee.gender) : undefined}
                      alt={displayName}
                    />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <UserRound />
                Perfil
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between cursor-pointer select-none"
                closeOnClick={false}
                tabIndex={-1}
              >
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Moon />
                    Modo oscuro
                  </div>
                  <Switch
                    checked={resolvedTheme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    aria-label="Cambiar modo oscuro"
                    tabIndex={0}
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between cursor-pointer select-none"
                closeOnClick={false}
                tabIndex={-1}
              >
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <PaletteIcon />
                    Color
                  </div>
                  <Select
                    value={colorTheme}
                    onValueChange={(value) => setColorTheme(value as ColorTheme)}
                  >
                    <SelectTrigger size="sm" className="w-28" aria-label="Cambiar color">
                      <SelectValue>{COLOR_THEME_LABELS[colorTheme]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent side="right" align="end" alignItemWithTrigger={false}>
                      {COLOR_THEMES.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {COLOR_THEME_LABELS[theme]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
            >
              <LogOutIcon />
              {logoutMutation.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
