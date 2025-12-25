import { Locale } from './i18n-config'
import { Dictionary } from './types'

export const getDictionary = async (
  locale: Locale
): Promise<Dictionary> => {
  switch (locale) {
    case 'tr':
      return (await import('./dictionaries/tr.json')).default
    case 'en':
      return (await import('./dictionaries/en.json')).default
    default:
      throw new Error('Unsupported locale')
  }
}
