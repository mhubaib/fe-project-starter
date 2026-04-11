import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from '../types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from './use-login-mutation'

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation()

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data)
  }

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  }
}
