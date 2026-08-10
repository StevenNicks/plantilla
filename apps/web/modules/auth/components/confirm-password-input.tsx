"use client"

import { useId, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { cn } from "@workspace/ui/lib/utils"
import { EyeOffIcon, EyeIcon, CheckIcon, XIcon } from "lucide-react"

interface ConfirmPasswordInputProps {
  id: string
  label: string
  password: string
  value?: string
  onValueChange?: (value: string) => void
}

export function ConfirmPasswordInput({
  id,
  label,
  password,
  value,
  onValueChange,
}: ConfirmPasswordInputProps) {
  const [internalConfirmPassword, setInternalConfirmPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const confirmPassword = value ?? internalConfirmPassword

  const reactId = useId()
  const inputId = id ?? reactId

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const handleChange = (newValue: string) => {
    setInternalConfirmPassword(newValue)
    onValueChange?.(newValue)
  }

  const matches = confirmPassword.length > 0 && confirmPassword === password

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>

      <InputGroup className="relative">
        <InputGroupInput
          id={inputId}
          type={isVisible ? "text" : "password"}
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => handleChange(e.target.value)}
          required
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

      {confirmPassword.length > 0 && (
        <span
          className={cn(
            "flex items-center gap-1.5 text-xs",
            matches ? "text-green-600 dark:text-green-400" : "text-destructive"
          )}
        >
          {matches ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <XIcon className="size-3.5" />
          )}
          {matches ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
        </span>
      )}
    </div>
  )
}
