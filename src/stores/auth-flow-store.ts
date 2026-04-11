import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthFlowStoreState {
  phone: string | null
  otp_code: string | null
  setAuthFlow: (
    data: Partial<Omit<AuthFlowStoreState, 'setAuthFlow' | 'clearAuthFlow'>>,
  ) => void
  clearAuthFlow: () => void
}

export const useAuthFlowStore = create<AuthFlowStoreState>()(
  persist(
    (set) => ({
      phone: null,
      otp_code: null,
      setAuthFlow: (data) =>
        set((state) => {
          return {
            ...state,
            ...data,
          }
        }),
      clearAuthFlow: () => {
        set({
          phone: null,
          otp_code: null,
        })
      },
    }),
    {
      name: 'auth-flow-storage',
    },
  ),
)
