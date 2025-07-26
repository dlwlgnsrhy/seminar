import { create } from 'zustand'
export type Role = 'GUEST' | 'USER' | 'ADMIN' | 'OPS'

type AuthState = {
  token: string | null
  role: Role
  setAuth: (token: string | null, role: Role) => void
  signout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: 'GUEST',
  setAuth: (token, role) => set({ token, role }),
  signout: () => set({ token: null, role: 'GUEST' })
}))
