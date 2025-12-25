// app/[locale]/products/[slug]/page.tsx
import { fetchProductBySlug, fetchProducts } from '@/lib/api/products'
import { Locale, locales } from '@/lib/i18n/i18n-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Script from 'next/script'
import rawProducts from '@/mocks/products.json'

export const revalidate = 60
export const dynamicParams = false

export async function generateStaticParams() {
  return (rawProducts as { slug: string }[]).flatMap((product) =>
    locales.map((locale) => ({
      locale,
      slug: product.slug,
    }))
  )
}
type PageProps = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, locale } = await params // artık doğrudan kullanıyoruz

  const response = await fetchProductBySlug(slug, locale)

  if (!response) notFound()

  const product = response.data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  description: product.description,
  image: product.image,
  sku: product.id,
  offers: {
    "@type": "Offer",
    priceCurrency: "TRY",
    price: product.price,
    availability:
      product.stock && product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
  },
}

  return (
    <>
      <Script
    id="product-jsonld"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
    }}
  />
    <main className="p-8">
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={300}
      />
    <h1 className="mt-4 text-3xl font-bold">
  {product.title}
</h1>

<p className="mt-2 text-xl font-semibold">
  {product.price} ₺
</p>

{product.description && (
  <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-prose">
    {product.description}
  </p>
)}

    </main>
    </>
  )
}
