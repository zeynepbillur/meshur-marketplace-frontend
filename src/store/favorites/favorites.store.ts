import { create } from 'zustand'
import { FavoritesStore } from './favorites.types'

export const useFavoritesStore = create<FavoritesStore>(
  (set, get) => ({
    ids: [],
    entities: {},

    add: (id) =>
      set((state) => {
        if (state.entities[id]) return state

        return {
          ids: [...state.ids, id],
          entities: {
            ...state.entities,
            [id]: { id },
          },
        }
      }),

    remove: (id) =>
      set((state) => {
        const { [id]: _, ...rest } = state.entities

        return {
          ids: state.ids.filter((x) => x !== id),
          entities: rest,
        }
      }),

    toggle: (id) => {
      const exists = get().entities[id]
      exists ? get().remove(id) : get().add(id)
    },

    isFavorite: (id) => {
      return Boolean(get().entities[id])
    },
  })
)