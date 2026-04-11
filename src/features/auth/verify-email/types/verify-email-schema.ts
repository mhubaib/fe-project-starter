import z from 'zod/v3'

export const verifyEmailSchema = z.object({
  phone: z.string().min(1, 'Nomor telepon wajib diisi'),
  otpCode: z.string().min(1, 'Kode OTP wajib diisi'),
})

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>
