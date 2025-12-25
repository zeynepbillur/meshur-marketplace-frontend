import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-white text-gray-900
          dark:bg-gray-900 dark:text-gray-100
        "
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
