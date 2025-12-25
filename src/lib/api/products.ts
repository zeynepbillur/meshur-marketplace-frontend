import rawProducts from '@/mocks/products.json'
import { ApiProduct, ApiResponse } from './types'
import { mapProduct } from '@/lib/mappers/productMapper'
import { Product } from '@/types/product'
import { Locale } from '@/lib/i18n/i18n-config'

/**
 * Simulated GET /products
 */
export async function fetchProducts(
  locale: Locale
): Promise<ApiResponse<Product[]>> {
  const products = (rawProducts as ApiProduct[]).map((p) =>
    mapProduct(p, locale)
  )

  return {
    data: products,
    meta: {
      total: products.length,
    },
  }
}

/**
 * Simulated GET /products/:slug
 */
export async function fetchProductBySlug(
  slug: string,
  locale: Locale
): Promise<ApiResponse<Product> | null> {
  const product = (rawProducts as ApiProduct[]).find(
    (p) => p.slug === slug
  )

  if (!product) return null

  return {
    data: mapProduct(product, locale),
  }
}
