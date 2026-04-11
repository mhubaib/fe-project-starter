import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState().auth
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    }
    throw redirect({
      to: '/login',
    })
  },
  component: () => null,
})
