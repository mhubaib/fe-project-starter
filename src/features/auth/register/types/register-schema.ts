import z from 'zod/v3'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nama wajib diisi'),
    nickname: z.string().min(3, 'Nickname minimal 3 karakter'),
    email: z.string().email('Email tidak valid!'),
    phone: z.string().min(1, 'Nomor telepon wajib diisi'),
    companyName: z.string().min(1, 'Nama perusahaan wajib diisi'),
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password harus mengandung minimal 1 huruf besar, 1 angka, dan 1 karakter spesial',
      ),
    password_confirmation: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password tidak cocok',
    path: ['password_confirmation'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
