'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { baseThemes, colorPalettes } from '@/lib/theme'

interface ThemeContextType {
  baseTheme: string
  colorPalette: string
  setBaseTheme: (theme: string) => void
  setColorPalette: (palette: string) => void
  primaryColor: string
  secondaryColor: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [baseTheme, setBaseThemeState] = useState<string>('light')
  const [colorPalette, setColorPaletteState] = useState<string>('default')
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const storedBaseTheme = localStorage.getItem('baseTheme')
    const storedColorPalette = localStorage.getItem('colorPalette')

    if (storedBaseTheme && baseThemes.find(t => t.name === storedBaseTheme)) {
      setBaseThemeState(storedBaseTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setBaseThemeState('dark')
    } else {
      setBaseThemeState('light')
    }

    if (storedColorPalette && colorPalettes.find(p => p.name === storedColorPalette)) {
      setColorPaletteState(storedColorPalette)
    } else {
      setColorPaletteState('default')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove(...baseThemes.map(t => t.name))
    root.classList.remove(...colorPalettes.map(p => p.name))

    root.classList.add(baseTheme)
    root.classList.add(colorPalette)

    localStorage.setItem('baseTheme', baseTheme)
    localStorage.setItem('colorPalette', colorPalette)
  }, [baseTheme, colorPalette, mounted])

  const setBaseTheme = (newTheme: string) => {
    if (baseThemes.find(t => t.name === newTheme)) {
      setBaseThemeState(newTheme)
    }
  }

  const setColorPalette = (newPalette: string) => {
    if (colorPalettes.find(p => p.name === newPalette)) {
      setColorPaletteState(newPalette)
    }
  }

  const currentPalette = colorPalettes.find(p => p.name === colorPalette) || colorPalettes[0]
  const primaryColor = baseTheme === 'dark' ? currentPalette.dark.primary : currentPalette.light.primary
  const secondaryColor = baseTheme === 'dark' ? currentPalette.dark.secondary : currentPalette.light.secondary

  if (!mounted) return null

  return (
    <ThemeContext.Provider
      value={{ baseTheme, colorPalette, setBaseTheme, setColorPalette, primaryColor, secondaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
