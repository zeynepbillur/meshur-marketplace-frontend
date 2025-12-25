'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { usePathname } from 'next/navigation'


export function SearchInput() {
  const router = useRouter()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get('q') ?? '')

const pathname = usePathname()

function onSubmit(e: React.FormEvent) {
  e.preventDefault()
  const q = value.trim()

  router.push(
    q
      ? `${pathname}?q=${encodeURIComponent(q)}`
      : pathname
  )
}
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products"
        className="border rounded px-3 py-1 w-56"
        aria-label="Search products"
      />
      <button className="px-3 py-1 border rounded">Search</button>
    </form>
  )
}
