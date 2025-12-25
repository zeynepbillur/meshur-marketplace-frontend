'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/lib/i18n/i18n-config'

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <label className="text-sm">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={onChange}
        className="border rounded px-2 py-1 bg-white dark:bg-gray-800"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  )
}
