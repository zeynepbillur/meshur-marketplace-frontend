'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFavoritesStore } from '@/store/favorites/favorites.store'
import { useEffect, useRef, useState } from 'react'
import { useThemeStore } from '@/store/theme/theme.store'
import {LanguageSwitcher} from '@/components/molecules/LanguageSwitcher'
import {SearchInput } from '@/components/molecules/SearchInput'

export function ThemeToggle() {
  const toggle = useThemeStore((s) => s.toggle)

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
    >
      🌙 / ☀️
    </button>
  )
}
export function Topbar({ locale }: { locale: string }) {
  const count = useFavoritesStore((s) => s.ids.length)
    const { theme, toggle } = useThemeStore()

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const qParam = searchParams?.get('q') ?? ''
  const [q, setQ] = useState(qParam)
  const debounceRef = useRef<number | null>(null)

  // sync param -> local state on route change
  useEffect(() => {
    setQ(qParam)
  }, [qParam, pathname])

  // show search only on products or favorites pages (or root of locale)
  const showSearch =
    pathname === `/${locale}` ||
    pathname.startsWith(`/${locale}/products`) ||
    pathname.startsWith(`/${locale}/favorites`)

  function applyQuery(value: string) {
    // preserve other search params if needed, set q
    const search = new URLSearchParams(Array.from(searchParams || []))
    if (value) search.set('q', value)
    else search.delete('q')

    // keep same pathname but update search
    router.replace(`${pathname}?${search.toString()}`)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQ(value)

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }
    debounceRef.current = window.setTimeout(() => {
      applyQuery(value.trim())
    }, 350)
  }

  return (
    <header
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b
      bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <div className="flex items-center gap-6">
        <Link href={`/${locale}`}>
          <strong className="text-xl">Meshur</strong>
        </Link>

        <nav className="flex gap-4">
          <Link href={`/${locale}`} className="text-sm">
            Products
          </Link>
          <Link href={`/${locale}/favorites`} className="text-sm">
            Favorites ({count})
          </Link>
        </nav>
      </div>

<SearchInput />
    
      <button
          onClick={toggle}
          className="ml-4 px-3 py-1 rounded border
            dark:border-gray-600"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <LanguageSwitcher locale={locale} />

    </header>
  )
}

