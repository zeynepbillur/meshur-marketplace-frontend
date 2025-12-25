'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useFavoritesStore } from '@/store/favorites/favorites.store'
import { motion } from 'framer-motion'


type Props = {
  product: Product
  locale?: string
}

export function ProductCard({
  product,
  locale = 'tr',
}: Props) {
  const toggle = useFavoritesStore((s) => s.toggle)
  const isFavorite = useFavoritesStore((s) =>
    s.isFavorite(product.id)
  )

  return (
  <motion.article
  layout
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="relative rounded-lg overflow-hidden shadow-sm
    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
>
      <Link
        href={`/${locale}/products/${product.slug}`}
        className="block p-4"
        aria-label={product.title}
      >
        <div className="w-full h-44 relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover rounded"
            priority={false}
          />
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {product.title}
          </h3>
          {product.category && (
            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {product.category}
            </div>
          )}
          

          <div className="mt-3 flex items-center justify-between">

            <span className="font-medium"> 
                <data value={product.price}>{product.price} ₺</data>
            </span>
            <span className="text-sm text-yellow-500">
              {product.rating ? product.rating.toFixed(1) : '—'}
            </span>
          </div>
        </div>
      </Link>

<motion.button
  whileTap={{ scale: 0.85 }}
  animate={{ scale: isFavorite ? 1.1 : 1 }}
  transition={{ type: 'spring' }}
      onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggle(product.id)
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full
          ${isFavorite ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900'}
          shadow-sm border border-gray-200 dark:border-gray-600`}
      >
        {isFavorite ? '♥' : '♡'}
      </motion.button>
    </motion.article>
  )
}
