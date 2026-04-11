import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import type { LoginFormData, LoginResponse } from '../types/login-schema'
import type { ApiResponse, User } from '#/types'
import apiClient from '#/lib/api-client'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useAuthStore } from '#/stores/auth-store'

const LOGIN_TOAST_ID = 'login-toast'

export function useLoginMutation() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: async (
      credentials: LoginFormData,
    ): Promise<ApiResponse<LoginResponse>> => {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        'auth/login',
        credentials,
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Memproses login...', { id: LOGIN_TOAST_ID })
    },
    onSuccess: async (response) => {
      toast.dismiss(LOGIN_TOAST_ID)
      toast.success('Login berhasil!')

      auth.setTokens(
        response.data?.accessToken as string,
        response.data?.refreshToken as string,
      )
      auth.setUser(response.data?.user as User)

      try {
        await navigate({
          to: '/',
          replace: true,
        })
      } catch {}
    },
    onError: (error) => {
      toast.dismiss(LOGIN_TOAST_ID)
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            'Login gagal. Periksa kembali email dan password Anda.',
        )
      } else {
        toast.error('Terjadi kesalahan pada sistem. Silakan coba lagi.')
      }
    },
  })
}
