import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useVerifyEmailForm } from '../hooks/use-verify-email-form'
import { Loader2, RefreshCw } from 'lucide-react'
import { Controller } from 'react-hook-form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

export function VerifyEmailForm() {
  const { form, onSubmit, isLoading } = useVerifyEmailForm()
  const phone = form.getValues('phone')

  return (
    <div className="flex w-full flex-col justify-center space-y-6 p-20 relative">
      <div className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Verifikasi Akun
        </h1>
        <p className="text-sm text-slate-500">
          Masukkan kode OTP 6 digit yang telah kami kirimkan ke nomor telepon{' '}
          <span className="font-medium text-slate-900">{phone || 'Anda'}</span>.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} id="verify-email-form">
          <div className="grid gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="otpCode">Kode Verifikasi</Label>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Kirim Ulang Kode
                </button>
              </div>

              <Controller
                control={form.control}
                name="otpCode"
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    autoFocus
                    containerClassName="flex items-center justify-between h-12"
                  >
                    <InputOTPGroup className="w-full flex justify-start">
                      <InputOTPSlot index={0} className="w-12 h-14 text-lg border-2 border-slate-200" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-lg border-2 border-slate-200" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-lg border-2 border-slate-200" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="w-full flex justify-end">
                      <InputOTPSlot index={3} className="w-12 h-14 text-lg border-2 border-slate-200" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-lg border-2 border-slate-200" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-lg border-2 border-slate-200" />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {form.formState.errors.otpCode && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.otpCode.message}
                </p>
              )}

              <Link
                to="/register"
                className="mt-1 text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
              >
                Saya salah memasukkan nomor telepon.
              </Link>
            </div>

            <Button
              disabled={isLoading}
              className="mt-1 h-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-4 pt-4 border-t border-slate-100">
        <p className="text-center text-sm text-slate-500">
          Ada kendala saat mendaftar?{' '}
          <a
            href="#"
            className="font-medium text-teal-600 hover:text-teal-700 underline underline-offset-4"
          >
            Hubungi bantuan
          </a>
        </p>
      </div>
    </div>
  )
}
