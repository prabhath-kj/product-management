import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
  signOut: () => void
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      signOut: () => {
        set({ isAuthenticated: false })
      },
    }),
    { name: 'auth-store' } 
  )
)
