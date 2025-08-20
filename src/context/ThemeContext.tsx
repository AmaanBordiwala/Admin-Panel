'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
  primaryColor: string
  secondaryColor: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // initialize with a constant value on both server & client
  const [theme, setTheme] = useState<string>('light')
  const [mounted, setMounted] = useState<boolean>(false)

  // only run on client
  useEffect(() => {
    const storageTheme = localStorage.getItem('theme') ?? 'light'
    setTheme(storageTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    root.classList.remove(theme === 'dark' ? 'light' : 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const primaryColor = theme === 'dark' ? '#6366F1' : '#4F46E5'
  const secondaryColor = theme === 'dark' ? '#8B5CF6' : '#7C3AED'

  if (!mounted) return null // avoids hydration mismatch

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, primaryColor, secondaryColor }}
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
