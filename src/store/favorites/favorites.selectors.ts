import { FavoritesStore } from './favorites.types'

export const selectFavoriteIds = (s: FavoritesStore) => s.ids
export const selectIsFavorite =
  (id: string) => (s: FavoritesStore) =>
    Boolean(s.entities[id])
