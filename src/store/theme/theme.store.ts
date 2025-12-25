import { create } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',

  toggle: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  setTheme: (theme) => set({ theme }),
}))
