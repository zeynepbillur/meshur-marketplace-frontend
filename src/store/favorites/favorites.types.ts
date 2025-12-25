export type FavoriteEntity = {
  id: string
}

export type FavoritesState = {
  ids: string[]
  entities: Record<string, FavoriteEntity>
}

export type FavoritesActions = {
  add: (id: string) => void
  remove: (id: string) => void
  toggle: (id: string) => void
  isFavorite: (id: string) => boolean
}

export type FavoritesStore = FavoritesState & FavoritesActions
