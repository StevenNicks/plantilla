"use client"

import Image from "next/image"
import { useColorTheme } from "@/components/color-theme-provider"
import { THEME_IMAGES } from "@/lib/theme-images"

export function AuthVisual() {
   const { colorTheme } = useColorTheme()

   return (
      <div className="relative hidden bg-muted md:block">
         <Image
            src={THEME_IMAGES[colorTheme]}
            alt="Imagen"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 0px"
            className="object-cover"
         />
      </div>
   )
}
