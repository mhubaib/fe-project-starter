import { useAuthFlowStore } from '#/stores/auth-flow-store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { VerifyEmailFormData } from '../types/verify-email-schema'
import type { ApiResponse } from '#/types'
import apiClient from '#/lib/api-client'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

const VERIFY_EMAIL_TOAST_ID = 'verify-email-toast'

export function useVerifyEmailMutation() {
  const navigate = useNavigate()
  const clearAuthFlow = useAuthFlowStore((state) => state.clearAuthFlow)

  return useMutation({
    mutationFn: async (
      credentials: VerifyEmailFormData,
    ): Promise<ApiResponse<null>> => {
      const response = await apiClient.post<ApiResponse<null>>(
        'auth/verify-email',
        credentials,
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Memproses data...', { id: VERIFY_EMAIL_TOAST_ID })
    },
    onSuccess: async () => {
      toast.dismiss(VERIFY_EMAIL_TOAST_ID)
      toast.success('Verifikasi akun berhasil!')

      clearAuthFlow()

      try {
        await navigate({
          to: '/login',
          replace: true,
        })
      } catch {}
    },
    onError: (error) => {
      toast.dismiss(VERIFY_EMAIL_TOAST_ID)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Verifikasi gagal. Silakan lakukan ulang verifikasi.')
      }
    },
  })
}
