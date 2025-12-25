import { Locale } from '@/lib/i18n/i18n-config'
import { getDictionary } from '@/lib/i18n/getDictionaries'
import { fetchProducts } from '@/lib/api/products'
import { ProductCard } from '@/components/molecules/ProductCard'
import Script from 'next/script'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams?: { q?: string }
}

export default async function HomePage({
  params,
  searchParams,
}: Props) {
  // params burada Promise olabileceği için await etmeliyiz
  const { locale } = await params

  const dict = await getDictionary(locale)
  const response = await fetchProducts(locale)
  const q = (searchParams?.q ?? '').trim().toLowerCase()

  const products = q
    ? response.data.filter((p) => {
        const inTitle = p.title?.toLowerCase().includes(q)
        const inCategory = p.category?.toLowerCase().includes(q)
        const inDesc = p.description?.toLowerCase().includes(q)
        return Boolean(inTitle || inCategory || inDesc)
      })
    : response.data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: dict.home.title,
  description: dict.home.subtitle,
}

  return (
    <>
  <Script
    id="home-jsonld"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
    }}
  />
    <main className="p-8 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">{dict.home.title}</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-300">
        {dict.home.subtitle}
      </p>

      <ul className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} locale={locale} />
          </li>
        ))}
      </ul>
    </main>
    </>
  )
}
