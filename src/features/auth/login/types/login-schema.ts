import type { User } from '#/types'
import z from 'zod/v3'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid!'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: string
  user: User
}
