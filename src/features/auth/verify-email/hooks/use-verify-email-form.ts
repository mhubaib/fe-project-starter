import { useForm } from 'react-hook-form'
import {
  verifyEmailSchema,
  type VerifyEmailFormData,
} from '../types/verify-email-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthFlowStore } from '#/stores/auth-flow-store'
import { useVerifyEmailMutation } from './use-verify-email-mutation'

export function useVerifyEmailForm() {
  const phoneNumber = useAuthFlowStore((state) => state.phone)

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otpCode: '',
      phone: phoneNumber!,
    },
  })

  const verifyEmailMutation = useVerifyEmailMutation()

  function onSubmit(data: VerifyEmailFormData) {
    verifyEmailMutation.mutate(data)
  }

  return {
    form,
    onSubmit,
    isLoading: verifyEmailMutation.isPending,
  }
}
