"use client"

import { createContext, useContext, useEffect, useState } from "react"

export const COLOR_THEMES = ["blue", "lime", "indigo", "purple", "violet", "yellow", "emerald"] as const
export type ColorTheme = (typeof COLOR_THEMES)[number]

const STORAGE_KEY = "color-theme"
const DEFAULT_COLOR_THEME: ColorTheme = "blue"

const ColorThemeContext = createContext<{
   colorTheme: ColorTheme
   setColorTheme: (theme: ColorTheme) => void
} | null>(null)

function isColorTheme(value: string | null): value is ColorTheme {
   return COLOR_THEMES.includes(value as ColorTheme)
}

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
   const [colorTheme, setColorThemeState] = useState<ColorTheme>(DEFAULT_COLOR_THEME)

   useEffect(() => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (isColorTheme(stored)) {
         setColorThemeState(stored)
      }
   }, [])

   function setColorTheme(theme: ColorTheme) {
      setColorThemeState(theme)
      localStorage.setItem(STORAGE_KEY, theme)
      document.documentElement.setAttribute("data-color-theme", theme)
   }

   useEffect(() => {
      document.documentElement.setAttribute("data-color-theme", colorTheme)
   }, [colorTheme])

   return (
      <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
         {children}
      </ColorThemeContext.Provider>
   )
}

export function useColorTheme() {
   const context = useContext(ColorThemeContext)
   if (!context) {
      throw new Error("useColorTheme must be used within a ColorThemeProvider")
   }
   return context
}
