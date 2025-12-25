import { redirect } from 'next/navigation'
import { defaultLocale } from '@/lib/i18n/i18n-config'

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
