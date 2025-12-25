import { Product } from '@/types/product'
import { ApiProduct } from '@/lib/api/types'
import { Locale } from '@/lib/i18n/i18n-config'

export function mapProduct(
  apiProduct: ApiProduct,
  locale: Locale
): Product {
  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    title: apiProduct.title[locale] ?? apiProduct.title.tr ?? apiProduct.title.en,
    description:
      apiProduct.description?.[locale] ??
      apiProduct.description?.tr ??
      apiProduct.description?.en,
    category: apiProduct.category,
    price: apiProduct.price,
    rating: apiProduct.rating,
    stock: apiProduct.stock,
    image: apiProduct.image,
  }
}
