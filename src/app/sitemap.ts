import { locales } from '@/lib/i18n/i18n-config'
import { fetchProducts } from '@/lib/api/products'

export default async function sitemap() {
  const products = await fetchProducts('tr')

  const productUrls = products.data.flatMap((p) =>
    locales.map((l) => ({
      url: `https://example.com/${l}/products/${p.slug}`,
      lastModified: new Date(),
    }))
  )

  return [
    ...locales.map((l) => ({
      url: `https://example.com/${l}`,
    })),
    ...productUrls,
  ]
}
