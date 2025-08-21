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
  const [theme, setTheme] = useState<string | undefined>(undefined)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || theme === undefined) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark') // Remove both to ensure correct class is applied
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      // Only update if no explicit theme is set by the user
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme) // Persist user's choice
      return newTheme
    })
  }

  const primaryColor = theme === 'dark' ? '#6366F1' : '#4F46E5'
  const secondaryColor = theme === 'dark' ? '#8B5CF6' : '#7C3AED'

  if (!mounted || theme === undefined) return null // avoids hydration mismatch and waits for theme to be determined

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
