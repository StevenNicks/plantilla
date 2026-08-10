"use client"

import { Ring2 } from "ldrs/react"
import "ldrs/react/Ring2.css"

interface LoaderProps {
   size?: string
   stroke?: string
   strokeLength?: string
   bgOpacity?: string
   speed?: string
   color?: string
}

export function Loader({
   size = "40",
   stroke = "5",
   strokeLength = "0.25",
   bgOpacity = "0.1",
   speed = "0.8",
   color = "var(--muted-foreground)",
   // color = "var(--primary)",
}: LoaderProps) {
   return (
      <Ring2
         size={size}
         stroke={stroke}
         strokeLength={strokeLength}
         bgOpacity={bgOpacity}
         speed={speed}
         color={color}
      />
   )
}
