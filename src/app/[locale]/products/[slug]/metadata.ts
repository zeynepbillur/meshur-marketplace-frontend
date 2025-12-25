// app/[locale]/products/[slug]/metadata.ts
import type { Metadata } from 'next'
import { fetchProductBySlug } from '@/lib/api/products'
import { Locale } from '@/lib/i18n/i18n-config'

type Params = {
  params: {
    locale: Locale
    slug: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, locale } = params

  const res = await fetchProductBySlug(slug, locale)
  if (!res) return {}

  const p = res.data

  return {
    title: `${p.title} | Meshur`,
    description: p.description ?? undefined,
    openGraph: {
      title: p.title,
      description: p.description ?? undefined,
      images: p.image ? [{ url: p.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description ?? undefined,
    },
  }
}
