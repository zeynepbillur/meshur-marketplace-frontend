import { Locale } from '@/lib/i18n/i18n-config'
import FavoritesView from './FavoritesView'

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return <FavoritesView locale={locale} />
}
