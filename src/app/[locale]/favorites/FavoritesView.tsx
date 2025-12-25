'use client'

import { useFavoritesStore } from '@/store/favorites/favorites.store'
import products from '@/mocks/products.json'
import { mapProduct } from '@/lib/mappers/productMapper'
import { Locale } from '@/lib/i18n/i18n-config'
import { ProductCard } from '@/components/molecules/ProductCard'
import { useSearchParams } from 'next/navigation'

export default function FavoritesView({
  locale,
}: {
  locale: Locale
}) {
  const ids = useFavoritesStore((s) => s.ids)
  const searchParams = useSearchParams()
  const q = (searchParams?.get('q') ?? '').toLowerCase().trim()

  const favoriteProducts = products
    .filter((p) => ids.includes(p.id))
    .map((p) => mapProduct(p as any, locale))
    .filter((p) => {
      if (!q) return true
      const inTitle = p.title?.toLowerCase().includes(q)
      const inCategory = p.category?.toLowerCase().includes(q)
      const inDesc = p.description?.toLowerCase().includes(q)
      return Boolean(inTitle || inCategory || inDesc)
    })

  if (!favoriteProducts.length) {
    return <p className="p-8">No favorites yet.</p>
  }
if (!favoriteProducts.length) {
  return (
    <p
      className="p-8"
      role="status"
      aria-live="polite"
    >
      No favorites yet.
    </p>
  )
}
  return (
    <main className="p-8 min-h-screen bg-white dark:bg-gray-900">
      <div className="grid grid-cols-2 gap-4">
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
          />
        ))}
        
      </div>
    </main>
  )
}
