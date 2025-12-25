import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/i18n/i18n-config'
import { Topbar } from '@/components/layout/Topbar'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  return (
    <>
      <Topbar locale={locale} />
      {children}
    </>
  )
}
