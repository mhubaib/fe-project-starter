import { useNavigate } from '@tanstack/react-router'
import { useAuthFlowStore } from '@/stores/auth-flow-store'
import { useMutation } from '@tanstack/react-query'
import type { RegisterFormData } from '../types/register-schema'
import type { ApiResponse } from '#/types'
import apiClient from '#/lib/api-client'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

const REGISTER_TOAST_ID = 'register-toast'

export function useRegisterMutation() {
  const navigate = useNavigate()
  const setAuthFlow = useAuthFlowStore((state) => state.setAuthFlow)

  return useMutation({
    mutationFn: async (
      credentials: RegisterFormData,
    ): Promise<ApiResponse<null>> => {
      const response = await apiClient.post<ApiResponse<null>>(
        'auth/register',
        credentials,
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Memproses data...', { id: REGISTER_TOAST_ID })
    },
    onSuccess: async (_, credentials) => {
      toast.dismiss(REGISTER_TOAST_ID)
      toast.loading('Pendaftaran berhasil! Silahkan verifikasi akun anda.')

      setAuthFlow({
        phone: credentials.phone,
      })

      try {
        await navigate({
          to: '/verify-email',
          replace: true,
        })
      } catch {}
    },
    onError: (error) => {
      toast.dismiss(REGISTER_TOAST_ID)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Pendaftaran gagal. Silakan lakukan ulang pendaftaran.')
      }
    },
  })
}
