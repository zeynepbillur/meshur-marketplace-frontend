'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme/theme.store'

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const html = document.documentElement

    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}
