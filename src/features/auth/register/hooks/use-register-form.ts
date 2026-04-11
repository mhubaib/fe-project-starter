import { useForm } from 'react-hook-form'
import { registerSchema, type RegisterFormData } from '../types/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from './use-register-mutation'

export function useRegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      nickname: '',
      phone: '',
      companyName: '',
      password: '',
      password_confirmation: '',
    },
  })

  const registerMutation = useRegisterMutation()

  function onSubmit(data: RegisterFormData) {
    registerMutation.mutate(data)
  }

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
  }
}
