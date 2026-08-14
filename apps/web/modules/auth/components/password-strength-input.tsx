"use client"

import { useId, useMemo, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { cn } from "@workspace/ui/lib/utils"
import { EyeOffIcon, EyeIcon, CheckIcon, XIcon, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

const requirements = [
  { regex: /.{8,}/, text: "Al menos 8 caracteres" },
  { regex: /[a-z]/, text: "Al menos 1 minúscula" },
  { regex: /[A-Z]/, text: "Al menos 1 mayúscula" },
  { regex: /[0-9]/, text: "Al menos 1 número" },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
    text: "Al menos 1 carácter especial",
  },
]

const getColor = (score: number) => {
  if (score === 0) return "bg-border"
  if (score <= 1) return "bg-destructive"
  if (score <= 2) return "bg-orange-500"
  if (score <= 3) return "bg-amber-500"
  if (score === 4) return "bg-yellow-400"

  return "bg-green-500"
}

const getText = (score: number) => {
  if (score === 0) return "Ingresa una contraseña"
  if (score <= 2) return "Contraseña débil"
  if (score <= 3) return "Contraseña media"
  if (score === 4) return "Contraseña fuerte"

  return "Contraseña muy fuerte"
}

interface PasswordStrengthInputProps {
  id: string
  label: string
  forgotPasswordSlot?: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  invalid?: boolean
}

export function PasswordStrengthInput({
  id,
  label,
  forgotPasswordSlot,
  value,
  onValueChange,
  invalid,
}: PasswordStrengthInputProps) {
  const [internalPassword, setInternalPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const password = value ?? internalPassword

  const reactId = useId()
  const inputId = id ?? reactId

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const handleChange = (newValue: string) => {
    setInternalPassword(newValue)
    onValueChange?.(newValue)
  }

  const strength = requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }))

  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength]
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
        {forgotPasswordSlot && <div className="ml-auto">{forgotPasswordSlot}</div>}
      </div>

      <InputGroup className="relative mt-2">
        <InputGroupInput
          id={inputId}
          type={isVisible ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => handleChange(e.target.value)}
          aria-invalid={invalid}
        />
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            tabIndex={-1}
            onClick={toggleVisibility}
            className="text-muted-foreground hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-col gap-2 mt-3">
        <div className="mb-3 flex h-1 w-full gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-full flex-1 rounded-full transition-all duration-500 ease-out",
                index < strengthScore ? getColor(strengthScore) : "bg-border"
              )}
            />
          ))}
        </div>

        <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
          {getText(strengthScore)}. Debe contener:
          <Tooltip>
            <TooltipTrigger type="button" tabIndex={-1}>
              <Info className="text-muted-foreground size-4" />
              <span className="sr-only">Ver requisitos de la contraseña</span>
            </TooltipTrigger>
            <TooltipContent>
              <ul className="space-y-1.5">
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <CheckIcon className="size-4 text-green-400" />
                    ) : (
                      <XIcon className="size-4 text-muted-foreground" />
                    )}
                    <span className="text-xs">
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requisito cumplido"
                          : " - Requisito pendiente"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </p>
      </div>
    </div>
  )
}
